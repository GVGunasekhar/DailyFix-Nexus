import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')}>
        Return to Home
      </button>
      <style jsx>{`
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        
        button {
          padding: 10px 20px;
          margin-top: 20px;
          border: none;
          border-radius: 5px;
          background: #1a73e8;
          color: white;
          cursor: pointer;
        }
        
        button:hover {
          background: #1557b0;
        }
      `}</style>
    </div>
  );
};

export default NotFound; 