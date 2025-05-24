import { Box, Avatar } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { Person as UserIcon, SmartToy as AIIcon } from "@mui/icons-material";

const Message = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: message.sender === "user" ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 2,
        my: 2,
        px: 2,
        width: "100%",
      }}
    >
      <Avatar
        sx={{
          bgcolor:
            message.sender === "user" ? "primary.main" : "secondary.main",
          flexShrink: 0,
          width: 32, 
          height: 32,
          marginTop: "2px",
        }}
      >
        {message.sender === "user" ? <UserIcon /> : <AIIcon />}
      </Avatar>

      <Box
        sx={{
          maxWidth: { xs: "75%", sm: "80%" },
          px: 1.2,
          py: 0.5, 
          borderRadius: 3, 
          bgcolor:
            message.sender === "user" ? "primary.light" : "background.paper",
          boxShadow: 1,
          lineHeight: 1.3,
          wordBreak: "break-word",
        }}
      >
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </Box>
    </Box>
  );
};

export default Message;
