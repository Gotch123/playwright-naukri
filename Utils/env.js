require('dotenv').config();

function requireEnv(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env variable: ${key}`);
  return value;
}

const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.naukri.com/',
  USERNAME_1: requireEnv('USERNAME_1'),
  USERNAME_2: requireEnv('USERNAME_2'),
  PASSWORD: requireEnv('PASSWORD'),
  N_PASSWORD: process.env.N_PASSWORD || '',
  HEADLINE_TEXT: process.env.HEADLINE_TEXT || 'Automation Test Engineer | Playwright | JS',
};

module.exports = { ENV };