import React, { useState } from 'react';

interface MailProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setWindowPosition: (pos: { x: number; y: number }) => void;
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

// Email type definitions
 type Email = {
  id: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  account: string;
} & (
  | { from: string; to?: never }
  | { to: string; from?: never }
);

// Mock email data
const mockEmails: Record<string, Email[]> = {
  inbox: [
    {
      id: '1',
      from: 'GitHub',
      subject: 'Your repository has been starred',
      preview: 'Someone starred your repository "FidOS-Dashboard"',
      time: '2 hours ago',
      unread: true,
      account: 'personal'
    },
    {
      id: '2',
      from: 'LinkedIn',
      subject: 'New connection request',
      preview: 'John Doe wants to connect with you on LinkedIn',
      time: '4 hours ago',
      unread: true,
      account: 'personal'
    },
    {
      id: '3',
      from: 'Sarah Johnson',
      subject: 'Project Update - Q1 Review',
      preview: 'Hi Fidel, I wanted to discuss the Q1 project milestones...',
      time: '1 day ago',
      unread: true,
      account: 'work'
    },
    {
      id: '4',
      from: 'Stack Overflow',
      subject: 'Answer accepted on React question',
      preview: 'Your answer to "How to optimize React performance" was accepted',
      time: '2 days ago',
      unread: false,
      account: 'personal'
    },
    {
      id: '5',
      from: 'Netflix',
      subject: 'New shows added to your list',
      preview: 'Check out the latest shows we\'ve added based on your preferences',
      time: '3 days ago',
      unread: false,
      account: 'personal'
    }
  ],
  sent: [
    {
      id: 's1',
      to: 'team@company.com',
      subject: 'Weekly Development Update',
      preview: 'Here\'s our progress on the new features...',
      time: '1 day ago',
      unread: false,
      account: 'work'
    },
    {
      id: 's2',
      to: 'client@project.com',
      subject: 'Project Deliverables - Phase 1',
      preview: 'Attached you\'ll find the completed deliverables...',
      time: '3 days ago',
      unread: false,
      account: 'work'
    }
  ],
  drafts: [
    {
      id: 'd1',
      to: 'colleague@company.com',
      subject: 'Meeting Notes - Tech Discussion',
      preview: 'Following up on our discussion about the new architecture...',
      time: 'Draft',
      unread: false,
      account: 'work'
    }
  ],
  trash: []
};

