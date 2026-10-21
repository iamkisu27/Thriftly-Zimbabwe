import React, { useState } from 'react';
import { Language } from '../types';
import { LANGUAGES } from '../utils/i18n';
import { Check, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (prefs: { language: Language; city: 'Harare' | 'Bulawayo'; phone: string }) => void;
  onDismiss: () => void;
  darkMode?: boolean;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  onDismiss,
  darkMode = false,
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>('sn');
  const [selectedCity, setSelectedCity] = useState<'Harare' | 'Bulawayo'>('Harare');
  const [phone, setPhone] = useState('0772 148 892');
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div
        className={`rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden p-6 sm:p-7 border ${
          darkMode
            ? 'bg-[#121212] border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
      >
        {/* Top Zimbabwean Flag Strip (Green, Yellow, Red, Black) */}
        <div className="flex items-center h-2.5 w-full rounded-full overflow-hidden mb-6 shadow-xs">
          <div className="flex-1 h-full bg-[#166534]" />
          <div className="flex-1 h-full bg-[#eab308]" />
          <div className="flex-1 h-full bg-[#dc2626]" />
          <div className="flex-1 h-full bg-[#000000]" />
        </div>

        {/* Wordmark Logo with Red Dot */}
        <div className="flex items-center mb-6">
          <span className="text-3xl font-black tracking-tight">Thriftly</span>
          <span className="text-3xl font-black text-[#dc2626]">.</span>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight leading-tight">
                Choose your language
              </h2>
              <p className={`text-xs mt-1.5 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                You can change this any time in Profile or Header.
              </p>
            </div>

            {/* Language Options matching the user's uploaded designs */}
            <div className="space-y-3">
              {LANGUAGES.map((l) => {
                const isSelected = selectedLang === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setSelectedLang(l.code)}
                    className={`w-full py-3.5 px-4 rounded-2xl text-left font-bold text-base transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-[#eab308] border-black text-black shadow-sm'
                        : darkMode
                        ? 'border-stone-700 bg-[#1e1e1e] hover:border-stone-500 text-stone-200'
                        : 'border-stone-900 bg-white hover:border-stone-600 text-stone-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{l.label}</span>
                      {isSelected && <Check className="w-5 h-5 text-black stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Reminders and pickup codes also arrive by SMS and WhatsApp in this language.
            </p>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-base shadow-sm transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-black tracking-tight leading-tight">
                Select Market Cluster
              </h2>
              <p className={`text-xs mt-1.5 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Find verified market stands near you.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setSelectedCity('Harare')}
                className={`w-full p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                  selectedCity === 'Harare'
                    ? 'border-black bg-[#eab308] text-black font-bold'
                    : darkMode
                    ? 'border-stone-700 bg-[#1e1e1e] text-stone-200'
                    : 'border-stone-900 bg-white text-stone-900'
                }`}
              >
                <div className="font-bold text-base">Harare</div>
                <div className="text-xs opacity-80">Mbare Musika · Mupedzanhamo · Copacabana</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCity('Bulawayo')}
                className={`w-full p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                  selectedCity === 'Bulawayo'
                    ? 'border-black bg-[#eab308] text-black font-bold'
                    : darkMode
                    ? 'border-stone-700 bg-[#1e1e1e] text-stone-200'
                    : 'border-stone-900 bg-white text-stone-900'
                }`}
              >
                <div className="font-bold text-base">Bulawayo</div>
                <div className="text-xs opacity-80">Makokoba Market · Esgodweni · City Hall</div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onComplete({ language: selectedLang, city: selectedCity, phone })}
              className="w-full py-4 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-base shadow-sm transition cursor-pointer"
            >
              Enter Marketplace
            </button>
          </div>
        )}

        {/* Guest Mode Dismiss */}
        <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 text-center">
          <button
            onClick={onDismiss}
            className={`text-xs underline cursor-pointer ${
              darkMode ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Explore marketplace directly
          </button>
        </div>
      </div>
    </div>
  );
};
