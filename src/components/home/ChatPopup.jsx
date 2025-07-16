// src/components/ChatPopup.jsx
import React, { useState } from 'react';

const ChatPopup = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    const botMessage = { from: "bot", text: input }; // Just echo for now
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="fixed md:bottom-36 md:right-24 bottom-20 right-5 bg-white border shadow-lg w-80 rounded-xl overflow-hidden flex flex-col z-50">
      <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
        <h4 className="text-sm font-semibold">GrantU AI Assistant</h4>
        <button onClick={onClose} className="text-white font-bold">×</button>
      </div>
      <div className="p-3 h-60 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`text-${msg.from === "user" ? "right" : "left"}`}>
            <div className={`inline-block px-3 py-2 rounded-lg ${msg.from === "user" ? "bg-blue-100" : "bg-gray-200"}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex border-t px-2 py-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow px-2 py-1 outline-none text-sm"
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="text-green-600 px-2 text-sm font-semibold">Send</button>
      </div>
    </div>
  );
};

export default ChatPopup;
