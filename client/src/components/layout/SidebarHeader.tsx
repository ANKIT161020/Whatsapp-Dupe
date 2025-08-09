import React from 'react';
import { SquarePen, EllipsisVertical } from 'lucide-react';

const SidebarHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#161717] text-white">
      <h1 className="text-xl font-bold">WhatsApp</h1>
      <div className="flex gap-4">
        <SquarePen className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
        <EllipsisVertical className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
      </div>
    </div>
  );
};

export default SidebarHeader;
