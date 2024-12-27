import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";
import { useWebSocket } from "../../../services/useWebSocket";

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { messages, isConnected, sendMessage, records} = useWebSocket("ws://localhost:5000/ws"); // Establecer la URL del WebSocket
    const { messages, isConnected, sendMessage, records } = useWebSocket("ws://chatbot-go-dessa-production.up.railway.app/ws"); 
    return (
        <div>
            <div
                className={`fixed bottom-16 right-4 w-72 bg-secondary shadow-lg rounded-lg flex flex-col ${isOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
            >
                <ChatWindow isConnected={isConnected} messages={messages} sendMessage={sendMessage} records={records} />
            </div>
            <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </div>
    );
}; 

export default Chatbot;
