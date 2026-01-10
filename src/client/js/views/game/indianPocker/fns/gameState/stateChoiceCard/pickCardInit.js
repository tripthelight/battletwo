import { publicCardNumbs } from '@/client/store/encryptionStore';
import cardNumEncryption from '@/client/js/functions/bcrypt/cardNumEncryption';
import findCharCode from '@/client/js/functions/findCharCode';
import showChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCard';
import dataHandler from '@/client/js/functions/dataVerification/click/dataHandler';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';

export default async (_event) => {
  // sessionStorage 모든 key check
  dataHandler({
    p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
    p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    p3: findCharCode([70, 72, 79, 69, 87, 80, 73, 67, 84, 83]), // choiceCardClick
  });

  const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  if (encryptVal2 === '') {
    /* // 랜덤한 카드 생성 후 -> 0 ~ 39 을 1 ~ 10 사이로 변환
    const encryptPlayerNum = cardNumEncryption(((Math.floor(Math.random() * selectCompairNumbers().length) - 1) % 10) + 1);

    // local peer / remote peer 같은 숫자 생성
    // const encryptPlayerNum = cardNumEncryption(0);

    // local player가 선택한 카드가 없을 때
    showChoiceCard(_event, encryptPlayerNum); */
    //
    //
    //
    //
    //
    //
    // 💥 publicCardNums 와 privateCardNums 는 1 ~ 10의 카드숫자배열이지만 순서가 섞여있음
    // 💥 상대에게 받은 privateCardNums 중 하나는 내가 가진 publicCardNums 배열 중 하나의 코드와 매칭이 가능해야 함
    // - 나는 내가 가진 privateCardNums 배열리스트와 내가 가진 publicCardNums 간 매칭 불가능
    // - 상대는 자신이 가진 privateCardNums 배열리스트와 자신이 가진 publicCardNums 간 매칭 불가능
    // 💥 publicCardNums 배열(암호화된 숫자 1 ~ 10)에 있는 값으로 카드 번호(SVG) 매칭이 가능해야 함
    //
    // ✅ 먼저 선택한 peer -> 내 publicCardNums 중 랜덤한 카드숫자코드 하나를 상대 peer에게 보내
    // ✅ 상대 peer 는 자신이 가지고 있는 publicCardNums 리스트 중 받은 카드번호코드에 해당하는 코드가 몇 번째 index 인지 체크해
    // ✅ 그러면 상대는 그 (index + 1) 에 해당하는 숫자 카드를 자신의 화면에 오픈해
    // - 그렇게 되면 내가 보낸 카드숫자코드와 상대의 publicCardNums index가 달라서 나는 내가 보낸 코드의 숫자와 매칭 안됨
    // ✅ 상대 화면에 보이는 숫자에 해당하는 publicCardNums 배열 값을 나에게 보내
    // ✅ 나는 내 화면에 받은 카드숫자코드에 해당하는 카드로 오픈시켜
    //
    //
    //
    //
    //
    //
    // 먼저 선택한 peer -------------------------------------------->
    // 내 publicCardNums 중 랜덤한 카드숫자코드 하나를 선택해
    // 내 sessionStorage에 저장시키고, 매칟왼 해당 카드를 오픈해
    // 선택한 카드숫자코드를 상대 peer에게 보내
    // ❌ 내가 보낼 카드를 내가 조작 가능
    //
    // 내가 선택한 카드를 받은 peer ---------------------------------->
    // 내가 보낸 카드번호코드와 상대가 가진 publicCardNums 중 매칭 되는 카드번호코드를 sessionStorage에 저장
    // 내가 보낸 카드번호코드와 상대가 가진 publicCardNums 중 매칭 되는 카드번호코드를 상대의 화면에 노출
    // ❌ 나에게 받은 직후 상대가 조작 가능
    //
    // 내가 선택한 후 상대가 내가 선택한 카드를 같이 나한테 보내
    // 내가 선택했던 카드와 비교했을 때 다르면
    // 내가 변경했거나, 상대가 변경해서 보냄
    // => 내가 변경한 것이 아니면 상대가 변경했음
    // ✅ 상대의 파울은 체크 가능
    // ❌ 내가 파울한 것(내가 선택할 때 내가 임의로 바꾼 카드번호코드)은 검증 못함
    //
    //
    //
    //

    const arrNumbs = publicCardNumbs();
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      throw throwObj('cardNum', 'cardNum length 0 - 1');
    }

    // encryptPlayerNum : publicCardNums 중 랜덤한 하나 선택
    const encryptPlayerNum = arrNumbs[Math.floor(Math.random() * arrNumbs.length)];

    console.log("선택한 카드 코드 : ", encryptPlayerNum);


    showChoiceCard(_event, encryptPlayerNum);
  } else {
    throw throwObj('sessionStorageLoss', 'cardNum sessionStorage value manipulat.');
  }
};
