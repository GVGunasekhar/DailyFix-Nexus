import * as React from 'react';
import { useState, useEffect } from 'react';
import { SearchBar } from '../SearchBar';
import { MessageList } from '../MessageList';
import { FilterButton } from '../FilterButton';
import { ConversationView } from '../ConversationView';
import type { Conversation } from '../../types/conversation';
import { Dashboard } from '../Dashboard';
import { ProfileUpload } from '../ProfileUpload';
import { NotificationPopup } from '../NotificationPopup';
import { MenuDropdown } from '../MenuDropdown';
import { SettingsMenu } from '../SettingsMenu';

interface MessageStats {
  totalMessages: number;
  highPriority: number;
  pendingReplies: number;
}

interface InboxProps {
  // ... existing props
}

const styles = `
.profile-button {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-icon {
  font-size: 1.2rem;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes popIn {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.app-title {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(
    45deg,
    #1a73e8 0%,
    #8833ff 25%,
    #1a73e8 50%,
    #8833ff 75%,
    #1a73e8 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  padding-left: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
  animation: 
    gradientShift 8s ease infinite,
    popIn 0.5s ease-out;
  position: relative;
}

.app-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 16px;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, #1a73e8, #8833ff);
  transition: width 0.3s ease;
}

.app-title:hover {
  transform: scale(1.02);
}

.app-title:hover::after {
  width: calc(100% - 16px);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: max-width 0.3s ease;
}

[data-display-mode='phone'] .app-container {
  max-width: var(--max-width-phone);
  margin: 0 auto;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}

[data-display-mode='phone'] .conversation-view,
[data-display-mode='phone'] .message-list,
[data-display-mode='phone'] .app-nav {
  max-width: var(--max-width-phone);
  margin: 0 auto;
}

[data-display-mode='laptop'] .app-container,
[data-display-mode='laptop'] .conversation-view,
[data-display-mode='laptop'] .message-list {
  max-width: none;
  margin: 0;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

[data-display-mode='phone'] .main-content {
  flex-direction: column;
}

.settings-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.settings-button:hover {
  background-color: #f5f5f5;
}
`;

export const Inbox: React.FC<InboxProps> = ({ /* ... props */ }) => {
  const [activeTab, setActiveTab] = React.useState('inbox');
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null);
  const [messageStats, setMessageStats] = React.useState<MessageStats>({
    totalMessages: 5,
    highPriority: 3,
    pendingReplies: 3
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Load profile image on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Add useEffect to handle initial display mode
  useEffect(() => {
    const savedMode = localStorage.getItem('displayMode') as 'phone' | 'laptop' || 'laptop';
    document.documentElement.setAttribute('data-display-mode', savedMode);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (priority: string | null) => {
    setPriorityFilter(priority);
  };

  // Add these handler functions before the return statement
  const handleSettingsSearch = (searchText: string) => {
    setSearchTerm(searchText);
  };

  const handleMediaView = () => {
    // Implement media view functionality
    console.log('Opening media view');
  };

  const handleWallpaperChange = () => {
    // Implement wallpaper change functionality
    console.log('Changing wallpaper');
  };

  const handleClearChat = () => {
    // Implement clear chat functionality
    console.log('Clearing chat');
  };

  const handleBlockContact = () => {
    // Implement block contact functionality
    console.log('Blocking contact');
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <button 
            className="menu-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <span className="menu-icon">☰</span>
          </button>
          {showMenu && (
            <MenuDropdown onClose={() => setShowMenu(false)} />
          )}
          <h1 className="app-title">DailyFix Nexus</h1>
        </div>
        <div className="header-right">
          <button 
            className="refresh-button"
            onClick={() => window.location.reload()}
            title="Refresh page"
          >
            <span role="img" aria-label="refresh">🔄</span>
          </button>
          <button 
            className="notifications-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications(!showNotifications);
            }}
          >
            <span role="img" aria-label="notifications">🔔</span>
          </button>
          {showNotifications && (
            <NotificationPopup onClose={() => setShowNotifications(false)} />
          )}
          <button 
            className="profile-button"
            onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%',
                  objectFit: 'cover' 
                }} 
              />
            ) : (
              <span className="profile-icon">👤</span>
            )}
          </button>
          {isProfileModalOpen && (
            <ProfileUpload onClose={() => setIsProfileModalOpen(false)} />
          )}
          <button 
            className="settings-button"
            onClick={() => setShowSettings(!showSettings)}
            title="Display Settings"
          >
            <span role="img" aria-label="settings">⚙️</span>
          </button>
          {showSettings && (
            <SettingsMenu onClose={() => setShowSettings(false)} />
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="app-nav">
        <button 
          onClick={() => handleTabClick('inbox')}
          className={`nav-link ${activeTab === 'inbox' ? 'active' : ''}`}
        >
          Inbox
        </button>
        <button 
          onClick={() => handleTabClick('dashboard')}
          className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'inbox' ? (
          <>
            <div className="inbox-container">
              <div className="inbox-header">
                <h2>Messages</h2>
                <FilterButton onFilterChange={handleFilterChange} />
              </div>
              
              <SearchBar onSearch={handleSearch} />
              <MessageList 
                searchTerm={searchTerm}
                onConversationSelect={setSelectedConversation}
                onStatsUpdate={setMessageStats}
                priorityFilter={priorityFilter}
              />
            </div>
            <ConversationView conversation={selectedConversation} />
          </>
        ) : (
          <Dashboard stats={messageStats} />
        )}
      </main>
    </div>
  );
}; 