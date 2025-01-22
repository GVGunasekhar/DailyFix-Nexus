import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

interface ProfileUploadProps {
  onClose: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  image: string | null;
}

const styles = `
.profile-upload-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background: white;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  padding: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-header {
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
  color: #666;
}

.profile-upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.profile-preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #0088cc;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.profile-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-button {
  width: 100%;
  background: #0088cc;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.upload-button:hover {
  background: #006699;
  transform: translateY(-1px);
}

.file-input {
  display: none;
}

.default-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  font-size: 3rem;
  color: #666;
}

.profile-info {
  text-align: center;
  margin-top: 16px;
  width: 100%;
}

.profile-field {
  position: relative;
  margin-bottom: 16px;
  width: 100%;
}

.profile-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.profile-input:focus {
  outline: none;
  border-color: #0088cc;
  box-shadow: 0 0 0 2px rgba(0,136,204,0.1);
}

.profile-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
  display: block;
  text-align: left;
}

.save-button {
  width: 100%;
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  margin-top: 16px;
}

.save-button:hover {
  background: #218838;
  transform: translateY(-1px);
}

.edit-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 1rem;
}

.profile-name {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.profile-email {
  font-size: 0.9rem;
  color: #666;
  margin: 4px 0;
}

.profile-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.remove-button {
  width: 100%;
  background: #dc3545;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.remove-button:hover {
  background: #c82333;
  transform: translateY(-1px);
}

.profile-preview-container {
  position: relative;
  width: 150px;
  height: 150px;
}

.remove-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
}

.profile-preview-container:hover .remove-overlay {
  opacity: 1;
}

.remove-icon {
  color: white;
  font-size: 1.5rem;
}
`;

export const ProfileUpload: React.FC<ProfileUploadProps> = ({ onClose }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: localStorage.getItem('profileName') || 'Your Name',
    email: localStorage.getItem('profileEmail') || 'your.email@example.com',
    image: localStorage.getItem('profileImage')
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfile(prev => ({ ...prev, image: result }));
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const newProfile = {
      name: nameInputRef.current?.value || profile.name,
      email: emailInputRef.current?.value || profile.email,
      image: profile.image
    };
    
    setProfile(newProfile);
    localStorage.setItem('profileName', newProfile.name);
    localStorage.setItem('profileEmail', newProfile.email);
    setIsEditing(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setProfile(prev => ({ ...prev, image: null }));
    localStorage.removeItem('profileImage');
  };

  return (
    <div className="profile-upload-modal">
      <div className="profile-header">
        <h2>Profile</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="profile-upload-content">
        <div className="profile-preview-container">
          <div className="profile-preview">
            {profile.image ? (
              <>
                <img src={profile.image} alt="Profile" />
                <div 
                  className="remove-overlay"
                  onClick={handleRemoveImage}
                  title="Remove profile picture"
                >
                  <span className="remove-icon">🗑️</span>
                </div>
              </>
            ) : (
              <div className="default-avatar">👤</div>
            )}
          </div>
        </div>
        
        <div className="profile-info">
          {isEditing ? (
            <>
              <div className="profile-field">
                <label className="profile-label">Name</label>
                <input
                  ref={nameInputRef}
                  type="text"
                  className="profile-input"
                  defaultValue={profile.name}
                  placeholder="Enter your name"
                />
              </div>
              <div className="profile-field">
                <label className="profile-label">Email</label>
                <input
                  ref={emailInputRef}
                  type="email"
                  className="profile-input"
                  defaultValue={profile.email}
                  placeholder="Enter your email"
                />
              </div>
              <button className="save-button" onClick={handleSaveProfile}>
                Save Changes
              </button>
            </>
          ) : (
            <>
              <p className="profile-name">
                {profile.name}
                <span className="edit-icon" onClick={() => setIsEditing(true)}>
                  ✏️
                </span>
              </p>
              <p className="profile-email">{profile.email}</p>
            </>
          )}
        </div>

        <div className="profile-actions">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleFileChange}
          />
          <button className="upload-button" onClick={handleUploadClick}>
            <span>📷</span> Change Profile Picture
          </button>
          {profile.image && (
            <button className="remove-button" onClick={handleRemoveImage}>
              <span>🗑️</span> Remove Profile Picture
            </button>
          )}
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}; 