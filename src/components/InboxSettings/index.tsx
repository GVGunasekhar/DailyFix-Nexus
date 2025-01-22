import * as React from 'react';
import { useState } from 'react';

interface InboxSettingsProps {
  onClose: () => void;
}

export const InboxSettings: React.FC<InboxSettingsProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: '👥',
      label: 'New Group',
      action: () => console.log('Create new group'),
      color: '#1976D2'
    },
    {
      icon: '🔄',
      label: 'Sync Messages',
      action: () => console.log('Sync messages'),
      color: '#388E3C'
    },
    {
      icon: '🔔',
      label: 'Notification Settings',
      action: () => console.log('Open notification settings'),
      color: '#7B1FA2'
    },
    {
      icon: '🎨',
      label: 'Theme',
      action: () => console.log('Change theme'),
      color: '#E64A19'
    },
    {
      icon: '⭐',
      label: 'Starred Messages',
      action: () => console.log('View starred messages'),
      color: '#FFC107'
    },
    {
      icon: '📱',
      label: 'Connected Devices',
      action: () => console.log('Manage devices'),
      color: '#0097A7'
    },
    {
      icon: '🔒',
      label: 'Privacy',
      action: () => console.log('Privacy settings'),
      color: '#D32F2F'
    },
    {
      icon: '⚙️',
      label: 'General Settings',
      action: () => console.log('Open general settings'),
      color: '#455A64'
    }
  ];

  return (
    <div className="inbox-settings">
      <button 
        className="settings-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Inbox Settings"
      >
        <span role="img" aria-label="settings">⚙️</span>
      </button>
      
      {isOpen && (
        <div className="settings-dropdown">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="settings-item"
              onClick={() => {
                item.action();
                setIsOpen(false);
                onClose();
              }}
              style={{ color: item.color }}
            >
              <span 
                role="img" 
                aria-label={item.label}
                className="settings-icon"
              >
                {item.icon}
              </span>
              <span className="settings-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 