import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarSearch from './SidebarSearch';
import SidebarTabs from './SidebarTabs';
import ConversationsList from './ConversationsList';

// Define a type for the conversation item
interface IConversation {
    wa_id: string;
    name: string;
}

interface SidebarProps {
    onSelectConversation: (conversation: IConversation | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectConversation }) => {
    return (
        <div className="flex flex-col h-full bg-[#161717] md:border-r md:border-[#272828]">
            {/* Top section of the sidebar */}
            <div className="bg-[#10191c]">
              <SidebarHeader />
              <SidebarSearch />
              <SidebarTabs />
            </div>
            
            {/* Conversation list takes up the rest of the space and is scrollable */}
            <div className="flex-1 overflow-y-auto">
              <ConversationsList onSelectConversation={onSelectConversation} />
            </div>
        </div>
    );
};

export default Sidebar;
