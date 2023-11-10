import { Paper, Typography } from '@mui/material';

const ChatBubble = ({ message, sender }) => {
    return (
        <Paper
        elevation={3}
        sx={{
            display: "flex",
            justifyContent: sender === "user" ? "flex-start" : "flex-end",
            flexDirection: "column",
            width: "fit-content",
            padding: "1rem",
            margin: "1rem",
            borderRadius: "1rem",
            backgroundColor: sender === "user" ? "#fff" : "#00b7ff",
            color: sender === "user" ? "#000" : "#ffffff",
            textAlign: sender === "user" ? "right" : "left",
        }}
        >
        <Typography variant="caption">{sender}</Typography>
        <Typography variant="body1">{message}</Typography>
        </Paper>
    );
};

export default ChatBubble;