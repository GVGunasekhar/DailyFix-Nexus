import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Inbox } from './components/Inbox';
import NotFound from './pages/404';
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
    <Router>
      <style>{globalStyles}</style>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App; 