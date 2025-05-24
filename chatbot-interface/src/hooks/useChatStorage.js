import { useState, useEffect } from 'react';

const useChatStorage = () => {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('chat-messages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
    sessionStorage.removeItem('chat-messages');
  };

  return { messages, addMessage, clearMessages };
};

export default useChatStorage;