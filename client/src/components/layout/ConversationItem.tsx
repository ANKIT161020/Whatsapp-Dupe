import React from 'react';

// Import PNG assets
import UserIcon from '../../assets/UserIcon.png';
import GroupUserIcon from '../../assets/GroupUserIcon.png';
import PinOutlineIcon from '../../assets/PinOutlineIcon.png';
import CommunityFilledIcon from '../../assets/CommunityFilledIcon.png';
import SingleTickIcon from '../../assets/SingleTickIcon.png';
import DoubleUnSeenIcon from '../../assets/DoubleUnSeenIcon.png';
import DoubleSeenIcon from '../../assets/DoubleSeenIcon.png';

interface ConversationItemProps {
  conversation: {
    wa_id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    profilePicture?: string;
    isGroup?: boolean;
    isCommunity?: boolean;
    CommunityName?: string;
    isPinned?: boolean;
    unreadCount?: number;
    messageStatus?: 'sent' | 'delivered' | 'read';
  };
  onSelectConversation: () => void;
  isSelected?: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onSelectConversation,
  isSelected,
}) => {
  // Helper function to truncate long messages
  const truncateMessage = (message: string, maxLength: number = 35) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  const renderMessageStatus = () => {
    if (conversation.messageStatus === 'read') {
      return <img src={DoubleSeenIcon} alt="Read" className="w-6 h-5" />;
    } else if (conversation.messageStatus === 'delivered') {
      return <img src={DoubleUnSeenIcon} alt="Delivered" className="w-6 h-5" />;
    } else if (conversation.messageStatus === 'sent') {
      return <img src={SingleTickIcon} alt="Sent" className="w-6 h-5" />;
    }
    return null;
  };

  const renderProfilePicture = () => {
    if (conversation.isCommunity) {
      return (
        <div className="relative w-14 h-14 rounded-lg flex items-center justify-center mr-3">
          {/* Community background icon (behind, top-left) */}
          <img
            src={CommunityFilledIcon}
            alt="Community"
            className="w-8 h-8 absolute top-0 left-0 z-0"
          />
          {/* Profile picture */}
          <img
            src={conversation.profilePicture}
            alt={`${conversation.name}'s profile`}
            className="w-8 h-8 rounded-full border-2 border-[#161717] absolute top-1 left-1 z-10"
          />
          {/* Group user icon (front, bottom-right) */}
          <img
            src={GroupUserIcon}
            alt="Group"
            className="w-8 h-8 absolute bottom-0 right-0 z-20"
          />
        </div>
      );
    } else if (conversation.isGroup) {
      return (
        <div className="relative w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3">
          <img src={GroupUserIcon} alt="Group" className="w-8 h-8" />
        </div>
      );
    }
    return (
      <div className='w-12 h-12 flex items-center align-middle justify-center bg-[#1d1f1f] rounded-full mr-3'>
      <img
        src={conversation.profilePicture || UserIcon}
        alt={`${conversation.name}'s profile`}
        className="w-8 h-7"
        />
        </div>
    );
  };

  return (
    <div
      className={`flex items-center p-3 h-20 max-w-full cursor-pointer rounded-xl hover:bg-[#2e2f2f] transition-colors ${
        isSelected ? 'bg-[#2e2f2f]' : 'bg-[#161717]'
      }`}
      onClick={onSelectConversation}
    >
      {/* Profile Picture - Fixed width */}
      <div className="flex-shrink-0">
        {renderProfilePicture()}
      </div>

      {/* Conversation Details - Flexible width with overflow handling */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {conversation.isCommunity ? (
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400 truncate flex-1 mr-2">
                {conversation.CommunityName}
              </span>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {conversation.timestamp}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white truncate flex-1 mr-2">
                {conversation.name}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                {conversation.isPinned && <img src={PinOutlineIcon} alt="Pinned" className="w-4 h-4" />}
                {conversation.unreadCount && conversation.unreadCount > 0 && (
                  <div
                    className="w-5 h-5 rounded-full pt-1 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: '#21c063' }}
                  >
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-400 w-full overflow-hidden">
              <span className="truncate block w-full">
                {truncateMessage(conversation.lastMessage)}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white truncate flex-1 mr-2">
                {conversation.name}
              </span>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {conversation.timestamp}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center text-sm text-gray-400 min-w-0 flex-1 mr-2 overflow-hidden">
                <div className="flex items-center flex-shrink-0">
                  {conversation.messageStatus && renderMessageStatus()}
                </div>
                <span className="truncate block">
                  {truncateMessage(conversation.lastMessage)}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {conversation.isPinned && <img src={PinOutlineIcon} alt="Pinned" className="w-4 h-4" />}
                {conversation.unreadCount && conversation.unreadCount > 0 && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold text-center pt-1"
                    style={{ backgroundColor: '#21c063' }}
                  >
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
