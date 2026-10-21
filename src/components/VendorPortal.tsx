import React from 'react';
import { Vendor, OrderReservation, Language, Currency } from '../types';
import { formatPrice, t } from '../utils/i18n';
import {
  Store,
  ShieldCheck,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  MapPin,
  Clock,
  QrCode,
  AlertCircle,
} from 'lucide-react';

interface VendorPortalProps {
  vendors: Vendor[];
  currentVendor: Vendor;
  onSelectVendor: (vendor: Vendor) => void;
  orders: OrderReservation[];
  currentLang: Language;
  currency: Currency;
  darkMode?: boolean;
  onAcceptOrder: (orderId: string) => void;
  onDeclineOrder: (orderId: string) => void;
  onMarkReady: (orderId: string) => void;
  onMarkSold: (orderId: string) => void;
  onTogglePresent: (vendorId: string) => void;
}

export const VendorPortal: React.FC<VendorPortalProps> = ({
  vendors,
  currentVendor,
  onSelectVendor,
  orders,
  currentLang,
  currency,
  darkMode = false,
  onAcceptOrder,
  onDeclineOrder,
  onMarkReady,
  onMarkSold,
  onTogglePresent,
}) => {
  const vendorOrders = orders.filter((o) => o.vendorId === currentVendor.id);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Top Header & Stand Switcher */}
      <div
        className={`rounded-3xl border p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-white border-stone-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#166534] text-white flex items-center justify-center font-bold text-lg shadow-xs">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight">
                {currentVendor.name}
              </h2>
              <span className="text-xs bg-[#eab308] text-black font-bold px-2.5 py-0.5 rounded-full">
                {currentVendor.market}
              </span>
            </div>
            <p className={`text-xs mt-0.5 flex items-center gap-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              <MapPin className="w-3.5 h-3.5 text-[#eab308]" />
              <span>{currentVendor.landmark}</span>
            </p>
          </div>
        </div>

        {/* Stand Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-semibold ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            {t('vendor_switch_stand', currentLang)}:
          </span>
          <select
            value={currentVendor.id}
            onChange={(e) => {
              const found = vendors.find((v) => v.id === e.target.value);
              if (found) onSelectVendor(found);
            }}
            className={`text-xs font-bold rounded-xl px-3 py-2 border focus:outline-none ${
              darkMode
                ? 'bg-stone-900 border-stone-700 text-stone-200'
                : 'bg-stone-100 border-stone-300 text-stone-900'
            }`}
          >
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stand Status & Stats Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Toggle: Open / Not at stand today */}
        <div
          className={`p-4 rounded-3xl border shadow-xs flex items-center justify-between ${
            darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-white border-stone-200'
          }`}
        >
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              {t('vendor_status_toggle', currentLang)}
            </div>
            <div className="text-sm font-bold mt-0.5">
              {currentVendor.isPresentToday ? '🟢 Open at Stand' : '🔴 Closed Today'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onTogglePresent(currentVendor.id)}
            className="cursor-pointer"
            title="Toggle attendance"
          >
            {currentVendor.isPresentToday ? (
              <ToggleRight className="w-9 h-9 text-[#166534]" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-stone-500" />
            )}
          </button>
        </div>

        {/* Reliability Score */}
        <div
          className={`p-4 rounded-3xl border shadow-xs ${
            darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-white border-stone-200'
          }`}
        >
          <div className={`text-xs font-bold uppercase tracking-wider flex items-center justify-between ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            <span>{t('vendor_reliability', currentLang)}</span>
            <ShieldCheck className="w-4 h-4 text-[#166534]" />
          </div>
          <div className="text-2xl font-black mt-1">
            {currentVendor.reliabilityScore}%
          </div>
          <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Based on completed holds & timely check-ins
          </p>
        </div>

        {/* Sales completed */}
        <div
          className={`p-4 rounded-3xl border shadow-xs ${
            darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-white border-stone-200'
          }`}
        >
          <div className={`text-xs font-bold uppercase tracking-wider flex items-center justify-between ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            <span>{t('vendor_sales_today', currentLang)}</span>
            <TrendingUp className="w-4 h-4 text-[#eab308]" />
          </div>
          <div className="text-2xl font-black mt-1">
            {currentVendor.totalSales} garments
          </div>
          <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Verified stand pickups
          </p>
        </div>
      </div>

      {/* Incoming Reservations & Customer Visits */}
      <div
        className={`rounded-3xl border p-5 shadow-xs space-y-4 ${
          darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-white border-stone-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg tracking-tight">
              {t('incoming_reservations', currentLang)}
            </h3>
            <p className={`text-xs ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              Customers who reserved garments to inspect at your stand today.
            </p>
          </div>
          <span className="text-xs font-bold bg-[#eab308] text-black px-2.5 py-1 rounded-full">
            {vendorOrders.length} Active holds
          </span>
        </div>

        {vendorOrders.length === 0 ? (
          <div
            className={`py-8 text-center text-xs border-2 border-dashed rounded-2xl ${
              darkMode ? 'border-stone-800 text-stone-500' : 'border-stone-200 text-stone-500'
            }`}
          >
            <Clock className="w-6 h-6 text-stone-400 mx-auto mb-2" />
            No pending reservations for this stand right now.
          </div>
        ) : (
          <div className="space-y-3">
            {vendorOrders.map((ord) => {
              const isPending = ord.status === 'pending_confirmation';
              const isConfirmed = ord.status === 'confirmed';
              const isArrived = ord.status === 'arrived';
              const isCompleted = ord.status === 'completed';

              return (
                <div
                  key={ord.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    darkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={ord.itemImage}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black bg-black text-[#eab308] px-2 py-0.5 rounded">
                          {ord.code}
                        </span>
                        <h4 className="font-bold text-sm truncate max-w-xs">
                          {ord.itemTitle}
                        </h4>
                      </div>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                        {formatPrice(ord.itemPriceUsd, currency)} · Slot: {ord.timeSlot || 'Today'}
                      </div>
                      {isArrived && (
                        <div className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Mutengi asvika pastendi! (Customer at stand)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {isPending && (
                      <>
                        <button
                          type="button"
                          onClick={() => onAcceptOrder(ord.id)}
                          className="py-2.5 px-3.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t('btn_accept_res', currentLang)}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeclineOrder(ord.id)}
                          className="py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-400 hover:bg-stone-800 text-xs cursor-pointer"
                        >
                          {t('btn_decline_res', currentLang)}
                        </button>
                      </>
                    )}

                    {(isConfirmed || isArrived) && !isCompleted && (
                      <button
                        type="button"
                        onClick={() => onMarkSold(ord.id)}
                        className="py-2.5 px-4 rounded-xl bg-black hover:bg-stone-900 text-[#eab308] border border-[#eab308]/40 font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>{t('btn_mark_sold', currentLang)}</span>
                      </button>
                    )}

                    {isCompleted && (
                      <span className="text-xs font-bold text-[#166534] bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 px-3 py-1 rounded-lg">
                        ✅ Sold & Handed Over
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
