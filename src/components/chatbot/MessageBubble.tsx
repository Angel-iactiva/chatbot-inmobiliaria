import React from "react";

interface MessageBubbleProps {
  user: string; 
  text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ user, text }) => {
  const isUser = user === "You";
  const avatarUrl = isUser
    ? `https://api.dicebear.com/6.x/avataaars/svg?seed=User`
    : `https://api.dicebear.com/6.x/avataaars/svg?seed=Bot`;

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
           dangerouslySetInnerHTML={{ __html: text }}
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
