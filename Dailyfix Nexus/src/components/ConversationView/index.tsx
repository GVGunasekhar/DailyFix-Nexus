import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { AIFeatures } from '../AIFeatures';
import type { Conversation, PlatformMessage, PriorityLevel } from '../../types/conversation';
import { ConversationSettings } from '../ConversationSettings';

// Add type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionError) => void;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  platform: string;
}

interface ConversationViewProps {
  conversation: Conversation | null;
}

// Update the styles by removing date-related CSS
const styles = `
.conversation-content {
  padding: 16px;
  background-color: #e5ddd5;
  height: calc(100vh - 180px);
  overflow-y: auto;
}

.message-history {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-item {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message-item.incoming {
  align-self: flex-start;
}

.message-item.outgoing {
  align-self: flex-end;
}

.message-bubble {
  padding: 8px 12px;
  border-radius: 8px;
  position: relative;
  margin-bottom: 4px;
}

.message-item.incoming .message-bubble {
  background-color: #ffffff;
  border-top-left-radius: 0;
}

.message-item.outgoing .message-bubble {
  background-color: #dcf8c6;
  border-top-right-radius: 0;
}

.message-content {
  margin-bottom: 4px;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #667781;
}

.platform-badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  background-color: rgba(0, 0, 0, 0.1);
}

.message-time {
  font-size: 0.7rem;
  color: #667781;
}

.header-actions {
  display: flex;
  gap: 8px;
  position: relative;
}

.settings-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  font-size: 1.5rem;
  line-height: 1;
  color: #666;
}

.settings-button:hover {
  background-color: #f5f5f5;
}

.settings-button span {
  font-size: 1.5rem;
  font-weight: bold;
}
`;

