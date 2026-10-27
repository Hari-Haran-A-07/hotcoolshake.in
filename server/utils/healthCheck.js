import mongoose from 'mongoose';

/**
 * Perform server runtime and database connectivity diagnostic check
 * @returns {Promise<{
 *   status: 'healthy'|'degraded'|'unhealthy',
 *   uptimeSeconds: number,
 *   timestamp: string,
 *   memoryUsageMb: { heapUsed: number, heapTotal: number, rss: number },
 *   database: { state: string, pingLatencyMs: number | null }
 * }>}
 */
export async function getSystemHealth() {
  const memory = process.memoryUsage();
  const uptimeSeconds = Math.floor(process.uptime());

  let dbState = 'disconnected';
  let pingLatencyMs = null;

  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      dbState = 'connected';
      const start = Date.now();
      await mongoose.connection.db.admin().ping();
      pingLatencyMs = Date.now() - start;
    } else {
      dbState = mongoose.STATES[mongoose.connection.readyState] || 'disconnected';
    }
  } catch (err) {
    dbState = `error: ${err.message}`;
  }

  const isHealthy = dbState === 'connected' && (pingLatencyMs === null || pingLatencyMs < 2000);

  return {
    status: isHealthy ? 'healthy' : 'degraded',
    uptimeSeconds,
    timestamp: new Date().toISOString(),
    memoryUsageMb: {
      heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
      rss: Math.round(memory.rss / 1024 / 1024)
    },
    database: {
      state: dbState,
      pingLatencyMs
    }
  };
}
