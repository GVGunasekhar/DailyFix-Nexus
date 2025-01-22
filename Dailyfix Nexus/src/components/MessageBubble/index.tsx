import React, { useState } from 'react';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  onReaction: (messageId: string, reaction: string) => void;
}

const styles = `
.message-bubble {
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
  background: white;
  margin-bottom: 8px;
}

.message-reactions {
  position: absolute;
  bottom: -30px;
  right: 0;
  z-index: 1;
}

.reaction-picker {
  display: flex;
  gap: 4px;
  padding: 8px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.reaction-picker button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.2s;
}

.reaction-picker button:hover {
  transform: scale(1.2);
}
`;

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onReaction }) => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div 
      className="message-bubble"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <div className="message-content">
        {message.text}
      </div>
      <div className="message-meta">
        <span className="message-time">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      <div className="message-reactions">
        {showReactions && (
          <div className="reaction-picker">
            {['👍', '❤️', '😂', '😮', '😢', '👏'].map(emoji => (
              <button 
                key={emoji} 
                onClick={() => onReaction(message.id, emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
      <style>{styles}</style>
    </div>
  );
}; 