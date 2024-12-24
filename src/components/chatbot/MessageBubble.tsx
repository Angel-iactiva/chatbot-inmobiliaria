import React from "react";
import MarkdownIt from 'markdown-it';

interface MessageBubbleProps {
  user: string; 
  text: string;
}

const md = new MarkdownIt();

const MessageBubble: React.FC<MessageBubbleProps> = ({ user, text }) => {
  const isUser = user === "You";
  const avatarUrl = isUser
    ? `https://api.dicebear.com/6.x/avataaars/svg?seed=User`
    : `https://api.dicebear.com/6.x/avataaars/svg?seed=Bot`;

    const renderedHTML = md.render(text); // Convierte Markdown a HTML

  return (
    <div className={`flex items-start ${isUser ? "justify-end" : "justify-start"} space-x-2`}>
      {!isUser && (
        <img
          src={avatarUrl}
          alt="Bot avatar"
          className="w-8 h-8 rounded-full"
        />
      )}
      <div
        className={`${isUser ? "bg-user text-black" : "bg-bot text-black"
          } p-3 rounded-lg max-w-xs shadow-md`}
           dangerouslySetInnerHTML={{ __html: renderedHTML }}
      >
        {/* {text} */}
      </div>
      {isUser && (
        <img
          src={avatarUrl}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
      )}
    </div>
  );
};

export default MessageBubble;
