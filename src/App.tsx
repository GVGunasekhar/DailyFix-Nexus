import React from 'react';
import { Inbox } from './components/Inbox';
import './styles/inbox.css';
import './styles/dashboard.css';
import './styles/report.css';

const globalStyles = `
:root {
  --max-width-phone: 480px;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

[data-display-mode='phone'] {
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
}

[data-display-mode='phone'] #root {
  max-width: var(--max-width-phone);
  width: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

[data-display-mode='laptop'] #root {
  max-width: none;
  width: 100%;
}
`;

const App: React.FC = () => {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="app">
        <Inbox />
      </div>
    </>
  );
};

export default App; 