export const ConversationView: React.FC<ConversationViewProps> = ({ conversation }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceCommand, setIsVoiceCommand] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [recordedAudio, setRecordedAudio] = useState<{ blob: Blob; url: string } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        speechRecognitionRef.current = new SpeechRecognitionAPI();
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true;

        speechRecognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const results = Array.from(event.results);
          const transcript = results
            .map(result => result[0].transcript)
            .join('');

          if (event.results[0].isFinal) {
            handleVoiceCommand(transcript.toLowerCase());
          }
        };

        speechRecognitionRef.current.onerror = (event: SpeechRecognitionError) => {
          console.error('Speech recognition error:', event.error);
          setIsVoiceCommand(false);
        };
      }
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    // Enhanced voice command handling
    if (command.includes('tag') || command.includes('label')) {
      const tag = command.split(/tag|label/).pop()?.trim();
      if (tag) {
        addContextualTag(tag);
      }
    } else if (command.includes('priority')) {
      const level = command.toLowerCase().includes('high') ? 'High' :
                   command.toLowerCase().includes('medium') ? 'Medium' : 'Low';
      updatePriority(level);
    } else if (command.includes('summarize')) {
      generateDailySummary();
    } else if (command.includes('suggest reply')) {
      generateAIReply();
    } else if (command.includes('matrix room')) {
      handleMatrixRoom(command);
    } else {
      // Default to message text
      setMessageText(command);
    }
    setIsVoiceCommand(false);
  };

  const addContextualTag = (tag: string) => {
    // Implementation for adding contextual tags
    if (conversation) {
      const updatedTags = [...conversation.contextualTags, tag];
      // Update conversation tags
      console.log('Added tag:', tag);
    }
  };

  const updatePriority = (level: PriorityLevel) => {
    // Implementation for updating priority
    if (conversation) {
      console.log('Updated priority to:', level);
    }
  };

  const generateDailySummary = async () => {
    // Implementation for generating daily summary
    if (conversation?.messages) {
      // Group messages by date and generate summary
      console.log('Generating daily summary...');
    }
  };

  const generateAIReply = async () => {
    // Implementation for AI-generated replies
    if (conversation?.lastMessage) {
      // Generate AI reply based on context
      console.log('Generating AI reply...');
    }
  };

  const handleMatrixRoom = (command: string) => {
    // Implementation for Matrix.org room management
    console.log('Handling Matrix room command:', command);
  };

  const startVoiceCommand = () => {
    if (speechRecognitionRef.current) {
      setIsVoiceCommand(true);
      speechRecognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const stopVoiceCommand = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      setIsVoiceCommand(false);
    }
  };

  const handleSendMessage = () => {
    if (recordedAudio) {
      // Handle voice message
      console.log('Sending voice message:', recordedAudio.blob);
      setRecordedAudio(null);
    } else if (messageText.trim()) {
      // Create new message object
      const newMessage = {
        id: Date.now().toString(),
        text: messageText,
        sender: 'user' as const,
        timestamp: new Date(),
        platform: conversation?.platforms[0] || 'WhatsApp'
      };

      // Add message to history
      setMessages(prevMessages => [...prevMessages, newMessage]);

      // Update conversation content
      if (conversation?.platformMessages) {
        const newPlatformMessage = {
          platform: conversation.platforms[0],
          messages: [messageText],
          isFromSender: true,
          lastActivity: new Date()
        };

        conversation.platformMessages.push(newPlatformMessage);
      }

      // Clear input
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio({ blob: audioBlob, url: audioUrl });
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleVoiceButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSettingsClick = (action: string) => {
    switch (action) {
      case 'search':
        const searchText = prompt('Enter text to search in chat:');
        if (searchText) {
          alert(`Searching for: ${searchText}`);
        }
        break;
      case 'media':
        alert('Opening media gallery');
        break;
      case 'clear':
        if (window.confirm('Are you sure you want to clear this chat?')) {
          alert('Chat cleared');
        }
        break;
      case 'block':
        if (window.confirm('Are you sure you want to block this contact?')) {
          alert('Contact blocked');
        }
        break;
      case 'export':
        alert('Exporting chat...');
        break;
      case 'mute':
        alert('Notifications muted');
        break;
    }
    setIsSettingsOpen(false);
  };

  const handleAIReplySelect = (reply: string) => {
    setMessageText(reply); // This will update the message input
  };

  if (!conversation) {
    return (
      <div className="conversation-placeholder">
        Select a conversation to start messaging
      </div>
    );
  }

  return (
    <div className="conversation-view">
      <div className="conversation-header">
        <div className="header-left">
          <h2>{conversation.contact.name}</h2>
          <div className="platform-badges">
            {conversation.platforms.map(platform => (
              <span 
                key={platform} 
                className="platform-badge"
                data-platform={platform}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="settings-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowSettings(!showSettings);
            }}
          >
            <span role="img" aria-label="settings">⋮</span>
          </button>
          {showSettings && (
            <ConversationSettings onClose={() => setShowSettings(false)} />
          )}
        </div>
      </div>
      
      <div className="conversation-content">
        <div className="message-history">
          {conversation?.platformMessages
            ?.sort((a, b) => a.lastActivity.getTime() - b.lastActivity.getTime())
            .map((msg, index) => (
              <div 
                key={`${msg.platform}-${index}`}
                className={`message-item ${msg.isFromSender ? 'outgoing' : 'incoming'}`}
              >
                <div className="message-bubble">
                  {msg.messages.map((text, msgIndex) => (
                    <div key={msgIndex} className="message-content">
                      {text}
                    </div>
                  ))}
                  <div className="message-meta">
                    <span className="message-time">
                      {msg.lastActivity.toLocaleTimeString([], { 
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                    <span 
                      className="platform-badge"
                      data-platform={msg.platform}
                    >
                      {msg.platform}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          {messages.map(message => (
            <div 
              key={message.id}
              className="message-item outgoing"
            >
              <div className="message-bubble">
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-meta">
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </span>
                  <span 
                    className="platform-badge"
                    data-platform={message.platform}
                  >
                    {message.platform}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIFeatures 
        conversation={conversation} 
        onReplySelect={handleAIReplySelect}
      />

      <div className="message-input-container">
        {recordedAudio ? (
          <div className="recorded-audio">
            <audio src={recordedAudio.url} controls />
            <button 
              className="cancel-audio"
              onClick={() => setRecordedAudio(null)}
              title="Cancel"
            >
              ❌
            </button>
          </div>
        ) : (
          <>
            <input 
              type="text" 
              className={`message-input ${isVoiceCommand ? 'voice-active' : ''}`}
              placeholder={isVoiceCommand ? 'Listening for voice command...' : 'Type a message or use voice command...'}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className={`voice-command-button ${isVoiceCommand ? 'active' : ''}`}
              title={isVoiceCommand ? 'Stop Voice Command' : 'Start Voice Command'}
              onClick={() => isVoiceCommand ? stopVoiceCommand() : startVoiceCommand()}
            >
              <span role="img" aria-label="voice-command">
                {isVoiceCommand ? '🎙️' : '🗣️'}
              </span>
            </button>
          </>
        )}
        <button 
          className={`voice-button ${isRecording ? 'recording' : ''}`}
          title={isRecording ? 'Stop Recording' : 'Start Voice Recording'}
          onClick={handleVoiceButtonClick}
        >
          <span role="img" aria-label="voice">
            {isRecording ? '⏹️' : '🎤'}
          </span>
        </button>
        <button 
          className={`send-button ${(messageText.trim() || recordedAudio) ? 'active' : ''}`}
          onClick={handleSendMessage}
          disabled={!messageText.trim() && !recordedAudio}
        >
          <span role="img" aria-label="send">📤</span>
        </button>
      </div>
    </div>
  );
};

// Helper function to generate AI replies (mock implementation)
const generateAIReplies = async (messages: any[]): Promise<string[]> => {
  // In a real implementation, this would call your AI service
  const commonReplies = [
    "I'll look into this and get back to you shortly",
    "Thanks for bringing this to my attention",
    "Could you clarify your requirements?",
    "Let me check with the team and update you",
    "I understand, I'll prioritize this task",
    "Would you like to schedule a call to discuss this?",
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return 3 random replies
  return commonReplies
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}; 