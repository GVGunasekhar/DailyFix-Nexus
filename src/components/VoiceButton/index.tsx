import * as React from 'react';
import { useState } from 'react';

interface VoiceButtonProps {
  onVoiceStart: () => void;
  onVoiceEnd: (transcript: string) => void;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ onVoiceStart, onVoiceEnd }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceClick = () => {
    if (!isRecording) {
      setIsRecording(true);
      onVoiceStart();
    } else {
      setIsRecording(false);
      // Simulating voice transcript
      onVoiceEnd("Voice message transcript");
    }
  };

  return (
    <button 
      className={`voice-button ${isRecording ? 'recording' : ''}`}
      onClick={handleVoiceClick}
      title={isRecording ? 'Stop Recording' : 'Start Recording'}
    >
      <span className="voice-icon" role="img" aria-label="voice">
        {isRecording ? '🔴' : '🎤'}
      </span>
    </button>
  );
}; 