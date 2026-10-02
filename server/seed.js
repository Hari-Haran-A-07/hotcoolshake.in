import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Category } from './models/Category.js';
import { Product } from './models/Product.js';
import { Flavor } from './models/Flavor.js';
import { Bottle } from './models/Bottle.js';
import { Location } from './models/Location.js';
import { Review } from './models/Review.js';
import { CustomCoffee } from './models/CustomCoffee.js';
import { Order } from './models/Order.js';
import { connectDB } from './config/db.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log('[Seed]: Clearing existing collections...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Flavor.deleteMany({});
    await Bottle.deleteMany({});
    await Location.deleteMany({});
    await Review.deleteMany({});
    await CustomCoffee.deleteMany({});
    await Order.deleteMany({});

    console.log('[Seed]: Seeding Users...');
    const adminUser = await User.create({
      name: 'HOT COOL SHAKE Director',
      email: 'admin@hotcoolshake.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1 (800) 468-2665',
      defaultAddress: {
        street: '450 Innovation Way, Suite 100',
        city: 'New York',
        postalCode: '10012',
        country: 'USA',
      },
    });

    const demoUser = await User.create({
      name: 'Sophia Laurent',
      email: 'sophia@example.com',
      password: 'user123',
      role: 'user',
      phone: '+1 (555) 321-9876',
      defaultAddress: {
        street: '72 Artisan Boulevard',
        city: 'London',
        postalCode: 'W1K 7AA',
        country: 'UK',
      },
    });

    console.log('[Seed]: Seeding Categories...');
    const categoriesData = [
      { name: 'Hot Coffee', slug: 'hot-coffee', description: 'Thermal-extracted specialty roasts with pure aromatic depth.', order: 1 },
      { name: 'Cool Coffee', slug: 'cool-coffee', description: 'Cryogenic cold-brewed and flash-chilled single origins.', order: 2 },
      { name: 'Shakes', slug: 'shakes', description: 'Vortex-blended velvet coffee shakes with rich organic bases.', order: 3 },
      { name: 'Signature Drinks', slug: 'signature-drinks', description: 'Award-winning molecular coffee and botanical infusions.', order: 4 },
      { name: 'Seasonal', slug: 'seasonal', description: 'Limited-edition seasonal roasts and rare harvest micro-lots.', order: 5 },
      { name: 'Desserts', slug: 'desserts', description: 'Artisan espresso-infused pastries and patisserie.', order: 6 },
      { name: 'Food', slug: 'food', description: 'Sourdough tartines, brioche melts and wholesome pairings.', order: 7 },
    ];
    const createdCategories = await Category.insertMany(categoriesData);
    const catMap = {};
    createdCategories.forEach((c) => { catMap[c.slug] = c._id; });

    console.log('[Seed]: Seeding Bottles...');
    const bottlesData = [
      {
        name: 'Classic Glass Lab',
        code: 'CLASSIC',
        capacity: '450ml',
        material: 'Borosilicate Hand-blown Glass with Walnut Ring',
        thermalRetention: 'Hot 6h / Cold 12h',
        price: 7.50,
        description: 'Crystal-clear laboratory silhouette showcasing layered coffee colors and natural viscosity.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
        badge: 'Timeless Minimalist',
      },
      {
        name: 'Signature Thermal Vessel',
        code: 'SIGNATURE',
        capacity: '500ml',
        material: 'Triple-Layer Vacuum Insulated 18/8 Steel',
        thermalRetention: 'Hot 12h / Cold 24h',
        price: 9.50,
        description: 'Our iconic matte espresso finish with laser-etched Triple-Wave emblem and precision spout.',
        image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
        badge: 'Most Popular',
      },
      {
        name: 'Obsidian Premium Flask',
        code: 'PREMIUM',
        capacity: '550ml',
        material: 'Aerospace Grade Titanium-Coated Alloy',
        thermalRetention: 'Hot 18h / Cold 36h',
        price: 14.00,
        description: 'The pinnacle of temperature retention with real-time internal digital temperature telemetry.',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
        badge: 'Masterpiece',
      },
      {
        name: 'Cryo Chill Hydro',
        code: 'CHILL',
        capacity: '600ml',
        material: 'Copper Core Double Wall with Frost-Grip Silicone',
        thermalRetention: 'Cold 32h / Ice-Locked',
        price: 11.00,
        description: 'Engineered specifically for sub-zero nitro cold brews with built-in ice retention mesh.',
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
        badge: 'Sub-Zero Specialist',
      },
      {
        name: 'Aero Sport Flask',
        code: 'SPORT',
        capacity: '750ml',
        material: 'Ultra-lightweight Impact Resilient Polymer & Steel',
        thermalRetention: 'Hot 10h / Cold 20h',
        price: 10.00,
        description: 'High capacity magnetic lock cap designed for active international movement and training.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
        badge: 'High Endurance',
      },
    ];
    await Bottle.insertMany(bottlesData);

    console.log('[Seed]: Seeding Flavors...');
    const flavorsData = [
      { name: 'Signature Espresso', code: 'ESPRESSO', category: 'ROAST', colorHex: '#2A1B16', description: 'Deep dark roast with roasted walnut and dark cocoa notes.' },
      { name: 'Madagascar Vanilla Bean', code: 'VANILLA', category: 'SWEET', colorHex: '#F4E8D1', description: 'Smooth, aromatic floral vanilla orchid essence.' },
      { name: 'Smoked Sea Salt Caramel', code: 'CARAMEL', category: 'SWEET', colorHex: '#C68B59', description: 'Rich caramelized raw sugar with Brittany sea salt.' },
      { name: 'Belgian Dark Mocha', code: 'MOCHA', category: 'INDULGENT', colorHex: '#3C2A21', description: '72% single-estate dark chocolate melted into espresso.' },
      { name: 'Roasted Piedmont Hazelnut', code: 'HAZELNUT', category: 'NUTTY', colorHex: '#A26744', description: 'Toasted Italian hazelnuts with smooth praline finish.' },
      { name: 'Toasted Coconut Cream', code: 'COCONUT', category: 'NUTTY', colorHex: '#EEDCC6', description: 'Creamy cold-pressed coconut milk with toasted flakes.' },
      { name: 'California Marzipan Almond', code: 'ALMOND', category: 'NUTTY', colorHex: '#D7C4B7', description: 'Delicate nutty aroma with subtle sweetness.' },
      { name: 'Bronte Sicilian Pistachio', code: 'PISTACHIO', category: 'SPECIALTY', colorHex: '#A3B18A', description: 'Rare Sicilian pistachio butter folded into velvet crema.' },
      { name: 'Artisan Cocoa Truffle', code: 'CHOCOLATE', category: 'INDULGENT', colorHex: '#2A1B16', description: 'Dense velvety Dutch cocoa with fudge undertones.' },
      { name: 'Vintage Irish Cream', code: 'IRISH_CREAM', category: 'SPECIALTY', colorHex: '#DDB892', description: 'Non-alcoholic oak-aged cream and subtle malt essence.' },
      { name: 'Wild Alpine Cool Mint', code: 'MINT', category: 'SPECIALTY', colorHex: '#84A98C', description: 'Crisp mountain peppermint that amplifies cool coffee.' },
      { name: 'Ceylon Cinnamon Bark', code: 'CINNAMON', category: 'SPICED', colorHex: '#9C6644', description: 'Warm organic Ceylon sweet spice and subtle clove.' },
      { name: 'Quebec Amber Maple', code: 'MAPLE', category: 'SWEET', colorHex: '#B07D62', description: 'Pure Grade-A maple syrup harvested from Canadian forests.' },
      { name: 'Ethiopian Yirgacheffe Black', code: 'CLASSIC_BLACK', category: 'ROAST', colorHex: '#2A1B16', description: 'Unadulterated single-origin with bergamot and jasmine.' },
      { name: 'Triple-Wave Signature Blend', code: 'SIGNATURE_BLEND', category: 'ROAST', colorHex: '#3C2A21', description: 'Our master blend of Colombian, Ethiopian and Sumatran beans.' },
    ];
    await Flavor.insertMany(flavorsData);

    console.log('[Seed]: Seeding Products...');
    const productsData = [
      // Hot Coffee
      {
        name: 'Obsidian Velvet Cortado',
        slug: 'obsidian-velvet-cortado',
        category: catMap['hot-coffee'],
        categorySlug: 'hot-coffee',
        description: 'Equal parts extracted ristretto and micro-textured steam milk in our signature thermal vessel.',
        story: 'Sourced from high-altitude volcanic soils in Antigua, Guatemala, roasted at 218°C.',
        price: 5.75,
        temperature: 'HOT',
        flavorNotes: ['Dark Cocoa', 'Toasted Almond', 'Golden Honey'],
        ingredients: ['Double Ristretto', 'Steamed Oat Velvet', 'Raw Turbinado'],
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
        featured: true,
        badge: 'Barista Choice',
        rating: 4.95,
        reviewsCount: 340,
      },
      {
        name: 'Smoked Caramel Flat White',
        slug: 'smoked-caramel-flat-white',
        category: catMap['hot-coffee'],
        categorySlug: 'hot-coffee',
        description: 'Precision 68°C micro-foam poured over twin espresso shots infused with slow-simmered dark caramel.',
        story: 'A tribute to Melbourne coffee craftsmanship with our proprietary butterscotch reduction.',
        price: 6.25,
        temperature: 'HOT',
        flavorNotes: ['Brown Butter', 'Sea Salt', 'Dense Crema'],
        ingredients: ['Twin Espresso', 'Whole Milk Micro-foam', 'Smoked Caramel'],
        image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop',
        featured: true,
        badge: 'Best Seller',
        rating: 4.98,
        reviewsCount: 520,
      },
      {
        name: 'Madagascar Vanilla Bean Latte',
        slug: 'madagascar-vanilla-bean-latte',
        category: catMap['hot-coffee'],
        categorySlug: 'hot-coffee',
        description: 'Freshly scraped bourbon vanilla bean caviar infused into gently steamed milk and blonde espresso.',
        story: 'Directly sourced vanilla pods from the SAVA region of Madagascar.',
        price: 6.50,
        temperature: 'HOT',
        flavorNotes: ['Floral Vanilla', 'Caramelized Cane', 'Silky Milk'],
        ingredients: ['Blonde Espresso', 'Organic Milk', 'Bourbon Vanilla Bean Extract'],
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
        featured: false,
        badge: 'Classic Luxe',
        rating: 4.88,
        reviewsCount: 215,
      },
      {
        name: 'Cinnamon Bark Espresso Macchiato',
        slug: 'cinnamon-bark-espresso-macchiato',
        category: catMap['hot-coffee'],
        categorySlug: 'hot-coffee',
        description: 'Intense espresso marked with a dollop of cinnamon-dusted dense milk foam.',
        story: 'Hand-ground Ceylon cinnamon quills steeped with Ethiopian beans.',
        price: 4.90,
        temperature: 'HOT',
        flavorNotes: ['Ceylon Spice', 'Molasses', 'Bright Citrus'],
        ingredients: ['Espresso', 'Micro Foam', 'Ceylon Cinnamon'],
        image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
        featured: false,
        badge: '',
        rating: 4.82,
        reviewsCount: 140,
      },

      // Cool Coffee
      {
        name: 'Sub-Zero Nitro Cold Brew',
        slug: 'sub-zero-nitro-cold-brew',
        category: catMap['cool-coffee'],
        categorySlug: 'cool-coffee',
        description: 'Steeped for 24 hours at 02°C and infused with high-pressure nitrogen for a cascading Guinness-like head.',
        story: 'Zero sugar, 100% natural sweetness pulled from slow cold extraction.',
        price: 6.75,
        temperature: 'COOL',
        flavorNotes: ['Sweet Chocolate', 'Stone Fruit', 'Creamy Head'],
        ingredients: ['Nitro Cold Brew Concentrate', 'Filtered Spring Water'],
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
        featured: true,
        badge: 'Signature Cool',
        rating: 4.99,
        reviewsCount: 680,
      },
      {
        name: 'Glacier Pistachio Iced Cloud',
        slug: 'glacier-pistachio-iced-cloud',
        category: catMap['cool-coffee'],
        categorySlug: 'cool-coffee',
        description: 'Cold espresso over crystal clear ice, topped with thick salted pistachio cream foam.',
        story: 'Inspired by Mediterranean afternoons, blending Bronte pistachios with chilled espresso.',
        price: 7.25,
        temperature: 'COOL',
        flavorNotes: ['Nutty Pistachio', 'Himalayan Salt', 'Chilled Roast'],
        ingredients: ['Iced Espresso', 'Pistachio Cold Foam', 'Oat Milk', 'Pistachio Crumb'],
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
        featured: true,
        badge: 'Award Winner',
        rating: 4.96,
        reviewsCount: 490,
      },
      {
        name: 'Kyoto Drip Amber Cold Brew',
        slug: 'kyoto-drip-amber-cold-brew',
        category: catMap['cool-coffee'],
        categorySlug: 'cool-coffee',
        description: 'Slow single-drop gravity brewed over 12 hours through Japanese glass towers.',
        story: 'Extreme clarity and floral tea-like clarity without bitterness.',
        price: 7.50,
        temperature: 'COOL',
        flavorNotes: ['Jasmine Blossom', 'Earl Grey', 'Black Cherry'],
        ingredients: ['Single-Origin Geisha Cold Drip'],
        image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=800&auto=format&fit=crop',
        featured: false,
        badge: 'Reserve Lot',
        rating: 4.91,
        reviewsCount: 190,
      },

      // Shakes
      {
        name: 'Triple-Wave Espresso Velvet Shake',
        slug: 'triple-wave-espresso-velvet-shake',
        category: catMap['shakes'],
        categorySlug: 'shakes',
        description: 'Vortex-blended espresso, Madagascar gelato, dark cocoa nibs and our secret cream base.',
        story: 'The flagship blended masterpiece that captures the essence of SHAKE.',
        price: 7.95,
        temperature: 'SHAKE',
        flavorNotes: ['Espresso Gelato', 'Crunchy Nibs', 'Heavy Cream'],
        ingredients: ['Double Shot Espresso', 'Artisan Gelato', 'Cocoa Nibs', 'Whipped Cream'],
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop',
        featured: true,
        badge: 'Flagship Shake',
        rating: 4.98,
        reviewsCount: 820,
      },
      {
        name: 'Hazelnut Praline Vortex Shake',
        slug: 'hazelnut-praline-vortex-shake',
        category: catMap['shakes'],
        categorySlug: 'shakes',
        description: 'Caramelized roasted hazelnut praline blended with cold espresso and oat milk cream.',
        story: 'Crisp caramelized nuts blended into ultra-smooth frosty coffee.',
        price: 7.80,
        temperature: 'SHAKE',
        flavorNotes: ['Roasted Hazelnut', 'Toffee Crunch', 'Silk Milk'],
        ingredients: ['Espresso', 'Hazelnut Praline Butter', 'Oat Cream', 'Caramel Glaze'],
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800&auto=format&fit=crop',
        featured: false,
        badge: '',
        rating: 4.89,
        reviewsCount: 310,
      },

      // Signature Drinks
      {
        name: 'Golden Saffron Honey Latte (Dual-Serve)',
        slug: 'golden-saffron-honey-latte',
        category: catMap['signature-drinks'],
        categorySlug: 'signature-drinks',
        description: 'Kashmiri organic saffron threads bloomed in raw acacia honey, infused into silky microfoam and espresso.',
        story: 'Served either steaming hot or over frozen saffron crystal ice spheres.',
        price: 8.50,
        temperature: 'DUAL_SERVE',
        flavorNotes: ['Kashmiri Saffron', 'Wildflower Honey', 'Cardamom Pod'],
        ingredients: ['Single Origin Espresso', 'Steamed Milk / Cold Milk', 'Bloomed Saffron', 'Acacia Honey'],
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop',
        featured: true,
        badge: 'Luxury Alchemy',
        rating: 4.97,
        reviewsCount: 410,
      },
      {
        name: 'Botanical Cardamom Tonic Espresso',
        slug: 'botanical-cardamom-tonic-espresso',
        category: catMap['signature-drinks'],
        categorySlug: 'signature-drinks',
        description: 'Sparkling artisanal cinchona tonic water layered with fresh hot espresso and bruised cardamom.',
        story: 'A refreshingly crisp, effervescent aperitif coffee.',
        price: 6.90,
        temperature: 'COOL',
        flavorNotes: ['Cinchona Bark', 'Green Cardamom', 'Crisp Citrus'],
        ingredients: ['Double Espresso', 'Botanical Tonic', 'Lime Zest', 'Cardamom'],
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
        featured: false,
        badge: 'Effervescent',
        rating: 4.85,
        reviewsCount: 175,
      },

      // Seasonal
      {
        name: 'Autumn Spiced Maple Cloud Cold Brew',
        slug: 'autumn-spiced-maple-cloud',
        category: catMap['seasonal'],
        categorySlug: 'seasonal',
        description: 'Small-batch cold brew crowned with organic Quebec maple cold foam and freshly grated nutmeg.',
        story: 'Harvest micro-lot coffee paired with wood-fired pure maple syrup.',
        price: 7.20,
        temperature: 'COOL',
        flavorNotes: ['Amber Maple', 'Fresh Nutmeg', 'Brown Sugar'],
        ingredients: ['Cold Brew', 'Maple Sweet Foam', 'Nutmeg', 'Cinnamon'],
        image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
        featured: false,
        badge: 'Limited Harvest',
        rating: 4.92,
        reviewsCount: 260,
      },

      // Desserts & Food
      {
        name: 'Tiramisu Crema Brioche',
        slug: 'tiramisu-crema-brioche',
        category: catMap['desserts'],
        categorySlug: 'desserts',
        description: 'All-butter French brioche soaked in espresso marsala syrup and filled with whipped mascarpone.',
        story: 'Baked fresh every morning in our flagship roastery kitchens.',
        price: 5.95,
        temperature: 'COOL',
        flavorNotes: ['Whipped Mascarpone', 'Dark Cocoa', 'Buttery Brioche'],
        ingredients: ['French Brioche', 'Mascarpone', 'Espresso Extract', 'Valrhona Cocoa'],
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop',
        featured: true,
        badge: 'Chef Special',
        rating: 4.94,
        reviewsCount: 380,
      },
      {
        name: 'Artisan Avocado & Dukkah Sourdough Tartine',
        slug: 'avocado-dukkah-sourdough-tartine',
        category: catMap['food'],
        categorySlug: 'food',
        description: 'Organic 36-hour fermented sourdough with smashed Hass avocado, Egyptian dukkah, and chili flakes.',
        story: 'The ultimate savory breakfast pairing for single-origin espresso.',
        price: 8.50,
        temperature: 'HOT',
        flavorNotes: ['Toasted Sesame', 'Creamy Avocado', 'Tangy Sourdough'],
        ingredients: ['Sourdough', 'Hass Avocado', 'Egyptian Dukkah', 'EVOO', 'Maldon Salt'],
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
        featured: false,
        badge: 'Organic',
        rating: 4.88,
        reviewsCount: 220,
      }
    ];
    await Product.insertMany(productsData);

    console.log('[Seed]: Seeding International Flagship Locations...');
    const locationsData = [
      {
        name: 'BKC Innovation Lab & Roastery',
        city: 'Mumbai',
        country: 'India',
        region: 'ASIA',
        address: 'One BKC, G Block, Bandra Kurla Complex',
        timezone: 'Asia/Kolkata',
        coordinates: { lat: 19.0657, lng: 72.8687 },
        features: ['Automated Temperature Chambers', 'Custom Bottle Bar', 'Sensory Cupping Lab', 'EV Delivery Fleet'],
        labCapacity: '150 Automated Custom Units',
        openingHours: '06:00 AM - 12:00 AM IST',
        phone: '+91 22 6888 4000',
        isFlagship: true,
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
      },
      {
        name: 'Marina Bay Sands Reserve Lab',
        city: 'Singapore',
        country: 'Singapore',
        region: 'ASIA',
        address: '10 Bayfront Avenue, Marina Bay Sands',
        timezone: 'Asia/Singapore',
        coordinates: { lat: 1.2838, lng: 103.8591 },
        features: ['Cryogenic Cold Hub', 'Interactive Screen Bar', 'Waterfront Terrace'],
        labCapacity: '120 Automated Custom Units',
        openingHours: '07:00 AM - 11:30 PM SGT',
        phone: '+65 6688 8868',
        isFlagship: true,
        image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=800&auto=format&fit=crop',
      },
      {
        name: 'Downtown Boulevard Flagship',
        city: 'Dubai',
        country: 'UAE',
        region: 'MIDDLE_EAST',
        address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
        timezone: 'Asia/Dubai',
        coordinates: { lat: 25.1972, lng: 55.2744 },
        features: ['Gold Saffron Roastery', 'Sub-Zero Cryo Chamber', 'VIP Concierge Lounge'],
        labCapacity: '200 Automated Custom Units',
        openingHours: '07:00 AM - 01:00 AM GST',
        phone: '+971 4 362 7500',
        isFlagship: true,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
      },
      {
        name: 'Mayfair Heritage Innovation Hub',
        city: 'London',
        country: 'United Kingdom',
        region: 'EUROPE',
        address: '14 Berkeley Square, Mayfair, London',
        timezone: 'Europe/London',
        coordinates: { lat: 51.5090, lng: -0.1450 },
        features: ['Heritage Micro-Roaster', 'Botanical Pairing Bar', 'Artisan Bakery'],
        labCapacity: '110 Automated Custom Units',
        openingHours: '06:30 AM - 10:30 PM GMT',
        phone: '+44 20 7946 0192',
        isFlagship: true,
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
      },
      {
        name: 'SoHo Concept Roastery Lab',
        city: 'New York',
        country: 'United States',
        region: 'NORTH_AMERICA',
        address: '472 Broome St, SoHo, New York, NY',
        timezone: 'America/New_York',
        coordinates: { lat: 40.7223, lng: -74.0003 },
        features: ['Experimental Flavor Wall', 'Direct Farmer Traceability Screen', 'Rapid Nitro Tap'],
        labCapacity: '160 Automated Custom Units',
        openingHours: '06:00 AM - 11:00 PM EST',
        phone: '+1 212 555 0199',
        isFlagship: true,
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
      },
      {
        name: 'Shibuya Crossing Modern Lab',
        city: 'Tokyo',
        country: 'Japan',
        region: 'ASIA',
        address: '1-22-8 Jinnan, Shibuya-ku, Tokyo',
        timezone: 'Asia/Tokyo',
        coordinates: { lat: 35.6595, lng: 139.7004 },
        features: ['Kyoto Drip Glass Towers', 'Robotic Precision Thermal Lock', 'Matcha & Espresso Bar'],
        labCapacity: '180 Automated Custom Units',
        openingHours: '06:30 AM - 11:30 PM JST',
        phone: '+81 3 5456 8000',
        isFlagship: true,
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
      },
      {
        name: 'Harbour Foreshore Reserve',
        city: 'Sydney',
        country: 'Australia',
        region: 'OCEANIA',
        address: 'Circular Quay East, Sydney NSW',
        timezone: 'Australia/Sydney',
        coordinates: { lat: -33.8568, lng: 151.2153 },
        features: ['Sub-Zero Cold Foam Deck', 'Single-Origin Flight Lounge', 'Sustainable Solar Powered'],
        labCapacity: '130 Automated Custom Units',
        openingHours: '06:00 AM - 09:30 PM AEST',
        phone: '+61 2 9251 0122',
        isFlagship: true,
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop',
      },
    ];
    await Location.insertMany(locationsData);

    console.log('[Seed]: Seeding Customer Reviews...');
    const reviewsData = [
      {
        authorName: 'Elena Rostova',
        role: 'Architect & Coffee Connoisseur',
        city: 'London',
        rating: 5,
        comment: 'The "Make Your Coffee" virtual laboratory is unlike anything in the global coffee space. Being able to choose the exact bottle, calibrate Madagascar vanilla with dark espresso, and have it chilled to 04°C is sheer perfection.',
        favoriteCreation: 'Signature Bottle + Vanilla Caramel Cool (04°C)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      },
      {
        authorName: 'Marcus Sterling',
        role: 'Creative Director',
        city: 'New York',
        rating: 5,
        comment: 'HOT COOL SHAKE has completely disrupted the stale coffee house model. The temperature retention of their obsidian vessels is incredible, and the live status tracking with thermal telemetry gives absolute trust.',
        favoriteCreation: 'Obsidian Flask + Hazelnut Mocha Hot (68°C)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      },
      {
        authorName: 'Aarav Patel',
        role: 'Tech Entrepreneur',
        city: 'Mumbai',
        rating: 5,
        comment: 'The Nitro Cold Brew in their Cryo Chill bottle stayed frosty throughout a 4-hour flight. Seamless digital experience and unmatched bean quality.',
        favoriteCreation: 'Cryo Chill Hydro + Pistachio Nitro Shake',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
      },
    ];
    await Review.insertMany(reviewsData);

    console.log('[Seed]: Seeding Initial Custom Coffee Lab Creation...');
    const customCoffeeSample = await CustomCoffee.create({
      user: demoUser._id,
      creatorName: 'Sophia Laurent',
      customBlendTitle: 'Velvet Vanilla Cryo Reserve',
      bottle: {
        name: 'Signature Thermal Vessel',
        capacity: '500ml',
        price: 9.50,
        image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
      },
      roastBase: 'Signature Italian Espresso Base',
      flavors: [
        { name: 'Madagascar Vanilla Bean', intensity: 'STRONG', colorHex: '#F4E8D1' },
        { name: 'Smoked Sea Salt Caramel', intensity: 'MEDIUM', colorHex: '#C68B59' },
      ],
      condition: 'COOL',
      temperature: '04°C',
      milkBase: 'Velvet Silk Oat Milk',
      sweetnessLevel: '50% Pure Maple',
      toppings: ['Cold Foam Float', 'Cocoa Dust'],
      calculatedPrice: 12.00,
      status: 'ORDERED',
    });

    console.log('[Seed]: Seeding Sample Live Order...');
    await Order.create({
      orderNumber: 'HCS-2025-01042',
      user: demoUser._id,
      customer: {
        name: 'Sophia Laurent',
        email: 'sophia@example.com',
        phone: '+44 20 7946 0192',
        address: '72 Artisan Boulevard',
        city: 'London',
        postalCode: 'W1K 7AA',
        notes: 'Please leave in thermal concierge box if away.',
      },
      items: [
        {
          itemType: 'CUSTOM_COFFEE',
          customCoffee: customCoffeeSample._id,
          name: 'Custom Velvet Vanilla Cryo Reserve',
          price: 12.00,
          quantity: 1,
          temperature: 'COOL',
          customDetails: {
            bottle: 'Signature Thermal Vessel (500ml)',
            flavors: ['Madagascar Vanilla Bean (STRONG)', 'Smoked Sea Salt Caramel (MEDIUM)'],
            condition: 'COOL (04°C)',
            milk: 'Velvet Silk Oat Milk',
            size: '500ml',
          },
        },
        {
          itemType: 'PRODUCT',
          name: 'Obsidian Velvet Cortado',
          price: 5.75,
          quantity: 2,
          temperature: 'HOT',
        },
      ],
      subtotal: 23.50,
      discount: 2.35,
      deliveryFee: 2.50,
      total: 23.65,
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      status: 'OUT_FOR_DELIVERY',
      statusTimeline: [
        { status: 'CUSTOMIZED', title: 'Lab Configuration Crafted', description: 'Your temperature, bottle & flavor alchemy finalized.', completed: true, timestamp: new Date(Date.now() - 30 * 60000) },
        { status: 'ORDER_CONFIRMED', title: 'Order Confirmed', description: 'Received at London Mayfair Flagship Lab.', completed: true, timestamp: new Date(Date.now() - 25 * 60000) },
        { status: 'PREPARING', title: 'Precision Automated Brewing', description: 'Cryogenic extraction and sub-zero lock completed.', completed: true, timestamp: new Date(Date.now() - 20 * 60000) },
        { status: 'QUALITY_CHECK', title: 'Optical & Sensor Quality Check', description: 'Viscosity 99.8% and thermal seal verified.', completed: true, timestamp: new Date(Date.now() - 15 * 60000) },
        { status: 'READY', title: 'Packaged in Thermal Lock', description: 'Insulated packaging locked at 04°C.', completed: true, timestamp: new Date(Date.now() - 10 * 60000) },
        { status: 'DISPATCHED', title: 'Dispatched from Hub', description: 'Courier Kai Vance departed Mayfair Flagship.', completed: true, timestamp: new Date(Date.now() - 5 * 60000) },
        { status: 'OUT_FOR_DELIVERY', title: 'Out For Delivery', description: 'Courier 4 mins away on Regent Street.', completed: true, timestamp: new Date() },
        { status: 'DELIVERED', title: 'Handcrafted Perfection Delivered', description: 'Enjoy your custom HOT COOL SHAKE!', completed: false },
      ],
      assignedHub: {
        name: 'Mayfair Heritage Innovation Hub',
        city: 'London',
      },
      estimatedDeliveryTime: '4 mins remaining',
      courierTracking: {
        driverName: 'Kai Vance',
        vehicleType: 'Zero-Emission Electric Shuttle',
        currentCoords: { lat: 51.5110, lng: -0.1420 },
        temperatureTelemetry: 'Maintained at strict 04.1°C Cryo-Lock',
      },
    });

    console.log('[Seed Complete]: All database collections seeded successfully with rich production data!');
  } catch (error) {
    console.error('[Seed Error]:', error);
  }
};

// If run directly via `npm run seed`
if (process.argv[1]?.endsWith('seed.js')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  })();
}
