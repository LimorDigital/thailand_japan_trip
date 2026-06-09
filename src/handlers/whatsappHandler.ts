import { generateResponse } from '../services/claudeService';
import { sendWhatsAppText } from '../services/whatsappClient';
import { getTripContext } from '../services/tripService';
import { parseWhatsAppEvent } from '../services/whatsappParser';
import { appendConversationHistory, getConversationHistory } from '../services/conversationMemoryRepository';
import { DEFAULT_TRIP_ID } from '../services/constants';

const tripContext = getTripContext();
const tripId = DEFAULT_TRIP_ID;

const assistantInstructions = `אתה עוזר נסיעות אישי נאמן עבור משפחת גורביץ'. כל התשובות חייבות להיות בעברית שוטפת וברורה. אתה מנהל את כל הלוגיסטיקה של הנסיעה, כולל טיסות, מלונות, תחבורה, אטרקציות, תזכורות ולוז יומי. שמור על סגנון חם, מקצועי ותמציתי. הימנע מהמלצות על מסלולים מהירים מדי, מלכודות תיירים ונסיעות לא נוחות.`;

export async function handleIncomingWhatsAppMessage(event: any) {
  const parsed = parseWhatsAppEvent(event);
  if (!parsed) {
    return { status: 'ignored' };
  }

  const { from, text } = parsed;
  const history = await getConversationHistory(tripId, from);
  const historyText = history
    .map((item) => (item.role === 'assistant' ? `עוזר: ${item.text}` : `לקוח: ${item.text}`))
    .join('\n');

  const prompt = `${assistantInstructions}
${tripContext}
${historyText ? `\nשיח קודם:\n${historyText}` : ''}

לקוח שואל: "${text}"

ענה בעברית בצורה תמציתית, ידידותית ומקצועית. כלול המלצות רלוונטיות, תזכורות ומידע לוגיסטי כאשר מתאים.`;

  const assistantReply = await generateResponse(prompt);

  await appendConversationHistory(tripId, from, { role: 'user', text });
  await appendConversationHistory(tripId, from, { role: 'assistant', text: assistantReply });

  await sendWhatsAppText(from, assistantReply);

  return {
    status: 'delivered',
    to: from,
    body: assistantReply
  };
}
