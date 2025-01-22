import * as React from 'react';
import type { PriorityLevel } from '../../types/conversation';

interface PriorityBadgeProps {
  priority: PriorityLevel;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  return (
    <span className={`priority-badge priority-${priority.toLowerCase()}`}>
      {priority}
    </span>
  );
}; 