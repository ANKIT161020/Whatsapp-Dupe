import React from 'react';
import { ChevronLeft, Search, MoreVertical } from 'lucide-react';

interface IConversation {
  wa_id: string;
  name: string;
  profilePicture: string;
}

const ChatHeader: React.FC<{ conversation: IConversation; onBack: () => void }> = ({ conversation, onBack }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1e2021] shadow-sm">
      <div className="flex items-center">
        <ChevronLeft onClick={onBack} className="w-6 h-6 mr-4 text-gray-400 cursor-pointer md:hidden" />
        <img src={conversation.profilePicture} alt={`${conversation.name}'s profile`} className="w-10 h-10 rounded-full" />
        <div className="ml-4">
          <h2 className="font-semibold text-white">{conversation.name}</h2>
          <p className="text-xs text-gray-400">Last seen recently</p>
        </div>
      </div>
      <div className="flex items-center text-gray-400">
        <Search className="w-5 h-5 cursor-pointer mx-2" />
        <MoreVertical className="w-5 h-5 cursor-pointer ml-2" />
      </div>
    </div>
  );
};

export default ChatHeader;
