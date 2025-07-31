import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import Redis from 'ioredis';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
const HOST = process.env.JWT_HOST;
const PORT = process.env.JWT_PORT;
const allowedOrigin = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`;

const REDIS = new Redis();
const REDIS_PUB = new Redis();
const REDIS_SUB = new Redis();

app.use(express.json());
app.use(cookieParser()); // 쿠키 파싱
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);  // 허용
    } else {
      callback(new Error('CORS policy: Not allowed by server'));
    }
  },
  credentials: true  // 쿠키 허용 시 필요
}));
app.use((req, res, next) => {
  const referer = req.get('referer') || '';
  if (referer.startsWith(`${allowedOrigin}`)) {
    return next();
  }
  res.status(403).json({ message: '접근이 제한되었습니다.' });
});

// --------------------------------
// 1) 로그인 요청 프록시 & JWT 발급
// --------------------------------
app.post('/login', async (req, res) => {
  try {
    // 브라우저에서 받은 로그인 정보
    const { gameName, roomName } = req.body;

    // JWT 발급
    const token = jwt.sign(
      { gameName, roomName, role: 'user' }, // payload
      SECRET_KEY,                         // 비밀키
      { expiresIn: '1h' }                 // 1시간 유효
    );

    const cookieOptions = [
      'HttpOnly',
      'Path=/',
      'Max-Age=3600',
      process.env.NODE_ENV === 'production' ? 'Secure' : '',  // dev에서는 Secure 제외
      'SameSite=Strict'
    ].filter(Boolean).join('; ');

    // httpOnly 쿠키에 JWT 저장
    res.setHeader('Set-Cookie', `authToken=${token}; ${cookieOptions}`);

    // 응답 반환
    res.json({ message: '로그인 성공', token });
  } catch (error) {
    console.error('프록시 로그인 실패:', error);
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// --------------------------------
// 2) JWT 인증 미들웨어
// --------------------------------
function verifyJWT(req, res, next) {
  const token = req.cookies?.authToken || '';
  // if (!token) return res.status(401).json({ message: '토큰 없음' });
  if (!token) {
    // 실제론 401이지만 우회 위해 200 응답
    return res.status(200).json({
      status: 'unauthorized',
      message: '토큰이 없습니다. 로그인해주세요.',
    });
  };

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: '토큰 검증 실패' });
    req.user = decoded;
    next();
  });
};

// --------------------------------
// 3) JWT 인증이 필요한 API
// --------------------------------
app.get('/user-info', verifyJWT, (req, res) => {
  res.json({ message: '인증 성공', user: req.user });
  // * 여기서 roomName과 gameName 받음
  // roomName : req.user.roomName
  // gameName : req.user.gameName
  // *
});

// --------------------------------
// 4) JWT 만료 API
// --------------------------------
app.post('/logout', (req, res) => {
  const logoutCookieOptions = [
    'HttpOnly',
    'Path=/',
    'Max-Age=0',
    process.env.NODE_ENV === 'production' ? 'Secure' : '',
    'SameSite=Strict',
  ].filter(Boolean).join('; ');

  // authToken 쿠키를 제거
  res.setHeader('Set-Cookie', `authToken=; ${logoutCookieOptions}`);

  res.json({ message: '로그아웃 완료' });
});

app.listen(PORT, () => {
  console.log(`JWT server ${process.pid} running on port ${PORT}`);
});

// --------------------------------
// 4) REDIS COMMUNCTION
// --------------------------------
// * REDIS SUB subscribe, message
REDIS_SUB.subscribe('roomChannel', (err, count) => {
  if (err) console.error('Redis subscribe error:', err);
  else console.log(`Subscribed to roomChannel`);
});
REDIS_SUB.on('message', (channel, message) => {
  const { roomName } = JSON.parse(message);
  console.log(`JWT 서버에서 수신: roomName=${roomName}`);
  // 이후 roomName을 JWT payload에 심을 수 있음
});

// * REDIS PUB publish
/* const workerId = await REDIS.get(`SOCKET_TO_WORKER:${socketId}`);
if (workerId) {
  REDIS_PUB.publish(`webrtc_worker_${workerId}`, JSON.stringify({
    action: 'resumeConnection',
    socketId
  }));
}; */
