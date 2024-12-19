import React, {  useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";
import { useWebSocket } from "../../../services/websocket";

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { messages, isConnected, sendMessage } = useWebSocket("ws://localhost:5000/ws"); // Establecer la URL del WebSocket
    const { messages, isConnected, sendMessage } = useWebSocket("ws://chatbot-backend-dessa-production.up.railway.app/ws"); // Establecer la URL del WebSocket

    return (
        <div>
            <div
                className={`fixed bottom-4 right-4 w-96 bg-secondary shadow-lg rounded-lg flex flex-col ${isOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
            >
                <ChatWindow isConnected={isConnected} messages={messages} sendMessage={sendMessage} />
            </div>
            <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </div>
    );
};

export default Chatbot;
