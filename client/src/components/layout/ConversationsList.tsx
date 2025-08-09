import React from 'react';
import ConversationItem from './ConversationItem';

// Define a type for the conversation item
interface IConversation {
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
}

const dummyConversations: IConversation[] = [
  {
    wa_id: '1',
    name: 'BCOC/JOBS',
    lastMessage: '+91 98671 40777: Yes Thanks',
    timestamp: '10:51',
    profilePicture: 'https://placehold.co/50x50/333333/ffffff?text=BC',
    isCommunity: true,
    CommunityName: 'BCOC JOB PLATFORM',
    isPinned: true,
    unreadCount: 6,
    messageStatus: undefined,
  },
  {
    wa_id: '2',
    name: 'BOYZZZ of A1',
    lastMessage: 'Madaniya: Ho sakta hai',
    timestamp: '00:32',
    profilePicture: 'https://placehold.co/50x50/007bff/ffffff?text=BOYZ',
    isGroup: true,
    isPinned: true,
    unreadCount: 20,
    messageStatus: undefined,
  },
  {
    wa_id: '3',
    name: 'Hemal New',
    lastMessage: '.',
    timestamp: '00:22',
    profilePicture: 'https://placehold.co/50x50/e0e0e0/333333?text=H',
    isPinned: false,
    unreadCount: 1,
    messageStatus: undefined,
  },
  {
    wa_id: '4',
    name: 'Janvi 😀',
    lastMessage: 'https://www.instagram.com/reel/DNB...',
    timestamp: 'Yesterday',
    profilePicture: 'https://placehold.co/50x50/e0e0e0/333333?text=J',
    isPinned: false,
    unreadCount: 1,
    messageStatus: undefined,
  },
  {
    wa_id: '5',
    name: 'Zoppli - Founders',
    lastMessage: 'Aakash Internship: Thik he',
    timestamp: 'Yesterday',
    profilePicture: 'https://placehold.co/50x50/007bff/ffffff?text=ZF',
    isGroup: true,
    isPinned: false,
    unreadCount: 1,
    messageStatus: undefined,
  },
  {
    wa_id: '6',
    name: 'IMP_CODES&NOTES',
    lastMessage: 'You: 📝 GIF GIF',
    timestamp: '9/7/2025',
    profilePicture: 'https://placehold.co/50x50/cccccc/333333?text=IC',
    isPinned: true,
    messageStatus: 'read',
  },
  {
    wa_id: '7',
    name: 'Ankit',
    lastMessage: 'You: 🖼️ Photo',
    timestamp: 'Yesterday',
    profilePicture: 'https://placehold.co/50x50/e0e0e0/333333?text=A',
    isPinned: true,
    messageStatus: 'read',
  },
  {
    wa_id: '5',
    name: 'Zoppli - Founders',
    lastMessage: 'Aakash Internship: Thik he',
    timestamp: 'Yesterday',
    profilePicture: 'https://placehold.co/50x50/007bff/ffffff?text=ZF',
    isGroup: true,
    isPinned: false,
    unreadCount: 1,
    messageStatus: undefined,
  },
  {
    wa_id: '6',
    name: 'IMP_CODES&NOTES',
    lastMessage: 'You: 📝 GIF GIF',
    timestamp: '9/7/2025',
    profilePicture: 'https://placehold.co/50x50/cccccc/333333?text=IC',
    isPinned: true,
    messageStatus: 'read',
  },
  {
    wa_id: '7',
    name: 'Ankit',
    lastMessage: 'You: 🖼️ Photo',
    timestamp: 'Yesterday',
    profilePicture: 'https://placehold.co/50x50/e0e0e0/333333?text=A',
    isPinned: true,
    messageStatus: 'read',
  },
  {
    wa_id: '5',
    name: 'Zoppli - Founders',
    lastMessage: 'Aakash Internship: Thik he',
    timestamp: 'Yesterday',
    profilePicture: 'https://placehold.co/50x50/007bff/ffffff?text=ZF',
    isGroup: true,
    isPinned: false,
    unreadCount: 1,
    messageStatus: undefined,
  },
  {
    wa_id: '6',
    name: 'IMP_CODES&NOTES',
    lastMessage: 'You: 📝 GIF GIF',
    timestamp: '9/7/2025',
    profilePicture: 'https://placehold.co/50x50/cccccc/333333?text=IC',
    isPinned: true,
    messageStatus: 'read',
  },
  {
    wa_id: '7',
    name: 'Ankit',
    lastMessage: 'You: 🖼️ Photo',
    timestamp: 'Yesterday',
    profilePicture: 'https://placehold.co/50x50/e0e0e0/333333?text=A',
    isPinned: true,
    messageStatus: 'read',
  },
];

interface ConversationsListProps {
  onSelectConversation: (conversation: any) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ onSelectConversation }) => {
  return (
    <>
      <style>
        {`
          /* For Webkit browsers like Chrome, Safari */
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4a5568;
            border-radius: 3px;
          }

          /* For Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #4a5568 transparent;
          }
        `}
      </style>
      <div className="flex flex-col pl-1 items-start justify-start h-screen overflow-y-auto custom-scrollbar">
        {dummyConversations.map((conv) => (
          <ConversationItem
            key={conv.wa_id}
            conversation={conv}
            onSelectConversation={() => onSelectConversation(conv)}
          />
        ))}
      </div>
    </>
  );
};

export default ConversationsList;
