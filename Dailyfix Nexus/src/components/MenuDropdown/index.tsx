import * as React from 'react';

interface MenuDropdownProps {
  onClose: () => void;
}

const styles = `
.menu-dropdown {
  position: absolute;
  top: 60px;
  left: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  min-width: 220px;
  border: 1px solid #e0e0e0;
}

.menu-dropdown::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 20px;
  width: 16px;
  height: 16px;
  background: white;
  transform: rotate(45deg);
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}

.menu-section {
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}

.menu-section:last-child {
  border-bottom: none;
}

.menu-item {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;
  text-decoration: none;
  position: relative;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.danger {
  color: #dc3545;
}

.menu-item span {
  font-size: 1.1rem;
}

.menu-item.with-submenu {
  position: relative;
}

.menu-item.with-submenu::after {
  content: '›';
  position: absolute;
  right: 16px;
  font-size: 1.2rem;
}

.submenu {
  position: absolute;
  left: 100%;
  top: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
  border: 1px solid #e0e0e0;
  display: none;
}

.menu-item.with-submenu:hover .submenu {
  display: block;
}

.submenu .menu-item.danger {
  color: #dc3545;
}

.submenu-title {
  padding: 12px 16px;
  font-weight: 500;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
}

.menu-item.selected {
  background-color: #e3f2fd;
  color: #1976d2;
}

.menu-item.selected::after {
  content: '✓';
  position: absolute;
  right: 16px;
  color: #1976d2;
}
`;

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('English');
  const [lessDataForCalls, setLessDataForCalls] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu-dropdown') && !target.closest('.menu-button')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="menu-dropdown">
      <div className="menu-section">
        <div className="menu-item with-submenu">
          <span role="img" aria-label="account">👤</span>
          Account
          <div className="submenu">
            <div className="submenu-title">Account Settings</div>
            <div className="menu-item">
              <span role="img" aria-label="security">🔐</span>
              Security
            </div>
            <div className="menu-item">
              <span role="img" aria-label="verification">✅</span>
              Two Step Verification
            </div>
            <div className="menu-item">
              <span role="img" aria-label="email">📧</span>
              Change Email
            </div>
            <div className="menu-item">
              <span role="img" aria-label="add-account">➕</span>
              Add Account
            </div>
            <div className="menu-item danger">
              <span role="img" aria-label="delete-account">🗑️</span>
              Delete Account
            </div>
          </div>
        </div>
        <div className="menu-item with-submenu">
          <span role="img" aria-label="privacy">🔒</span>
          Privacy
          <div className="submenu">
            <div className="submenu-title">Privacy Settings</div>
            <div className="menu-item">
              <span role="img" aria-label="profile-photo">📷</span>
              Profile Photo
            </div>
            <div className="menu-item">
              <span role="img" aria-label="about">ℹ️</span>
              About
            </div>
            <div className="menu-item">
              <span role="img" aria-label="status">💭</span>
              Status
            </div>
            <div className="menu-item">
              <span role="img" aria-label="read-receipts">👁️</span>
              Read Receipts
            </div>
            <div className="menu-item">
              <span role="img" aria-label="app-lock">🔐</span>
              App Lock
            </div>
            <div className="menu-item">
              <span role="img" aria-label="blocked">🚫</span>
              Blocked Contacts
            </div>
          </div>
        </div>
        <div className="menu-item with-submenu">
          <span role="img" aria-label="avatar">🎭</span>
          Avatar
          <div className="submenu">
            <div className="submenu-title">Avatar Settings</div>
            <div className="menu-item">
              <span role="img" aria-label="select-avatar">🖼️</span>
              Select Avatar
            </div>
            <div className="menu-item">
              <span role="img" aria-label="generate-avatar">✨</span>
              Generate Avatar
            </div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-item with-submenu">
          <span role="img" aria-label="language">🌐</span>
          App Language
          <div className="submenu">
            <div className="submenu-title">Select Language</div>
            <div 
              className={`menu-item ${selectedLanguage === 'English' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('English')}
            >
              <span role="img" aria-label="english">🇺🇸</span>
              English
            </div>
            <div 
              className={`menu-item ${selectedLanguage === 'Spanish' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('Spanish')}
            >
              <span role="img" aria-label="spanish">🇪🇸</span>
              Español
            </div>
            <div 
              className={`menu-item ${selectedLanguage === 'French' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('French')}
            >
              <span role="img" aria-label="french">🇫🇷</span>
              Français
            </div>
            <div 
              className={`menu-item ${selectedLanguage === 'German' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('German')}
            >
              <span role="img" aria-label="german">🇩🇪</span>
              Deutsch
            </div>
            <div 
              className={`menu-item ${selectedLanguage === 'Chinese' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('Chinese')}
            >
              <span role="img" aria-label="chinese">🇨🇳</span>
              中文
            </div>
            <div 
              className={`menu-item ${selectedLanguage === 'Japanese' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('Japanese')}
            >
              <span role="img" aria-label="japanese">🇯🇵</span>
              日本語
            </div>
            <div 
              className={`menu-item ${selectedLanguage === 'Korean' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('Korean')}
            >
              <span role="img" aria-label="korean">🇰🇷</span>
              한국어
            </div>
            <div 
              className={`menu-item ${selectedLanguage === 'Hindi' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('Hindi')}
            >
              <span role="img" aria-label="hindi">🇮🇳</span>
              हिन्दी
            </div>
          </div>
        </div>
        <div className="menu-item with-submenu">
          <span role="img" aria-label="storage">💾</span>
          Storage & Data
          <div className="submenu">
            <div className="submenu-title">Storage & Data Settings</div>
            <div className="menu-item">
              <span role="img" aria-label="manage-storage">📊</span>
              Manage Storage
            </div>
            <div 
              className="menu-item"
              onClick={() => setLessDataForCalls(!lessDataForCalls)}
            >
              <span role="img" aria-label="less-data">📱</span>
              Use Less Data for Calls
              <span style={{ 
                marginLeft: 'auto', 
                color: lessDataForCalls ? '#2196f3' : '#666'
              }}>
                {lessDataForCalls ? 'ON' : 'OFF'}
              </span>
            </div>
            <div className="menu-item">
              <span role="img" aria-label="network">📶</span>
              Network Usage
            </div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-item with-submenu">
          <span role="img" aria-label="help">❓</span>
          Help
          <div className="submenu">
            <div className="submenu-title">Help & Info</div>
            <div className="menu-item">
              <span role="img" aria-label="help-centre">💡</span>
              Help Centre
            </div>
            <div className="menu-item">
              <span role="img" aria-label="terms">📜</span>
              Terms & Privacy Policy
            </div>
            <div className="menu-item">
              <span role="img" aria-label="reports">📊</span>
              Channel Reports
            </div>
            <div className="menu-item">
              <span role="img" aria-label="app-info">ℹ️</span>
              App Info
            </div>
          </div>
        </div>
        <div className="menu-item with-submenu">
          <span role="img" aria-label="invite">✉️</span>
          Invite Friend
          <div className="submenu">
            <div className="submenu-title">Invite Options</div>
            <div className="menu-item">
              <span role="img" aria-label="share-link">🔗</span>
              Share Link
            </div>
            <div className="menu-item">
              <span role="img" aria-label="contacts">👥</span>
              From Contacts
            </div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-item danger" onClick={handleLogout}>
          <span role="img" aria-label="logout">🚪</span>
          Logout
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}; 