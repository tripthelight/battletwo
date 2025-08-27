import makeAesSecretKey from './makeAesSecretKey.js';

export const obfuscationList = {
  indianPocker: () => {
    return {
      /*
      BOOLEAN: {
        k: 'HWXQCUPGOE', // [72, 87, 88, 81, 67, 85, 80, 71, 79, 69]
        v: {
          true: 'ECHAJDIPBK', // [69, 67, 72, 65, 74, 68, 73, 80, 66, 75]
          false: 'FJYTOKXWUN', // [70, 74, 89, 84, 79, 75, 88, 87, 85, 78]
        },
      },
      */
      SECRET_KEY: {
        k: 'SXIEUDBLPN', // [83, 88, 73, 69, 85, 68, 66, 76, 80, 78]
        v: makeAesSecretKey(),
      },
      CARD_NUMS: {
        k: 'TNUFGJXDCM', // [84, 78, 85, 70, 71, 74, 88, 68, 67, 77]
        v: {
          NUM_1: 'OEJNIHMKXT', // [79, 69, 74, 78, 73, 72, 77, 75, 88, 84]
          NUM_2: 'GIZFNPTSVK', // [71, 73, 90, 70, 78, 80, 84, 83, 86, 75]
          NUM_3: 'OCNLTGMFKS', // [79, 67, 78, 76, 84, 71, 77, 70, 75, 83]
          NUM_4: 'DKHOXMIVEA', // [68, 75, 72, 79, 88, 77, 73, 86, 69, 65]
          NUM_5: 'PDBIZUOFMJ', // [80, 68, 66, 73, 90, 85, 79, 70, 77, 74]
          NUM_6: 'KFOUDBRZVI', // [75, 70, 79, 85, 68, 66, 82, 90, 86, 73]
          NUM_7: 'MIPGSHDAUF', // [77, 73, 80, 71, 83, 72, 68, 65, 85, 70]
          NUM_8: 'SJRWTDGUXH', // [83, 74, 82, 87, 84, 68, 71, 85, 88, 72]
          NUM_9: 'HJZUTOXFQA', // [72, 74, 90, 85, 84, 79, 88, 70, 81, 65]
          NUM_10: 'JRPFIGSBDN', // [74, 82, 80, 70, 73, 71, 83, 66, 68, 78]
        },
      },
      COIN_NUMS: {
        k: 'OQTDZWUGXS', // [79, 81, 84, 68, 90, 87, 85, 71, 88, 83]
        v: {
          NUM_11: 'RNQUKJXEFZ', // [82, 78, 81, 85, 75, 74, 88, 69, 70, 90]
          NUM_12: 'KWURNSMYFZ', // [75, 87, 85, 82, 78, 83, 77, 89, 70, 90]
          NUM_13: 'KBIGNZLWEM', // [75, 66, 73, 71, 78, 90, 76, 87, 69, 77]
          NUM_14: 'JYAPSNDIVQ', // [74, 89, 65, 80, 83, 78, 68, 73, 86, 81]
          NUM_15: 'VRTAWBOLFG', // [86, 82, 84, 65, 87, 66, 79, 76, 70, 71]
          NUM_16: 'UKAPGQHWRM', // [85, 75, 65, 80, 71, 81, 72, 87, 82, 77]
          NUM_17: 'ULDXJFISPY', // [85, 76, 68, 88, 74, 70, 73, 83, 80, 89]
          NUM_18: 'INTCJAOBWU', // [73, 78, 84, 67, 74, 65, 79, 66, 87, 85]
          NUM_19: 'JGKPODVSAX', // [74, 71, 75, 80, 79, 68, 86, 83, 65, 88]
          NUM_20: 'BUNOZTWXCD', // [66, 85, 78, 79, 90, 84, 87, 88, 67, 68]
          NUM_21: 'FLTZDJVERS', // [70, 76, 84, 90, 68, 74, 86, 69, 82, 83]
          NUM_22: 'HAXNUOZJRW', // [72, 65, 88, 78, 85, 79, 90, 74, 82, 87]
          NUM_23: 'JUGFAMVNWC', // [74, 85, 71, 70, 65, 77, 86, 78, 87, 67]
          NUM_24: 'VZHJXMKLSP', // [86, 90, 72, 74, 88, 77, 75, 76, 83, 80]
          NUM_25: 'VXYZRBSWAQ', // [86, 88, 89, 90, 82, 66, 83, 87, 65, 81]
          NUM_26: 'CNGSVHBDOM', // [67, 78, 71, 83, 86, 72, 66, 68, 79, 77]
          NUM_27: 'ERCVUDPJLI', // [69, 82, 67, 86, 85, 68, 80, 74, 76, 73]
          NUM_28: 'UOIHZNSPFE', // [85, 79, 73, 72, 90, 78, 83, 80, 70, 69]
          NUM_29: 'WTPZVXIACN', // [87, 84, 80, 90, 86, 88, 73, 65, 67, 78]
          NUM_30: 'OLRUNSVJDZ', // [79, 76, 82, 85, 78, 83, 86, 74, 68, 90]
          NUM_31: 'WVSKTDXOIG', // [87, 86, 83, 75, 84, 68, 88, 79, 73, 71]
          NUM_32: 'DVTCUYRZEA', // [68, 86, 84, 67, 85, 89, 82, 90, 69, 65]
          NUM_33: 'ILDKMRHGPJ', // [73, 76, 68, 75, 77, 82, 72, 71, 80, 74]
          NUM_34: 'RBVFOQDTHI', // [82, 66, 86, 70, 79, 81, 68, 84, 72, 73]
          NUM_35: 'TFKSBLZRUH', // [84, 70, 75, 83, 66, 76, 90, 82, 85, 72]
          NUM_36: 'EQNGDAVYUM', // [69, 81, 78, 71, 68, 65, 86, 89, 85, 77]
          NUM_37: 'XBNIGLWRHO', // [88, 66, 78, 73, 71, 76, 87, 82, 72, 79]
          NUM_38: 'TIGNFOXYLH', // [84, 73, 71, 78, 70, 79, 88, 89, 76, 72]
          NUM_39: 'OMKHFTNCLG', // [79, 77, 75, 72, 70, 84, 78, 67, 76, 71]
          NUM_40: 'ZSIKJDPFTO', // [90, 83, 73, 75, 74, 68, 80, 70, 84, 79]
        },
      },
      /*
      GAME_STATE_ALL_KEYS: {
        k: 'XBAHZDVKUI', // [88, 66, 65, 72, 90, 68, 86, 75, 85, 73]
      },
      GAME_NAME: {
        k: 'BVDIEAIBKE', // [66, 86, 68, 73, 69, 65, 73, 66, 75, 69]
        v: 'DJEMFKLVDE', // indianPocker -> [68, 74, 69, 77, 70, 75, 76, 86, 68, 69]
      },
      ROOM_NAME: {
        k: 'JVXNPFUHWD', // [74, 86, 88, 78, 80, 70, 85, 72, 87, 68]
      },
      REMOTE_PLAYER: {
        k: 'JSNYCGWFRV', // [74, 83, 78, 89, 67, 71, 87, 70, 82, 86]
      },
      CARD_NUM: {
        k: 'MDOXIVEFAP', // [77, 68, 79, 88, 73, 86, 69, 70, 65, 80]
      },
      GAME_STATE: {
        k: 'IKVUDKLWOD', // [77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]
        v: {
          waitEnemy: 'JKGZWOUEAX', // [74, 75, 71, 90, 87, 79, 85, 69, 65, 88]
          choiceCard: 'WJAPYUZTHR', // [87, 74, 65, 80, 89, 85, 90, 84, 72, 82]
          basicBet: 'FHVXRBKYOD', // [70, 72, 86, 88, 82, 66, 75, 89, 79, 68]
          playing: 'TXVBNIRQWG', // [84, 88, 86, 66, 78, 73, 82, 81, 87, 71]
          gameOver: 'AFOILUXWVK', // [65, 70, 79, 73, 76, 85, 88, 87, 86, 75]
        },
      },
      */

      /**
       * choice card
       */
      /*
      // s: sessionStorage keys
      PLAYER_FIRST_CARD_NUM: {
        k: 'MDIZJHVGUW', // [77, 68, 73, 90, 74, 72, 86, 71, 85, 87]
      },
      UL_INDEX: {
        k: 'NIDLCRWSYF', // [78, 73, 68, 76, 67, 82, 87, 83, 89, 70]
      },
      LI_INDEX: {
        k: 'SFOCAGBWMV', // [83, 70, 79, 67, 65, 71, 66, 87, 77, 86]
      },
      ENEMY_FIRST_NUMBER: {
        k: 'QCRJWLYOSU', // [81, 67, 82, 74, 87, 76, 89, 79, 83, 85]
      },
      UL_INDEX_ENEMY: {
        k: 'NHYICUGOML', // [78, 72, 89, 73, 67, 85, 71, 79, 77, 76]
      },
      LI_INDEX_ENEMY: {
        k: 'MCEIHKDRGP', // [77, 67, 69, 73, 72, 75, 68, 82, 71, 80]
      },
      ENEMY_CARD_CHOICE_READY: { // true/false
        k: 'DGWMUBATXE', // [68, 71, 87, 77, 85, 66, 65, 84, 88, 69]
      },
      BET_USER: { // true/false/''
        k: 'HFUCSDYRMX', // [72, 70, 85, 67, 83, 68, 89, 82, 77, 88]
      },
      BET_USER_FIRST: { // true/false/''
        k: 'ZYPFDTAMJN', // [90, 89, 80, 70, 68, 84, 65, 77, 74, 78]
      },
      MY_NEXT_STEP_STATE: { // true/false
        k: 'RICMUXFSGW', // [82, 73, 67, 77, 85, 88, 70, 83, 71, 87]
      },
      NEXT_STEP_CHOICE_CARD: { // true/false
        k: 'DOJURSQVHM', // [68, 79, 74, 85, 82, 83, 81, 86, 72, 77]
      },
      TIE_WAIT: { // true/false
        k: 'OXMTWVSEYI', // [79, 88, 77, 84, 87, 86, 83, 69, 89, 73]
      },
      // e: sessionStorage keys

      /**
       * basic bet
       */
      /*
      // s: sessionStorage keys
      BET_STATE: {
        k: 'FMPXWVSYKA', // [70, 77, 80, 88, 87, 86, 83, 89, 75, 65]
        v: {
          basicBetting: 'FTKWJCIMPA', // [70, 84, 75, 87, 74, 67, 73, 77, 80, 65]
          extraBetting: 'MVSWEIHXPY', // [77, 86, 83, 87, 69, 73, 72, 88, 80, 89]
        },
      },
      ROUND_END: { // true/false
        k: 'SNVODIGWRU', // [83, 78, 86, 79, 68, 73, 71, 87, 82, 85]
      },
      BASIC_BET_READY: { // true/false
        k: 'HQIOSFNPKX', // [72, 81, 73, 79, 83, 70, 78, 80, 75, 88]
      },
      EXT_FIRST_BET: { // true/false
        k: 'MLCXOWSZYV', // [77, 76, 67, 88, 79, 87, 83, 90, 89, 86]
      },
      BET_USER: { // true/false/''
        k: 'HFUCSDYRMX', // [72, 70, 85, 67, 83, 68, 89, 82, 77, 88]
      },
      BET_USER_FIRST: { // true/false/''
        k: 'ZYPFDTAMJN', // [90, 89, 80, 70, 68, 84, 65, 77, 74, 78]
      },
      COINS_ENEMY: {
        k: 'SNTDBPGACW', // [83, 78, 84, 68, 66, 80, 71, 65, 67, 87]
      },
      COINS_PLAYER: {
        k: 'QCEDGMSZAJ', // [81, 67, 69, 68, 71, 77, 83, 90, 65, 74]
      },
      COINS_PLAYER_BET: {
        k: 'XOVJHPGFEM', // [88, 79, 86, 74, 72, 80, 71, 70, 69, 77]
      },
      DREW_READY: { // true/false
        k: 'RCFEDVXJSN', // [82, 67, 70, 69, 68, 86, 88, 74, 83, 78]
      },
      BASIC_BETTING_STATE: { // true/false
        k: 'QEMHKCIWOJ', // [81, 69, 77, 72, 75, 67, 73, 87, 79, 74]
      },
      BET_COIN: { : TODO:
        k: 'DUHITAZFYX', // [68, 85, 72, 73, 84, 65, 90, 70, 89, 88]
        v: {
          betState: {
            k: '',
            v: {
              end: '',
            }
          },
          host: {
            k: '',
            v: {
              'pleyer': ''
              'enemy': ''
            }
          },
          index: ',
          translateX: '',
          translateY: '',
          offsetLeft: '',
          offsetTop: '',
          tm: '',
          th: '',
        }
      },
      BET_COIN_POS: { : TODO:
        k: 'DEKHCVZPAO', // [68, 69, 75, 72, 67, 86, 90, 80, 65, 79]
          v: {
            host: '',
            translateX: '',
            translateY: '',
          },
        },
      },
      DREW_STATE: { // true/false
        k: 'CGODLITJPM' //  [67, 71, 79, 68, 76, 73, 84, 74, 80, 77]
      },
      RESULT: { // true/false
        k: 'OUMJGNPCQH' //  [79, 85, 77, 74, 71, 78, 80, 67, 81, 72]
      },
      DROP_STATE: { // true/false
        k: 'QEGTUZRCMY' //  [81, 69, 71, 84, 85, 90, 82, 67, 77, 89]
      },

      // e: sessionStorage keys

      // s: click event
      // choiceCardClick
      CHOICE_CARD_CLICK: {
        k: 'FHOEWPICTS', // [70, 72, 79, 69, 87, 80, 73, 67, 84, 83]
      },
      RESULT_BETTING_CLICK: {
        k: 'BHINYATMSV', // [66, 72, 73, 78, 89, 65, 84, 77, 83, 86]
      },
      // e: click event
      */
    };
  },
};

/**
// 문자열을 배열로 변환
const str = "BVDIEAIBKE";
const charCodes = Array.from(str).map(char => char.charCodeAt(0)); // 방법 1
console.log(charCodes);
const arr = [..."BVDIEAIBKE"].map(c => c.charCodeAt(0)); // 방법 2
console.log(arr);

// 배열을 문자열로 변환
String.fromCharCode(...[66, 86, 68, 73, 69, 65, 73, 66, 75, 69]); // "BVDIEAIBKE"
*/

/*
// 겹치지 않는 10개의 랜덤 영문 대문자를 리턴하는 JavaScript 함수
function getRandomUniqueLetters() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letters = alphabet.split('');

  // 결과를 담을 배열
  const result = [];

  while (result.length < 10) {
    // 랜덤한 인덱스 선택
    const index = Math.floor(Math.random() * letters.length);

    // 해당 알파벳을 결과에 추가
    result.push(letters[index]);

    // 중복 방지를 위해 선택한 알파벳 제거
    letters.splice(index, 1);
  }
  return result.join('');
}
getRandomUniqueLetters();

// 40번 반복
for (let i = 0; i < 40; i++) {
  console.log(i, ' : ', getRandomUniqueLetters());
}
*/
