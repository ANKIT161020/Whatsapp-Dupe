// Centralized application configuration
// Use regular dotenv for production (Render provides env vars)
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config();
} else {
  require('dotenv-safe/config');
}

import { ConnectOptions } from 'mongoose';

interface Config {
  env: string;
  port: number;
  mongoose: {
    url: string;
    options: ConnectOptions;
  };
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoose: {
    url:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGODB_URI_TEST || ''
        : process.env.MONGODB_URI || '',
    options: {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      minPoolSize: 1,
      bufferCommands: false, // Disable mongoose buffering for production
      bufferMaxEntries: 0,   // Disable mongoose buffering for production
    } as ConnectOptions,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    accessExpirationMinutes: parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES || '30', 10),
    refreshExpirationDays: parseInt(process.env.JWT_REFRESH_EXPIRATION_DAYS || '7', 10),
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
};

export default config;