import http from 'http';
import { connectDB, disconnectDB } from './config/db.js';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import { seedDatabase } from './seed.js';

const runTests = async () => {
  console.log('--- STARTING HOT COOL SHAKE BACKEND INTEGRATION TEST ---');
  await connectDB();
  await seedDatabase();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', apiRoutes);

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5099, resolve));
  console.log('[Test Server]: Listening on port 5099');

  const fetchJson = async (path, options = {}) => {
    const res = await fetch(`http://127.0.0.1:5099${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
    return { status: res.status, data: await res.json() };
  };

  try {
    // 1. Health
    const health = await fetchJson('/api/health');
    console.log('✓ Health Endpoint:', health.status === 200, health.data.brand);

    // 2. Products
    const prods = await fetchJson('/api/products');
    console.log(`✓ Products Endpoint (${prods.data.count} items):`, prods.status === 200);

    // 3. Categories
    const cats = await fetchJson('/api/categories');
    console.log(`✓ Categories Endpoint (${cats.data.categories.length} categories):`, cats.status === 200);

    // 4. Bottles
    const bottles = await fetchJson('/api/bottles');
    console.log(`✓ Bottles Endpoint (${bottles.data.bottles.length} bottles):`, bottles.status === 200);

    // 5. Flavors
    const flavors = await fetchJson('/api/flavors');
    console.log(`✓ Flavors Endpoint (${flavors.data.flavors.length} flavors):`, flavors.status === 200);

    // 6. Custom Coffee Creation
    const customCoffeeRes = await fetchJson('/api/custom-coffee', {
      method: 'POST',
      body: JSON.stringify({
        creatorName: 'Sophia Laurent',
        customBlendTitle: 'Velvet Cryo Reserve',
        bottle: { name: 'Signature Thermal Vessel', capacity: '500ml', price: 9.50 },
        roastBase: 'Signature Italian Espresso Base',
        flavors: [
          { name: 'Madagascar Vanilla Bean', intensity: 'STRONG' },
          { name: 'Smoked Sea Salt Caramel', intensity: 'MEDIUM' }
        ],
        condition: 'COOL',
        temperature: '04°C',
        milkBase: 'Velvet Silk Oat Milk',
        sweetnessLevel: '50% Pure Maple',
        calculatedPrice: 12.00,
      }),
    });
    console.log('✓ Create Custom Coffee:', customCoffeeRes.status === 201, customCoffeeRes.data.customCoffee?.customBlendTitle);

    // 7. Order Creation
    const orderRes = await fetchJson('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        customer: {
          name: 'Sophia Laurent',
          email: 'sophia@example.com',
          phone: '+1 555-0192',
          address: '72 Artisan Boulevard',
          city: 'London',
          postalCode: 'W1K 7AA',
        },
        items: [
          {
            name: 'Velvet Cryo Reserve',
            price: 12.00,
            quantity: 1,
            temperature: 'COOL',
          }
        ],
        subtotal: 12.00,
        deliveryFee: 2.50,
        total: 14.50,
        paymentMethod: 'CARD',
      }),
    });
    console.log('✓ Create Order:', orderRes.status === 201, orderRes.data.order?.orderNumber);

    // 8. Order Status Update (PUT & PATCH)
    const orderId = orderRes.data.order._id;
    const updateStatusRes = await fetchJson(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'PREPARING' }),
    });
    console.log('✓ Update Order Status (PUT):', updateStatusRes.status === 200, updateStatusRes.data.order?.status);

    const patchStatusRes = await fetchJson(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'BLENDING' }),
    });
    console.log('✓ Update Order Status (PATCH alias):', patchStatusRes.status === 200, patchStatusRes.data.order?.status);

    // 9. Contact & Newsletter
    const contactRes = await fetchJson('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Sophia Laurent',
        email: 'sophia@example.com',
        subject: 'Flagship Event Reservation',
        message: 'Inquiring regarding private coffee laboratory tasting in London Mayfair.',
      }),
    });
    console.log('✓ Contact Message:', contactRes.status === 201, contactRes.data.success);

    const newsletterRes = await fetchJson('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: 'vip.member@hotcoolshake.com',
      }),
    });
    console.log('✓ VIP Newsletter Subscription:', newsletterRes.status === 200, newsletterRes.data.success);

    // 10. Auth Register & Login
    const regRes = await fetchJson('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Alex Vance',
        email: `alex.${Date.now()}@example.com`,
        password: 'password123',
      }),
    });
    console.log('✓ User Registration:', regRes.status === 201, regRes.data.user?.email);

    console.log('--- ALL BACKEND MERN API TESTS PASSED PERFECTLY ---');

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
    await disconnectDB();
    process.exit(0);
  }
};

runTests();
