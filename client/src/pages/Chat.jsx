import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import { Paper, Typography, Box, Grid, TextField, Button } from "@mui/material";

function Chat({ onClose }) {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();
  
    if (!message) return;
    setIsTyping(true);
  
    let msgs = [...chats];
  
    msgs.push({ role: "user", content: message });
    setChats(msgs);
  
    setMessage("");
  
    fetch("http://" + process.env.REACT_APP_PATH_API + "/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats: msgs,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let aiResponse = {
          role: data.role,
          content: data.output,
        };
        msgs.push(aiResponse);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };  

  return (
    <Paper>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem" }}>
      <Typography variant="h5" component="h1">
        Chat
      </Typography>
      <Button onClick={onClose}>X</Button>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto", padding: "1rem", height: "20vh", width: "20vw" }}>
        <Grid container spacing={2}>
          {chats.map((chat, index) => (
            <ChatBubble key={index} message={chat.content} sender={chat.role} />
          ))}
        </Grid>
      </Box>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing..." : ""}</i>
        </p>
      </div>

      <form onSubmit={(e) => chat(e, message)}>
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
        />
      </form>

      
    </Paper>
  );
}
export default Chat;