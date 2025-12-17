import React, { useState, useEffect } from 'react';

interface IMessageProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setWindowPosition: (pos: { x: number; y: number }) => void;
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

// Message type definitions
type Message = {
  id: number;
  sender: string;
  time: string;
  isMe: boolean;
} & (
  | { type?: undefined; text: string; duration?: undefined }
  | { type: 'voice'; text?: undefined; duration: string }
);

// Mock conversations data
const mockConversations: Record<string, { messages: Message[] }> = {
  'Mama': {
    messages: [
      { id: 1, sender: 'Mama', text: 'Gordo que haces papi?', time: '2:30 PM', isMe: false },
      { id: 2, sender: 'Me', text: 'Mama, nada ma workeando. Ya casi termino el proycto', time: '2:32 PM', isMe: true },
      { id: 3, sender: 'Mama', text: 'Bendito Dios papi que bueno. Y ya comiste?', time: '2:35 PM', isMe: false },
      { id: 4, sender: 'Me', text: 'Sí ma, justo almorzando estoy', time: '2:36 PM', isMe: true },
      { id: 5, sender: 'Mama', text: 'Oki papi, provecho love you', time: '2:38 PM', isMe: false },
      { id: 6, sender: 'Me', text: 'LY too ma 😘', time: '2:40 PM', isMe: true }
    ]
  },
  'Papá': {
    messages: [
      { id: 1, sender: 'Papá', text: 'Son. Good Afternoon', time: '1:15 PM', isMe: false },
      { id: 2, sender: 'Me', text: 'Papa, good afternoon. Como estas pa?', time: '1:17 PM', isMe: true },
      { id: 3, sender: 'Papá', type: 'voice', duration: '1:12', time: '1:20 PM', isMe: false },
      { id: 4, sender: 'Me', text: 'Jajaja thank you pa 🙏🏽 Glad you liked it, ILY sir', time: '1:22 PM', isMe: true },
      { id: 5, sender: 'Papá', text: '💙💙 👊🏼', time: '1:25 PM', isMe: false }
    ]
  },
  'Dani🤍🌙': {
    messages: [
      { id: 1, sender: 'Dani🤍🌙', text: 'mi guapo🥺 ya le contesto mi amor estoy en meeting', time: '3:45 PM', isMe: false },
      { id: 2, sender: 'Me', text: 'mi amorsote 🥰 tranqui jaja, estoy editando el dashboard', time: '3:47 PM', isMe: true },
      { id: 3, sender: 'Dani🤍🌙', text: 'aaaaaa enseñeme 🥺🥺 yo quiero verlo', time: '3:50 PM', isMe: false },
      { id: 4, sender: 'Me', text: 'pereme ombe jajaj tenga juicio, todavia le falta', time: '3:52 PM', isMe: true },
      { id: 5, sender: 'Dani🤍🌙', text: 'jajaja ta bien mi amol ti amo!!', time: '3:55 PM', isMe: false },
      { id: 6, sender: 'Me', text: 'ti amooo más mi amor🤍', time: '3:56 PM', isMe: true }
    ]
  }
};

