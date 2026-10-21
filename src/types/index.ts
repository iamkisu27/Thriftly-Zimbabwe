export type Language = 'en' | 'sn' | 'nd';

export type Currency = 'USD' | 'ZiG';

export type FulfilmentMode = 'reserve_to_view' | 'pickup' | 'delivery';

export type ConditionGrade = 'grade_a' | 'grade_b' | 'grade_c';

export type Category = 'all' | 'clothing' | 'jackets' | 'shoes' | 'denim' | 'dresses' | 'vintage';

export interface ThriftItem {
  id: string;
  title: string;
  titleTranslations?: Partial<Record<Language, string>>;
  description: string;
  category: Category;
  size: string;
  priceUsd: number;
  condition: ConditionGrade;
  landmark: string;
  marketStand: string;
  marketArea: 'Harare' | 'Bulawayo';
  daysPresent: string;
  images: string[];
  flaws?: string;
  measurements: {
    chestOrWaist?: string;
    length?: string;
    shoulderOrInseam?: string;
  };
  fulfilmentModes: FulfilmentMode[];
  isAvailable: boolean;
  isHeld?: boolean;
  holdExpiresAt?: number;
  heldBy?: string;
  vendorId: string;
  vendorName: string;
  vendorPhone: string;
  voiceNoteDescription?: string;
  voiceNoteDurationSec?: number;
  tags: string[];
}

export interface Vendor {
  id: string;
  name: string;
  market: string;
  standNumber: string;
  landmark: string;
  city: 'Harare' | 'Bulawayo';
  phone: string;
  spokenLanguages: Language[];
  reliabilityScore: number; // 0 to 100
  isPresentToday: boolean;
  acceptedCurrencies: Currency[];
  totalSales: number;
  preferredLanguage: Language;
}

export interface OrderReservation {
  id: string;
  code: string; // e.g. TH-8291
  type: 'reserve_to_view' | 'pickup' | 'delivery';
  itemId: string;
  itemTitle: string;
  itemPriceUsd: number;
  itemImage: string;
  vendorId: string;
  vendorName: string;
  vendorPhone: string;
  vendorLandmark: string;
  status: 'pending_confirmation' | 'confirmed' | 'ready_for_pickup' | 'arrived' | 'completed' | 'cancelled';
  timeSlot?: string;
  holdExpiresAt: number;
  createdAt: number;
  paymentMethod: 'cash_on_pickup' | 'ecocash' | 'innbucks' | 'zipit' | 'deposit_only';
  paidDepositUsd?: number;
  deliveryAddress?: string;
  notes?: string;
}

export interface UserPreferences {
  language: Language;
  currency: Currency;
  city: 'Harare' | 'Bulawayo';
  lowDataMode: boolean;
  selectedSizes: string[];
  phone?: string;
}
