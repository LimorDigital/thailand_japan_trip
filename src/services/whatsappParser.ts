export interface ParsedWhatsAppEvent {
  from: string;
  messageId: string;
  text: string;
}

export function parseWhatsAppEvent(event: any): ParsedWhatsAppEvent | null {
  const incoming = event?.entry?.[0]?.changes?.[0]?.value;
  const message = incoming?.messages?.[0];
  const text = message?.text?.body ?? message?.button?.text ?? '';
  const from = message?.from;
  const messageId = message?.id;

  if (!message || !from || !text) {
    return null;
  }

  return {
    from,
    messageId,
    text
  };
}
