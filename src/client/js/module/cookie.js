/**
 * 쿠키 용도 : 다시 열지 않기, 오늘 하루 열지 않기
 * @param {string} _cookieName  : 쿠키명
 */
export const COOKIE_DECIDE_DAY = (_cookieName) => {
  /* 쿠키 제어 함수 정의 */
  let handleCookie = {
    // 쿠키 쓰기
    // 이름, 값, 만료일
    setCookie: (name, val, exp) => {
      let date = new Date();

      // 만료 시간 구하기(exp를 ms단위로 변경)
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      // console.log(name + "=" + val + ";expires=" + date.toUTCString() + ";path=/");

      // 실제로 쿠키 작성하기
      document.cookie = name + "=" + val + ";expires=" + date.toUTCString() + ";";
    },
    // 쿠키 읽어오기(정규식 이용해서 가져오기)
    getCookie: (name) => {
      let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return value ? value[2] : null;
    },
  };
  // console.log(handleCookie.getCookie("infoPlayPop"));

  // 쿠키 읽고 화면 보이게
  // if (handleCookie.getCookie(_cookieName) === "y") {
  //   // 팝업 열리면 안됨
  // } else {
  //   // 팝업 열려야 됨
  //   _cb();
  // }

  if (handleCookie.getCookie(_cookieName) === "y") {
  } else {
    // 쿠키를 생성해서 앞으로 안보이게 함
    handleCookie.setCookie(_cookieName, "y", 1000);
  }
};

/**
 * 쿠키명 유무 체크
 * @param {string} _name : 찾고자 하는 쿠키명
 * @returns : 찾고자 하는 쿠키명이 있으면 true | false
 */
export const CHECK_COOKIE_NAME = (_name) => {
  var match = document.cookie.match(new RegExp("(^| )" + _name + "=([^;]+)"));
  if (match) return true;
  return false;
};
