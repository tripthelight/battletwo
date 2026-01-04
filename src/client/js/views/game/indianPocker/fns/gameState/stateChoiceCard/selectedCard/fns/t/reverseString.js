export function reverseString(str) {
  // 일반적인 문자열(ASCII 포함) 뒤집기
  return String(str).split("").reverse().join("");
}

// 사용 예
// reverseString("a!s@D#f") -> "f#D@s!a"