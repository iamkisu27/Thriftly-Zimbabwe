import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generatePickupCode,
  getHoldExpiryTime,
  formatRemainingTime,
  calculateVendorReliability,
  VISIT_HOLD_MS,
  PICKUP_HOLD_MS,
} from './holds';

test('generatePickupCode returns uppercase code starting with TH-', () => {
  const code = generatePickupCode();
  assert.match(code, /^TH-\d{4}$/);
});

test('getHoldExpiryTime assigns appropriate duration per flow', () => {
  const now = 1000000;
  assert.equal(getHoldExpiryTime('reserve_to_view', now), now + VISIT_HOLD_MS);
  assert.equal(getHoldExpiryTime('pickup', now), now + PICKUP_HOLD_MS);
});

test('formatRemainingTime returns proper countdown strings', () => {
  const now = Date.now();
  const future5m = now + 5 * 60 * 1000;
  const result5m = formatRemainingTime(future5m, now);
  assert.equal(result5m.isExpired, false);
  assert.match(result5m.formatted, /5m 00s left/);

  const past = now - 1000;
  const resultPast = formatRemainingTime(past, now);
  assert.equal(resultPast.isExpired, true);
  assert.equal(resultPast.formatted, 'Expired');
});

test('calculateVendorReliability scores properly with penalties', () => {
  // Perfect score
  const perfect = calculateVendorReliability({
    completedHolds: 20,
    totalReservations: 20,
    cancelledByVendor: 0,
    soldWhileHeldCount: 0,
  });
  assert.equal(perfect, 100);

  // Score penalized for cancellation and selling while held
  const penalized = calculateVendorReliability({
    completedHolds: 8,
    totalReservations: 10,
    cancelledByVendor: 2,
    soldWhileHeldCount: 1,
  });
  // 80 - 4 - 15 = 61
  assert.equal(penalized, 61);
});
