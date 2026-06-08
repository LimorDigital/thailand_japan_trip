import { getTripContext } from './tripService';

export function generateDailyBriefing(date: string) {
  const briefingDate = new Date(date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', timeZone: 'Asia/Tokyo' });
  const context = getTripContext();

  return `בוקר טוב לימור.
היום זה ${briefingDate}.
המלצות עיקריות ליום זה: ${context.split('\n')[2]}.
העדיפויות שלך היום הן לוגיסטיקה קלה, תרבות מקומית, חוויות משפחתיות ותכנון מותאם מזג אוויר.
אני אעקוב אחרי צ'ק-אין, תחבורה, הזמנות ומזג אוויר ביעד הנוכחי שלך.`;
}
