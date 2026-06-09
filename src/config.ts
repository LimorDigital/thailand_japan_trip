import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  port: number;
  db: {
    connectionString: string;
  };
  whatsapp: {
    apiUrl: string;
    token: string;
    verifyToken: string;
    defaultRecipient: string;
  };
  claude: {
    apiKey: string;
    apiUrl: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT || 4000),
  db: {
    connectionString: process.env.DATABASE_URL || ''
  },
  whatsapp: {
    apiUrl: process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v17.0/<PHONE_NUMBER_ID>',
    token: process.env.WHATSAPP_API_TOKEN || '',
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || '',
    defaultRecipient: process.env.TRAVELER_WHATSAPP_NUMBER || ''
  },
  claude: {
    apiKey: process.env.CLAUDE_API_KEY || '',
    apiUrl: process.env.CLAUDE_API_URL || 'https://api.anthropic.com/v1/complete'
  }
};

export function validateConfig() {
  const missing: string[] = [];

  if (!config.db.connectionString) missing.push('DATABASE_URL');
  if (!config.whatsapp.apiUrl) missing.push('WHATSAPP_API_URL');
  if (!config.whatsapp.token) missing.push('WHATSAPP_API_TOKEN');
  if (!config.whatsapp.verifyToken) missing.push('WHATSAPP_VERIFY_TOKEN');
  if (!config.whatsapp.defaultRecipient) missing.push('TRAVELER_WHATSAPP_NUMBER');
  if (!config.claude.apiKey) missing.push('CLAUDE_API_KEY');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export default config;
