import React, { useState, useRef, useEffect } from 'react';
import '../CSS/ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "How much is your delivery fees?",
    "Do you make custom PCs?",
    "Where are you located?"
  ];

  const getResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Specific responses
    if (lowerQuestion.includes('delivery fee') || lowerQuestion.includes('delivery fees') || lowerQuestion.includes('how much is delivery')) {
      return "Our delivery fees are 20dh in Marrakech and 70dh outside Marrakech";
    }
    if (lowerQuestion.includes('custom pc') || lowerQuestion.includes('costume pc') || lowerQuestion.includes('custom computer')) {
      return "Yes we make custom PCs! What do you want for yours?";
    }
    if (lowerQuestion.includes('where are you') || lowerQuestion.includes('located') || lowerQuestion.includes('location')) {
      return "We are located in Marrakech";
    }
    
    // Default random responses
    const predefinedResponses = [
      "Error check your internet connection",
      "This question is against my training",
      "Connection error check your internet connection",
      "This question will be sent to one of our team to help you",
      "I can't understand your question"
    ];
    return predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
  };

  const sendMessage = (message) => {
    // Add user message
    const userMessage = { text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot thinking and responding after 1 second
    setTimeout(() => {
      const botResponse = getResponse(message);
      const botMessage = { text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleSuggestedQuestionClick = (question) => {
    sendMessage(question);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>Help Bot</h3>
        <span>{isOpen ? '×' : '💬'}</span>
      </div>
      
      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Hello! How can I help you today?</p>
                <p>You can ask about:</p>
                <div className="suggested-questions">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggested-question-btn"
                      onClick={() => handleSuggestedQuestionClick(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;