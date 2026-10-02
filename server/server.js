import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/api.js';
import { seedDatabase } from './seed.js';
import { Product } from './models/Product.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api', apiRoutes);

// Root Health / Brand ping
app.get('/', (req, res) => {
  res.json({
    brand: 'HOT COOL SHAKE',
    motto: 'HOT. COOL. YOUR WAY.',
    status: 'Operational',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Serve static client build in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) next();
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect DB & Start Server
const startServer = async () => {
  try {
    await connectDB();
    
    // Auto-seed if database is empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('[Server Startup]: No products found in DB. Auto-seeding initial luxury coffee catalog...');
      await seedDatabase();
    }

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`☕ HOT COOL SHAKE API SERVER IS ONLINE`);
      console.log(`☕ Port: http://localhost:${PORT}`);
      console.log(`☕ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`☕ Brand: HOT COOL SHAKE ("HOT. COOL. YOUR WAY.")`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
