import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI career assistant. I can help you with career guidance, resume tips, interview preparation, and job search strategies. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages.slice(1) // Exclude the initial greeting
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(data.conversationHistory);
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.'
          }
        ]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting. Please check your internet connection and try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getSuggestions = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/chatbot/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userProfile: user
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages([
          ...messages,
          {
            role: 'assistant',
            content: `Here are some personalized career suggestions for you:\n\n${data.suggestions}`
          }
        ]);
      }
    } catch (error) {
      console.error('Suggestions error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="chatbot-title">
          <span className="chatbot-icon">🤖</span>
          Career Assistant
        </div>
        <button className="chatbot-toggle">
          {isOpen ? '−' : '+'}
        </button>
      </div>

      {isOpen && (
        <div className="chatbot-body">
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-content">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-actions">
            {user && (
              <button className="suggestions-btn" onClick={getSuggestions} disabled={isLoading}>
                Get Career Suggestions
              </button>
            )}
          </div>

          <div className="chatbot-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about careers, jobs, resumes..."
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
