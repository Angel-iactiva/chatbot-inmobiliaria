// src/components/chatbot/ChatWindow.tsx

import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import BotThinking from "./BotThinking";
import QuickReplies from "./QuickReplies";
import ProductCarousel from "./ProductCarousel";


type TChatWindowProps = {
    messages: any[];
    isConnected: boolean;
    sendMessage: (message: string) => void;
}

export interface Product {
    nombre: string;
    [key: string]: string | undefined; // Clave dinámica para otras propiedades
}

function parseProducts(response: string): Product[] {
    const productRegex = /\d+\.\s\*\*(.*?)\*\* ([^\n]+)|-\s\*\*(.*?)\*\* ([^\n]+)/g; // Soporta ambos formatos
    const propertyRegex = /\[([\w]+)\]\((.*?)\)/g; // Extrae propiedades y valores

    const products: Product[] = [];
    let match: RegExpExecArray | null;

    while ((match = productRegex.exec(response)) !== null) {
        const productName = match[1] || match[3]; // Captura el nombre del producto
        const propertiesString = match[2] || match[4]; // Captura las propiedades del producto

        const product: Product = { nombre: productName }; // Inicializa con el nombre
        let propMatch: RegExpExecArray | null;

        while ((propMatch = propertyRegex.exec(propertiesString)) !== null) {
            const key = propMatch[1];
            const value = propMatch[2];
            product[key] = value;
        }

        products.push(product);
    }

    return products;
}


function formatResponseHTML(response: string): string {
    const productRegex = /\d+\.\s\*\*(.*?)\*\* ([^\n]+)|-\s\*\*(.*?)\*\* ([^\n]+)/g; // Soporta ambos formatos
    const propertyRegex = /\[([\w]+)\]\((.*?)\)/g;

    let formattedHTML = response.split("\n")[0] + "<br>"; // Mantiene la primera línea intacta
    let match: RegExpExecArray | null;

    while ((match = productRegex.exec(response)) !== null) {
        const productName = match[1] || match[3];
        const propertiesString = match[2] || match[4];

        let productHTML = `<strong>- ${productName}</strong><br>`; // Título en negritas
        let propMatch: RegExpExecArray | null;

        while ((propMatch = propertyRegex.exec(propertiesString)) !== null) {
            const key = propMatch[1];
            const value = propMatch[2];

            if (key.toLowerCase() === "imagen") continue; // Excluir 'imagen'
            productHTML += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}<br>`;
        }

        formattedHTML += productHTML + "<br>"; // Salto entre productos
    }

    return formattedHTML;
}



const ChatWindow: React.FC<TChatWindowProps> = ({ messages, isConnected, sendMessage }) => {
    const [userMessages, setUserMessages] = useState<{ user: string; text: string; records?: Product[] }[]>([
        {
            user: "Bot",
            text: "¡Hola! Bienvenido a Dessa Muebles. ¿En qué puedo ayudarte hoy?",
            records: [],
        },
    ]);
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        console.log(isConnected);
    }, [isConnected]);


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
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];

            // Asegurarse de que el último mensaje tenga texto válido
            if (!lastMessage?.response) return;

            const lastMessageText = lastMessage.response;

            // Parsear productos y formatear el mensaje
            const products = parseProducts(lastMessageText);
            const formattedText = formatResponseHTML(lastMessageText);

            console.log("Original Message:", lastMessageText);

            // Agregar el nuevo mensaje al estado
            const newMessage = {
                user: "Bot",
                text: formattedText,
                records: products,
            };

            console.log("Formatted Message:", newMessage);
            setUserMessages((prev) => [...prev, newMessage]);
            setIsThinking(false);
        }
    }, [messages]);


    return (
        <div className="fixed bottom-20 right-10 w-96 min-h-96 max-h-[70vh] bg-secondary shadow-lg rounded-lg flex flex-col">
            <div className="bg-primary text-white p-4 text-center rounded-t-lg">Chatbot</div>
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
            {!isThinking && <QuickReplies onReply={handleSendMessage} />}
        </div>
    );
};

export default ChatWindow;
