import React, { useState } from 'react';
import { Language } from '../types';
import { t } from '../utils/i18n';
import { X, CheckCircle2, MessageSquarePlus } from 'lucide-react';

interface ReportTranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  darkMode?: boolean;
}

export const ReportTranslationModal: React.FC<ReportTranslationModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  darkMode = false,
}) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div
        className={`rounded-3xl max-w-md w-full shadow-2xl border overflow-hidden animate-in fade-in ${
          darkMode
            ? 'bg-[#121212] border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
      >
        <div className="bg-[#166534] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-[#eab308]" />
            <h3 className="font-bold text-base">{t('report_wording_title', currentLang)}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#166534] dark:text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold">
              {t('report_success', currentLang)}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              {t('report_wording_desc', currentLang)}
            </p>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-80">
                Current Language: {currentLang.toUpperCase()}
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={3}
                placeholder="e.g. In Shona/Ndebele, we usually say '...' at Mupedzanhamo or Makokoba."
                className={`w-full p-3.5 rounded-2xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#166534] ${
                  darkMode
                    ? 'bg-stone-900 border-stone-700 text-white placeholder-stone-500'
                    : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2.5 rounded-2xl border font-bold text-xs cursor-pointer ${
                  darkMode
                    ? 'border-stone-700 text-stone-300 hover:bg-stone-800'
                    : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                {t('report_submit', currentLang)}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
