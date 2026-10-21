import React, { useState, useEffect } from 'react';
import { ThriftItem, Language, Currency } from '../types';
import { formatPrice, t } from '../utils/i18n';
import { formatRemainingTime } from '../utils/holds';
import { X, Clock, ShieldCheck, Wallet, Banknote, QrCode } from 'lucide-react';

interface CheckoutModalProps {
  item: ThriftItem | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  currency: Currency;
  darkMode?: boolean;
  onConfirmOrder: (paymentMethod: 'cash_on_pickup' | 'ecocash' | 'innbucks' | 'zipit') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  item,
  isOpen,
  onClose,
  currentLang,
  currency,
  darkMode = false,
  onConfirmOrder,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_pickup' | 'ecocash' | 'innbucks' | 'zipit'>('cash_on_pickup');
  const [timerDisplay, setTimerDisplay] = useState('9m 59s left');
  const expiresAt = Date.now() + 10 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = formatRemainingTime(expiresAt);
      setTimerDisplay(remaining.formatted);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen || !item) return null;

  const displayTitle = (item.titleTranslations && item.titleTranslations[currentLang]) || item.title;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div
        className={`rounded-3xl max-w-lg w-full shadow-2xl border overflow-hidden animate-in fade-in ${
          darkMode
            ? 'bg-[#121212] border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
      >
        {/* Header */}
        <div className="bg-[#166534] px-6 py-4 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{t('checkout_title', currentLang)}</h3>
            <p className="text-emerald-100 text-xs">Direct Stand Collection & Pickup Code</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hold Countdown Notice */}
        <div
          className={`px-6 py-2.5 flex items-center justify-between text-xs font-semibold border-b ${
            darkMode
              ? 'bg-amber-950/30 border-amber-900/40 text-amber-300'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#eab308] animate-spin" />
            <span>{t('hold_timer_label', currentLang)}</span>
          </div>
          <span className="font-mono bg-[#eab308] text-black px-2.5 py-0.5 rounded-full font-black">
            {timerDisplay}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Order Summary */}
          <div
            className={`flex items-center justify-between p-3.5 rounded-2xl border ${
              darkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={item.images[0]}
                alt=""
                className="w-12 h-12 rounded-xl object-cover border border-stone-200 dark:border-stone-700"
              />
              <div>
                <h4 className="font-bold text-sm truncate max-w-[200px] sm:max-w-xs">
                  {displayTitle}
                </h4>
                <div className={`text-xs ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                  {item.marketStand} · {t('size', currentLang)} {item.size}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-black">
                {formatPrice(item.priceUsd, currency)}
              </div>
              <div className="text-[11px] opacity-70">Total Price</div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
              {t('payment_method', currentLang)}
            </label>
            <div className="space-y-2">
              {/* Cash on Pickup */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition cursor-pointer ${
                  paymentMethod === 'cash_on_pickup'
                    ? 'border-black bg-[#eab308] text-black font-bold shadow-xs'
                    : darkMode
                    ? 'border-stone-800 bg-[#161616] text-stone-200'
                    : 'border-stone-200 text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="w-4 h-4 text-[#166534]" />
                  <span className="text-sm">{t('pay_cash_pickup', currentLang)}</span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cash_on_pickup'}
                  onChange={() => setPaymentMethod('cash_on_pickup')}
                  className="w-4 h-4 text-black focus:ring-black"
                />
              </label>

              {/* EcoCash */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition cursor-pointer ${
                  paymentMethod === 'ecocash'
                    ? 'border-black bg-[#eab308] text-black font-bold shadow-xs'
                    : darkMode
                    ? 'border-stone-800 bg-[#161616] text-stone-200'
                    : 'border-stone-200 text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">{t('pay_ecocash', currentLang)}</span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'ecocash'}
                  onChange={() => setPaymentMethod('ecocash')}
                  className="w-4 h-4 text-black focus:ring-black"
                />
              </label>

              {/* InnBucks */}
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition cursor-pointer ${
                  paymentMethod === 'innbucks'
                    ? 'border-black bg-[#eab308] text-black font-bold shadow-xs'
                    : darkMode
                    ? 'border-stone-800 bg-[#161616] text-stone-200'
                    : 'border-stone-200 text-stone-800 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-4 h-4 text-amber-600" />
                  <span className="text-sm">{t('pay_innbucks', currentLang)}</span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'innbucks'}
                  onChange={() => setPaymentMethod('innbucks')}
                  className="w-4 h-4 text-black focus:ring-black"
                />
              </label>
            </div>
          </div>

          <div
            className={`p-3 rounded-2xl text-xs flex items-start gap-2 border ${
              darkMode ? 'bg-stone-900 border-stone-800 text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
            <span>
              A unique 6-character pickup code will be issued. Show it to{' '}
              <strong className={darkMode ? 'text-stone-200' : 'text-stone-900'}>{item.vendorName}</strong> to collect.
            </span>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onConfirmOrder(paymentMethod)}
              className="w-full py-4 px-4 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-base shadow-md transition cursor-pointer"
            >
              {t('btn_confirm_pickup', currentLang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
