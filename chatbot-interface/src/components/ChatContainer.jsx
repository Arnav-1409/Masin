import { useState, useRef } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  List, 
  ListItem, 
  Divider, 
  Button,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import Message from './Message';

const ChatContainer = ({ messages, onSendMessage, isLoading, messagesEndRef, onClearHistory }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleSend = () => {
    onSendMessage(inputValue);
    setInputValue('');
    inputRef.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
        <List sx={{ width: '100%' }}>
          {messages.length === 0 && (
            <ListItem sx={{ justifyContent: 'center', color: 'text.secondary' }}>
              Start a conversation with the chatbot...
            </ListItem>
          )}
          {messages.map((message, index) => (
            <div key={index}>
              <Message message={message} />
              {index < messages.length - 1 && <Divider variant="inset" component="li" />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          disabled={isLoading}
        />
        <IconButton 
          color="primary" 
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
        >
          <SendIcon />
        </IconButton>
      </Box>
      
      {messages.length > 0 && (
        <Button
          startIcon={<ClearIcon />}
          onClick={onClearHistory}
          sx={{ mt: 1, alignSelf: 'flex-end' }}
          size="small"
          color="error"
        >
          Clear History
        </Button>
      )}
    </Box>
  );
};

export default ChatContainer;