import * as React from 'react';
import type { Conversation } from '../../types/conversation';

interface ConversationItemProps {
  conversation: Conversation;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation }) => {
  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <h2>{conversation.contact.name}</h2>
        <div className="header-actions">
          <div className="platform-badges">
            {conversation.platforms.map(platform => (
              <span 
                key={platform} 
                className="platform-badge"
                data-platform={platform}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="message-history">
        {conversation.messages.map((message, index) => (
          <div 
            key={index} 
            className={`message-bubble ${message.platform.toLowerCase()}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <div className="message-meta">
                <span className="message-time">
                  {message.time.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
                <span 
                  className="platform-indicator"
                  data-platform={message.platform}
                >
                  {message.platform}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input 
          type="text" 
          placeholder="Type a message or use voice command..." 
          className="message-input-field"
        />
        <button className="send-button">
          <span role="img" aria-label="send">📤</span>
        </button>
      </div>
    </div>
  );
};