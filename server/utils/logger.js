/**
 * Structured JSON Logger for Production Diagnostics
 * HOT COOL SHAKE International Coffee Experience
 */

const LOG_LEVELS = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40
};

const CURRENT_LEVEL = process.env.NODE_ENV === 'production' ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG;

function formatLog(level, message, context = {}) {
  const timestamp = new Date().toISOString();
  return JSON.stringify({
    timestamp,
    level,
    message,
    ...context
  });
}

export const logger = {
  debug(message, context) {
    if (CURRENT_LEVEL <= LOG_LEVELS.DEBUG) {
      console.debug(formatLog('DEBUG', message, context));
    }
  },
  info(message, context) {
    if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
      console.log(formatLog('INFO', message, context));
    }
  },
  warn(message, context) {
    if (CURRENT_LEVEL <= LOG_LEVELS.WARN) {
      console.warn(formatLog('WARN', message, context));
    }
  },
  error(message, context) {
    if (CURRENT_LEVEL <= LOG_LEVELS.ERROR) {
      console.error(formatLog('ERROR', message, context));
    }
  }
};

export default logger;
