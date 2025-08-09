import React from 'react';
import { Search } from 'lucide-react';

const SidebarSearch: React.FC = () => {
  return (
    <div className="p-2 items-center justify-center bg-[#161717]">
      <div className="relative w-[95%]">
      <input
          type="text"
          placeholder="Search or start a new chat"
          className="w-full pl-10 pr-4 py-2 text-sm bg-[#2e2f2f] text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#21c063] transition-colors placeholder:text-gray-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>
    </div>
  );
};

export default SidebarSearch;
