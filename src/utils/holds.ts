export const CART_HOLD_MS = 10 * 60 * 1000; // 10 minutes
export const VISIT_HOLD_MS = 75 * 60 * 1000; // 60 min slot + 15 min grace
export const PICKUP_HOLD_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generate a distinct, easy-to-read pickup code like TH-8421
 */
export function generatePickupCode(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `TH-${digits}`;
}

/**
 * Calculate hold expiry based on type
 */
export function getHoldExpiryTime(type: 'reserve_to_view' | 'pickup' | 'delivery', baseTime = Date.now()): number {
  if (type === 'reserve_to_view') {
    return baseTime + VISIT_HOLD_MS;
  }
  if (type === 'pickup') {
    return baseTime + PICKUP_HOLD_MS;
  }
  return baseTime + CART_HOLD_MS;
}

/**
 * Format remaining time nicely in minutes or hours
 */
export function formatRemainingTime(expiresAt: number, currentTime = Date.now()): {
  formatted: string;
  isExpired: boolean;
  minutesLeft: number;
} {
  const diffMs = expiresAt - currentTime;
  if (diffMs <= 0) {
    return { formatted: 'Expired', isExpired: true, minutesLeft: 0 };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return {
      formatted: `${hours}h ${minutes}m left`,
      isExpired: false,
      minutesLeft: Math.floor(diffMs / 60000),
    };
  }

  return {
    formatted: `${minutes}m ${seconds.toString().padStart(2, '0')}s left`,
    isExpired: false,
    minutesLeft: minutes,
  };
}

/**
 * Calculate vendor reliability score based on performance metrics
 */
export function calculateVendorReliability(params: {
  completedHolds: number;
  totalReservations: number;
  cancelledByVendor: number;
  soldWhileHeldCount: number;
}): number {
  if (params.totalReservations === 0) return 95; // New vendor baseline

  const fulfillmentRate = params.completedHolds / params.totalReservations;
  const cancellationPenalty = (params.cancelledByVendor / params.totalReservations) * 20;
  const soldWhileHeldPenalty = params.soldWhileHeldCount * 15;

  let score = Math.round(fulfillmentRate * 100 - cancellationPenalty - soldWhileHeldPenalty);
  if (score < 40) score = 40;
  if (score > 100) score = 100;
  return score;
}
