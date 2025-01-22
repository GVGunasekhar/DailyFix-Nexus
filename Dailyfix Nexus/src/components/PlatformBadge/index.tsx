import * as React from 'react';
import type { Platform } from '../../types/conversation';

interface PlatformBadgeProps {
  platform: Platform;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform }) => {
  return (
    <span className={`platform-badge platform-${platform.toLowerCase()}`}>
      {platform}
    </span>
  );
}; 