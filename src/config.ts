import dotenv from 'dotenv';

dotenv.config();

const config = {
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

export default config;
