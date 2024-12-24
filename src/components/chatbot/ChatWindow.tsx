// src/components/chatbot/ChatWindow.tsx

import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import BotThinking from "./BotThinking";
// import QuickReplies from "./QuickReplies";
import ProductCarousel from "./ProductCarousel";
import { Record } from '../../types/Record';


type TChatWindowProps = {
    messages: any[];
    isConnected: boolean;
    sendMessage: (message: string) => void;
    records: Record[];
}

const ChatWindow: React.FC<TChatWindowProps> = ({ messages, isConnected, sendMessage, records }) => {
    const [userMessages, setUserMessages] = useState<{ user: string; text: string; records?: Record[] }[]>([
        {
            user: "Bot",
            text: "¡Hola! Bienvenido a Dessa Muebles. ¿En qué puedo ayudarte hoy?",
            records: [],
        },
    ]);
    const [isThinking, setIsThinking] = useState(false);

    const handleSendMessage = async (message: string) => {
        if (!isConnected) {
            console.log("No está conectado al WebSocket.");
            return;
        }

        setUserMessages([...userMessages, { user: "You", text: message }]);
        setIsThinking(true);

        sendMessage(message);
    };

    useEffect(() => {
        if ((records?.length ?? 0) > 0 || messages.length > 0) {
            const newMessage = {
                user: "Bot",
                text: messages[messages.length - 1] || "No records available",
                records: records || [],
            };

            setUserMessages((prev) => [...prev, newMessage]);
            setIsThinking(false);
        }
    }, [records, messages]);


    return (
        <div
            className="fixed bottom-5   w-full min-h-96 max-h-[70vh] bg-secondary shadow-lg rounded-lg flex flex-col"
        >
            <div className="bg-primary text-white p-4 text-center rounded-t-lg ">
                Chatbot
            </div>
            <div className="flex-1 p-4 overflow-y-scroll space-y-2">
                {userMessages.map((msg, index) => (
                    <div key={index}>
                        <MessageBubble user={msg.user} text={msg.text} />
                        {msg.records && msg.records.length > 0 && (
                            <ProductCarousel records={msg.records} />
                        )}
                    </div>
                ))}

                {isThinking && (
                    <div className="flex justify-start">
                        <BotThinking />
                    </div>
                )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} isDisabled={isThinking} />
            {/* {!isThinking && <QuickReplies onReply={handleSendMessage} />} */}
        </div>

    );
};

export default ChatWindow;
