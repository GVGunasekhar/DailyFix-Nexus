import * as React from 'react';
import { useState, useEffect } from 'react';

interface SettingsMenuProps {
  onClose: () => void;
}

const styles = `
.settings-menu {
  position: fixed;
  top: 60px;
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 16px;
  min-width: 250px;
  z-index: 1000;
}

.settings-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.mode-options {
  display: flex;
  gap: 12px;
}

.mode-option {
  flex: 1;
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.mode-option.active {
  border-color: #1a73e8;
  background: #e8f0fe;
  color: #1a73e8;
}

.mode-option:hover {
  border-color: #1a73e8;
}

.mode-icon {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.mode-label {
  font-size: 0.9rem;
  font-weight: 500;
}

[data-display-mode='phone'] {
  .app-container {
    max-width: 480px;
    margin: 0 auto;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    height: 100vh;
    overflow-y: auto;
  }

  .conversation-view,
  .message-list,
  .app-nav {
    max-width: 480px;
    margin: 0 auto;
  }
}

[data-display-mode='laptop'] {
  .app-container,
  .conversation-view,
  .message-list {
    max-width: none;
    margin: 0;
  }
}
`;

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const [displayMode, setDisplayMode] = useState<'phone' | 'laptop'>(() => {
    return localStorage.getItem('displayMode') as 'phone' | 'laptop' || 'laptop';
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.settings-menu') && !target.closest('.settings-button')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const savedMode = localStorage.getItem('displayMode') as 'phone' | 'laptop' || 'laptop';
    document.documentElement.setAttribute('data-display-mode', savedMode);
    setDisplayMode(savedMode);
  }, []);

  const handleModeChange = (mode: 'phone' | 'laptop') => {
    setDisplayMode(mode);
    document.documentElement.setAttribute('data-display-mode', mode);
    localStorage.setItem('displayMode', mode);
    window.dispatchEvent(new Event('resize'));
  };

  return (
    <div className="settings-menu">
      <div className="settings-title">Display Settings</div>
      <div className="mode-options">
        <div 
          className={`mode-option ${displayMode === 'phone' ? 'active' : ''}`}
          onClick={() => handleModeChange('phone')}
        >
          <div className="mode-icon">📱</div>
          <div className="mode-label">Phone View</div>
        </div>
        <div 
          className={`mode-option ${displayMode === 'laptop' ? 'active' : ''}`}
          onClick={() => handleModeChange('laptop')}
        >
          <div className="mode-icon">💻</div>
          <div className="mode-label">Laptop View</div>
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}; 