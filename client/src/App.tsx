import { useState } from 'react';
import LeftIcons from './components/layout/LeftIcons';
import Sidebar from './components/layout/Sidebar';
import NoChatSelected from './components/layout/NoChatSelected';
import ChatWindow from './components/layout/ChatWindow';
import ErrorBoundary from './components/ErrorBoundary';
import type { IConversationSummary } from './services/messageAPI';

function App() {
  // State to manage the currently selected conversation
  const [selectedConversation, setSelectedConversation] = useState<IConversationSummary | null>(null);

  return (
    <ErrorBoundary>
      <div className="flex w-full h-screen font-sans bg-gray-200">
        {/* Main App Container */}
        <div className="w-full h-full bg-white shadow-xl overflow-hidden md:grid md:grid-cols-[60px_350px_1fr]">

          {/* Leftmost Icons Panel - Always visible on desktop */}
          <div className="hidden md:block">
            <LeftIcons />
          </div>

          {/* Sidebar (Conversations List) */}
          {/* On mobile, this takes the full screen. On desktop, it takes a fixed column. */}
          <div className={`h-full md:col-span-1 ${selectedConversation ? 'hidden md:block' : 'block'}`}>
            <ErrorBoundary>
              <Sidebar onSelectConversation={setSelectedConversation} />
            </ErrorBoundary>
          </div>

          {/* Main View (Chat Window or No Chat Selected) */}
          {/* On mobile, this is hidden until a conversation is selected. On desktop, it's always visible. */}
          <div className={`h-full md:col-span-1 ${selectedConversation ? 'block' : 'hidden md:block'}`}>
            <ErrorBoundary>
              {selectedConversation ? (
                // If a conversation is selected, render the ChatWindow
                <ChatWindow conversation={selectedConversation} onBack={() => setSelectedConversation(null)} />
              ) : (
                // Default view when no conversation is selected
                <NoChatSelected />
              )}
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
  
}

export default App;
