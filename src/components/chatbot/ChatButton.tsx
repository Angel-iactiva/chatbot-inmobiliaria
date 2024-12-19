import React from "react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-4 bg-primary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform duration-400 ${
        isOpen ? "rotate-45" : "rotate-0"
      }`}
    >
      {isOpen ? "✕" : "💬"}
    </button>
  );
};


export default ChatButton;
