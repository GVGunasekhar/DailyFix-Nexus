import * as React from 'react';

interface AvatarProps {
  name: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="avatar" style={{ backgroundColor: name === 'Alice Smith' ? '#007AFF' : '#007AFF' }}>
      {initials}
    </div>
  );
}; 