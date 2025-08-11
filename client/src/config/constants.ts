// Configuration constants for the WhatsApp clone app

export const APP_CONFIG = {
  // Backend API configuration
  API_BASE_URL: 'https://whatsapp-dupe-server.onrender.com/api',
  
  // WhatsApp Business API configuration
  // You should replace this with your actual WhatsApp Business phone number
  APP_PHONE_NUMBER: '918329446654', // Your WhatsApp Business number
  
  // UI Configuration
  DEFAULT_PROFILE_PICTURE_URL: 'https://placehold.co/50x50/e0e0e0/333333?text=',
  
  // Polling intervals (in milliseconds)
  CONVERSATIONS_REFETCH_INTERVAL: 60000, // 1 minute
  MESSAGES_REFETCH_INTERVAL: 10000, // 10 seconds
  
  // Query stale times (in milliseconds)  
  CONVERSATIONS_STALE_TIME: 300000, // 5 minutes
  MESSAGES_STALE_TIME: 30000, // 30 seconds
} as const;

export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered', 
  READ: 'read',
} as const;

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
} as const;
