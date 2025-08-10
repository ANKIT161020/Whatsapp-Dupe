import React from 'react';
import EllipsisIcon from "../../assets/EllipsisIcon.png"
import NewChatOutlineIcon from '../../assets/NewChatOutlineIcon.png';

const SidebarHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#161717] text-white">
      <h1 className="text-xl font-bold">WhatsApp</h1>
      <div className="flex gap-4 justify-center">
        <img 
          src={NewChatOutlineIcon} 
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

export default SidebarHeader;
