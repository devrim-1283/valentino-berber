/**
 * Application Configuration
 * Environment variables'ları merkezi bir yerden yönetir
 */

// Database Configuration
export const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'berber_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Application Configuration
export const appConfig = {
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  port: parseInt(process.env.PORT || process.env.NEXT_DEV_PORT || '3000', 10),
};

// Debug Configuration
export const debugConfig = {
  enabled: process.env.DEBUG === 'true' || process.env.DEBUG === '1',
  modules: process.env.DEBUG?.split(',') || [],
  logLevel: (process.env.LOG_LEVEL || 'info') as 'error' | 'warn' | 'info' | 'debug' | 'verbose',
  db: process.env.DB_DEBUG === 'true' || process.env.DB_DEBUG === '1',
  api: process.env.API_DEBUG === 'true' || process.env.API_DEBUG === '1',
};

// Security Configuration
export const securityConfig = {
  sessionSecret: process.env.SESSION_SECRET || 'default-secret-change-in-production',
  adminDefaultPassword: process.env.ADMIN_DEFAULT_PASSWORD || 'VALENTINO2024',
};

// Logger Helper
export function shouldLog(module: string, level: 'error' | 'warn' | 'info' | 'debug' | 'verbose'): boolean {
  if (!debugConfig.enabled && level !== 'error') {
    return false;
  }

  // Debug modülleri kontrol et
  if (debugConfig.modules.length > 0) {
    const moduleMatch = debugConfig.modules.some(m => {
      if (m === '*') return true;
      if (m.endsWith(':*')) {
        return module.startsWith(m.replace(':*', ''));
      }
      return module === m;
    });
    if (!moduleMatch) return false;
  }

  // Log level kontrolü
  const levels = ['error', 'warn', 'info', 'debug', 'verbose'];
  const currentLevelIndex = levels.indexOf(debugConfig.logLevel);
  const requestedLevelIndex = levels.indexOf(level);
  return requestedLevelIndex <= currentLevelIndex;
}

// Debug Logger
export function debugLog(module: string, level: 'error' | 'warn' | 'info' | 'debug' | 'verbose', message: string, ...args: any[]) {
  if (!shouldLog(module, level)) {
    return;
  }

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${module}] [${level.toUpperCase()}]`;

  switch (level) {
    case 'error':
      console.error(prefix, message, ...args);
      break;
    case 'warn':
      console.warn(prefix, message, ...args);
      break;
    case 'info':
      console.info(prefix, message, ...args);
      break;
    case 'debug':
      console.debug(prefix, message, ...args);
      break;
    case 'verbose':
      console.log(prefix, message, ...args);
      break;
  }
}

// Database Query Logger
export function dbLog(query: string, params?: any[], duration?: number) {
  if (!debugConfig.db && !debugConfig.enabled) {
    return;
  }

  const logData: any = {
    query: query.replace(/\s+/g, ' ').trim(),
  };

  if (params) {
    logData.params = params;
  }

  if (duration !== undefined) {
    logData.duration = `${duration}ms`;
  }

  debugLog('db', 'debug', 'Query executed', logData);
}

// API Request Logger
export function apiLog(method: string, path: string, status?: number, duration?: number) {
  if (!debugConfig.api && !debugConfig.enabled) {
    return;
  }

  const logData: any = {
    method,
    path,
  };

  if (status !== undefined) {
    logData.status = status;
  }

  if (duration !== undefined) {
    logData.duration = `${duration}ms`;
  }

  debugLog('api', 'debug', 'API request', logData);
}

