import axios from 'axios';
import config from '../config';

const client = axios.create({
  baseURL: config.claude.apiUrl,
  headers: {
    Authorization: `Bearer ${config.claude.apiKey}`,
    'Content-Type': 'application/json'
  }
});

export async function generateResponse(prompt: string, context: string[] = []) {
  const input = [...context, prompt].join('\n\n');

  const response = await client.post('', {
    model: 'claude-3.5',
    prompt: input,
    max_tokens_to_sample: 650,
    temperature: 0.7
  });

  return response.data?.completion ?? '';
}
