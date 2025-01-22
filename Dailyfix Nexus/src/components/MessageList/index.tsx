import * as React from 'react';
import { ConversationItem } from '../ConversationItem';
import type { Conversation, Platform, PriorityLevel } from '../../types/conversation';
import { useEffect, useState } from 'react';

interface MessageContent {
  id: string;
  text: string;
  platform: Platform;
  time: Date;
}

interface Message {
  id: string;
  sender: {
    name: string;
    initials: string;
    title?: string;
    priority: PriorityLevel;
  };
  content: string;
  priority: PriorityLevel;
  platforms: Platform[];
  time: Date;
  isNew?: boolean;
  unread?: boolean;
  isFromSender?: boolean;
  platformMessages?: {
    platform: Platform;
    messages: string[];
    lastActivity: Date;
    isFromSender: boolean;
    priority?: PriorityLevel;
  }[];
  messages?: MessageContent[];
}

interface MessageListProps {
  searchTerm: string;
  priorityFilter: string | null;
  onConversationSelect: (conversation: Conversation) => void;
  onStatsUpdate: (stats: { totalMessages: number; highPriority: number; pendingReplies: number }) => void;
}

const styles = `
.message-item {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s;
  background: #fff;
}

.message-item:hover {
  background-color: #f8f9fa;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #495057;
}

.contact-details {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-name {
  font-weight: 500;
  color: #212529;
  margin: 0;
}

.priority-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.priority-badge.high {
  background-color: #ffe3e3;
  color: #e03131;
}

.priority-badge.medium {
  background-color: #fff3bf;
  color: #f08c00;
}

.priority-badge.low {
  background-color: #d3f9d8;
  color: #2f9e44;
}

.platform-badges {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.platform-badge {
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
}

.platform-badge[data-platform="WhatsApp"] {
  background-color: #e7f5e4;
  color: #25D366;
}

.platform-badge[data-platform="Slack"] {
  background-color: #f3e5f5;
  color: #4A154B;
}

.platform-badge[data-platform="Matrix"] {
  background-color: #e3f2fd;
  color: #0088CC;
}

.platform-badge[data-platform="Email"] {
  background-color: #fff3e0;
  color: #f57c00;
}

.message-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-time {
  font-size: 0.75rem;
  color: #868e96;
}

.message-preview {
  color: #495057;
  font-size: 0.875rem;
  margin-left: 52px;  /* Aligns with the content after avatar */
}

.highlight {
  background-color: #fff3cd;
  padding: 2px;
  border-radius: 2px;
}
`;

