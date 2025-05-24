import { Box, Typography, Button, Paper } from '@mui/material';

const prompts = [
  "What is React?",
  "Which is the best selling book of 2025?",
  "Which song is trending on spotify?",
  "What's the difference between props and state?",
  "How to train for a marathon?"
];

const PromptSuggestions = ({ onSelect }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Suggested Prompts
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outlined"
            fullWidth
            sx={{ justifyContent: 'flex-start', textTransform: 'none', textAlign: 'left' }}
            onClick={() => onSelect(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default PromptSuggestions;