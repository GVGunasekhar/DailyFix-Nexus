import * as React from 'react';
import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
  type: 'message' | 'mention' | 'update' | 'alert';
}

interface NotificationPanelProps {
  onClose: () => void;
  onNotificationRead: () => void;
}

const styles = `
.notification-panel {
  position: absolute;
  top: 60px;
  right: 80px;
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.notification-title {
  margin: 0;
  font-size: 1.1rem;
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.notification-item:hover {
  background-color: #f8f9fa;
}

.notification-item.unread {
  background-color: #e3f2fd;
}

.notification-item.unread:hover {
  background-color: #bbdefb;
}

.notification-icon {
  font-size: 1.2rem;
  margin-top: 2px;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 500;
  margin: 0;
  font-size: 0.9rem;
}

.notification-message {
  color: #666;
  margin: 4px 0;
  font-size: 0.85rem;
}

.notification-time {
  color: #999;
  font-size: 0.75rem;
}

.notification-actions {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
}

.action-button {
  background: none;
  border: none;
  color: #0088cc;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 4px;
}

.action-button:hover {
  background-color: #f0f0f0;
}

.empty-notifications {
  padding: 32px 16px;
  text-align: center;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.empty-icon {
  font-size: 2rem;
  color: #ccc;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.empty-subtext {
  font-size: 0.8rem;
  color: #999;
  margin: 0;
}
`;

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose, onNotificationRead }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Message from Alice Smith',
      message: 'Can you review the Q1 report?',
      time: new Date('2024-02-20T10:00:00'),
      isRead: false,
      type: 'message'
    },
    {
      id: '2',
      title: 'You were mentioned by Bob Johnson',
      message: 'Hey @you, check out the new design files',
      time: new Date('2024-02-20T11:30:00'),
      isRead: false,
      type: 'mention'
    },
    {
      id: '3',
      title: 'System Update',
      message: 'New features have been added to the platform',
      time: new Date('2024-02-20T14:15:00'),
      isRead: true,
      type: 'update'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    onNotificationRead();
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return '💬';
      case 'mention': return '@';
      case 'update': return '🔄';
      case 'alert': return '⚠️';
      default: return '📢';
    }
  };

  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h3 className="notification-title">Notifications</h3>
        <button className="action-button" onClick={onClose}>×</button>
      </div>
      
      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <span className="notification-icon">
                {getNotificationIcon(notification.type)}
              </span>
              <div className="notification-content">
                <h4 className="notification-title">{notification.title}</h4>
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">
                  {notification.time.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-notifications">
            <span className="empty-icon">🔔</span>
            <p className="empty-text">No notifications yet</p>
            <p className="empty-subtext">You're all caught up!</p>
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="notification-actions">
          <button className="action-button" onClick={markAllAsRead}>
            Mark all as read
          </button>
          <button className="action-button" onClick={clearAll}>
            Clear all
          </button>
        </div>
      )}
      <style>{styles}</style>
    </div>
  );
}; 