import { Lock } from 'lucide-react';
import Img from "../../assets/NoChat.png"

const NoChatSelected = () => {
    return (
        <div className="flex flex-col items-center justify-between h-screen bg-[#161717] p-8">
            <div className="w-full flex-grow flex flex-col items-center justify-center text-center">
                {/* Image of the WhatsApp Web graphic */}
                <img
                    src={Img}
                    alt="WhatsApp Web"
                    className="h-auto max-w-[400px] mb-4"
                />
                <h1 className="text-4xl font-light text-gray-400">WhatsApp Web</h1>
                <p className="mt-4 text-gray-500 max-w-sm">
                    Send and receive messages without keeping your phone online.
                    Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                </p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
                <Lock className="w-4 h-4 mr-1 mb-1" />
                Your personal messages are end-to-end encrypted
            </div>
        </div>
    );
};

export default NoChatSelected;
