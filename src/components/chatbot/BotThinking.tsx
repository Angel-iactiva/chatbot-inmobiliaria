import React from "react";

const BotThinking: React.FC = () => {
    return (
        <div className="flex items-center space-x-2 bg-bot text-black p-4 rounded-lg max-w-xs self-start shadow-md">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-400" />
        </div>
    );
};

export default BotThinking;


