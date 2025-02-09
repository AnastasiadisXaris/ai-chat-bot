import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";
import { SendHorizontal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateAIResponse } from "@/lib/ai";

interface Message {
  text: string;
  isUser: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Γεια σας! Πώς μπορώ να σας βοηθήσω;", isUser: false },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages((prev) => [...prev, { text: inputMessage, isUser: true }]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage);
      setMessages((prev) => [
        ...prev,
        { text: aiResponse || "Δεν είμαι σίγουρος, μπορείτε να επαναδιατυπώσετε;", isUser: false }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Σφάλμα! Δοκιμάστε ξανά.", isUser: false },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-center mb-6 bg-primary/10 rounded-lg p-4">
        <BookOpen className="w-6 h-6 mr-2 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Εκπαιδευτικός Βοηθός</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4 bg-secondary/5 rounded-lg p-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text} // ✅ Σωστή αναφορά στο text
            sender={message.isUser ? "user" : "bot"} // ✅ Σωστή μετατροπή της ιδιότητας
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2 pt-4 border-t">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Πληκτρολογήστε μήνυμα..."
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} size="icon">
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