export const MessageList: React.FC<MessageListProps> = ({ 
  searchTerm,
  priorityFilter,
  onConversationSelect,
  onStatsUpdate
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: { 
        name: 'Alice Smith', 
        initials: 'AS',
        title: 'Project Manager',
        priority: 'High'
      },
      content: 'Can you review the Q1 report?',
      priority: 'High',
      platforms: ['WhatsApp', 'Slack'],
      time: new Date('2024-02-20T10:00:00'),
      isNew: true,
      platformMessages: [
        {
          platform: 'WhatsApp' as Platform,
          messages: ['Can you review the Q1 report?'],
          isFromSender: true,
          lastActivity: new Date('2024-02-20T10:00:00')
        },
        {
          platform: 'WhatsApp' as Platform,
          messages: ["Of course! I will take a look right away."],
          isFromSender: false,
          lastActivity: new Date('2024-02-20T10:05:00')
        },
        {
          platform: 'Slack' as Platform,
          messages: ['Great, particularly interested in the sales projections.'],
          isFromSender: true,
          lastActivity: new Date('2024-02-20T10:07:00')
        }
      ]
    },
    {
      id: '2',
      sender: {
        name: 'Bob Johnson',
        initials: 'BJ',
        title: 'UI/UX Designer',
        priority: 'Medium'
      },
      content: 'Design files ready for review',
      priority: 'Medium',
      platforms: ['Matrix', 'Email'],
      time: new Date('2024-02-20T11:30:00'),
      isNew: true,
      unread: true,
      platformMessages: [
        {
          platform: 'Matrix' as Platform,
          messages: ['Design files ready for review'],
          isFromSender: true,
          lastActivity: new Date('2024-02-20T11:30:00')
        },
        {
          platform: 'Matrix' as Platform,
          messages: ['Thanks, I will check them now'],
          isFromSender: false,
          lastActivity: new Date('2024-02-20T11:35:00')
        },
        {
          platform: 'Email' as Platform,
          messages: ['UI components and layouts are ready for your feedback'],
          isFromSender: true,
          lastActivity: new Date('2024-02-20T11:32:00')
        },
        {
          platform: 'Email' as Platform,
          messages: ['Great work on the new components!'],
          isFromSender: false,
          lastActivity: new Date('2024-02-20T11:40:00')
        },
        {
          platform: 'Matrix' as Platform,
          messages: ['Let me know if any changes are needed'],
          isFromSender: true,
          lastActivity: new Date('2024-02-20T11:42:00')
        }
      ]
    },
    {
      id: '3',
      sender: {
        name: 'Carol White',
        initials: 'CW',
        title: 'Product Manager',
        priority: 'High'
      },
      content: 'Team meeting scheduled for tomorrow',
      priority: 'High',
      platforms: ['Slack'],
      time: new Date('2024-02-20T14:15:00'),
      platformMessages: [
        {
          platform: 'Slack' as Platform,
          messages: ['Team meeting scheduled for tomorrow at 10 AM'],
          isFromSender: true,
          lastActivity: new Date('2024-02-20T14:15:00')
        },
        {
          platform: 'Slack' as Platform,
          messages: ["I will be there, thanks for organizing"],
          isFromSender: false,
          lastActivity: new Date('2024-02-20T14:20:00')
        },
        {
          platform: 'Slack' as Platform,
          messages: ["Great, I will send the agenda shortly"],
          isFromSender: true,
          lastActivity: new Date('2024-02-20T14:25:00')
        }
      ]
    },
    {
      id: '4',
      sender: {
        name: 'David Brown',
        initials: 'DB',
        title: 'Senior Developer',
        priority: 'High'
      },
      content: 'Updated project timeline',
      priority: 'High',
      platforms: ['Email', 'WhatsApp'],
      time: new Date('2024-02-20T15:45:00'),
      isNew: true,
      isFromSender: true,
      messages: [
        {
          id: '4-1',
          text: 'Updated project timeline ready for review',
          platform: 'Email' as Platform,
          time: new Date('2024-02-20T15:45:00')
        },
        {
          id: '4-2',
          text: 'Please check your email for the timeline updates',
          platform: 'WhatsApp' as Platform,
          time: new Date('2024-02-20T15:47:00')
        }
      ]
    },
    {
      id: '5',
      sender: {
        name: 'Emma Davis',
        initials: 'ED',
        title: 'UX Designer',
        priority: 'Medium'
      },
      content: 'Client feedback on new features',
      priority: 'Medium',
      platforms: ['WhatsApp', 'Slack'],
      time: new Date('2024-02-20T16:30:00'),
      isFromSender: true,
      messages: [
        {
          id: '5-1',
          text: 'Initial feedback from client meeting',
          platform: 'WhatsApp' as Platform,
          time: new Date('2024-02-20T16:25:00')
        },
        {
          id: '5-2',
          text: 'Client feedback on new features documented',
          platform: 'Slack' as Platform,
          time: new Date('2024-02-20T16:30:00')
        }
      ]
    }
  ]);

  useEffect(() => {
    // Update stats whenever messages change
    const stats = {
      totalMessages: messages.length,
      highPriority: messages.filter(m => m.priority === 'High').length,
      pendingReplies: messages.filter(m => m.isNew).length
    };
    onStatsUpdate(stats);
  }, [messages, onStatsUpdate]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="messages-list">
      {messages.length > 0 ? (
        <div className="messages-container">
          {messages
            .filter(message => 
              (!searchTerm || 
                message.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) &&
              (!priorityFilter || message.priority === priorityFilter)
            )
            .map(message => (
              <div 
                key={message.id}
                className={`message-item ${message.isNew ? 'unread' : ''}`}
                onClick={() => onConversationSelect({
                  id: message.id,
                  contact: {
                    id: message.sender.initials.toLowerCase(),
                    name: message.sender.name
                  },
                  lastMessage: message.content,
                  platforms: message.platforms,
                  unreadCount: message.isNew ? 1 : 0,
                  priority: message.priority,
                  messages: (message.messages || []).map(msg => ({
                    id: `${message.id}-${msg.time.getTime()}`,
                    text: msg.text,
                    platform: msg.platform,
                    time: msg.time
                  })),
                  aiSuggestions: [],
                  contextualTags: [],
                  lastInteraction: message.time,
                  platformMessages: [
                    ...(message.id === '1' ? [
                      {
                        platform: 'WhatsApp' as Platform,
                        messages: ['Can you review the Q1 report?'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T10:00:00')
                      },
                      {
                        platform: 'WhatsApp' as Platform,
                        messages: ["Of course! I will take a look right away."],
                        isFromSender: false,
                        lastActivity: new Date('2024-02-20T10:05:00')
                      },
                      {
                        platform: 'Slack' as Platform,
                        messages: ['Great, particularly interested in the sales projections.'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T10:07:00')
                      }
                    ] : []),
                    ...(message.id === '2' ? [
                      {
                        platform: 'Matrix' as Platform,
                        messages: ['Design files ready for review'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T11:30:00')
                      },
                      {
                        platform: 'Matrix' as Platform,
                        messages: ['Thanks, I will check them now'],
                        isFromSender: false,
                        lastActivity: new Date('2024-02-20T11:35:00')
                      },
                      {
                        platform: 'Email' as Platform,
                        messages: ['UI components and layouts are ready for your feedback'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T11:32:00')
                      },
                      {
                        platform: 'Email' as Platform,
                        messages: ['Great work on the new components!'],
                        isFromSender: false,
                        lastActivity: new Date('2024-02-20T11:40:00')
                      },
                      {
                        platform: 'Matrix' as Platform,
                        messages: ['Let me know if any changes are needed'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T11:42:00')
                      }
                    ] : []),
                    ...(message.id === '3' ? [
                      {
                        platform: 'Slack' as Platform,
                        messages: ['Team meeting scheduled for tomorrow at 10 AM'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T14:15:00')
                      },
                      {
                        platform: 'Slack' as Platform,
                        messages: ["I will be there, thanks for organizing"],
                        isFromSender: false,
                        lastActivity: new Date('2024-02-20T14:20:00')
                      }
                    ] : []),
                    ...(message.id === '4' ? [
                      {
                        platform: 'Email' as Platform,
                        messages: ['Updated project timeline ready for review'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T15:45:00')
                      },
                      {
                        platform: 'WhatsApp' as Platform,
                        messages: ['Please check your email for the timeline updates'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T15:47:00')
                      }
                    ] : []),
                    ...(message.id === '5' ? [
                      {
                        platform: 'WhatsApp' as Platform,
                        messages: ['Initial feedback from client meeting'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T16:25:00')
                      },
                      {
                        platform: 'Slack' as Platform,
                        messages: ['Client feedback on new features documented'],
                        isFromSender: true,
                        lastActivity: new Date('2024-02-20T16:30:00')
                      }
                    ] : [])
                  ],
                  summary: undefined
                })}
              >
                <div className="message-content">
                  <div className="message-header">
                    <div className="contact-info">
                      <div className="contact-avatar">
                        {message.sender.initials}
                      </div>
                      <div className="contact-details">
                        <h3 className="contact-name">
                          {searchTerm ? 
                            highlightText(message.sender.name, searchTerm) : 
                            message.sender.name
                          }
                        </h3>
                        <span className={`priority-badge ${message.priority.toLowerCase()}`}>
                          {message.priority}
                        </span>
                      </div>
                    </div>
                    <div className="platform-badges">
                      {message.platforms.map(platform => (
                        <span 
                          key={platform}
                          className="platform-badge"
                          data-platform={platform}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="message-meta">
                    <div className="message-preview">
                      {message.content}
                    </div>
                    <span className="message-time">
                      {message.time.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="no-messages">
          <p>No conversations yet</p>
        </div>
      )}
    </div>
  );
};