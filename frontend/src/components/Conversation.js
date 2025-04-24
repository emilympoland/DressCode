// components/Conversation.js
'use client';
import { useState, useEffect } from 'react';
import '../app/globals.css';

export default function Conversation({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [requestInfo, setRequestInfo] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  useEffect(() => {
    // mock data - replace this later w/ integration!
    const mockRequestInfo = {
      status: 'pending', 
      itemImage: '/path-to-boot-image.jpg', // replace with image path when that is ready
      itemName: 'Hiking Boots',
      dateRange: 'From 4/5/25 - 4/9/25'
    };
    
    const mockMessages = [
      { id: 1, type: 'text', sender: 'other', content: 'Thank you so much!', timestamp: '10:30AM' },
      { id: 2, type: 'text', sender: 'user', content: 'Of course! enjoy :)', timestamp: '10:32AM' },
    ];
    
    setRequestInfo(mockRequestInfo);
    setMessages(mockMessages);
  }, [conversationId]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      type: 'text',
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  const handleAction = (action) => {
    // update request status based on action - how should this work?
    setRequestInfo({
      ...requestInfo,
      status: action === 'accept' ? 'approved' : 'declined'
    });
    
    // send to update API later when we integrate
  };
  
  return (
    <div className="conversation-container">
      <div className="message-list">
       
        <div className="request-card">
          {requestInfo && (
            <>
              {requestInfo.status === 'pending' && (
                <div className="borrow-request pending">
                  <h2>Requests to Borrow</h2>
                  <img src={requestInfo.itemImage} alt={requestInfo.itemName} className="item-image" />
                  <p className="date-range">{requestInfo.dateRange}</p>
                  <div className="action-buttons">
                    <button 
                      className="decline-button"
                      onClick={() => handleAction('decline')}
                    >
                      decline
                    </button>
                    <button 
                      className="accept-button"
                      onClick={() => handleAction('accept')}
                    >
                      accept
                    </button>
                  </div>
                </div>
              )}
              
              {requestInfo.status === 'approved' && (
                <div className="borrow-request approved">
                  <h2>You've Lent Nicole</h2>
                  <img src={requestInfo.itemImage} alt={requestInfo.itemName} className="item-image" />
                  <p className="date-range">{requestInfo.dateRange}</p>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* The Chat Messages Themselves */}
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
          >
            <div className="message-bubble">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message Input - how to get a keyboard here???? wait lol does it do that automatically? */}
      <div className="message-input-container">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button type="submit" className="send-button">SEND</button>
        </form>
      </div>
    </div>
  );
}