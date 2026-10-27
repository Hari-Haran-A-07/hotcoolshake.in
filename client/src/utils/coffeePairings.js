/**
 * Coffee & Pastry Pairing Recommendation Engine
 * HOT COOL SHAKE International Coffee Experience
 */

export const PAIRING_DATABASE = [
  {
    profile: 'dark-roast',
    keywords: ['dark', 'french', 'espresso', 'smoky', 'bold', 'earthy'],
    title: 'Dark & Smoky Blends',
    recommendations: [
      { name: 'Dark Chocolate Fudge Brownie', reason: 'High cocoa fats balance intense roasted bitterness.' },
      { name: 'Sea Salt Caramel Tart', reason: 'Salt enhances espresso creaminess while caramel rounds out astringency.' },
      { name: 'Almond Biscotti', reason: 'Nutty crunch harmonizes with deep oaky aromas.' }
    ]
  },
  {
    profile: 'medium-roast',
    keywords: ['medium', 'caramel', 'smooth', 'balanced', 'milk', 'latte', 'cappuccino'],
    title: 'Balanced & Smooth Medium Roasts',
    recommendations: [
      { name: 'Warm Cinnamon Pecan Roll', reason: 'Sweet spice notes elevate caramelized roasted notes.' },
      { name: 'Butter Croissant', reason: 'Flaky French butter layers melt into smooth milk foam.' },
      { name: 'Blueberry Scone', reason: 'Subtle berry acidity lifts rich body.' }
    ]
  },
  {
    profile: 'light-roast',
    keywords: ['light', 'blonde', 'fruity', 'floral', 'citrus', 'pour-over', 'aeropress'],
    title: 'Floral & Bright Light Roasts',
    recommendations: [
      { name: 'Meyer Lemon Poppy Seed Muffin', reason: 'Bright citrus zest complements high-altitude floral acidity.' },
      { name: 'Vanilla Bean Madeleines', reason: 'Delicate sponge sweetness lets subtle jasmine and bergamot shine.' },
      { name: 'Berry Pavlova', reason: 'Airy meringue harmonizes with crisp fruit notes.' }
    ]
  },
  {
    profile: 'cold-brew',
    keywords: ['cold brew', 'nitro', 'iced', 'shake', 'frappe'],
    title: 'Cold Brew & Nitro Innovations',
    recommendations: [
      { name: 'Salted Pretzel Chocolate Cookie', reason: 'Crisp savory texture balances chilled nitrogen sweetness.' },
      { name: 'Matcha Opera Cake', reason: 'Earthy green tea layers pair gorgeously with iced microfoam.' },
      { name: 'Coffee-Glazed Cardamom Bun', reason: 'Scandinavian spice amplifies cold extraction clarity.' }
    ]
  }
];

/**
 * Find recommended food pairings based on beverage name or flavor description
 * @param {string} beverageName
 * @param {string} [notes]
 * @returns {Array<{ name: string, reason: string }>}
 */
export function getRecommendedPairings(beverageName, notes = '') {
  const query = `${beverageName || ''} ${notes || ''}`.toLowerCase();

  for (const group of PAIRING_DATABASE) {
    if (group.keywords.some((keyword) => query.includes(keyword))) {
      return group.recommendations;
    }
  }

  // Default balanced recommendation
  return PAIRING_DATABASE[1].recommendations;
}
