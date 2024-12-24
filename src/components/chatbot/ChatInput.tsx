import { useState } from "react";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isDisabled: boolean;
  }
  
  const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isDisabled }) => {
    const [input, setInput] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim() === "") return;
      onSendMessage(input);
      setInput("");
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex p-2 bg-white border-t ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingresa un mensaje..."
          className="flex-1 border rounded-l-lg p-2 focus:outline-none"
          disabled={isDisabled}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4  hover:bg-purple-700 disabled:bg-gray-400"
          disabled={isDisabled}
        >
          Enviar
        </button>
      </form>
    );
  };
  
  export default ChatInput;
  