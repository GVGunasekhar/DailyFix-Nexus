import * as React from 'react';

interface Report {
  date: Date;
  stats: {
    totalMessages: number;
    highPriority: number;
    pendingReplies: number;
  };
  items: Array<{
    title: string;
    description: string;
    priority: string;
    time: Date;
    platform: string;
  }>;
}

interface ReportGeneratorProps {
  onClose: () => void;
  data: Report;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onClose, data }) => {
  const handleExport = () => {
    const reportData = {
      title: "Daily Communication Summary",
      date: data.date.toLocaleDateString(),
      statistics: {
        totalMessages: data.stats.totalMessages,
        highPriority: data.stats.highPriority,
        pendingReplies: data.stats.pendingReplies
      },
      items: data.items.map(item => ({
        ...item,
        time: item.time.toLocaleTimeString()
      }))
    };

    const jsonString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-modal">
      <div className="report-content">
        <div className="report-header">
          <h2>Daily Communication Report</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="report-body">
          <div className="report-section">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <label>Total Messages</label>
                <span>{data.stats.totalMessages}</span>
              </div>
              <div className="stat-box">
                <label>High Priority</label>
                <span className="high-priority">{data.stats.highPriority}</span>
              </div>
              <div className="stat-box">
                <label>Pending Replies</label>
                <span className="pending">{data.stats.pendingReplies}</span>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h3>Priority Items</h3>
            <div className="items-list">
              {data.items.map((item, index) => (
                <div key={index} className={`report-item priority-${item.priority.toLowerCase()}`}>
                  <div className="item-header">
                    <h4>{item.title}</h4>
                    <span className="item-time">
                      {item.time.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta">
                    <span 
                      className="platform-badge"
                      data-platform={item.platform}
                    >
                      {item.platform}
                    </span>
                    <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="report-actions">
          <button className="action-button" onClick={handleExport}>
            <span role="img" aria-label="download">📥</span>
            Download Report
          </button>
          <button className="action-button print" onClick={handlePrint}>
            <span role="img" aria-label="print">🖨️</span>
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}; 