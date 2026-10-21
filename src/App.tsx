import React, { useState, useMemo } from 'react';
import {
  Language,
  Currency,
  Category,
  FulfilmentMode,
  ThriftItem,
  Vendor,
  OrderReservation,
} from './types';
import { SEED_ITEMS, SEED_VENDORS } from './data/seedData';
import { t, resolveSearchQuery } from './utils/i18n';
import { generatePickupCode, getHoldExpiryTime } from './utils/holds';

import { VerticalNav } from './components/VerticalNav';
import { Header } from './components/Header';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ReserveModal } from './components/ReserveModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersView } from './components/OrdersView';
import { VendorPortal } from './components/VendorPortal';
import { WhatsAppBotSimulator } from './components/WhatsAppBotSimulator';
import { OnboardingModal } from './components/OnboardingModal';
import { ReportTranslationModal } from './components/ReportTranslationModal';

import {
  Search,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ChevronRight,
  Store,
} from 'lucide-react';

export default function App() {
  const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isAutoStart = queryParams?.get('autostart') === '1';

  // Application Settings
  const [currentLang, setCurrentLang] = useState<Language>('sn');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [city, setCity] = useState<'Harare' | 'Bulawayo'>('Harare');
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default dark mode to highlight rich flag colors like screenshot 2
  const [lowDataMode, setLowDataMode] = useState(false);
  const [activeView, setActiveView] = useState<'buyer' | 'orders' | 'vendor' | 'bot'>('buyer');

  // Modals
  const [showOnboarding, setShowOnboarding] = useState(!isAutoStart);
  const [showReportWording, setShowReportWording] = useState(false);

  // Core Data
  const [items, setItems] = useState<ThriftItem[]>(SEED_ITEMS);
  const [vendors, setVendors] = useState<Vendor[]>(SEED_VENDORS);
  const [selectedVendorId, setSelectedVendorId] = useState<string>('v1');

  // Seed with one active initial reservation
  const [orders, setOrders] = useState<OrderReservation[]>([
    {
      id: 'ord-initial',
      code: 'TH-4921',
      type: 'reserve_to_view',
      itemId: 'item-1',
      itemTitle: 'Vintage Oversized Denim Jacket (Levi Strauss)',
      itemPriceUsd: 14,
      itemImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      vendorId: 'v1',
      vendorName: 'Amai Tinashe (Bhero Stand #42)',
      vendorPhone: '+263 77 214 8892',
      vendorLandmark: 'Opposite OK Mart gate, beside blue water tank, Mbare Shed B',
      status: 'confirmed',
      timeSlot: 'Today 2:30 PM - 3:30 PM',
      holdExpiresAt: Date.now() + 65 * 60 * 1000,
      createdAt: Date.now(),
      paymentMethod: 'cash_on_pickup',
    },
  ]);

  // Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedFulfilmentTab, setSelectedFulfilmentTab] = useState<'all' | 'pickup' | 'reserve_to_view'>('all');

  // Active Modals
  const [detailItem, setDetailItem] = useState<ThriftItem | null>(null);
  const [reserveItem, setReserveItem] = useState<ThriftItem | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<ThriftItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleCity = () => {
    setCity((prev) => (prev === 'Harare' ? 'Bulawayo' : 'Harare'));
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'ZiG' : 'USD'));
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleToggleLowData = () => {
    setLowDataMode((prev) => !prev);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter items
  const filteredItems = useMemo(() => {
    const { normalizedCategory, keywords } = resolveSearchQuery(searchQuery);

    return items.filter((item) => {
      if (item.marketArea !== city) return false;

      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (selectedFulfilmentTab !== 'all') {
        if (!item.fulfilmentModes.includes(selectedFulfilmentTab as FulfilmentMode)) {
          return false;
        }
      }

      if (keywords.length > 0) {
        const itemText = [
          item.title,
          item.description,
          item.landmark,
          item.marketStand,
          item.size,
          ...(item.tags || []),
          ...(item.titleTranslations ? Object.values(item.titleTranslations) : []),
        ]
          .join(' ')
          .toLowerCase();

        if (normalizedCategory) {
          if (normalizedCategory === 'harare' && item.marketArea !== 'Harare') return false;
          if (normalizedCategory === 'bulawayo' && item.marketArea !== 'Bulawayo') return false;
          if (
            normalizedCategory !== 'all' &&
            normalizedCategory !== 'harare' &&
            normalizedCategory !== 'bulawayo' &&
            item.category !== normalizedCategory
          ) {
            const matchesText = keywords.some((kw) => itemText.includes(kw));
            if (!matchesText) return false;
          }
        } else {
          const allKeywordsMatch = keywords.every((kw) => itemText.includes(kw));
          if (!allKeywordsMatch) return false;
        }
      }

      return true;
    });
  }, [items, city, selectedCategory, selectedFulfilmentTab, searchQuery]);

  // Handle Reservation
  const handleConfirmReservation = (data: {
    slot: string;
    includeDeposit: boolean;
    paymentMethod: 'deposit_only' | 'cash_on_pickup';
  }) => {
    if (!reserveItem) return;

    const code = generatePickupCode();
    const expiry = getHoldExpiryTime('reserve_to_view');

    const newOrder: OrderReservation = {
      id: `ord-${Date.now()}`,
      code,
      type: 'reserve_to_view',
      itemId: reserveItem.id,
      itemTitle: reserveItem.title,
      itemPriceUsd: reserveItem.priceUsd,
      itemImage: reserveItem.images[0],
      vendorId: reserveItem.vendorId,
      vendorName: reserveItem.vendorName,
      vendorPhone: reserveItem.vendorPhone,
      vendorLandmark: reserveItem.landmark,
      status: 'confirmed',
      timeSlot: data.slot,
      holdExpiresAt: expiry,
      createdAt: Date.now(),
      paymentMethod: data.paymentMethod,
      paidDepositUsd: data.includeDeposit ? 1 : 0,
    };

    setOrders((prev) => [newOrder, ...prev]);

    setItems((prev) =>
      prev.map((i) => (i.id === reserveItem.id ? { ...i, isHeld: true, holdExpiresAt: expiry } : i))
    );

    setReserveItem(null);
    setDetailItem(null);
    setActiveView('orders');
    showToast(
      currentLang === 'sn'
        ? `Zvatsimbiswa! Kodhi: ${code}`
        : currentLang === 'nd'
        ? `Kuqinisekisiwe! Ikhodi: ${code}`
        : `Reserved! Code: ${code}`
    );
  };

  // Handle Checkout / Direct Pickup
  const handleConfirmPickupOrder = (paymentMethod: 'cash_on_pickup' | 'ecocash' | 'innbucks' | 'zipit') => {
    if (!checkoutItem) return;

    const code = generatePickupCode();
    const expiry = getHoldExpiryTime('pickup');

    const newOrder: OrderReservation = {
      id: `ord-${Date.now()}`,
      code,
      type: 'pickup',
      itemId: checkoutItem.id,
      itemTitle: checkoutItem.title,
      itemPriceUsd: checkoutItem.priceUsd,
      itemImage: checkoutItem.images[0],
      vendorId: checkoutItem.vendorId,
      vendorName: checkoutItem.vendorName,
      vendorPhone: checkoutItem.vendorPhone,
      vendorLandmark: checkoutItem.landmark,
      status: 'ready_for_pickup',
      holdExpiresAt: expiry,
      createdAt: Date.now(),
      paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);

    setItems((prev) =>
      prev.map((i) => (i.id === checkoutItem.id ? { ...i, isHeld: true, holdExpiresAt: expiry } : i))
    );

    setCheckoutItem(null);
    setDetailItem(null);
    setActiveView('orders');
    showToast(`Pickup Order confirmed! Secret code: ${code}`);
  };

  // Customer actions
  const handleImHere = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'arrived' } : o))
    );
    showToast(t('im_here_success', currentLang));
  };

  const handleCancelOrder = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (target) {
      setItems((prev) =>
        prev.map((i) => (i.id === target.itemId ? { ...i, isHeld: false } : i))
      );
    }
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('Hold released.');
  };

  // Vendor actions
  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'confirmed' } : o))
    );
    showToast('Hold accepted by vendor.');
  };

  const handleDeclineOrder = (orderId: string) => {
    handleCancelOrder(orderId);
  };

  const handleMarkSold = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (target) {
      setItems((prev) =>
        prev.map((i) => (i.id === target.itemId ? { ...i, isAvailable: false, isHeld: false } : i))
      );
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'completed' } : o))
    );
    setVendors((prev) =>
      prev.map((v) => (v.id === selectedVendorId ? { ...v, totalSales: v.totalSales + 1 } : v))
    );
    showToast('Item marked SOLD at stand!');
  };

  const handleTogglePresent = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, isPresentToday: !v.isPresentToday } : v))
    );
    showToast('Stand presence updated.');
  };

  const currentVendor = vendors.find((v) => v.id === selectedVendorId) || vendors[0];

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-200 font-sans ${
        darkMode ? 'bg-[#0f0f11] text-stone-100' : 'bg-[#fcfbf9] text-stone-900'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-800 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-[#eab308] shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 1. VERTICAL NAV BAR on Desktop with Fluid Pill Animation */}
      <VerticalNav
        currentLang={currentLang}
        onSelectLang={(l) => setCurrentLang(l)}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        city={city}
        onToggleCity={handleToggleCity}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        lowDataMode={lowDataMode}
        onToggleLowData={handleToggleLowData}
        activeOrdersCount={orders.filter((o) => o.status !== 'completed').length}
        activeView={activeView}
        onChangeView={(v) => setActiveView(v)}
        onOpenReportWording={() => setShowReportWording(true)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden">
          <Header
            currentLang={currentLang}
            onSelectLang={(l) => setCurrentLang(l)}
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            city={city}
            onToggleCity={handleToggleCity}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
            lowDataMode={lowDataMode}
            onToggleLowData={handleToggleLowData}
            activeOrdersCount={orders.filter((o) => o.status !== 'completed').length}
            activeView={activeView}
            onChangeView={(v) => setActiveView(v)}
            onOpenReportWording={() => setShowReportWording(true)}
          />
        </div>

        {/* Scrollable Main Workspace */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7">
          {/* VIEW 1: Buyer Browse Feed (aligned with Screenshot 1 & 2 "2. Home") */}
          {activeView === 'buyer' && (
            <div className="space-y-6">
              {/* Top Near You & Language Badge (from Claude Screenshot 1 & 2) */}
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                    Near you
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    {city === 'Harare' ? 'Mbare, Harare' : 'Makokoba, Bulawayo'}
                  </h2>
                </div>

                {/* Country / Lang Indicator Circle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const nextLang: Language = currentLang === 'en' ? 'sn' : currentLang === 'sn' ? 'nd' : 'en';
                      setCurrentLang(nextLang);
                    }}
                    className={`w-10 h-10 rounded-full border-2 font-black text-sm flex items-center justify-center transition cursor-pointer ${
                      darkMode
                        ? 'border-white bg-[#1a1a1a] text-white hover:bg-stone-800'
                        : 'border-black bg-white text-black hover:bg-stone-100'
                    }`}
                    title="Tap to cycle language"
                  >
                    {currentLang.toUpperCase()}
                  </button>
                </div>
              </div>

              {/* Search Bar matching screenshot */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jackets, size, stand"
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 text-sm font-medium focus:outline-none transition ${
                    darkMode
                      ? 'bg-[#18181b] border-stone-800 text-white placeholder-stone-500 focus:border-[#eab308]'
                      : 'bg-white border-stone-900 text-stone-900 placeholder-stone-500 focus:border-[#166534]'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-stone-400">
                  <Search className="w-4 h-4" />
                </div>
              </div>

              {/* Pill Selectors matching Screenshot 1 & 2: [All] [Pick up] [Reserve to view] */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedFulfilmentTab('all')}
                  className={`px-4 py-2 rounded-full text-xs font-black border-2 transition cursor-pointer ${
                    selectedFulfilmentTab === 'all'
                      ? 'border-black bg-black text-white dark:bg-white dark:text-black dark:border-white'
                      : darkMode
                      ? 'border-stone-800 bg-[#1a1a1a] text-stone-300 hover:border-stone-700'
                      : 'border-stone-900 bg-white text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  All
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFulfilmentTab('pickup')}
                  className={`px-4 py-2 rounded-full text-xs font-black border-2 transition cursor-pointer ${
                    selectedFulfilmentTab === 'pickup'
                      ? 'border-black bg-black text-white dark:bg-white dark:text-black dark:border-white'
                      : darkMode
                      ? 'border-stone-800 bg-[#1a1a1a] text-stone-300 hover:border-stone-700'
                      : 'border-stone-900 bg-white text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  Pick up
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFulfilmentTab('reserve_to_view')}
                  className={`px-5 py-2 rounded-full text-xs font-black border-2 transition cursor-pointer ${
                    selectedFulfilmentTab === 'reserve_to_view'
                      ? 'border-black bg-[#eab308] text-black shadow-xs'
                      : darkMode
                      ? 'border-stone-800 bg-[#1a1a1a] text-stone-300 hover:border-stone-700'
                      : 'border-stone-900 bg-white text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  Reserve to view
                </button>
              </div>

              {/* "At the stand today" Green Banner (from Screenshot 1 & 2) */}
              <div
                className="bg-[#165a36] text-white p-5 rounded-3xl shadow-sm cursor-pointer hover:bg-[#14532d] transition"
                onClick={() => setActiveView('vendor')}
              >
                <div className="text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                  At the stand today
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black tracking-tight">
                      Mupedzanhamo • Stand 14
                    </h3>
                    <p className="text-xs text-emerald-100/90 mt-0.5">
                      Opposite the north gate • 1.2 km • 46 items
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* "Reserve to view this week" Section Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    Reserve to view this week
                  </h3>
                  <span className={`text-xs ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                    {filteredItems.length} available
                  </span>
                </div>

                {filteredItems.length === 0 ? (
                  <div
                    className={`rounded-3xl border p-12 text-center space-y-3 ${
                      darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-white border-stone-200'
                    }`}
                  >
                    <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
                    <h4 className="font-bold">No garments match your filters</h4>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedFulfilmentTab('all');
                      }}
                      className="py-2 px-4 rounded-xl bg-[#166534] text-white text-xs font-bold cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map((item) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        currentLang={currentLang}
                        currency={currency}
                        lowDataMode={lowDataMode}
                        darkMode={darkMode}
                        onOpenDetail={(i) => setDetailItem(i)}
                        onQuickReserve={(i) => setReserveItem(i)}
                        isHeld={item.isHeld}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 2: Active Holds & Orders View */}
          {activeView === 'orders' && (
            <OrdersView
              orders={orders}
              currentLang={currentLang}
              currency={currency}
              darkMode={darkMode}
              onImHere={handleImHere}
              onCancelOrder={handleCancelOrder}
              onExploreMore={() => setActiveView('buyer')}
            />
          )}

          {/* VIEW 3: Stand Vendor Hub */}
          {activeView === 'vendor' && (
            <VendorPortal
              vendors={vendors}
              currentVendor={currentVendor}
              onSelectVendor={(v) => setSelectedVendorId(v.id)}
              orders={orders}
              currentLang={currentLang}
              currency={currency}
              darkMode={darkMode}
              onAcceptOrder={handleAcceptOrder}
              onDeclineOrder={handleDeclineOrder}
              onMarkReady={() => {}}
              onMarkSold={handleMarkSold}
              onTogglePresent={handleTogglePresent}
            />
          )}

          {/* VIEW 4: WhatsApp Bot Simulator */}
          {activeView === 'bot' && (
            <WhatsAppBotSimulator
              currentLang={currentLang}
              orders={orders}
              darkMode={darkMode}
              onAcceptOrder={handleAcceptOrder}
              onMarkSold={handleMarkSold}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <ItemDetailModal
        item={detailItem}
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        currentLang={currentLang}
        currency={currency}
        darkMode={darkMode}
        onSelectReserve={(i) => {
          setDetailItem(null);
          setReserveItem(i);
        }}
        onSelectPickup={(i) => {
          setDetailItem(null);
          setCheckoutItem(i);
        }}
        isHeld={detailItem?.isHeld}
      />

      <ReserveModal
        item={reserveItem}
        isOpen={!!reserveItem}
        onClose={() => setReserveItem(null)}
        currentLang={currentLang}
        currency={currency}
        darkMode={darkMode}
        onConfirmReserve={handleConfirmReservation}
      />

      <CheckoutModal
        item={checkoutItem}
        isOpen={!!checkoutItem}
        onClose={() => setCheckoutItem(null)}
        currentLang={currentLang}
        currency={currency}
        darkMode={darkMode}
        onConfirmOrder={handleConfirmPickupOrder}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        darkMode={darkMode}
        onComplete={(prefs) => {
          setCurrentLang(prefs.language);
          setCity(prefs.city);
          setShowOnboarding(false);
        }}
        onDismiss={() => setShowOnboarding(false)}
      />

      <ReportTranslationModal
        isOpen={showReportWording}
        onClose={() => setShowReportWording(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
