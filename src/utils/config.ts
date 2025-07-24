import * as dotenv from 'dotenv';

dotenv.config();

export const getOpenAIApiKey = (): string => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }
  return apiKey;
};

export const getSerperApiKey = (): string => {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    throw new Error('SERPER_API_KEY is not set in environment variables');
  }
  return apiKey;
};

export const getOpenAIModelName = (): string => {
  return process.env.OPENAI_MODEL_NAME || 'gpt-4.1-mini';
}; 