import dotenv from 'dotenv';
dotenv.config();

const DefaultEnv = {
  'process.env.SOCKET_HOST': JSON.stringify(process.env.SOCKET_HOST),
  'process.env.SOCKET_PORT': JSON.stringify(process.env.SOCKET_PORT),
  'process.env.RTC_PORT': JSON.stringify(process.env.RTC_PORT),
};

export default {
  ...DefaultEnv,
};
