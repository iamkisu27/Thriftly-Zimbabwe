import React from 'react';
import { ThriftItem, Language, Currency } from '../types';
import { formatPrice, t } from '../utils/i18n';
import { MapPin, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface ItemCardProps {
  item: ThriftItem;
  currentLang: Language;
  currency: Currency;
  lowDataMode: boolean;
  darkMode?: boolean;
  onOpenDetail: (item: ThriftItem) => void;
  onQuickReserve: (item: ThriftItem) => void;
  isHeld?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  currentLang,
  currency,
  lowDataMode,
  darkMode = false,
  onOpenDetail,
  onQuickReserve,
  isHeld,
}) => {
  const displayTitle = (item.titleTranslations && item.titleTranslations[currentLang]) || item.title;

  const conditionShort =
    item.condition === 'grade_a' ? 'Like New' : item.condition === 'grade_b' ? 'Good' : 'Fair';

  // Seed viewing count for dynamic urgency from screenshot ("3 people viewing")
  const viewerCount = (item.title.length % 3) + 2;

  return (
    <div
      className={`rounded-3xl border overflow-hidden transition-all duration-200 flex flex-col group ${
        darkMode
          ? 'bg-[#18181b] border-stone-800 hover:border-stone-700 text-stone-100'
          : 'bg-white border-stone-200 hover:border-stone-400 text-stone-900 shadow-xs'
      }`}
    >
      {/* Photo Container */}
      <div
        className="relative aspect-4/3 bg-stone-200 dark:bg-stone-800 cursor-pointer overflow-hidden"
        onClick={() => onOpenDetail(item)}
      >
        <img
          src={lowDataMode ? item.images[0] + '&w=400' : item.images[0]}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-104 transition duration-300"
        />

        {/* Condition Tag */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs ${
              item.condition === 'grade_a'
                ? 'bg-[#166534] text-white'
                : 'bg-[#eab308] text-black'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{conditionShort}</span>
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute top-3 right-3">
          <span className="bg-black text-white font-black text-xs px-2.5 py-1 rounded-full shadow-xs">
            {formatPrice(item.priceUsd, currency)}
          </span>
        </div>

        {/* Held status overlay */}
        {isHeld && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 text-center">
            <div className="bg-white text-stone-900 rounded-2xl px-3.5 py-2 shadow-lg">
              <Clock className="w-4 h-4 text-[#eab308] mx-auto mb-1 animate-spin" />
              <div className="text-xs font-bold text-stone-950">
                {currentLang === 'sn' ? 'Yakatotambirwa' : currentLang === 'nd' ? 'Ibanjiwe' : 'Reserved at Stand'}
              </div>
              <div className="text-[10px] text-stone-600">Active hold</div>
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="cursor-pointer" onClick={() => onOpenDetail(item)}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base leading-snug truncate group-hover:text-[#eab308] transition">
              {displayTitle}
            </h3>
          </div>

          {/* Subline matching screenshots: Size · Condition · Price */}
          <div className={`text-xs mt-1 font-medium ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
            {item.size} · {conditionShort} · {formatPrice(item.priceUsd, currency)}
          </div>

          {/* Flaw disclosure banner from screenshot */}
          {item.flaws && (
            <div
              className={`mt-2 px-2.5 py-1 rounded-lg text-xs font-medium truncate ${
                darkMode
                  ? 'bg-stone-800/80 text-amber-300 border border-stone-700'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              <span className="font-bold">Flaw:</span> {item.flaws}
            </div>
          )}

          {/* Social Proof viewing count (from reference Screenshot 1 & 2) */}
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-[#dc2626] font-bold">
              {viewerCount} people viewing
            </span>
            <span className={`text-[11px] flex items-center gap-1 ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              <MapPin className="w-3 h-3 text-[#166534]" />
              <span className="truncate max-w-[120px]">{item.marketStand.split(',')[0]}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuickReserve(item)}
            disabled={isHeld}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border ${
              isHeld
                ? 'bg-stone-300 dark:bg-stone-800 text-stone-500 border-transparent cursor-not-allowed'
                : 'bg-[#eab308] hover:bg-[#ca8a04] text-black border-black/20 shadow-xs active:scale-98'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('reserve_hold', currentLang)}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDetail(item)}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
              darkMode
                ? 'border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200'
                : 'border-stone-900 hover:bg-stone-100 text-stone-900'
            }`}
          >
            Inspect
          </button>
        </div>
      </div>
    </div>
  );
};
