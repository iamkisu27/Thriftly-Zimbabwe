import React, { useState } from 'react';
import { ThriftItem, Language, Currency } from '../types';
import { formatPrice, t } from '../utils/i18n';
import { X, Calendar, Clock, ShieldCheck, Check, MapPin } from 'lucide-react';

interface ReserveModalProps {
  item: ThriftItem | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  currency: Currency;
  darkMode?: boolean;
  onConfirmReserve: (data: {
    slot: string;
    includeDeposit: boolean;
    paymentMethod: 'deposit_only' | 'cash_on_pickup';
  }) => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({
  item,
  isOpen,
  onClose,
  currentLang,
  currency,
  darkMode = false,
  onConfirmReserve,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('slot_today_afternoon');
  const [includeDeposit, setIncludeDeposit] = useState(false);

  if (!isOpen || !item) return null;

  const displayTitle = (item.titleTranslations && item.titleTranslations[currentLang]) || item.title;

  const SLOTS = [
    { id: 'slot_today_afternoon', label: t('slot_today_afternoon', currentLang) },
    { id: 'slot_today_late', label: t('slot_today_late', currentLang) },
    { id: 'slot_tomorrow_morning', label: t('slot_tomorrow_morning', currentLang) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmReserve({
      slot: SLOTS.find((s) => s.id === selectedSlot)?.label || 'Today 2:30 PM',
      includeDeposit,
      paymentMethod: includeDeposit ? 'deposit_only' : 'cash_on_pickup',
    });
  };

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
            <h3 className="font-bold text-lg">{t('reserve_title', currentLang)}</h3>
            <p className="text-emerald-100 text-xs mt-0.5">
              {t('reserve_subtitle', currentLang)}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Garment Summary */}
          <div
            className={`flex items-center gap-3 p-3 rounded-2xl border ${
              darkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <img
              src={item.images[0]}
              alt={displayTitle}
              className="w-14 h-14 rounded-xl object-cover border border-stone-200 dark:border-stone-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate">{displayTitle}</h4>
              <div className={`text-xs ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                {t('size', currentLang)}: {item.size} ·{' '}
                <span className="font-bold">{formatPrice(item.priceUsd, currency)}</span>
              </div>
              <div className="text-[11px] opacity-75 flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3 h-3 text-[#eab308] shrink-0" />
                <span>{item.marketStand}</span>
              </div>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-2 opacity-80">
              <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#eab308]" />
              {t('select_slot', currentLang)}
            </label>
            <div className="space-y-2">
              {SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'border-black bg-[#eab308] text-black font-bold shadow-xs'
                        : darkMode
                        ? 'border-stone-800 bg-[#18181b] hover:border-stone-700 text-stone-200'
                        : 'border-stone-200 hover:border-stone-400 text-stone-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-inherit" />
                      <span className="text-sm">{slot.label}</span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className={`text-[11px] mt-2 p-2.5 rounded-xl border ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-600'}`}>
              ℹ️ {t('hold_policy_notice', currentLang)}
            </p>
          </div>

          {/* Optional Refundable Deposit */}
          <div
            className={`border rounded-2xl p-3.5 ${
              darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDeposit}
                onChange={(e) => setIncludeDeposit(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#166534] rounded border-stone-300 focus:ring-[#166534]"
              />
              <div className="text-xs">
                <span className="font-bold block">
                  {t('optional_deposit_title', currentLang)}
                </span>
                <span className={`block mt-0.5 leading-relaxed ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  {t('optional_deposit_desc', currentLang)}
                </span>
              </div>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-4 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-base shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{t('confirm_reservation_btn', currentLang)}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
