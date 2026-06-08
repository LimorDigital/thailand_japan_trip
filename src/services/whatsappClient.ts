import axios from 'axios';
import config from '../config';

const whatsappClient = axios.create({
  baseURL: config.whatsapp.apiUrl,
  headers: {
    Authorization: `Bearer ${config.whatsapp.token}`,
    'Content-Type': 'application/json'
  }
});

export async function sendWhatsAppText(to: string, body: string) {
  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
      body
    }
  };

  const response = await whatsappClient.post('/messages', payload);
  return response.data;
}
