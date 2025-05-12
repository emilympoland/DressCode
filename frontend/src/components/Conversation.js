// components/Conversation.js
"use client";
import { useState, useEffect } from "react";
import "../app/globals.css";
import BorrowRequest from "./BorrowRequest";

export default function Conversation({ conversationId, userName }) {
  const [messages, setMessages] = useState([]);
  const [requestInfo, setRequestInfo] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const mockRequestInfo = {
      status: "pending",
      itemImage: "/path-to-boot-image.jpg",
      itemName: "Hiking Boots",
      dateRange: "From 4/5/25 - 4/9/25",
    };

    const mockMessages = [
      {
        id: 1,
        type: "text",
        sender: "other",
        content: "Thank you so much!",
        timestamp: "10:30AM",
      },
      {
        id: 2,
        type: "text",
        sender: "user",
        content: "Of course! enjoy :)",
        timestamp: "10:32AM",
      },
    ];

    setRequestInfo(mockRequestInfo);
    setMessages(mockMessages);
  }, [conversationId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      type: "text",
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleAction = (action) => {
    setRequestInfo({
      ...requestInfo,
      status: action === "accept" ? "approved" : "declined",
    });
    // send update to backend later
  };

  return (
    <div className="conversation-container">
      <div className="message-list">
        <BorrowRequest
          requestInfo={requestInfo}
          handleAction={handleAction}
          userName={userName}
        />

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "user" ? "sent" : "received"
            }`}
          >
            <div className="message-bubble">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="message-input-container">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
