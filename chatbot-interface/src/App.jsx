import { useState, useEffect, useRef } from 'react';
import { Box, CssBaseline, Container, Paper, Typography } from '@mui/material';
import { ChatContainer, PromptSuggestions } from './components';
import useChatStorage from './hooks/useChatStorage';
import './styles.css';

function App() {
  const { messages, addMessage, clearMessages } = useChatStorage();
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    addMessage({ text: message, sender: 'user' });
    setIsLoading(true);
    
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      addMessage({ text: aiResponse, sender: 'ai' });
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (message) => {
    const responses = [
      "I understand you're asking about: " + message,
      "That's an interesting question. Let me think...",
      "Here's what I found regarding your query: " + message,
      "I can help with that. The answer is...",
      "Thanks for your question! The response is..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Chatbot Interface
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <ChatContainer 
                messages={messages} 
                onSendMessage={handleSendMessage} 
                isLoading={isLoading} 
                messagesEndRef={messagesEndRef}
                onClearHistory={clearMessages}
              />
            </Paper>
          </Box>
          
          <Box sx={{ width: '300px', display: { xs: 'none', md: 'block' } }}>
            <PromptSuggestions onSelect={handleSendMessage} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;