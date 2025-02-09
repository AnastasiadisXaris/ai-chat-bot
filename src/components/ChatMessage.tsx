import React from "react";

interface ChatMessageProps {
  message: string;
  sender: "user" | "bot";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div
      className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
        sender === "user"
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
      aria-label={sender === "user" ? "User message" : "Bot message"}
    >
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;
