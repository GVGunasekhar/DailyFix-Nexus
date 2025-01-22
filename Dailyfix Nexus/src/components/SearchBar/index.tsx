import * as React from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const styles = `
.search-bar-container {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 8px 16px 8px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 0.9rem;
  background-color: #f8f9fa;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  background-color: #fff;
  border-color: #0088cc;
  box-shadow: 0 0 0 2px rgba(0,136,204,0.2);
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #6c757d;
  font-size: 1.1rem;
}
`;

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search contact name..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <style>{styles}</style>
    </div>
  );
}; 