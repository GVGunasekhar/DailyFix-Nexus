import * as React from 'react';
import { DailySummary } from '../DailySummary';

interface DashboardProps {
  stats: {
    totalMessages: number;
    highPriority: number;
    pendingReplies: number;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const priorityTasks = [
    {
      id: '1',
      title: 'Q1 Report Review',
      description: 'Review requested for Q1 financial report with focus on sales projections',
      urgent: true,
      platform: 'WhatsApp'
    },
    {
      id: '2',
      title: 'Team Meeting Schedule',
      description: 'Team meeting scheduled for tomorrow',
      urgent: true,
      platform: 'Slack'
    },
    {
      id: '3',
      title: 'Project Timeline Review',
      description: 'Updated project timeline ready for review',
      urgent: true,
      platform: 'Email'
    }
  ];

  return (
    <div className="dashboard-container">
      <DailySummary stats={stats} />
      
      {/* Priority Tasks Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <span className="section-icon">🎯</span>
          <h2>Priority Tasks</h2>
        </div>

        <div className="tasks-list">
          {priorityTasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <h3>{task.title}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <span className="platform-badge" data-platform={task.platform}>
                    {task.platform}
                  </span>
                  {task.urgent && (
                    <span className="urgent-badge">
                      <span role="img" aria-label="urgent">⚠️</span>
                      Urgent
                    </span>
                  )}
                </div>
              </div>
              <button className="task-action">
                <span role="img" aria-label="view">👉</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}; 