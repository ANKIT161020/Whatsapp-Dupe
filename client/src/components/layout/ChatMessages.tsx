import React from 'react';
import ChatBubble from './ChatBubble';

interface IMessage {
  id: string;
  text: string;
  from: 'me' | 'contact';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

const dummyMessages: IMessage[] = [
  { id: '1', text: 'Achcha parso subah karte he then', from: 'me', timestamp: '21:37', status: 'read' },
  { id: '2', text: 'Or afternoon', from: 'contact', timestamp: '21:38', status: 'sent' },
  { id: '3', text: 'Ok', from: 'me', timestamp: '21:38', status: 'delivered' },
  { id: '4', text: 'Aap app chalake dekh lo', from: 'contact', timestamp: '21:40', status: 'sent' },
  { id: '5', text: 'Aap app chalake dekh lo', from: 'me', timestamp: '21:40', status: 'read' },
];

const ChatMessages: React.FC = () => {
  return (
    // The background image has been removed and replaced with a solid color class.
    <div className="flex-1 p-4 overflow-y-auto flex flex-col bg-[#0b1419]">
      {dummyMessages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default ChatMessages;
