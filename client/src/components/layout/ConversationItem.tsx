import React from 'react';
import { Check, CheckCheck, Pin, Users } from 'lucide-react';

interface ConversationItemProps {
  conversation: {
    wa_id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    profilePicture: string;
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
  const renderMessageStatus = () => {
    if (conversation.messageStatus === 'read') {
      return <CheckCheck className="w-4 h-4 text-[#53bdeb] mr-1" />;
    } else if (conversation.messageStatus === 'delivered') {
      return <CheckCheck className="w-4 h-4 text-gray-500 mr-1" />;
    } else if (conversation.messageStatus === 'sent') {
      return <Check className="w-4 h-4 text-gray-500 mr-1" />;
    }
    return null;
  };

  const renderProfilePicture = () => {
    if (conversation.isCommunity) {
      return (
        <div className="relative w-14 h-14 rounded-lg flex items-center justify-center mr-4">
          <img
            src={conversation.profilePicture}
            alt={`${conversation.name}'s profile`}
            className="w-10 h-10 rounded-full border-2 border-[#161717] absolute top-0 left-0"
          />
          <Users className="w-8 h-8 p-1 text-white bg-gray-600 rounded-full absolute bottom-0 right-0" />
        </div>
      );
    } else if (conversation.isGroup) {
      return (
        <div className="relative w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-4">
          <Users className="w-8 h-8 text-white" />
        </div>
      );
    }
    return (
      <img
        src={conversation.profilePicture}
        alt={`${conversation.name}'s profile`}
        className="w-12 h-12 rounded-full mr-4"
      />
    );
  };

  return (
    <div
      className={`flex items-center p-4 h-20 w-[99%] cursor-pointer rounded-xl hover:bg-[#2e2f2f] transition-colors ${
        isSelected ? 'bg-[#2e2f2f]' : 'bg-[#161717]'
      }`}
      onClick={onSelectConversation}
    >
      {/* Profile Picture */}
      {renderProfilePicture()}

      {/* Conversation Details */}
      <div className="flex-1">
        {conversation.isCommunity ? (
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">
                {conversation.CommunityName}
              </span>
              <span className="text-xs text-gray-400">
                {conversation.timestamp}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">
                {conversation.name}
              </span>
              <div className="flex items-center gap-2">
                {conversation.isPinned && <Pin className="w-4 h-4 text-gray-400" />}
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
            <div className="flex items-center mt-1 text-sm text-gray-400 truncate">
              {conversation.lastMessage}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">
                {conversation.name}
              </span>
              <span className="text-xs text-gray-400">
                {conversation.timestamp}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center text-sm text-gray-400 truncate">
                {conversation.messageStatus && renderMessageStatus()}
                {conversation.lastMessage}
              </div>
              <div className="flex items-center gap-2">
                {conversation.isPinned && <Pin className="w-4 h-4 text-gray-400" />}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
