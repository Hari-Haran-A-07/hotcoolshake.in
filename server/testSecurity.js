import { securityHeaders, rateLimiter } from './middleware/security.js';

/**
 * HOT COOL SHAKE Security Middleware Test Suite
 */
console.log('--- EXECUTING SECURITY DEFENSE SUITE TESTS ---');

let passedTests = 0;
let totalTests = 0;

function assert(description, condition) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✓ [PASS]: ${description}`);
  } else {
    console.error(`✗ [FAIL]: ${description}`);
  }
}

// 1. Verify Security Headers Middleware
const mockReq = { headers: {}, method: 'GET', url: '/api/products' };
const setHeaders = {};
const mockRes = {
  setHeader: (key, val) => {
    setHeaders[key] = val;
  },
};
let nextCalled = false;
const mockNext = () => {
  nextCalled = true;
};

securityHeaders(mockReq, mockRes, mockNext);

assert('Next callback was called by security headers middleware', nextCalled === true);
assert('X-Content-Type-Options is nosniff', setHeaders['X-Content-Type-Options'] === 'nosniff');
assert('X-Frame-Options is SAMEORIGIN', setHeaders['X-Frame-Options'] === 'SAMEORIGIN');
assert('X-XSS-Protection is 1; mode=block', setHeaders['X-XSS-Protection'] === '1; mode=block');
assert('Referrer-Policy is strict-origin-when-cross-origin', setHeaders['Referrer-Policy'] === 'strict-origin-when-cross-origin');
assert('Permissions-Policy is defined', Boolean(setHeaders['Permissions-Policy']));

// 2. Verify Rate Limiter Structure
const limiter = rateLimiter({ max: 5, windowMs: 10000 });
assert('Rate limiter creates middleware function', typeof limiter === 'function');

console.log(`\nSecurity Suite Complete: ${passedTests}/${totalTests} tests passed.`);
if (passedTests !== totalTests) {
  process.exit(1);
}
