import React from 'react';
import { motion } from 'motion/react';
import { Language, Currency } from '../types';
import { LANGUAGES, t } from '../utils/i18n';
import {
  Compass,
  ShoppingBag,
  Store,
  MessageSquare,
  Sun,
  Moon,
  MapPin,
  Globe,
  Zap,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

interface VerticalNavProps {
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

export const VerticalNav: React.FC<VerticalNavProps> = ({
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
  const NAV_ITEMS = [
    {
      id: 'buyer' as const,
      label: t('nav_browse', currentLang),
      sublabel: currentLang === 'sn' ? 'Tarisa Mbatya' : currentLang === 'nd' ? 'Dinga Impahla' : 'Browse Items',
      icon: Compass,
      badge: null,
    },
    {
      id: 'orders' as const,
      label: t('nav_orders', currentLang),
      sublabel: currentLang === 'sn' ? 'Zvakachengetwa' : currentLang === 'nd' ? 'Okubekelweyo' : 'Active Holds',
      icon: ShoppingBag,
      badge: activeOrdersCount > 0 ? activeOrdersCount : null,
    },
    {
      id: 'vendor' as const,
      label: t('nav_vendor', currentLang),
      sublabel: currentLang === 'sn' ? 'Dhesiki reMusika' : currentLang === 'nd' ? 'Ihhovisi leSitendi' : 'Stand Manager',
      icon: Store,
      badge: null,
    },
    {
      id: 'bot' as const,
      label: t('nav_bot_sim', currentLang),
      sublabel: 'WhatsApp Sim',
      icon: MessageSquare,
      badge: null,
    },
  ];

  return (
    <aside
      className={`w-64 shrink-0 hidden md:flex flex-col justify-between p-4 border-r transition-colors duration-200 select-none sticky top-0 h-screen overflow-y-auto ${
        darkMode
          ? 'bg-[#121212] border-stone-800 text-stone-100'
          : 'bg-white border-stone-200 text-stone-900'
      }`}
    >
      {/* Top Section: Flag Banner, Logo & Brand */}
      <div className="space-y-5">
        {/* Zimbabwean Flag Colors Ribbon (from Claude designs) */}
        <div>
          <div className="flex items-center h-2 w-full rounded-full overflow-hidden shadow-xs mb-3">
            <div className="flex-1 h-full bg-[#166534]" title="Green: Agriculture & Vegetation" />
            <div className="flex-1 h-full bg-[#eab308]" title="Yellow/Gold: Mineral Wealth" />
            <div className="flex-1 h-full bg-[#dc2626]" title="Red: Struggle & Resilience" />
            <div className="flex-1 h-full bg-[#000000]" title="Black: Majority Heritage" />
          </div>

          {/* Logo with Red Period from designs */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => onChangeView('buyer')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#166534] text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-2xl font-black tracking-tight">Thriftly</span>
                <span className="text-2xl font-black text-[#dc2626]">.</span>
              </div>
              <p className="text-[11px] font-medium opacity-70">
                Zimbabwe Local Resale
              </p>
            </div>
          </div>
        </div>

        {/* Location / Cluster Pill */}
        <div
          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
            darkMode
              ? 'bg-[#1a1a1a] border-stone-800 text-stone-300'
              : 'bg-stone-50 border-stone-200 text-stone-700'
          }`}
        >
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#eab308] shrink-0" />
            <span className="font-semibold truncate">
              {city === 'Harare' ? 'Mbare, Harare' : 'Makokoba, BYO'}
            </span>
          </div>
          <button
            onClick={onToggleCity}
            className="text-[11px] font-bold text-[#eab308] hover:underline cursor-pointer ml-1 shrink-0"
          >
            Switch
          </button>
        </div>

        {/* Navigation Items with FLUID PILL ANIMATION (motion layoutId) */}
        <nav className="space-y-1 relative" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`relative w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between transition-colors z-10 cursor-pointer ${
                  isActive
                    ? darkMode
                      ? 'text-black font-black'
                      : 'text-stone-950 font-black'
                    : darkMode
                    ? 'text-stone-400 hover:text-stone-100'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {/* Fluid Sliding Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="verticalNavActivePill"
                    className={`absolute inset-0 rounded-2xl shadow-sm -z-10 ${
                      darkMode ? 'bg-[#eab308]' : 'bg-[#eab308]'
                    }`}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110' : 'opacity-80'
                    }`}
                  />
                  <div>
                    <div className="text-sm leading-tight font-bold">{item.label}</div>
                    <div
                      className={`text-[10px] leading-tight ${
                        isActive
                          ? 'opacity-80 text-black font-semibold'
                          : 'opacity-60'
                      }`}
                    >
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {/* Badge if any */}
                {item.badge !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-black shadow-xs ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-[#dc2626] text-white animate-pulse'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Theme, Language, Currency & 3G Saver */}
      <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
        {/* Light / Dark Mode Toggle */}
        <div
          className={`p-2 rounded-xl flex items-center justify-between text-xs border ${
            darkMode
              ? 'bg-[#1a1a1a] border-stone-800'
              : 'bg-stone-50 border-stone-200'
          }`}
        >
          <span className="font-semibold flex items-center gap-1.5">
            {darkMode ? (
              <Moon className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </span>
          <button
            onClick={onToggleDarkMode}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              darkMode
                ? 'bg-stone-800 text-stone-100 hover:bg-stone-700'
                : 'bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 shadow-xs'
            }`}
          >
            {darkMode ? 'Switch Light' : 'Switch Dark'}
          </button>
        </div>

        {/* Currency Switcher */}
        <div
          className={`p-2 rounded-xl flex items-center justify-between text-xs border ${
            darkMode
              ? 'bg-[#1a1a1a] border-stone-800'
              : 'bg-stone-50 border-stone-200'
          }`}
        >
          <span className="font-semibold flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#166534]" />
            <span>Currency: <strong>{currency}</strong></span>
          </span>
          <button
            onClick={onToggleCurrency}
            className={`px-2 py-0.5 rounded text-[11px] font-bold border transition cursor-pointer ${
              currency === 'USD'
                ? 'bg-[#166534] text-white border-[#166534]'
                : 'bg-[#eab308] text-black border-[#eab308]'
            }`}
          >
            Switch {currency === 'USD' ? 'ZiG' : 'USD'}
          </button>
        </div>

        {/* Language Selection */}
        <div>
          <div className="flex items-center gap-1 text-[11px] font-bold opacity-70 mb-1.5">
            <Globe className="w-3 h-3" />
            <span>Mutauro / Language</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => onSelectLang(l.code)}
                className={`py-1 text-[11px] font-bold rounded-lg transition text-center cursor-pointer ${
                  currentLang === l.code
                    ? 'bg-[#166534] text-white shadow-xs'
                    : darkMode
                    ? 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 3G Data Saver */}
        <button
          onClick={onToggleLowData}
          className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border cursor-pointer transition ${
            lowDataMode
              ? 'bg-[#166534] text-white border-[#166534]'
              : darkMode
              ? 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
              : 'bg-stone-100 border-stone-200 text-stone-600 hover:text-stone-900'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            <span>{lowDataMode ? '3G Saver ON' : '3G Data Saver'}</span>
          </span>
          <span className="text-[10px] opacity-80">{lowDataMode ? 'Active' : 'Off'}</span>
        </button>

        {/* Report translation link */}
        <button
          onClick={onOpenReportWording}
          className="w-full text-center text-[10px] opacity-70 hover:opacity-100 hover:underline cursor-pointer pt-1"
        >
          {t('report_wording', currentLang)}
        </button>
      </div>
    </aside>
  );
};
