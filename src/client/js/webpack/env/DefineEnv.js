import dotenv from 'dotenv';

dotenv.config();

const DEVELOPMENT_DEFAULTS = Object.freeze({
  SOCKET_HOST: 'ws://127.0.0.1',
  SOCKET_PORT: '4000',
  RTC_PORT: '8083',
  CLIENT_HOST: 'http://127.0.0.1',
  CLIENT_PORT: '8081',
});

function resolveEnv(name) {
  const value = process.env[name];

  if (
    typeof value === 'string' &&
    value.trim().length > 0
  ) {
    return value.trim();
  }

  return DEVELOPMENT_DEFAULTS[name];
}

const DefaultEnv = {
  'process.env.SOCKET_HOST': JSON.stringify(
    resolveEnv('SOCKET_HOST'),
  ),
  'process.env.SOCKET_PORT': JSON.stringify(
    resolveEnv('SOCKET_PORT'),
  ),
  'process.env.RTC_PORT': JSON.stringify(
    resolveEnv('RTC_PORT'),
  ),
  'process.env.CLIENT_HOST': JSON.stringify(
    resolveEnv('CLIENT_HOST'),
  ),
  'process.env.CLIENT_PORT': JSON.stringify(
    resolveEnv('CLIENT_PORT'),
  ),
};

export default {
  ...DefaultEnv,
};
