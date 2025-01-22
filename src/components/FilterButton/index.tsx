import * as React from 'react';
import { useState } from 'react';

interface FilterButtonProps {
  onFilterChange: (priority: string | null) => void;
}

const styles = `
.filter-container {
  position: relative;
}

.filter-button {
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.filter-button:hover {
  background: #f8f9fa;
}

.filter-button.active {
  background: #e3f2fd;
  border-color: #0088cc;
  color: #0088cc;
}

.filter-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 8px 0;
  min-width: 150px;
  z-index: 1000;
}

.filter-option {
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.filter-option:hover {
  background-color: #f8f9fa;
}

.filter-option.selected {
  background-color: #e3f2fd;
  color: #0088cc;
}

.priority-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.priority-high {
  background-color: #dc3545;
}

.priority-medium {
  background-color: #ffc107;
}

.priority-low {
  background-color: #28a745;
}

.reset-button {
  border-top: 1px solid #eee;
  margin-top: 8px;
  padding: 8px 16px;
  color: #dc3545;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reset-button:hover {
  background-color: #fff3f3;
}
`;

export const FilterButton: React.FC<FilterButtonProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterSelect = (priority: string | null) => {
    setSelectedFilter(priority);
    onFilterChange(priority);
    setIsOpen(false);
  };

  const resetFilter = () => {
    setSelectedFilter(null);
    onFilterChange(null);
    setIsOpen(false);
  };

  return (
    <div className="filter-container">
      <button 
        className={`filter-button ${selectedFilter ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>🔍</span>
        {selectedFilter ? `Priority: ${selectedFilter}` : 'Filter'}
      </button>

      {isOpen && (
        <div className="filter-menu">
          {['High', 'Medium', 'Low'].map(priority => (
            <div
              key={priority}
              className={`filter-option ${selectedFilter === priority ? 'selected' : ''}`}
              onClick={() => handleFilterSelect(priority)}
            >
              <span className={`priority-indicator priority-${priority.toLowerCase()}`} />
              {priority} Priority
            </div>
          ))}
          <div className="reset-button" onClick={resetFilter}>
            Reset Filter
          </div>
        </div>
      )}
      <style>{styles}</style>
    </div>
  );
}; 