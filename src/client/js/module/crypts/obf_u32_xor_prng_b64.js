export const HEX_RAND = [
  0x2c7b6a35,
  0x0ae4af73,
  0x117a0428,
  0x17bc182c,
  0x23e6f856,
  0x1e937cda,
  0x180432da,
  0x2af816be,
  0x16eef5ac,
  0x3318cabf,
];

const u32 = (n) => (n >>> 0);

// ---- 검증용 매직(32bit) ----
// 아무 값이나 상관없지만, 추측하기 어렵고 0이 아닌 값 추천
const MAGIC = 0x6d4f2a91; // 임의

// --------- hex <-> u32 ----------
function parseHexU32(token) {
  if (typeof token === "number") return u32(token);
  if (typeof token !== "string") throw new TypeError("hex token must be a string or number");

  const s = token.trim().toLowerCase().replace(/^0x/, "");
  if (!/^[0-9a-f]+$/.test(s)) throw new Error(`invalid hex: ${token}`);
  if (s.length > 8) throw new Error(`hex out of uint32 range: ${token}`);

  return u32(parseInt(s, 16));
}

function toHex(v, { pad = 2, prefix = false, upper = false } = {}) {
  const s = u32(v).toString(16).padStart(pad, "0");
  const out = upper ? s.toUpperCase() : s;
  return prefix ? `0x${out}` : out;
}

// ---------- PRNG ----------
function makeXorShift32(seed) {
  let x = u32(seed) || 0x9e3779b9;
  return () => {
    x ^= (x << 13) >>> 0;
    x ^= (x >>> 17) >>> 0;
    x ^= (x << 5) >>> 0;
    return (x >>> 0);
  };
}

// ---------- base64 (browser+node) ----------
function bytesToBase64(bytes) {
  if (typeof btoa === "function") {
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  return Buffer.from(bytes).toString("base64");
}

function base64ToBytes(b64) {
  if (typeof atob === "function") {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) & 0xff;
    return out;
  }
  return new Uint8Array(Buffer.from(b64, "base64"));
}

// ---------- seed pool ----------
export function pickSeedFromPool(pool = HEX_RAND) {
  const idx = (Math.random() * pool.length) | 0;
  return pool[idx] >>> 0;
}

// ---------- core codec (u32 array <-> base64) ----------
function encodeU32ToBase64(u32arr, seed) {
  const nextU32 = makeXorShift32(seed);

  const enc = new Uint32Array(u32arr.length);
  for (let i = 0; i < u32arr.length; i++) {
    enc[i] = (u32arr[i] ^ nextU32()) >>> 0;
  }

  const bytes = new Uint8Array(enc.buffer, enc.byteOffset, enc.byteLength);
  return bytesToBase64(bytes);
}

function decodeU32FromBase64(b64, seed) {
  const bytes = base64ToBytes(b64);
  if (bytes.byteLength % 4 !== 0) throw new Error("Invalid payload length.");

  const buf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const enc = new Uint32Array(buf);

  const nextU32 = makeXorShift32(seed);
  const out = new Uint32Array(enc.length);
  for (let i = 0; i < enc.length; i++) {
    out[i] = (enc[i] ^ nextU32()) >>> 0;
  }
  return out;
}

// ---------- public API ----------

/**
 * 송신용:
 * - HEX_RAND 중 seed 하나 랜덤 선택
 * - seed를 payload에 안 넣고, base64 문자열만 반환
 * - 내부에 MAGIC + length(u32) + data... 형태로 넣어서,
 *   수신측에서 seed 전수검사 시 "정답 seed"를 판별 가능하게 함
 */
export function makePayloadFromHex(hexTokens, pool = HEX_RAND) {
  const seed = pickSeedFromPool(pool);
  const dataU32 = Uint32Array.from(hexTokens, parseHexU32);

  // [MAGIC, length, ...data]
  const plain = new Uint32Array(2 + dataU32.length);
  plain[0] = MAGIC;
  plain[1] = dataU32.length >>> 0;
  plain.set(dataU32, 2);

  return encodeU32ToBase64(plain, seed);
}

/**
 * 수신용:
 * - base64 문자열만 받고
 * - HEX_RAND를 순회하며 복호화 시도
 * - MAGIC/length 검증 통과한 seed로 복호화 성공 처리
 * - 성공 시 hex 문자열 배열 반환
 */
export function parsePayloadToHex(b64, pool = HEX_RAND, hexOpt) {
  let lastErr;

  for (let i = 0; i < pool.length; i++) {
    const seed = pool[i] >>> 0;

    try {
      const plain = decodeU32FromBase64(b64, seed);

      // 최소 [MAGIC, length] 있어야 함
      if (plain.length < 2) continue;
      if ((plain[0] >>> 0) !== MAGIC) continue;

      const len = plain[1] >>> 0;
      if (plain.length !== 2 + len) continue; // 길이 검증

      const data = plain.subarray(2);
      return Array.from(data, (v) => toHex(v, hexOpt));
    } catch (e) {
      lastErr = e;
      // 디코딩 실패는 다음 seed로 계속
    }
  }

  // 전부 실패
  const msg =
    lastErr?.message
      ? `Decode failed for all seeds. Last error: ${lastErr.message}`
      : "Decode failed for all seeds.";
  throw new Error(msg);
}

/**
 * 필요하면 숫자(Uint32Array)로 받는 버전도 제공
 */
export function parsePayloadToU32(b64, pool = HEX_RAND) {
  let lastErr;

  for (let i = 0; i < pool.length; i++) {
    const seed = pool[i] >>> 0;

    try {
      const plain = decodeU32FromBase64(b64, seed);

      if (plain.length < 2) continue;
      if ((plain[0] >>> 0) !== MAGIC) continue;

      const len = plain[1] >>> 0;
      if (plain.length !== 2 + len) continue;

      return plain.subarray(2);
    } catch (e) {
      lastErr = e;
    }
  }

  throw new Error(
    lastErr?.message
      ? `Decode failed for all seeds. Last error: ${lastErr.message}`
      : "Decode failed for all seeds."
  );
}
