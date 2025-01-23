export var currentPeriod = 'Preis pro Tag';

export const LunaDayPrice = 1.21;
export const BaluDayPrice = 0.78;
export const OttoDayPrice = 0.89;
export const FieteDayPrice = 1.18;

const dogSizeConsumption = {
  Luna: 20,  // Hohe energetische Nahrung
  Balu: 10,   // im Wachstum
  Otto: 10,   // Gelenkprobleme
  Fiete: 20, // Senioren
};

/**
 * Berechnet den Preis basierend auf dem Zeitraum und dem Hundenamen.
 * @param {number} price - Preis pro Tag.
 * @param {string} period - Zeitraum ('Preis pro Tag', 'Preis pro Monat', 'Preis pro Kilogram').
 * @param {string} dogName - Name des Hundes ('Luna', 'Balu', 'Otto', 'Fiete').
 * @returns {number} - Berechneter Preis.
 */
export function PriceCalculation(price, period, dogName) {
  // Standardwert für monatlichen Konsum (falls Hundename nicht gefunden wird)
  const monthlyConsumptionKg = dogSizeConsumption[dogName];
  console.log(dogName)

  switch (period) {
    case 'Preis pro Tag':
      return price;

    case 'Preis pro Monat':
      return (price * 30).toFixed(2);

    case 'Preis pro Kilogram':
      return ((price * 30) / monthlyConsumptionKg).toFixed(2);

    default:
      return price;
  }
}
