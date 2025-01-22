import * as React from 'react';
import { useState } from 'react';
import { MediaGallery } from '../MediaGallery';

interface ConversationSettingsProps {
  onClose: () => void;
}

const styles = `
.conversation-settings {
  position: absolute;
  top: 60px;
  right: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  min-width: 200px;
  border: 1px solid #e0e0e0;
}

.settings-item {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;
}

.settings-item:hover {
  background-color: #f5f5f5;
}

.settings-item.danger {
  color: #dc3545;
}

.settings-item span {
  font-size: 1.1rem;
}

.toggle-switch {
  margin-left: auto;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 20px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #2196F3;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}
`;

export const ConversationSettings: React.FC<ConversationSettingsProps> = ({ onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);

  const handleSearch = () => {
    const searchText = prompt('Enter text to search in chat:');
    if (searchText) {
      // Implement search functionality
      console.log('Searching for:', searchText);
    }
    onClose();
  };

  const handleMedia = () => {
    setShowMediaGallery(true);
    onClose();
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    console.log('Notifications', !isMuted ? 'muted' : 'unmuted');
  };

  const handleExport = () => {
    // Create a sample chat export
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: [
        // Add your actual chat messages here
        { sender: "User", message: "Hello", timestamp: new Date().toISOString() },
        // ... more messages
      ]
    };

    // Convert chat data to a string
    const chatString = JSON.stringify(chatData, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([chatString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString()}.json`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    onClose();
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this chat? This action cannot be undone.')) {
      // Implement clear chat functionality
      console.log('Clearing chat');
      onClose();
    }
  };

  const handleBlock = () => {
    if (window.confirm('Are you sure you want to block this contact? They will no longer be able to send you messages.')) {
      // Implement block functionality
      console.log('Contact blocked');
      onClose();
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.conversation-settings') && !target.closest('.settings-button')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <>
      <div className="conversation-settings">
        <div className="settings-item" onClick={handleSearch}>
          <span role="img" aria-label="search">🔍</span>
          Search
        </div>
        <div className="settings-item" onClick={handleMedia}>
          <span role="img" aria-label="media">🖼️</span>
          Media
        </div>
        <div className="settings-item">
          <span role="img" aria-label="mute">🔕</span>
          Mute Notifications
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isMuted}
              onChange={handleMuteToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-item" onClick={handleExport}>
          <span role="img" aria-label="export">📤</span>
          Export Chat
        </div>
        <div className="settings-item" onClick={handleClearChat}>
          <span role="img" aria-label="clear">🗑️</span>
          Clear Chat
        </div>
        <div className="settings-item danger" onClick={handleBlock}>
          <span role="img" aria-label="block">⛔</span>
          Block
        </div>
      </div>
      {showMediaGallery && (
        <MediaGallery onClose={() => setShowMediaGallery(false)} />
      )}
      <style>{styles}</style>
    </>
  );
}; 