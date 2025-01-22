import * as React from 'react';
import { ReportGenerator } from '../ReportGenerator';
import { ExportOptions } from '../ExportOptions';

interface DailySummaryProps {
  stats: {
    totalMessages: number;
    highPriority: number;
    pendingReplies: number;
  };
}

export const DailySummary: React.FC<DailySummaryProps> = ({ stats }) => {
  const [showReport, setShowReport] = React.useState(false);

  const handleGenerateReport = () => {
    setShowReport(true);
  };

  return (
    <section className="summary-section">
      <div className="section-header">
        <span className="section-icon">📋</span>
        <h2>Daily Summary</h2>
      </div>

      <div className="summary-stats">
        <div className="stat-item">
          <label>Total Messages</label>
          <span className="stat-value">{stats.totalMessages}</span>
        </div>
        <div className="stat-item">
          <label>High Priority</label>
          <span className="stat-value high-priority">{stats.highPriority}</span>
        </div>
        <div className="stat-item">
          <label>Pending Replies</label>
          <span className="stat-value pending">{stats.pendingReplies}</span>
        </div>
      </div>

      <div className="summary-actions">
        <button className="action-button" onClick={handleGenerateReport}>
          <span role="img" aria-label="generate">📊</span>
          Generate Detailed Report
        </button>
        <ExportOptions 
          summaryData={{
            title: "Daily Communication Summary",
            date: new Date().toLocaleDateString(),
            statistics: stats,
            items: [
              {
                title: 'Q1 Report Review',
                description: 'Review requested for Q1 financial report with focus on sales projections',
                priority: 'High',
                platform: 'WhatsApp',
                time: '10:00 AM'
              },
              {
                title: 'Design Files Review',
                description: 'New design files ready for review - UI components and layouts',
                priority: 'Medium',
                platform: 'Slack',
                time: '11:30 AM'
              }
            ]
          }}
        />
      </div>

      {showReport && (
        <ReportGenerator
          onClose={() => setShowReport(false)}
          data={{
            date: new Date(),
            stats,
            items: [
              {
                title: 'Q1 Report Review',
                description: 'Review requested for Q1 financial report with focus on sales projections',
                priority: 'High',
                time: new Date('2024-02-20T10:00:00'),
                platform: 'WhatsApp'
              },
              {
                title: 'Team Meeting Schedule',
                description: 'Team meeting scheduled for tomorrow',
                priority: 'High',
                time: new Date('2024-02-20T14:15:00'),
                platform: 'Slack'
              },
              {
                title: 'Project Timeline Review',
                description: 'Updated project timeline ready for review',
                priority: 'High',
                time: new Date('2024-02-20T15:45:00'),
                platform: 'Email'
              },
              {
                title: 'Design Files Review',
                description: 'New design files ready for review - UI components and layouts',
                priority: 'Medium',
                time: new Date('2024-02-20T11:30:00'),
                platform: 'Slack'
              }
            ]
          }}
        />
      )}
    </section>
  );
}; 