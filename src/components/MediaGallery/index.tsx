import * as React from 'react';

interface MediaGalleryProps {
  onClose: () => void;
}

const styles = `
.media-gallery-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.media-gallery {
  background: white;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  height: 80vh;
  padding: 20px;
  position: relative;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  overflow-y: auto;
  max-height: calc(80vh - 100px);
  padding: 16px;
}

.media-item {
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}
`;

export const MediaGallery: React.FC<MediaGalleryProps> = ({ onClose }) => {
  // Mock media items - replace with actual media data
  const mediaItems = [
    { id: 1, type: 'image', url: 'https://via.placeholder.com/150' },
    { id: 2, type: 'image', url: 'https://via.placeholder.com/150' },
    // Add more media items as needed
  ];

  return (
    <div className="media-gallery-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="media-gallery">
        <div className="gallery-header">
          <h2>Media Gallery</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="media-grid">
          {mediaItems.map(item => (
            <img 
              key={item.id}
              src={item.url}
              alt={`Media ${item.id}`}
              className="media-item"
            />
          ))}
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}; 