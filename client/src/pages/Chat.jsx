import { useState } from "react";
import ChatBubble from "../components/ChatBubble";

function Chat() {
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
  
    fetch("http://localhost:3004/chat", {
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
    <main>
      <h1>Chatbot</h1>

      <section sx={{ flexGrow: 1, overflow: "auto" }}>
        {chats && chats.length
          ? chats.map((chat, index) => (
            <ChatBubble
              key={index}
              message={chat.content}
              sender={chat.role}
            />  
            ))
          : ""}

      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing..." : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Entrez votre message et cliquez sur Entrée..."
          onChange={(e) => setMessage(e.target.value)}          
        />
      </form>
    </main>
  );
}
export default Chat;