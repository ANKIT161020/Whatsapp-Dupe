import React from 'react';
import { ChevronLeft } from 'lucide-react';
import SearchIcon from "../../assets/SearchIcon.png"
import UserIcon from "../../assets/UserIcon.png"
import EllipsisIcon from "../../assets/EllipsisIcon.png"
import type { IConversationSummary } from '../../services/messageAPI';
import { transformConversationForUI } from '../../utils/conversationUtils';

const ChatHeader: React.FC<{ conversation: IConversationSummary; onBack: () => void }> = ({ conversation, onBack }) => {
  const uiConversation = transformConversationForUI(conversation);
  
  return (
    <div className="flex items-center justify-between py-2 px-4 bg-[#161717] shadow-sm">
      <div className="flex items-center ">
        <ChevronLeft onClick={onBack} className="w-6 h-6 mr-4 text-gray-400 cursor-pointer md:hidden" />
        <div className='flex items-center justify-center bg-[#1d1f1f]  rounded-full w-13 h-13'>
        <img src={UserIcon} alt={`${uiConversation.name}'s profile`} className="w-10 h-9 rounded-full" />
        </div>
        <div className="ml-4">
          <h2 className="font-semibold text-white">{uiConversation.name}</h2>
          <p className="text-xs text-gray-400">Last seen recently</p>
        </div>
      </div>
      <div className="flex items-center gap-5 text-gray-400">
      <img 
          src={SearchIcon} 
          alt="New Chat" 
          className="w-8 h-8 cursor-pointer hover:opacity-70 transition-opacity object-contain" 
        />
        <img 
          src={EllipsisIcon} 
          alt="New Chat" 
          className="w-8 h-8 cursor-pointer hover:opacity-70 transition-opacity object-contain" 
        />
      </div>
    </div>
  );
};

export default ChatHeader;
