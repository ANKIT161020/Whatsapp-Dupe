import { Schema, model, Document } from 'mongoose';

// Define the interface for a Text message part
interface IMessageText {
  body: string;
}

// Define the interface for an Image message part
interface IMessageImage {
  mime_type?: string;
  sha256?: string;
  id?: string;
  link?: string;
}

// Define the interface for message context (e.g., for replies)
interface IMessageContext {
  message_id?: string;
}

// Define the main interface for a Message document
export interface IMessage extends Document {
  id: string; // Unique message ID from WhatsApp (e.g., wamid.XXX)
  wa_id: string; // The WhatsApp ID of the contact (the "other party" in the conversation)
  contactName?: string; // Name of the contact (e.g., "Ravi Kumar")
  from: string; // Sender's number (can be our number or the contact's number)
  to: string; // Receiver's number (can be our number or the contact's number)
  type: string; // e.g., 'text', 'image', 'video', 'status'
  text?: IMessageText; // Message content for text messages
  image?: IMessageImage; // Image details for image messages
  timestamp: Date; // Timestamp of the message or status update
  status: 'sent' | 'delivered' | 'read'; // Current status of the message
  context?: IMessageContext; // Context for replies or related messages
  createdAt?: Date; // Mongoose auto-generated
  updatedAt?: Date; // Mongoose auto-generated
}

// Define the Mongoose Schema
const MessageSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate messages based on WhatsApp's unique ID
    index: true // Add an index for faster lookups
  },
  wa_id: {
    type: String,
    required: true,
    index: true // Index for grouping conversations by wa_id
  },
  contactName: {
    type: String,
    required: false // Not always present in all payloads, can be inferred or updated later
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  text: {
    body: { type: String }
  },
  image: {
    mime_type: { type: String },
    sha256: { type: String },
    id: { type: String },
    link: { type: String }
  },
  timestamp: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'], // Enforce specific status values
    default: 'sent',
    required: true
  },
  context: {
    message_id: { type: String }
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  collection: 'processed_messages' // Explicitly set the collection name
});

// Create and export the Message model
export const Message = model<IMessage>('Message', MessageSchema);
