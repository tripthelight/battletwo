import findCharCode from '@/client/js/functions/findCharCode';

export default async () => {
  try {
    const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]); // cardNum
    const decryptVal = window.sessionStorage.getItem(encryptKey);
    if (!decryptVal) {
      throw { errCase: 'errorComn', message: 'card num not found' };
    };

    // storage value에 []포함여부 확인
    const hasBrackets = /\[.*\]/.test(decryptVal);
    if (hasBrackets) {
      // 배열 형식의 문자열인지 체크
      const parsed = JSON.parse(decryptVal.replace(/'/g, '"'));
      const isArrayString = Array.isArray(parsed);

      if (isArrayString) {
        // 중복 넘버가 있는지 체크
        const cardNums = JSON.parse(decryptVal);
        const hasDuplicate = new Set(cardNums).size !== cardNums.length;
        if (hasDuplicate) {
          throw { errCase: 'errorComn', message: 'card num Duplicate error' };
        };

        // sessionsStorage cardNum 조작이 있었는지 체크

      };
    } else {
      throw { errCase: 'errorComn', message: 'card num Bracket error' };
    }

  } catch (error) {
    throw { errCase: 'errorComn', message: 'card num error', errorDetails: error };
  }
};
