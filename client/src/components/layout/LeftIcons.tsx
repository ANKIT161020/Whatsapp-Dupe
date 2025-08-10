import { useState } from 'react';

// Import custom assets
import ChatIcon from '../../assets/ChatIcon.png';
import ChatOutlineIcon from '../../assets/ChatOutlineIcon.png';
import StatusIcon from '../../assets/StatusIcon.png';
import StatusFilledIcon from '../../assets/StatusFilledIcon.png';
import ChannelIcon from '../../assets/ChannelIcon.png';
import ChannelFilledIcon from '../../assets/ChannelFilledIcon.png';
import CommunityIcon from '../../assets/CommunityIcon.png';
import CommunityFilledIcon from '../../assets/CommunityFilledIcon.png';
import SettingIcon from '../../assets/SettingIcon.png';
import SettingFilledIcon from '../../assets/SettingFilledIcon.png';
import UserIcon from "../../assets/UserIcon.png"

const LeftIcons = () => {
  // Use state to manage the active icon and a mock unread count
  const [activeIcon, setActiveIcon] = useState('chats');
  const [unreadCount, _] = useState(5); // Placeholder for unread count

  // Function to determine if an icon is active
  const isActive = (iconName: string) => activeIcon === iconName;

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-[#1d1f1f] text-gray-400">
      <style>
        {`
          @keyframes spin-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .meta-ai-icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: linear-gradient(270deg, #1d9bf0, #915fe2, #d64a93, #f5313d, #ffc000);
            background-size: 200% 200%;
            animation: spin-gradient 2s linear infinite;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      <div className="flex flex-col items-center gap-1 pt-3">
        {/* Chat Icon */}
        <div
          className={`relative p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('chats') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('chats')}
        >
          <img 
            src={isActive('chats') ? ChatIcon : ChatOutlineIcon} 
            alt="Chats" 
            className="w-8 h-8 object-contain"
          />
          {/* Conditional unread count badge */}
          {isActive('chats') && unreadCount > 0 && (
            <span className="absolute top-2 right-1 inline-flex items-center justify-center h-5 w-5 text-xs leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-[#21c063] rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Status Icon */}
        <div
          className={`p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('status') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('status')}
        >
          <img 
            src={isActive('status') ? StatusFilledIcon : StatusIcon} 
            alt="Status" 
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Channels Icon */}
        <div
          className={`p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('channels') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('channels')}
        >
          <img 
            src={isActive('channels') ? ChannelFilledIcon : ChannelIcon} 
            alt="Channels" 
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Communities Icon */}
        <div
          className={`p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('communities') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('communities')}
        >
          <img 
            src={isActive('communities') ? CommunityFilledIcon : CommunityIcon} 
            alt="Communities" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <hr className="w-10 border-t border-gray-600 my-4" />
        <div
          className={`p-2 cursor-pointer rounded-full hover:bg-[#292a2a] transition-colors ${
            isActive('meta-ai') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('meta-ai')}
        >
          <div className="meta-ai-icon">
            <div className='w-5 h-5 rounded-full bg-[#1d1f1f]'></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 pb-5">
        {/* Settings Icon */}
        <div
          className={`p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('settings') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('settings')}
        >
          <img 
            src={isActive('settings') ? SettingFilledIcon : SettingIcon} 
            alt="Settings" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <div
          className={`relative w-12 h-12 rounded-full bg-[#161717] flex align-middle justify-center items-center cursor-pointer ${
            isActive('profile') ? 'ring-2 ring-white' : ''
          }`}
          onClick={() => setActiveIcon('profile')}
        >
          <img
            src= {UserIcon}
            alt="User Profile"
            className="rounded-full w-8 h-7"
          />
        </div>
      </div>
    </div>
  );
};

export default LeftIcons;
