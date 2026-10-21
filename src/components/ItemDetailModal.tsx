import React, { useState, useEffect } from 'react';
import { ThriftItem, Language, Currency } from '../types';
import { formatPrice, t } from '../utils/i18n';
import {
  X,
  MapPin,
  Calendar,
  Volume2,
  VolumeX,
  MessageCircle,
  Ruler,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ItemDetailModalProps {
  item: ThriftItem | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  currency: Currency;
  darkMode?: boolean;
  onSelectReserve: (item: ThriftItem) => void;
  onSelectPickup: (item: ThriftItem) => void;
  isHeld?: boolean;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  currentLang,
  currency,
  darkMode = false,
  onSelectReserve,
  onSelectPickup,
  isHeld,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedFulfilmentOption, setSelectedFulfilmentOption] = useState<'reserve' | 'pickup'>('reserve');

  useEffect(() => {
    setActiveImageIndex(0);
    setIsPlayingAudio(false);
  }, [item?.id]);

  const toggleVoiceNote = () => {
    if (!isPlayingAudio) {
      setIsPlayingAudio(true);
      if ('speechSynthesis' in window && item?.voiceNoteDescription) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(item.voiceNoteDescription);
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlayingAudio(false), 5000);
      }
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  if (!isOpen || !item) return null;

  const displayTitle = (item.titleTranslations && item.titleTranslations[currentLang]) || item.title;

  const conditionShort =
    item.condition === 'grade_a' ? 'Like New' : item.condition === 'grade_b' ? 'Good' : 'Fair';

  // WhatsApp pre-filled link
  const waGreeting =
    currentLang === 'sn'
      ? `Mhoro ${item.vendorName}, ndiri kufarira mbatya idzi paThriftly: ${displayTitle} (${formatPrice(item.priceUsd, 'USD')}). Muri pastendi nhasi here?`
      : currentLang === 'nd'
      ? `Salibonani ${item.vendorName}, ngithanda lezi mpahla kuThriftly: ${displayTitle} (${formatPrice(item.priceUsd, 'USD')}). Likhona esitendini namuhla?`
      : `Hello ${item.vendorName}, I saw your listing on Thriftly: ${displayTitle} (${formatPrice(item.priceUsd, 'USD')}). Are you at your stand today?`;

  const waLink = `https://wa.me/${item.vendorPhone.replace(/\D/g, '')}?text=${encodeURIComponent(waGreeting)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div
        className={`rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border ${
          darkMode
            ? 'bg-[#121212] border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
      >
        {/* Top Header */}
        <div
          className={`flex items-center justify-between px-5 py-3 border-b ${
            darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {item.marketArea} · {item.marketStand.split(',')[0]}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer ${
              darkMode ? 'bg-stone-800 hover:bg-stone-700 text-stone-200' : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Main Photo with Photo 1 of X pill */}
          <div>
            <div className="aspect-16/10 rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 relative">
              <img
                src={item.images[activeImageIndex] || item.images[0]}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-black/90 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-xs">
                  Photo {activeImageIndex + 1} of {item.images.length || 1}
                </span>
              </div>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {item.images.length > 1 && (
              <div className="flex items-center gap-2 mt-2">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#eab308] ring-2 ring-[#eab308]/40'
                        : 'border-stone-300 dark:border-stone-700 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price (matching Claude layout) */}
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight">{displayTitle}</h2>
              <div
                className={`text-xs font-semibold mt-1 ${
                  darkMode ? 'text-stone-400' : 'text-stone-600'
                }`}
              >
                Size {item.size} · Chest {item.measurements.chestOrWaist || '56 cm'} · {conditionShort} condition
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black">{formatPrice(item.priceUsd, currency)}</div>
              {currency === 'ZiG' ? (
                <div className="text-[11px] opacity-70">(${item.priceUsd} USD)</div>
              ) : (
                <div className="text-[11px] opacity-70">(~ZiG {Math.round(item.priceUsd * 27)})</div>
              )}
            </div>
          </div>

          {/* Flaw disclosure pill (exact layout from screenshot) */}
          <div
            className={`px-3 py-2 rounded-xl text-xs font-semibold ${
              darkMode
                ? 'bg-amber-950/40 text-amber-300 border border-amber-800/60'
                : 'bg-amber-100/70 text-amber-950 border border-amber-200'
            }`}
          >
            <span>Flaw:</span> {item.flaws || 'No stains or visible flaws spotted'}
          </div>

          {/* Audio Voice Note Simulator */}
          {item.voiceNoteDescription && (
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                darkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#166534] text-white flex items-center justify-center shrink-0">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Vendor Audio Description</div>
                  <div className="text-[11px] opacity-70 truncate max-w-xs">
                    "{item.voiceNoteDescription}"
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleVoiceNote}
                className="px-3 py-1.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                {isPlayingAudio ? 'Stop' : 'Play (14s)'}
              </button>
            </div>
          )}

          {/* "How do you want it?" Section (exact 3 pills from reference screenshot) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider opacity-80">
              How do you want it?
            </h4>

            {/* Option A: Pick up */}
            <button
              type="button"
              onClick={() => setSelectedFulfilmentOption('pickup')}
              className={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between ${
                selectedFulfilmentOption === 'pickup'
                  ? 'border-black bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                  : darkMode
                  ? 'border-stone-800 bg-[#161616] text-stone-400 hover:border-stone-700'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
              }`}
            >
              <span><strong>Pick up</strong> · ready in 30 min</span>
              <span className="text-xs font-medium opacity-70">Pay on collection</span>
            </button>

            {/* Option B: Reserve to view (Yellow highlight from screenshot) */}
            <button
              type="button"
              onClick={() => setSelectedFulfilmentOption('reserve')}
              className={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between ${
                selectedFulfilmentOption === 'reserve'
                  ? 'border-black bg-[#eab308] text-black shadow-sm'
                  : darkMode
                  ? 'border-stone-800 bg-[#161616] text-stone-400 hover:border-stone-700'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
              }`}
            >
              <span><strong>Reserve to view</strong> · Today 3:30 pm</span>
              <span className="text-xs font-semibold opacity-80">Touch before paying</span>
            </button>

            {/* Option C: Delivery (Dashed pilot notice from screenshot) */}
            <div
              className={`p-3.5 rounded-2xl border-2 border-dashed text-xs text-center font-medium ${
                darkMode ? 'border-stone-800 text-stone-500' : 'border-stone-300 text-stone-500'
              }`}
            >
              Delivery pilot active in Harare CBD only
            </div>
          </div>

          {/* Stand location card */}
          <div
            className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="font-bold text-sm">{item.marketStand}</div>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              {item.landmark}. Here {item.daysPresent}.
            </p>
          </div>
        </div>

        {/* Modal Footer (WhatsApp + Reserve to view buttons) */}
        <div
          className={`p-4 border-t flex items-center gap-3 ${
            darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-3.5 px-5 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
              darkMode
                ? 'border-stone-700 bg-stone-800 hover:bg-stone-700 text-stone-200'
                : 'border-stone-900 bg-white hover:bg-stone-100 text-stone-900'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-[#166534]" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              if (selectedFulfilmentOption === 'reserve') {
                onSelectReserve(item);
              } else {
                onSelectPickup(item);
              }
            }}
            disabled={isHeld}
            className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-sm transition cursor-pointer shadow-sm text-center ${
              isHeld
                ? 'bg-stone-300 dark:bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-[#166534] hover:bg-[#14532d] text-white'
            }`}
          >
            {selectedFulfilmentOption === 'reserve' ? 'Reserve to view' : 'Confirm Pick up'}
          </button>
        </div>
      </div>
    </div>
  );
};