const Mail: React.FC<MailProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setWindowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [mailAccounts] = useState([
    { id: 'personal', name: 'Personal', email: 'fidel@example.com', unread: 3 },
    { id: 'work', name: 'Work', email: 'fidel.funez@company.com', unread: 1 }
  ]);
  const [mailFolders] = useState([
    { id: 'inbox', name: 'Inbox', icon: '📥' },
    { id: 'sent', name: 'Sent', icon: '📤' },
    { id: 'drafts', name: 'Drafts', icon: '📝' },
    { id: 'trash', name: 'Trash', icon: '🗑️' }
  ]);
  const [selectedMailFolder, setSelectedMailFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);

  const getCurrentEmails = () => {
    return mockEmails[selectedMailFolder as keyof typeof mockEmails] || [];
  };

  const getEmailContent = (emailId: string) => {
    const email = getCurrentEmails().find(e => e.id === emailId);
    if (!email) return null;
    // Generate realistic email content based on the email
    const emailContents: Record<string, string> = {
      '1': `Hi Fidel,\n\nGreat news! Your repository "FidOS-Dashboard" has been starred by a developer in the community. This is a fantastic recognition of your work on the macOS-style portfolio dashboard.\n\nKeep up the excellent work on your portfolio projects!\n\nBest regards,\nThe GitHub Team\n\n---\nGitHub - Where the world builds software`,
      '2': `Hi Fidel,\n\nJohn Doe, Senior Software Engineer at TechCorp, would like to connect with you on LinkedIn.\n\nJohn works in React development and has 8+ years of experience in web technologies. You have 3 mutual connections.\n\nWould you like to accept this connection request?\n\nBest regards,\nLinkedIn Team`,
      '3': `Hi Fidel,\n\nI wanted to discuss the Q1 project milestones and get your input on the upcoming sprint planning. We've made great progress on the dashboard features, and I'd like to review the timeline for the remaining deliverables.\n\nCould we schedule a quick call this week to go through the details? I'm available Tuesday and Thursday afternoon.\n\nAlso, I've attached the updated project roadmap for your review.\n\nThanks,\nSarah Johnson\nProject Manager\nTech Solutions Inc.`,
      '4': `Hi Fidel,\n\nCongratulations! Your answer to the question "How to optimize React performance in large applications" has been accepted as the best answer by the community.\n\nYour detailed explanation about React.memo, useCallback, and performance profiling tools was very helpful to other developers.\n\nYou've earned 15 reputation points for this accepted answer.\n\nKeep contributing to the community!\n\nBest regards,\nStack Overflow Team`,
      '5': `Hi Fidel,\n\nWe've added some great new shows to your list based on your viewing preferences:\n\n• The Last of Us - Season 2\n• House of the Dragon - Season 2\n• New episodes of Stranger Things\n• Exclusive documentaries about technology\n\nLog in to Netflix to start watching!\n\nBest regards,\nThe Netflix Team`
    };
    return emailContents[emailId] || 'Email content not available.';
  };

  if (!isOpen) return null;

  return (
    <div
      className="mail-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 900,
        height: 650,
        background: 'rgba(28, 28, 32, 0.98)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
        border: '1px solid rgba(60,60,70,0.32)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'finderFadeIn 0.32s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <style>{`
        @keyframes finderFadeIn {
          0% { opacity: 0; transform: scale(0.96) translateY(24px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      {/* Mail Title Bar */}
      <div
        style={{
          height: '32px',
          background: 'rgba(36, 36, 40, 0.98)',
          borderBottom: '1px solid rgba(80,80,90,0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          cursor: 'move',
          userSelect: 'none',
        }}
        onMouseDown={e => {
          setIsDragging(true);
          setDragStart({ x: e.clientX, y: e.clientY });
        }}
      >
        {/* Window Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#FF5F57',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.18)'
            }}
            onClick={onClose}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#FFBD2E',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.18)'
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#28CA42',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.18)'
            }}
          />
        </div>
        {/* Window Title */}
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#fff', flex: 1, textAlign: 'center', marginLeft: '-40px' }}>
          Mail
        </div>
      </div>
      {/* Mail Toolbar */}
      <div style={{
        height: '44px',
        background: 'rgba(36, 36, 40, 0.98)',
        borderBottom: '1px solid rgba(80,80,90,0.22)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px'
      }}>
        <button 
          style={{
            background: '#007AFF',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#fff',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
          onClick={() => setComposeOpen(true)}
        >
          New Message
        </button>
        <button 
          style={{
            background: selectedEmail ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
            border: '1px solid rgba(80,80,90,0.22)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: selectedEmail ? '#007AFF' : '#aaa',
            fontSize: '12px',
            cursor: selectedEmail ? 'pointer' : 'not-allowed',
            opacity: selectedEmail ? 1 : 0.5
          }}
          disabled={!selectedEmail}
        >
          Reply
        </button>
        <button 
          style={{
            background: selectedEmail ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
            border: '1px solid rgba(80,80,90,0.22)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: selectedEmail ? '#007AFF' : '#aaa',
            fontSize: '12px',
            cursor: selectedEmail ? 'pointer' : 'not-allowed',
            opacity: selectedEmail ? 1 : 0.5
          }}
          disabled={!selectedEmail}
        >
          Forward
        </button>
      </div>
      {/* Mail Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'rgba(36, 36, 40, 0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
          {/* Accounts */}
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Accounts</div>
          {mailAccounts.map(account => (
            <div key={account.id} style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', color: '#007AFF', fontWeight: '500' }}>{account.name}</div>
              <div style={{ fontSize: '11px', color: '#aaa' }}>{account.email}</div>
              {account.unread > 0 && (
                <div style={{ fontSize: '10px', color: '#007AFF', marginTop: '2px' }}>
                  {account.unread} unread
                </div>
              )}
            </div>
          ))}
          <div style={{ height: '1px', background: 'rgba(80,80,90,0.22)', margin: '16px 0' }} />
          {/* Folders */}
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Mailboxes</div>
          {mailFolders.map(folder => {
            const emails = mockEmails[folder.id as keyof typeof mockEmails] || [];
            const unreadCount = emails.filter(email => email.unread).length;
            return (
              <div 
                key={folder.id}
                style={{ 
                  fontSize: '12px', 
                  color: selectedMailFolder === folder.id ? '#007AFF' : '#fff', 
                  padding: '6px 0', 
                  cursor: 'pointer',
                  fontWeight: selectedMailFolder === folder.id ? '500' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => {
                  setSelectedMailFolder(folder.id);
                  setSelectedEmail(null);
                }}
              >
                <span>{folder.icon}</span>
                <span>{folder.name}</span>
                {unreadCount > 0 && (
                  <span style={{ 
                    background: '#007AFF', 
                    color: '#fff', 
                    fontSize: '10px', 
                    padding: '2px 6px', 
                    borderRadius: '10px',
                    marginLeft: 'auto'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Email List */}
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: '300px', borderRight: '1px solid rgba(80,80,90,0.22)', background: 'rgba(28,28,32,0.98)' }}>
              {getCurrentEmails().map(email => (
                <div
                  key={email.id}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid rgba(80,80,90,0.1)',
                    cursor: 'pointer',
                    background: selectedEmail === email.id ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                    borderLeft: email.unread ? '3px solid #007AFF' : '3px solid transparent'
                  }}
                  onClick={() => setSelectedEmail(email.id)}
                >
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: email.unread ? '600' : '400',
                    color: email.unread ? '#fff' : '#aaa',
                    marginBottom: '4px'
                  }}>
                    {email.from || email.to}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    fontWeight: email.unread ? '600' : '400',
                    color: email.unread ? '#fff' : '#aaa',
                    marginBottom: '4px',
                    lineHeight: '1.3'
                  }}>
                    {email.subject}
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#666',
                    marginBottom: '4px',
                    lineHeight: '1.3'
                  }}>
                    {email.preview}
                  </div>
                  <div style={{ 
                    fontSize: '10px', 
                    color: '#666',
                    textAlign: 'right'
                  }}>
                    {email.time}
                  </div>
                </div>
              ))}
              {getCurrentEmails().length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  color: '#aaa', 
                  padding: '40px 20px',
                  fontSize: '13px'
                }}>
                  No messages in {selectedMailFolder}
                </div>
              )}
            </div>
            {/* Email Content */}
            <div style={{ flex: 1, padding: '20px', background: 'rgba(28,28,32,0.98)' }}>
              {selectedEmail ? (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                      {getCurrentEmails().find(e => e.id === selectedEmail)?.subject}
                    </div>
                    <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>
                      From: {getCurrentEmails().find(e => e.id === selectedEmail)?.from}
                    </div>
                    <div style={{ fontSize: '13px', color: '#aaa' }}>
                      Date: {getCurrentEmails().find(e => e.id === selectedEmail)?.time}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    lineHeight: '1.6', 
                    color: '#e0e0e0',
                    whiteSpace: 'pre-line'
                  }}>
                    {getEmailContent(selectedEmail)}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#aaa', marginTop: '100px' }}>
                  <div style={{ fontSize: '16px', marginBottom: '8px' }}>No Message Selected</div>
                  <div style={{ fontSize: '13px' }}>Select a message from the list to read</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail; 