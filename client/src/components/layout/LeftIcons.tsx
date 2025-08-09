import { useState } from 'react';
import { MessageCircle, Users, Settings } from 'lucide-react';

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
      <div className="flex flex-col items-center gap-2 pt-3">
        <div
          className={`relative p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('chats') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('chats')}
        >
          <MessageCircle className="w-6 h-6" />
          {/* Conditional unread count badge */}
          {isActive('chats') && unreadCount > 0 && (
            <span className="absolute top-2 right-1 inline-flex items-center justify-center h-5 w-5 text-xs leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-[#21c063] rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div
          className={`p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('status') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('status')}
        >
          <MessageCircle className="w-6 h-6" />
        </div>
        <div
          className={`p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('channels') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('channels')}
        >
          <Users className="w-6 h-6" />
        </div>
        <div
          className={`p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('communities') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('communities')}
        >
          <Users className="w-6 h-6" />
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
      <div className="flex flex-col items-center gap-4 pb-5">
        <div
          className={`p-2 rounded-full cursor-pointer hover:bg-[#292a2a] transition-colors ${
            isActive('settings') ? 'bg-[#292a2a]' : ''
          }`}
          onClick={() => setActiveIcon('settings')}
        >
          <Settings className="w-6 h-6" />
        </div>
        <div
          className={`relative w-8 h-8 rounded-full cursor-pointer ${
            isActive('profile') ? 'ring-2 ring-white' : ''
          }`}
          onClick={() => setActiveIcon('profile')}
        >
          <img
            src="https://placehold.co/40x40/34495e/ffffff?text=A"
            alt="User Profile"
            className="rounded-full"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#21c063] rounded-full ring-2 ring-[#1d1f1f]"></span>
        </div>
      </div>
    </div>
  );
};

export default LeftIcons;
