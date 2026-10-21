import React from 'react';
import { Language, Currency } from '../types';
import { LANGUAGES, t } from '../utils/i18n';
import {
  MapPin,
  Sun,
  Moon,
  Zap,
  Globe,
  DollarSign,
  Menu,
  Compass,
  ShoppingBag,
  Store,
  MessageSquare,
} from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  city: 'Harare' | 'Bulawayo';
  onToggleCity: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  lowDataMode: boolean;
  onToggleLowData: () => void;
  activeOrdersCount: number;
  activeView: 'buyer' | 'orders' | 'vendor' | 'bot';
  onChangeView: (view: 'buyer' | 'orders' | 'vendor' | 'bot') => void;
  onOpenReportWording: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  currency,
  onToggleCurrency,
  city,
  onToggleCity,
  darkMode,
  onToggleDarkMode,
  lowDataMode,
  onToggleLowData,
  activeOrdersCount,
  activeView,
  onChangeView,
  onOpenReportWording,
}) => {
  return (
    <header
      className={`border-b sticky top-0 z-30 transition-colors duration-200 ${
        darkMode
          ? 'bg-[#121212] border-stone-800 text-stone-100'
          : 'bg-white border-stone-200 text-stone-900 shadow-2xs'
      }`}
    >
      {/* Top Zimbabwean Flag Ribbon */}
      <div className="flex items-center h-1.5 w-full">
        <div className="flex-1 h-full bg-[#166534]" title="Green" />
        <div className="flex-1 h-full bg-[#eab308]" title="Gold" />
        <div className="flex-1 h-full bg-[#dc2626]" title="Red" />
        <div className="flex-1 h-full bg-[#000000]" title="Black" />
      </div>

      {/* Main Top Header Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Mobile Brand / Toggle */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onChangeView('buyer')}
          >
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-black tracking-tight">Thriftly</span>
              <span className="text-xl sm:text-2xl font-black text-[#dc2626]">.</span>
            </div>
          </div>

          {/* Quick city tag */}
          <div
            onClick={onToggleCity}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer ${
              darkMode
                ? 'bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500'
                : 'bg-stone-100 border-stone-300 text-stone-700 hover:border-stone-400'
            }`}
          >
            <MapPin className="w-3 h-3 text-[#eab308]" />
            <span>{city === 'Harare' ? 'Mbare, Harare' : 'Makokoba, Bulawayo'}</span>
            <span className="text-[10px] text-amber-500 underline ml-0.5">change</span>
          </div>
        </div>

        {/* Right side controls: Light/Dark mode, Currency, Language, 3G */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              darkMode
                ? 'bg-stone-800 border-stone-700 text-amber-400 hover:bg-stone-700'
                : 'bg-stone-100 border-stone-300 text-stone-700 hover:bg-stone-200'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black border transition cursor-pointer flex items-center gap-1 ${
              currency === 'USD'
                ? 'bg-[#166534] text-white border-[#166534]'
                : 'bg-[#eab308] text-black border-[#eab308]'
            }`}
            title="Toggle between USD and ZiG currency"
          >
            <span>{currency}</span>
          </button>

          {/* Language Selector (mobile/header quick switch) */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-300 dark:border-stone-700">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => onSelectLang(l.code)}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                  currentLang === l.code
                    ? 'bg-[#eab308] text-black shadow-2xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white'
                }`}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          {/* 3G Data Saver Toggle */}
          <button
            onClick={onToggleLowData}
            className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition ${
              lowDataMode
                ? 'bg-[#166534] text-white border-[#166534]'
                : 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300'
            }`}
            title="Data saver mode for 3G networks"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>3G</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Tabs with badges */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#18181b]/70 backdrop-blur-xs px-2 py-1.5">
        <button
          onClick={() => onChangeView('buyer')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-0.5 transition ${
            activeView === 'buyer'
              ? 'bg-[#eab308] text-black shadow-xs'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px]">{t('nav_browse', currentLang)}</span>
        </button>

        <button
          onClick={() => onChangeView('orders')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-0.5 relative transition ${
            activeView === 'orders'
              ? 'bg-[#eab308] text-black shadow-xs'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-[10px]">{t('nav_orders', currentLang)}</span>
          {activeOrdersCount > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-[#dc2626] text-white text-[9px] flex items-center justify-center font-bold">
              {activeOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onChangeView('vendor')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-0.5 transition ${
            activeView === 'vendor'
              ? 'bg-[#eab308] text-black shadow-xs'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          <Store className="w-4 h-4" />
          <span className="text-[10px]">{t('nav_vendor', currentLang)}</span>
        </button>

        <button
          onClick={() => onChangeView('bot')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-0.5 transition ${
            activeView === 'bot'
              ? 'bg-[#166534] text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[10px]">WhatsApp</span>
        </button>
      </div>
    </header>
  );
};
