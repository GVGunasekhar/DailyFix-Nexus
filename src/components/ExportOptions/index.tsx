import * as React from 'react';

interface ExportOptionsProps {
  summaryData: {
    title: string;
    date: string;
    statistics: {
      totalMessages: number;
      highPriority: number;
      pendingReplies: number;
    };
    items: Array<{
      title: string;
      description: string;
      priority: string;
      platform: string;
      time: string;
    }>;
  };
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ summaryData }) => {
  const [showOptions, setShowOptions] = React.useState(false);

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(summaryData, null, 2);
    downloadFile(jsonString, 'application/json', 'daily-summary.json');
  };

  const handleExportTXT = () => {
    const textContent = `
${summaryData.title}
Date: ${summaryData.date}

Statistics:
- Total Messages: ${summaryData.statistics.totalMessages}
- High Priority: ${summaryData.statistics.highPriority}
- Pending Replies: ${summaryData.statistics.pendingReplies}

Priority Items:
${summaryData.items.map(item => `
* ${item.title} (${item.priority})
  ${item.description}
  Platform: ${item.platform}
  Time: ${item.time}
`).join('\n')}
    `.trim();

    downloadFile(textContent, 'text/plain', 'daily-summary.txt');
  };

  const handlePrintPDF = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${summaryData.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 24px; margin-bottom: 10px; }
            h2 { font-size: 18px; margin: 20px 0 10px; }
            .stats { margin: 20px 0; }
            .item { margin: 15px 0; padding-left: 20px; }
            .meta { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>${summaryData.title}</h1>
          <div>Date: ${summaryData.date}</div>
          
          <h2>Statistics</h2>
          <div class="stats">
            <div>Total Messages: ${summaryData.statistics.totalMessages}</div>
            <div>High Priority: ${summaryData.statistics.highPriority}</div>
            <div>Pending Replies: ${summaryData.statistics.pendingReplies}</div>
          </div>
          
          <h2>Priority Items</h2>
          ${summaryData.items.map(item => `
            <div class="item">
              <strong>${item.title}</strong> (${item.priority})
              <p>${item.description}</p>
              <div class="meta">
                Platform: ${item.platform} | Time: ${item.time}
              </div>
            </div>
          `).join('')}
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(summaryData.title);
    const body = encodeURIComponent(`
${summaryData.title}
Date: ${summaryData.date}

Statistics:
- Total Messages: ${summaryData.statistics.totalMessages}
- High Priority: ${summaryData.statistics.highPriority}
- Pending Replies: ${summaryData.statistics.pendingReplies}

Priority Items:
${summaryData.items.map(item => `
* ${item.title} (${item.priority})
  ${item.description}
  Platform: ${item.platform}
  Time: ${item.time}
`).join('\n')}
    `);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopyLink = async () => {
    const summaryString = JSON.stringify(summaryData);
    const encodedData = btoa(summaryString);
    const shareUrl = `${window.location.origin}/share?data=${encodedData}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const downloadFile = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-options">
      <button 
        className="action-button"
        onClick={() => setShowOptions(!showOptions)}
      >
        <span role="img" aria-label="export">📥</span>
        Export Summary
      </button>
      
      {showOptions && (
        <div className="export-dropdown">
          <button onClick={handleExportJSON}>
            <span role="img" aria-label="json">📄</span>
            Export as JSON
          </button>
          <button onClick={handleExportTXT}>
            <span role="img" aria-label="text">📝</span>
            Export as Text
          </button>
          <button onClick={handlePrintPDF}>
            <span role="img" aria-label="pdf">📑</span>
            Print as PDF
          </button>
          <button onClick={handleEmailShare}>
            <span role="img" aria-label="email">📧</span>
            Share via Email
          </button>
          <button onClick={handleCopyLink}>
            <span role="img" aria-label="link">🔗</span>
            Copy Share Link
          </button>
        </div>
      )}
    </div>
  );
}; 