const IMessage: React.FC<IMessageProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setWindowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState(mockConversations);

  // Messages helper functions
  const sendMessage = () => {
    if (!newMessageText.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: Date.now(),
      sender: 'Me',
      text: newMessageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
      isMe: true
    };
    
    setConversations(prev => ({
      ...prev,
      [selectedConversation]: {
        ...prev[selectedConversation],
        messages: [...prev[selectedConversation].messages, newMessage]
      }
    }));
    setNewMessageText('');
    
    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'That sounds great! 😊',
        'I see what you mean',
        'Thanks for letting me know!',
        'Got it 👍',
        'Interesting!',
        'I\'ll get back to you soon',
        'Perfect!',
        'Sounds good to me'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: Date.now() + 1,
        sender: selectedConversation,
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
        isMe: false
      };
      
      setConversations(prev => ({
        ...prev,
        [selectedConversation]: {
          ...prev[selectedConversation],
          messages: [...prev[selectedConversation].messages, responseMessage]
        }
      }));
    }, 2000 + Math.random() * 3000);
  };

  const handleMessageKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (selectedConversation) {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [selectedConversation, conversations]);

  if (!isOpen) return null;

  return (
    <div
      className="imessage-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 800,
        height: 600,
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
      
      {/* iMessage Title Bar */}
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
        onMouseDown={(e) => {
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
        <div style={{ 
          fontSize: '13px', 
          fontWeight: '500', 
          color: '#fff',
          flex: 1,
          textAlign: 'center',
          marginLeft: '-40px'
        }}>
          Messages
        </div>
      </div>
      
      {/* iMessage Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'rgba(36, 36, 40, 0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Conversations</div>
          {Object.keys(conversations).map((conversation) => {
            const messages = conversations[conversation].messages;
            const lastMessage = messages[messages.length - 1];
            return (
              <div 
                key={conversation}
                style={{ 
                  padding: '8px 12px', 
                  cursor: 'pointer',
                  borderRadius: '8px',
                  background: selectedConversation === conversation ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
                  marginBottom: '4px',
                  border: selectedConversation === conversation ? '1px solid rgba(122, 199, 255, 0.3)' : '1px solid transparent'
                }}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div style={{ 
                  fontSize: '13px', 
                  fontWeight: '500',
                  color: selectedConversation === conversation ? '#7AC7FF' : '#fff', 
                  marginBottom: '2px'
                }}>
                  {conversation}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#aaa',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {lastMessage.type === 'voice' ? 'Voice message' : lastMessage.text}
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  color: '#666',
                  marginTop: '2px'
                }}>
                  {lastMessage.time}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedConversation ? (
            <>
              {/* Messages Area */}
              <div className="messages-container" style={{ flex: 1, padding: '20px', background: 'rgba(28,28,32,0.98)', overflowY: 'auto', maxHeight: '400px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                    {selectedConversation}
                  </div>
                </div>
                {conversations[selectedConversation as keyof typeof conversations].messages.map((message) => (
                  <div 
                    key={message.id}
                    style={{ 
                      marginBottom: '12px',
                      display: 'flex',
                      justifyContent: message.isMe ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      maxWidth: '70%',
                      padding: '8px 12px',
                      borderRadius: '18px',
                      background: message.isMe ? '#007AFF' : 'rgba(60,60,70,0.3)',
                      color: message.isMe ? '#fff' : '#fff',
                      fontSize: '13px',
                      wordWrap: 'break-word'
                    }}>
                      {message.type === 'voice' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: message.isMe ? '#fff' : '#007AFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}>
                            <div style={{
                              width: '0',
                              height: '0',
                              borderLeft: '6px solid transparent',
                              borderRight: '6px solid transparent',
                              borderTop: '6px solid transparent',
                              borderBottom: '6px solid transparent',
                              borderLeftColor: message.isMe ? '#007AFF' : '#fff',
                              transform: 'translateX(4px)'
                            }} />
                          </div>
                          <div style={{ fontSize: '12px', opacity: 0.8 }}>
                            Voice message • {message.duration}
                          </div>
                        </div>
                      ) : (
                        <div style={{ marginBottom: '4px' }}>{message.text}</div>
                      )}
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.7, 
                        textAlign: message.isMe ? 'right' : 'left' 
                      }}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div style={{ 
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'flex-start'
                  }}>
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: '18px',
                      background: 'rgba(60,60,70,0.3)',
                      color: '#aaa',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <div style={{ fontSize: '12px' }}>●</div>
                      <div style={{ fontSize: '12px' }}>●</div>
                      <div style={{ fontSize: '12px' }}>●</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <div style={{ height: '60px', borderTop: '1px solid rgba(80,80,90,0.22)', padding: '12px', background: 'rgba(36, 36, 40, 0.98)' }}>
                <div style={{ 
                  height: '36px', 
                  background: 'rgba(28,28,32,0.98)', 
                  border: '1px solid rgba(80,80,90,0.22)', 
                  borderRadius: '18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '0 16px',
                  gap: '8px'
                }}>
                  <input
                    type="text"
                    placeholder="iMessage"
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyPress={handleMessageKeyPress}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessageText.trim()}
                    style={{
                      background: newMessageText.trim() ? '#007AFF' : 'rgba(60,60,70,0.3)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: newMessageText.trim() ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ➤
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(28,28,32,0.98)' }}>
                <div style={{ textAlign: 'center', color: '#aaa' }}>
                  <div style={{ fontSize: '16px', marginBottom: '8px' }}>No Conversation Selected</div>
                  <div style={{ fontSize: '13px' }}>Choose a conversation to start messaging</div>
                </div>
              </div>
              
              {/* Message Input */}
              <div style={{ height: '60px', borderTop: '1px solid rgba(80,80,90,0.22)', padding: '12px', background: 'rgba(36, 36, 40, 0.98)' }}>
                <div style={{ 
                  height: '36px', 
                  background: 'rgba(28,28,32,0.98)', 
                  border: '1px solid rgba(80,80,90,0.22)', 
                  borderRadius: '18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '0 16px',
                  color: '#aaa',
                  fontSize: '13px'
                }}>
                  iMessage
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IMessage; 