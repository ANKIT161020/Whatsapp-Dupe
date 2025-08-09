import React, { useState } from 'react';

const SidebarTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const getButtonClass = (tabName: string) => {
    const baseClasses = 'px-3 py-1.5 border border-[#2d2e2e] rounded-full transition-colors cursor-pointer';
    const activeClasses = 'bg-[#103529] text-white font-semibold';
    const inactiveClasses = 'bg-transparent text-gray-400 hover:bg-[#202C33]';

    return `${baseClasses} ${activeTab === tabName ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="flex gap-2 p-2 bg-[#161717] text-sm">
      <button
        onClick={() => setActiveTab('All')}
        className={getButtonClass('All')}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab('Unread')}
        className={getButtonClass('Unread')}
      >
        Unread
      </button>
      <button
        onClick={() => setActiveTab('Favourites')}
        className={getButtonClass('Favourites')}
      >
        Favourites
      </button>
      <button
        onClick={() => setActiveTab('Groups')}
        className={getButtonClass('Groups')}
      >
        Groups
      </button>
    </div>
  );
};

export default SidebarTabs;
