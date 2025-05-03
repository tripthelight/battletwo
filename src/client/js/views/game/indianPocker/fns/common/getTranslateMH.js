export default (_target) => {
  // minute
  const M_El = _target.querySelector("span.m");
  const STYLE_M = window.getComputedStyle(M_El);
  const MATRIX_M = new DOMMatrixReadOnly(STYLE_M.transform);
  const DEG_M = Math.round(Math.asin(MATRIX_M.b) * (180 / Math.PI));
  let m = DEG_M;
  if (DEG_M < 0) {
    m = Math.abs(DEG_M) + 180;
  }

  // hour
  const H_El = _target.querySelector("span.h");
  const STYLE_H = window.getComputedStyle(H_El);
  const MATRIX_H = new DOMMatrixReadOnly(STYLE_H.transform);
  const DEG_H = Math.round(Math.asin(MATRIX_H.b) * (180 / Math.PI));
  let h = DEG_H;
  if (DEG_H < 0) {
    h = Math.abs(DEG_H) + 180;
  }

  // console.log("탸냐 ??? ");
  // return
  return { m, h };
  /*
  // const STYLE_M = window.getComputedStyle(M_El);
  // const MATRIX_M = new DOMMatrixReadOnly(STYLE_M.transform);

  // console.log("MATRIX_M :: ", MATRIX_M);

  // console.log("MATRIX_M :: ", MATRIX_M);
  // const TR = ST.getPropertyValue("-webkit-transform") || ST.getPropertyValue("-moz-transform") || ST.getPropertyValue("-ms-transform") || ST.getPropertyValue("-o-transform") || ST.getPropertyValue("transform") || "Either no transform set, or browser doesn't do getComputedStyle";
  // let values1 = TR.split("(")[1];
  // let values2 = values1.split(")")[0];
  // let values3 = values2.split(",");
  // console.log("values1 :: ", values1);
  // console.log("values2 :: ", values2);
  // console.log("values3 :: ", values3);

  // let b = values3[1]; // 0.5
  
  // let angle2 = Math.round(Math.asin(b) * (180 / Math.PI));
  // console.log("angle1 : ", angle1);
  // console.log("angle2 : ", angle2);
  // let a = values3[0]; // 0.866025
  // let b = values3[1]; // 0.5
  // let c = values3[2]; // -0.5
  // let d = values3[3]; // 0.866025
  // console.log("b :: ", b);

  // // angle :
  // // 0 ~ 180이면 0 ~ 180
  // // 181 ~ 360 이면 -1 ~ -180
  // // let angle = Math.round(Math.asin(b) * (180 / Math.PI));
  // let angle = Math.round(Math.asin(b) * (180 / Math.PI));
  // console.log("angle :: ", angle);

  //////////////////////////////////////////////////////////////////////

  // const STYLE_M = window.getComputedStyle(M_El);
  // const MATRIX_M = new DOMMatrixReadOnly(STYLE_M.transform);
  // const STYLE_H = window.getComputedStyle(M_El);
  // const MATRIX_H = new DOMMatrixReadOnly(STYLE_H.transform);
  // // console.log("MATRIX_M :: ", MATRIX_M.rotate());
  // // console.log("MATRIX_H :: ", MATRIX_H.rotate());
  // const rotate = M_El.style.transform.match(/rotate\((.+)\)/);
  // console.log("rotate :: ", rotate);
  return {
    m: 0,
    h: 0,
  };
  */
};
