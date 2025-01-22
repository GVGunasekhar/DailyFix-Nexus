import * as React from 'react';

interface NotificationPopupProps {
  onClose: () => void;
}

const styles = `
.notification-popup {
  position: absolute;
  top: 60px;
  right: 80px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  min-width: 200px;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.notification-popup p {
  margin: 0;
  color: #666;
}

.notification-popup::before {
  content: '';
  position: absolute;
  top: -8px;
  right: 40px;
  width: 16px;
  height: 16px;
  background: white;
  transform: rotate(45deg);
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}
`;

export const NotificationPopup: React.FC<NotificationPopupProps> = ({ onClose }) => {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-popup')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div className="notification-popup">
      <p>No notifications yet</p>
      <style>{styles}</style>
    </div>
  );
}; 