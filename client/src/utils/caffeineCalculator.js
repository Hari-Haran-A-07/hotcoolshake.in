/**
 * Caffeine Intake and Daily Allowance Estimator
 * HOT COOL SHAKE International Coffee Experience
 */

// Caffeine content reference in mg per standard serving
export const CAFFEINE_REFERENCE = {
  espresso: { single: 64, double: 128 },
  coldBrew: { regular: 180, large: 240 },
  nitroColdBrew: { regular: 215, large: 285 },
  pourOver: { small: 130, regular: 165, large: 210 },
  latte: { regular: 75, large: 150 },
  cappuccino: { regular: 75, large: 150 },
  mocha: { regular: 85, large: 160 },
  matchaLatte: { regular: 70, large: 110 },
  decaf: { regular: 4, large: 8 }
};

export const FDA_DAILY_RECOMMENDED_LIMIT_MG = 400;

/**
 * Estimate caffeine level in milligrams
 * @param {string} beverageType
 * @param {'single'|'double'|'small'|'regular'|'large'} [size='regular']
 * @param {number} [extraShots=0]
 * @returns {number}
 */
export function estimateCaffeineMg(beverageType, size = 'regular', extraShots = 0) {
  const normType = String(beverageType || '').toLowerCase().replace(/[\s-_]/g, '');
  let baseMg = 80;

  if (normType.includes('nitro')) {
    baseMg = size === 'large' ? CAFFEINE_REFERENCE.nitroColdBrew.large : CAFFEINE_REFERENCE.nitroColdBrew.regular;
  } else if (normType.includes('coldbrew') || normType.includes('cold')) {
    baseMg = size === 'large' ? CAFFEINE_REFERENCE.coldBrew.large : CAFFEINE_REFERENCE.coldBrew.regular;
  } else if (normType.includes('espresso')) {
    baseMg = size === 'double' ? CAFFEINE_REFERENCE.espresso.double : CAFFEINE_REFERENCE.espresso.single;
  } else if (normType.includes('decaf')) {
    baseMg = size === 'large' ? CAFFEINE_REFERENCE.decaf.large : CAFFEINE_REFERENCE.decaf.regular;
  } else if (normType.includes('matcha')) {
    baseMg = size === 'large' ? CAFFEINE_REFERENCE.matchaLatte.large : CAFFEINE_REFERENCE.matchaLatte.regular;
  } else if (normType.includes('mocha')) {
    baseMg = size === 'large' ? CAFFEINE_REFERENCE.mocha.large : CAFFEINE_REFERENCE.mocha.regular;
  } else if (normType.includes('latte') || normType.includes('cappuccino')) {
    baseMg = size === 'large' ? CAFFEINE_REFERENCE.latte.large : CAFFEINE_REFERENCE.latte.regular;
  } else {
    baseMg = size === 'large' ? CAFFEINE_REFERENCE.pourOver.large : CAFFEINE_REFERENCE.pourOver.regular;
  }

  const extraMg = Math.max(0, extraShots) * CAFFEINE_REFERENCE.espresso.single;
  return baseMg + extraMg;
}

/**
 * Calculate percentage of FDA daily caffeine recommendation consumed
 * @param {number} currentTotalMg
 * @returns {{ percentage: number, remainingMg: number, isSafe: boolean, status: string }}
 */
export function getDailyCaffeineStatus(currentTotalMg) {
  const total = Math.max(0, currentTotalMg);
  const percentage = Math.min(200, Math.round((total / FDA_DAILY_RECOMMENDED_LIMIT_MG) * 100));
  const remainingMg = Math.max(0, FDA_DAILY_RECOMMENDED_LIMIT_MG - total);

  let status = 'Moderate';
  if (total <= 150) status = 'Low / Balanced';
  else if (total <= 300) status = 'Optimal Energy';
  else if (total <= 400) status = 'High Peak';
  else status = 'Exceeds Recommended Daily Limit';

  return {
    percentage,
    remainingMg,
    isSafe: total <= FDA_DAILY_RECOMMENDED_LIMIT_MG,
    status
  };
}
