import React from 'react';
import { OrderReservation, Language, Currency } from '../types';
import { formatPrice, t } from '../utils/i18n';
import { formatRemainingTime } from '../utils/holds';
import {
  MapPin,
  Clock,
  CheckCircle2,
  QrCode,
} from 'lucide-react';

interface OrdersViewProps {
  orders: OrderReservation[];
  currentLang: Language;
  currency: Currency;
  darkMode?: boolean;
  onImHere: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onExploreMore: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  currentLang,
  currency,
  darkMode = false,
  onImHere,
  onCancelOrder,
  onExploreMore,
}) => {
  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#166534]/10 text-[#166534] flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">
          {t('no_active_orders', currentLang)}
        </h3>
        <p className={`text-sm mb-6 max-w-md mx-auto ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
          Reserve clothes near you to touch and inspect fabric at the stand, or generate a pickup code.
        </p>
        <button
          onClick={onExploreMore}
          className="py-3.5 px-6 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-sm shadow-sm transition cursor-pointer"
        >
          {t('nav_browse', currentLang)}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">
            {t('nav_orders', currentLang)}
          </h2>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
            Active stand reservations, pickup codes, and live hold timers.
          </p>
        </div>
        <button
          onClick={onExploreMore}
          className="text-xs font-bold text-[#eab308] hover:underline cursor-pointer"
        >
          + {t('nav_browse', currentLang)}
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const remaining = formatRemainingTime(order.holdExpiresAt);
          const isArrived = order.status === 'arrived';
          const isCompleted = order.status === 'completed';

          return (
            <div
              key={order.id}
              className={`rounded-3xl border overflow-hidden shadow-xs transition ${
                darkMode
                  ? 'bg-[#18181b] border-stone-800'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Top Banner with Pickup Code */}
              <div className="bg-black px-5 py-3 text-white flex flex-wrap items-center justify-between gap-2 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="bg-[#eab308] text-black font-mono font-black text-sm px-2.5 py-1 rounded-lg tracking-wider flex items-center gap-1.5 shadow-xs">
                    <QrCode className="w-4 h-4" />
                    <span>{order.code}</span>
                  </div>
                  <div>
                    <span className="text-xs text-stone-300">
                      {order.type === 'reserve_to_view'
                        ? t('mode_reserve_to_view', currentLang)
                        : t('mode_pickup', currentLang)}
                    </span>
                    {order.timeSlot && (
                      <span className="ml-2 text-xs font-semibold text-[#eab308]">
                        · {order.timeSlot}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isCompleted
                        ? 'bg-[#166534] text-white'
                        : isArrived
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-stone-800 text-[#eab308]'
                    }`}
                  >
                    {isCompleted
                      ? t('status_completed', currentLang)
                      : isArrived
                      ? t('status_arrived', currentLang)
                      : t('status_confirmed', currentLang)}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-4 md:col-span-2">
                  <img
                    src={order.itemImage}
                    alt=""
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                  />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h4 className="font-bold text-base truncate">
                      {order.itemTitle}
                    </h4>
                    <div className="text-sm font-black">
                      {formatPrice(order.itemPriceUsd, currency)}
                    </div>

                    <div
                      className={`p-2.5 rounded-2xl border text-xs space-y-1 ${
                        darkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-100'
                      }`}
                    >
                      <div className="font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#166534]" />
                        <span>{order.vendorName}</span>
                      </div>
                      <div className={`leading-snug ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                        {order.vendorLandmark}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-200 dark:border-stone-800 pt-4 md:pt-0 md:pl-6 space-y-4">
                  {/* Hold Timer */}
                  <div
                    className={`rounded-2xl p-3 text-xs border ${
                      darkMode ? 'bg-stone-900 border-stone-800 text-stone-300' : 'bg-amber-50 border-amber-200 text-amber-950'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#eab308]" />
                        <span>Hold window</span>
                      </span>
                      <span className="font-mono font-black text-[#eab308]">
                        {remaining.formatted}
                      </span>
                    </div>
                    <p className={`text-[11px] ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                      {order.type === 'reserve_to_view'
                        ? 'Item guaranteed aside. Visit stand to try on.'
                        : 'Held for pickup verification.'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {!isCompleted && !isArrived && (
                      <button
                        type="button"
                        onClick={() => onImHere(order.id)}
                        className="w-full py-3 px-4 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t('im_here_btn', currentLang)}</span>
                      </button>
                    )}

                    {isArrived && !isCompleted && (
                      <div className="p-2.5 rounded-2xl bg-blue-900/30 border border-blue-500/40 text-xs text-blue-200 text-center font-semibold">
                        ✅ {t('im_here_success', currentLang)}
                      </div>
                    )}

                    {isCompleted && (
                      <div className="p-2.5 rounded-2xl bg-emerald-900/30 border border-emerald-500/40 text-xs text-emerald-200 text-center font-semibold">
                        🎉 Inspected & Picked Up!
                      </div>
                    )}

                    {!isCompleted && (
                      <button
                        type="button"
                        onClick={() => onCancelOrder(order.id)}
                        className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                          darkMode
                            ? 'border-stone-800 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                            : 'border-stone-300 text-stone-600 hover:bg-stone-100 text-stone-900'
                        }`}
                      >
                        {t('cancel', currentLang)} Hold
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
