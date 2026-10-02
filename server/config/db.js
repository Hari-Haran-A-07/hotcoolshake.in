import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotcoolshake';
  
  try {
    // Attempt connection to provided MongoDB URI
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[MongoDB Connected]: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`[MongoDB Warning]: Could not connect to external MongoDB at ${uri}. Starting Embedded In-Memory MongoDB...`);
    try {
      mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[Embedded MongoDB Connected]: In-Memory instance running at ${memoryUri}`);
    } catch (memErr) {
      console.error('[MongoDB Fatal Error]: Failed to start in-memory database', memErr);
      process.exit(1);
    }
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.error('Error disconnecting DB:', err);
  }
};
