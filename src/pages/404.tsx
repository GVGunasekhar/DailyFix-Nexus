import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const styles = `
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      background-color: #f5f5f5;
    }
    
    h1 {
      color: #1a73e8;
      margin-bottom: 16px;
    }

    p {
      color: #666;
      margin-bottom: 24px;
    }
    
    .home-button {
      padding: 12px 24px;
      margin-top: 20px;
      border: none;
      border-radius: 5px;
      background: #1a73e8;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 16px;
    }
    
    .home-button:hover {
      background: #1557b0;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .home-button:active {
      transform: translateY(0);
    }
  `;

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button 
        className="home-button"
        onClick={() => navigate('/')}
      >
        Return to Home
      </button>
      <style>{styles}</style>
    </div>
  );
};

export default NotFound; 