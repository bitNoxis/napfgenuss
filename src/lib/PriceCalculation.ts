export var currentPeriod = 'Preis pro Tag';

export const LunaDayPrice = 1.12;
export const BaluDayPrice = 0.85;
export const FelixDayPrice = 1.29;
export const MaxDayPrice = 1.29;

export function PriceCalculation(price, period) {
  switch (period) {
    case 'Preis pro Tag':
      return price;
    case 'Preis pro Monat':
      return (price * 30).toFixed(2);
    case 'Preis pro Kilogram':
      return (price / 10).toFixed(2);
    default:
      return price;
  }
}