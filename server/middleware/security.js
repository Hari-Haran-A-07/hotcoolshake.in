/**
 * Security & Rate Limiting Middleware
 * HOT COOL SHAKE API Defense Layer
 */

const ipRequestMap = new Map();

/**
 * In-memory sliding window rate limiter
 */
export const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 60 * 1000; // 1 minute default
  const max = options.max || 120; // 120 requests / min

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const now = Date.now();

    const record = ipRequestMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }

    ipRequestMap.set(ip, record);

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests from this IP, please try again after a minute.',
      });
    }

    next();
  };
};

/**
 * Standard HTTP Security Headers Middleware
 */
export const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  next();
};
