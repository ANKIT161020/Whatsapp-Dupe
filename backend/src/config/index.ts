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
      // Updated MongoDB connection options for newer versions
      serverSelectionTimeoutMS: 5000,    // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000,            // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10,                   // Maintain up to 10 socket connections
      minPoolSize: 1,                    // Maintain at least 1 socket connection
      maxIdleTimeMS: 30000,              // Close connections after 30 seconds of inactivity
      
      // Remove these deprecated options:
      // bufferCommands: false,          // Deprecated - not needed
      // bufferMaxEntries: 0,            // Deprecated - this was causing the error
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