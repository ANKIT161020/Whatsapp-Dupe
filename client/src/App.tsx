import { useState } from 'react';
import LeftIcons from './components/layout/LeftIcons';
import Sidebar from './components/layout/Sidebar';
import NoChatSelected from './components/layout/NoChatSelected';
import ChatWindow from './components/layout/ChatWindow';

// Define the shape of a conversation to pass as a prop
// We'll replace this with a real type later
interface IConversation {
  wa_id: string;
  name: string;
}

function App() {
  // State to manage the currently selected conversation
  const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null);

  return (
    <div className="flex w-full h-screen font-sans bg-gray-200">
      {/* Main App Container */}
      <div className="w-full h-full bg-white shadow-xl overflow-hidden md:grid md:grid-cols-[0.3fr_2.3fr_5fr]">

        {/* Leftmost Icons Panel - Always visible on desktop */}
        <div className="hidden md:block">
          <LeftIcons />
        </div>

        {/* Sidebar (Conversations List) */}
        {/* On mobile, this takes the full screen. On desktop, it takes a fixed column. */}
        <div className={`h-full md:col-span-1 ${selectedConversation ? 'hidden md:block' : 'block'}`}>
          <Sidebar onSelectConversation={setSelectedConversation} />
        </div>

        {/* Main View (Chat Window or No Chat Selected) */}
        {/* On mobile, this is hidden until a conversation is selected. On desktop, it's always visible. */}
        <div className={`h-full md:col-span-1 ${selectedConversation ? 'block' : 'hidden md:block'}`}>
          {selectedConversation ? (
            // If a conversation is selected, render the ChatWindow
            <ChatWindow conversation={selectedConversation} onBack={() => setSelectedConversation(null)} />
          ) : (
            // Default view when no conversation is selected
            <NoChatSelected />
          )}
        </div>
      </div>
    </div>
  );
  
}

export default App;
