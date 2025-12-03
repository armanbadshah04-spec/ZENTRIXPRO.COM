import { Country } from '../types/trading';
export const COUNTRIES: Country[] = [{
  code: 'US',
  name: 'United States',
  currency: 'USD',
  currencySymbol: '$',
  flag: '🇺🇸'
}, {
  code: 'GB',
  name: 'United Kingdom',
  currency: 'GBP',
  currencySymbol: '£',
  flag: '🇬🇧'
}, {
  code: 'EU',
  name: 'European Union',
  currency: 'EUR',
  currencySymbol: '€',
  flag: '🇪🇺'
}, {
  code: 'JP',
  name: 'Japan',
  currency: 'JPY',
  currencySymbol: '¥',
  flag: '🇯🇵'
}, {
  code: 'AU',
  name: 'Australia',
  currency: 'AUD',
  currencySymbol: 'A$',
  flag: '🇦🇺'
}, {
  code: 'CA',
  name: 'Canada',
  currency: 'CAD',
  currencySymbol: 'C$',
  flag: '🇨🇦'
}, {
  code: 'CH',
  name: 'Switzerland',
  currency: 'CHF',
  currencySymbol: 'Fr',
  flag: '🇨🇭'
}, {
  code: 'IN',
  name: 'India',
  currency: 'INR',
  currencySymbol: '₹',
  flag: '🇮🇳'
}, {
  code: 'PK',
  name: 'Pakistan',
  currency: 'PKR',
  currencySymbol: '₨',
  flag: '🇵🇰'
}, {
  code: 'BD',
  name: 'Bangladesh',
  currency: 'BDT',
  currencySymbol: '৳',
  flag: '🇧🇩'
}, {
  code: 'AE',
  name: 'UAE',
  currency: 'AED',
  currencySymbol: 'د.إ',
  flag: '🇦🇪'
}, {
  code: 'SA',
  name: 'Saudi Arabia',
  currency: 'SAR',
  currencySymbol: '﷼',
  flag: '🇸🇦'
}, {
  code: 'TR',
  name: 'Turkey',
  currency: 'TRY',
  currencySymbol: '₺',
  flag: '🇹🇷'
}, {
  code: 'BR',
  name: 'Brazil',
  currency: 'BRL',
  currencySymbol: 'R$',
  flag: '🇧🇷'
}, {
  code: 'MX',
  name: 'Mexico',
  currency: 'MXN',
  currencySymbol: 'Mex$',
  flag: '🇲🇽'
}, {
  code: 'ZA',
  name: 'South Africa',
  currency: 'ZAR',
  currencySymbol: 'R',
  flag: '🇿🇦'
}, {
  code: 'NG',
  name: 'Nigeria',
  currency: 'NGN',
  currencySymbol: '₦',
  flag: '🇳🇬'
}, {
  code: 'EG',
  name: 'Egypt',
  currency: 'EGP',
  currencySymbol: 'E£',
  flag: '🇪🇬'
}, {
  code: 'KR',
  name: 'South Korea',
  currency: 'KRW',
  currencySymbol: '₩',
  flag: '🇰🇷'
}, {
  code: 'CN',
  name: 'China',
  currency: 'CNY',
  currencySymbol: '¥',
  flag: '🇨🇳'
}, {
  code: 'SG',
  name: 'Singapore',
  currency: 'SGD',
  currencySymbol: 'S$',
  flag: '🇸🇬'
}, {
  code: 'MY',
  name: 'Malaysia',
  currency: 'MYR',
  currencySymbol: 'RM',
  flag: '🇲🇾'
}, {
  code: 'ID',
  name: 'Indonesia',
  currency: 'IDR',
  currencySymbol: 'Rp',
  flag: '🇮🇩'
}, {
  code: 'TH',
  name: 'Thailand',
  currency: 'THB',
  currencySymbol: '฿',
  flag: '🇹🇭'
}, {
  code: 'PH',
  name: 'Philippines',
  currency: 'PHP',
  currencySymbol: '₱',
  flag: '🇵🇭'
}];
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}
export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  // Simplified conversion rates (in production, use real-time rates)
  const rates: {
    [key: string]: number;
  } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 148.5,
    AUD: 1.53,
    CAD: 1.35,
    CHF: 0.87,
    INR: 83.2,
    PKR: 278.5,
    BDT: 110.2,
    AED: 3.67,
    SAR: 3.75,
    TRY: 29.8,
    BRL: 4.98,
    MXN: 17.2,
    ZAR: 18.6,
    NGN: 907.5,
    EGP: 30.9,
    KRW: 1320.5,
    CNY: 7.24,
    SGD: 1.34,
    MYR: 4.72,
    IDR: 15680,
    THB: 35.8,
    PHP: 56.2
  };
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  return amount / fromRate * toRate;
}