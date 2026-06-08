import { getAccommodations, getAttractions, getFlights, getTrip, getTravelers } from './travelDataService';

export function getTripSummary() {
  return getTrip();
}

export function getTripContext(): string {
  const trip = getTrip();
  const travelers = getTravelers().map((t) => `${t.firstName} ${t.lastName}`).join(', ');
  const accommodations = getAccommodations()
    .map((a) => `- ${a.checkIn?.slice(0, 10) || 'תאריך לא ידוע'} עד ${a.checkOut?.slice(0, 10) || 'תאריך לא ידוע'}: ${a.name} (${a.city})`)
    .join('\n');
  const attractions = getAttractions().map((a) => a.name).join(', ');
  const flight = getFlights()[0] ?? {
    id: 'flight-placeholder',
    tripId: trip.id,
    airline: 'לא ידוע',
    flightNumber: 'לא ידוע',
    departureAirport: 'KIX',
    arrivalAirport: 'ATH',
    departureTime: '2026-08-31T18:40:00+09:00',
    arrivalTime: '2026-09-01T06:15:00+03:00',
    status: 'confirmed'
  };

  return `אתה עוזר נסיעות אישי נאמן עבור משפחת גורביץ'.
המשפחה: ${travelers}.
הטיול מתחיל ב-${trip.startDate} ומסתיים ב-${trip.endDate}.
יעדים: קו פאנגאן, יפן (טוקיו, מוריוקה, סנדאי, טאקאיהמה, קיוטו ועוד).
מטרות: רגיעה, חיי חוף, טיול איטי, מחנה קיץ לילדים, הרפתקה משפחתית, תרבות, פסטיבלים, טבע, אוכל, חוויות ייחודיות.
העדפות: טבע, תרבות מקומית, פסטיבלים, חוויות ייחודיות, יפן אותנטית, נופים יפים, שכונות מסורתיות, פנינות חבויות, פעילויות ידידותיות למשפחה, חוויות אוכל, לוגיסטיקה קלה.
הימנע מנסיעות מהירות מדי, שינויי מלון תכופים, מלכודות תיירים ומעברים ארוכים מיותרים.

לינה מאושרת:
${accommodations}

טיסת חזור מאושרת: ${flight.departureAirport} ל-${flight.arrivalAirport}, יציאה ${flight.departureTime}, הגעה ${flight.arrivalTime}.

חוויות חובה: ${attractions}.`;
}
