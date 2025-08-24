// file: obfTrueFalse.js (ESM)
import { encrypt } from '@/client/js/webRTC/rtcConn.js';
import throwObj from '@/client/js/module/errorHandler/throwObj';

// ──────────────────────────────────────────────────────────────────────────────
// decode 함수 (기본 export)
// - 호출 시점에 encrypt.keypair 확인
// - 규칙에 맞는 4~5자 난독 문자열 → 'true' / 'false'
const G='cks|fmw|hpr|anu|djx|goq|blv|eit'.split('|');
// const P='truefals';
const P=new TextDecoder().decode(new Uint8Array([116, 114, 117, 101, 102, 97, 108, 115])); // "truefals"
const M={};
for(let i=0;i<8;i++) for(const c of G[i]) M[c]=P[i];

export default function decodeTF(s){
  const K = encrypt?.keypair;
  if(!K) throw throwObj('errorComn', 'decrypt key error'); // 키 없으면 예외
  let r='';
  for(const ch of s) r+=M[ch];
  // if(r==='true'||r==='false') return r;
  if(
    r===new TextDecoder().decode(new Uint8Array([116, 114, 117, 101]))|| // "true"
    r===new TextDecoder().decode(new Uint8Array([102, 97, 108, 115, 101])) // "false"
  ) return r;
  throw new Error('invalid obfuscated input');
};

// ──────────────────────────────────────────────────────────────────────────────
// 난독화(암호화) 버전 (키 기반 의사난수 선택) — 규칙 준수: 각 평문 문자당 3가지 중 하나 택일
// - 'true' 또는 'false'만 입력 허용
// - 키를 해시해 LCG 시드로 사용 → 문자마다 서로 다른 치환 선택
export function encodeTF(plain){
  const K = encrypt?.keypair;
  if(!K) throw throwObj('errorComn', 'encrypt key error');

  const H = (s)=>{ // 경량 해시(djb2 변형)
    let x=5381>>>0; for(const ch of String(s)) x=((x<<5)+x ^ ch.charCodeAt(0))>>>0; return x||1;
  };
  let x=H(K);

  const S={ t:'cks', r:'fmw', u:'hpr', e:'anu', f:'djx', a:'goq', l:'blv', s:'eit' };
  const p=String(plain);
  if(p!=='true' && p!=='false') throw Error('only "true"/"false" allowed');

  let out='';
  for(const ch of p){
    x=(1664525*x + 1013904223)>>>0;   // LCG
    const bag=S[ch];
    out+=bag[x%3];
  }
  return out;
}

// ──────────────────────────────────────────────────────────────────────────────
// 참고용(가독성) 복호화 함수
export function decodeTF_readable(obf){
  if(!encrypt?.keypair) throw new Error('missing keypair');
  const groups = {
    c:'t', k:'t', s:'t',
    f:'r', m:'r', w:'r',
    h:'u', p:'u', r:'u',
    a:'e', n:'e', u:'e',
    d:'f', j:'f', x:'f',
    g:'a', o:'a', q:'a',
    b:'l', l:'l', v:'l',
    e:'s', i:'s', t:'s',
  };
  const res = [...obf].map(ch=>groups[ch]).join('');
  if(res==='true' || res==='false') return res;
  throw throwObj('errorComn', 'invalid obfuscated input');
}

/* 사용 예시
import decodeTF, { encodeTF, decodeTF_readable } from './obfTrueFalse.js';

decodeTF('smra');   // 'true'
decodeTF('joben');  // 'false'

encodeTF('true');  // 규칙에 맞는 4글자 난독 문자열
encodeTF('false'); // 규칙에 맞는 5글자 난독 문자열

// 테스트(가독성 버전)
decodeTF_readable('smra');  // 'true'
decodeTF_readable('joben'); // 'false'
*/
