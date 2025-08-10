import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarSearch from './SidebarSearch';
import SidebarTabs from './SidebarTabs';
import ConversationsList from './ConversationsList';
import type { IConversationSummary } from '../../services/messageAPI';

interface SidebarProps {
    onSelectConversation: (conversation: IConversationSummary | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectConversation }) => {
    return (
        <div className="flex flex-col h-full bg-[#161717] md:border-r md:border-[#272828] max-w-[350px] w-full">
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
