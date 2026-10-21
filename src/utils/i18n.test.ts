import test from 'node:test';
import assert from 'node:assert/strict';
import { t, formatPrice, resolveSearchQuery, ZIG_PER_USD } from './i18n';

test('i18n t() returns localized string or fallbacks properly', () => {
  assert.equal(t('reserve', 'en'), 'Reserve to View');
  assert.equal(t('reserve', 'sn'), 'Ndichengetere Ndiuye Kuzoona');
  assert.equal(t('reserve', 'nd'), 'Ngibekele Ngizohlola');
  assert.equal(t('non_existent_key_xyz', 'en'), 'non_existent_key_xyz');
});

test('formatPrice formats USD and ZiG correctly', () => {
  assert.equal(formatPrice(10, 'USD'), '$10 USD');
  assert.equal(formatPrice(10.5, 'USD'), '$10.50 USD');

  const expectedZig = Math.round(10 * ZIG_PER_USD);
  assert.equal(formatPrice(10, 'ZiG'), `ZiG ${expectedZig.toLocaleString()}`);
});

test('resolveSearchQuery accurately handles Shona, Ndebele, and English synonyms', () => {
  // Shona synonyms
  assert.equal(resolveSearchQuery('mbatya dzekufamba').normalizedCategory, 'clothing');
  assert.equal(resolveSearchQuery('mabhero matsva').normalizedCategory, 'vintage');
  assert.equal(resolveSearchQuery('bhachi guru').normalizedCategory, 'jackets');

  // Ndebele synonyms
  assert.equal(resolveSearchQuery('impahla zamadoda').normalizedCategory, 'clothing');
  assert.equal(resolveSearchQuery('amabhantshi').normalizedCategory, 'jackets');
  assert.equal(resolveSearchQuery('izicathulo').normalizedCategory, 'shoes');

  // English synonyms
  assert.equal(resolveSearchQuery('vintage jacket').normalizedCategory, 'vintage');
});
