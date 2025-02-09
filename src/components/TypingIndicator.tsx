import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
    </div>
  );
};

export default TypingIndicator;
