import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import {GRS} from '@/client/js/module/crypts/generateRandomString';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageMethod from '@/client/js/module/storage/storageMethod';
import EnemyBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/EnemyBlockMoveBattingZone.js';
import saveBetCoinSession from '@/client/js/views/game/indianPocker/fns/common/saveBetCoinSession';
import getTranslateMH from '@/client/js/views/game/indianPocker/fns/common/getTranslateMH.js';

export const GET_BASIC_BETTING = {
  receiveBasicBetting: (_data) => {
    const encryptKey1 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptKey2 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet

    const PROMISE = new Promise((resolve, reject) => {
      resolve(_data);
    });
    PROMISE
      .then((_data) => {
        // 기본 배팅만 탐
        if (_data.state) return _data;
      })
      .then((_data) => {
        const { coinCount, betCount, originCount } = _data;

        // 상대 peer에게 받은 기본배팅 하기 전 코인 개수와
        // 내가 가지고 있는 상대 코인 개수가 맞는지 검증 필요
        const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
        if (encryptVal1 === null) throw throwObj('sessionStorageLoss', 'basic bet sessionStorage enemy coins failed.');
        const decryptVal = dec(encryptVal1); // coinsEnemy value number

        if (
          betCount !== 1 ||
          originCount !== decryptVal ||
          coinCount + betCount !== decryptVal ||
          coinCount + betCount !== originCount ||
          decryptVal - betCount !== coinCount
        ) {
          throw throwObj('foul', 'basic bet coin compair failed.');
        };
        return _data;
      })
      .then((_data) => {
        // storageMethod('s', 'SET_ITEM', 'coinsEnemy', enc(_data.coinCount));
        storageMethod('s', 'SET_ITEM', encryptKey1, enc(_data.coinCount)); // coinsEnemy
        return _data;
      })
      .then((_data) => {
        const conditBet = encryptNumOfStr(GRS([_t([101]), _t([119])],parseInt(_t([51]))) + _t([114])); // ex) "wewr" : 1
        // let enemyBetCoin = window.sessionStorage.coinsEnemyBet;
        const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
        // if (!enemyBetCoin) {
        if (encryptVal2 === '') {
          // storageMethod('s', 'SET_ITEM', 'coinsEnemyBet', 1);
          storageMethod('s', 'SET_ITEM', encryptKey2, enc(conditBet)); // coinsEnemyBet, 1
        } else {
          // enemyBetCoin = Number(window.sessionStorage.coinsEnemyBet) + 1;
          // storageMethod('s', 'SET_ITEM', 'coinsEnemyBet', enemyBetCoin);
          storageMethod('s', 'SET_ITEM', encryptKey2, enc(dec(encryptVal2) + conditBet)); // coinsEnemyBet
        }
        return _data;
      })
      .then((_data) => {
        const ENEMY_MOVE_COIN_INCREASE = new Promise((resolve, reject) => {
          EnemyBlockMoveBattingZone()
            .then(() => {
              resolve();
            })
            .catch((err) => {
              console.log('error EnemyBlockMoveBattingZone()');
              // errorManagement({ errCase: 'errorComn' });
              throw {
                ...throwObj('errorComn', 'EnemyBlockMoveBattingZone failed.'),
                errorDetails: err
              };
            });
        });
        ENEMY_MOVE_COIN_INCREASE.then(() => {
          const REMOVE_ENEMY_BET_COIN = new Promise((resolve, reject) => {
            // enemy의 기본배팅을 받고 player에서 enemy coin을 다시 그림
            const ENEMY_COIN_UL = document.querySelector('ul.coins-enemy');
            if (!ENEMY_COIN_UL) return;
            const COINS = ENEMY_COIN_UL.querySelectorAll('li');

            // enemy 코인을 지우기 전 시간 deg 저장 array 변수 선언
            let timeDegArr = [];
            if (COINS.length > 0) {
              for (let i = 0; i < COINS.length; i++) {
                if (i === COINS.length - 1) {
                  // 기본 배팅에서는 마지막 코인이 빠지므로 마지막 코인의 시간 POS는 없어야 됨
                } else {
                  timeDegArr.push([getTranslateMH(COINS[i]).m, getTranslateMH(COINS[i]).h]);
                }
                COINS[i].remove();
              }
            }
            // const ENEMY_COINS = Number(window.sessionStorage.coinsEnemy);
            const ENEMY_COINS = Number(_data.coinCount);
            if (ENEMY_COINS > 0) {
              let coinsElem = new Object();
              let minuteEl = new Object();
              let hourEl = new Object();
              for (let i = 0; i < ENEMY_COINS; i++) {
                coinsElem = document.createElement('li');
                minuteEl = document.createElement('span');
                hourEl = document.createElement('span');
                minuteEl.classList.add('m');
                hourEl.classList.add('h');
                coinsElem.appendChild(minuteEl);
                coinsElem.appendChild(hourEl);
                // 기본 배팅이 끝나면 시간이 멈춰야 됨
                minuteEl.style.transform = `translate(-50%, -96%) rotate(${timeDegArr[i][0]}deg)`;
                hourEl.style.transform = `translate(-50%, -86%) rotate(${timeDegArr[i][1]}deg)`;
                ENEMY_COIN_UL.appendChild(coinsElem);
                // 모두 다시 그리면 다음 함수 실행
                if (i === ENEMY_COINS - 1) resolve();
              }
            } else {
              resolve();
            }
          });
          REMOVE_ENEMY_BET_COIN.then(() => {
            const ENEMY_POS = window.sessionStorage.betCoin;
            if (!ENEMY_POS) return;
            const ENEMY_COIN_UL = document.querySelector('ul.coins-enemy');
            if (!ENEMY_COIN_UL) return;
            const COINS = ENEMY_COIN_UL.querySelectorAll('li');
            const PLAYER_COIN_UL = document.querySelector('ul.coins-player');
            if (!PLAYER_COIN_UL) return;
            const COINS_P = PLAYER_COIN_UL.querySelectorAll('li');
            const BETTING_ZONE = document.querySelector('.betting-zone');
            if (!BETTING_ZONE) return;
            const BET_COIN_LIST = JSON.parse(ENEMY_POS);
            if (!BET_COIN_LIST || BET_COIN_LIST.length <= 0) return;

            const BET_COIN = window.sessionStorage.betCoin;
            const BET_COIN_ARR = JSON.parse(BET_COIN);
            let minuteEl = new Object();
            let hourEl = new Object();

            const COINS_WIDTH = COINS[0] ? COINS[0].clientWidth : COINS_P[0] ? COINS_P[0].clientWidth : 0;
            const COINS_HEIGHT = COINS[0] ? COINS[0].clientHeight : COINS_P[0] ? COINS_P[0].clientHeight : 0;
            const BET_COINS = BETTING_ZONE.querySelector('.bet-coins');
            let elemLi;
            let x = 0;
            let y = 0;
            if (BET_COINS) {
              console.log('1 =============== ');

              // EMEMY의 기본배팅을 받고 PLAYER 기본배팅 =========================
              const PLAYER_COIN = BET_COIN_ARR.filter((item) => item.host === 'player');
              const BET_COINS_LIST = BET_COINS.querySelectorAll('li');
              if (BET_COINS_LIST.length === BET_COIN_LIST.length) return;
              for (let i = 0; i < BET_COIN_LIST.length; i++) {
                if (i === BET_COIN_LIST.length - 1 && BET_COIN_LIST[i].host === 'enemy') {
                  elemLi = document.createElement('li');

                  minuteEl = document.createElement('span');
                  hourEl = document.createElement('span');
                  minuteEl.classList.add('m');
                  hourEl.classList.add('h');
                  elemLi.appendChild(minuteEl);
                  elemLi.appendChild(hourEl);
                  minuteEl.style.transform = `translate(-50%, -96%) rotate(${PLAYER_COIN[0]?.tm ?? 0}deg)`;
                  hourEl.style.transform = `translate(-50%, -86%) rotate(${PLAYER_COIN[0]?.th ?? 0}deg)`;

                  if (BET_COIN_LIST[i].host === 'enemy') elemLi.classList.add('e');
                  let xRes = BET_COIN_LIST[i].translateX < 0 ? BET_COIN_LIST[i].translateX + COINS_WIDTH : BET_COIN_LIST[i].translateX;
                  x = BET_COIN_LIST[i].offsetLeft + xRes;
                  y = BET_COIN_LIST[i].translateY - ENEMY_COIN_UL.clientHeight + COINS_HEIGHT;
                  elemLi.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                  BET_COINS.appendChild(elemLi);
                  saveBetCoinSession('enemy', x, y);
                }
              }
            } else {
              console.log('2 =============== ');
              // PLAYER 첫 기본 배팅 ============================================
              // ENEMY의 첫 기본배팅을 받음
              const ENEMY_COIN = BET_COIN_ARR.filter((item) => item.host === 'enemy');
              let elem = document.createElement('ul');
              elem.classList.add('bet-coins');
              for (let i = 0; i < BET_COIN_LIST.length; i++) {
                elemLi = document.createElement('li');
                minuteEl = document.createElement('span');
                hourEl = document.createElement('span');
                minuteEl.classList.add('m');
                hourEl.classList.add('h');
                elemLi.appendChild(minuteEl);
                elemLi.appendChild(hourEl);
                elem.appendChild(elemLi);
                minuteEl.style.transform = `translate(-50%, -96%) rotate(${ENEMY_COIN[0].tm}deg)`;
                hourEl.style.transform = `translate(-50%, -86%) rotate(${ENEMY_COIN[0].th}deg)`;
                if (BET_COIN_LIST[i].host === 'enemy') elemLi.classList.add('e');
                let xRes = BET_COIN_LIST[i].translateX < 0 ? BET_COIN_LIST[i].translateX + COINS_WIDTH : BET_COIN_LIST[i].translateX;
                x = BET_COIN_LIST[i].offsetLeft + xRes;
                y = BET_COIN_LIST[i].translateY - ENEMY_COIN_UL.clientHeight + COINS_HEIGHT;
                elemLi.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                elem.appendChild(elemLi);
              }
              BETTING_ZONE.appendChild(elem);
              saveBetCoinSession('enemy', x, y);
            };
          }).catch((err) => {
            console.log('error REMOVE_ENEMY_BET_COIN');
            throw {
              ...throwObj('errorComn', 'REMOVE_ENEMY_BET_COIN failed.'),
              errorDetails: err
            };
          });
        }).catch((err) => {
          console.log('error ENEMY_MOVE_COIN_INCREASE');
          console.log('err : ', err);

          throw {
            ...throwObj('errorComn', 'ENEMY_MOVE_COIN_INCREASE failed.'),
            errorDetails: err
          };
        });
      })
      .catch((err) => {
        console.log('error getBasicBetting receiveBasicBetting : ');
        errorManager(err, true);
      });
  },
};
