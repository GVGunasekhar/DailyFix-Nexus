import * as React from 'react';
import { useState } from 'react';
import type { Conversation } from '../../types/conversation';

interface AIFeaturesProps {
  conversation: Conversation;
  onReplySelect?: (reply: string) => void;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({ conversation, onReplySelect }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReplies, setAiReplies] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateReplies = async () => {
    setIsGenerating(true);
    try {
      const lastMessage = conversation.messages[conversation.messages.length - 1];
      const context = lastMessage?.text || '';
      const responses = await generateAIResponses(context);
      setAiReplies(responses);
    } catch (error) {
      console.error('Error generating AI responses:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReplyClick = async (reply: string, index: number) => {
    try {
      await navigator.clipboard.writeText(reply);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      
      if (onReplySelect) {
        onReplySelect(reply);
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="ai-features">
      <div className="ai-replies">
        <div className="ai-replies-header">
          <button 
            className="generate-replies-button"
            onClick={generateReplies}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate AI Replies'}
            <span role="img" aria-label="ai">🤖</span>
          </button>
        </div>
        {aiReplies.length > 0 && (
          <div className="ai-replies-list">
            {aiReplies.map((reply, index) => (
              <div key={index} className="ai-reply-item">
                <span className="reply-number">{index + 1}</span>
                <button
                  className={`ai-reply-option ${copiedIndex === index ? 'copied' : ''}`}
                  onClick={() => handleReplyClick(reply, index)}
                >
                  {reply}
                  {copiedIndex === index && (
                    <span className="copy-indicator">
                      Copied! ✓
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {conversation.summary && (
        <div className="conversation-summary">
          <h4>Summary</h4>
          <p>{conversation.summary}</p>
        </div>
      )}
    </div>
  );
};

// Helper function to simulate AI response generation
const generateAIResponses = async (context: string): Promise<string[]> => {
  // In a real implementation, this would call your AI service
  const commonWorkflows = {
    question: [
      "I'll look into this and get back to you shortly",
      "Let me check with the team and update you",
      "Could you provide more specific details about this?",
      "I understand your question, let me investigate",
      "Would you like to schedule a call to discuss this?"
    ],
    update: [
      "Thanks for the update. I'll review this right away",
      "Got it, I'll process this information",
      "I'll coordinate with the relevant team members",
      "Thanks for keeping me informed",
      "I'll incorporate these changes into our plan",
      "Let me know if anything else needs attention"
    ],
    request: [
      "I'll prioritize this request",
      "When do you need this completed by?",
      "I'll start working on this immediately",
      "I'll make sure this gets handled promptly",
      "Let me assess the requirements and get back to you",
      "I'll allocate resources for this right away"
    ],
    deadline: [
      "I'll ensure we meet this deadline",
      "I'll expedite this for you",
      "Let me reprioritize to accommodate this timeline",
      "I'll keep you updated on our progress",
      "Would you like daily status updates?"
    ],
    feedback: [
      "Thank you for the feedback, I'll address these points",
      "I appreciate your input on this",
      "I'll implement these suggestions",
      "Let me know if you'd like to discuss this further",
      "I'll share this feedback with the team"
    ],
    issue: [
      "I'll investigate this issue immediately",
      "Let me troubleshoot this for you",
      "I'll find a solution as quickly as possible",
      "Could you share any error messages you're seeing?",
      "I'll escalate this if needed"
    ]
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Enhanced context matching
  if (context.includes('?')) {
    return commonWorkflows.question;
  } else if (context.toLowerCase().includes('update') || context.toLowerCase().includes('status')) {
    return commonWorkflows.update;
  } else if (context.toLowerCase().includes('deadline') || context.toLowerCase().includes('urgent')) {
    return commonWorkflows.deadline;
  } else if (context.toLowerCase().includes('feedback') || context.toLowerCase().includes('suggest')) {
    return commonWorkflows.feedback;
  } else if (context.toLowerCase().includes('issue') || context.toLowerCase().includes('problem')) {
    return commonWorkflows.issue;
  } else if (context.toLowerCase().includes('need') || context.toLowerCase().includes('request')) {
    return commonWorkflows.request;
  } else {
    // If no specific context matches, combine some general responses
    const generalResponses = [
      ...commonWorkflows.update.slice(0, 2),
      ...commonWorkflows.request.slice(0, 2),
      "I'll handle this for you"
    ];
    return generalResponses;
  }
}; 