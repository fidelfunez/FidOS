import React, { useState } from 'react';

interface FaceTimeProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

// Mock FaceTime data
const mockContacts = [
  {
    id: '1',
    name: 'Dani🤍🌙',
    avatar: '👩🏻',
    status: 'online',
    lastSeen: 'now',
    favorite: true,
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'Dan Zuniga',
    avatar: '👨🏻‍💻',
    status: 'online',
    lastSeen: 'now',
    favorite: false,
    phone: '+1 (555) 234-5678'
  },
  {
    id: '3',
    name: 'Ariana Dixon',
    avatar: '🧘🏽‍♀️',
    status: 'offline',
    lastSeen: '2 hours ago',
    favorite: false,
    phone: '+1 (555) 345-6789'
  },
  {
    id: '4',
    name: 'Santi Cerna',
    avatar: '👨🏻‍🎓',
    status: 'online',
    lastSeen: 'now',
    favorite: false,
    phone: '+1 (555) 456-7890'
  },
  {
    id: '5',
    name: 'Bryan Aguilar',
    avatar: '🧔🏾‍♂️',
    status: 'offline',
    lastSeen: '1 day ago',
    favorite: true,
    phone: '+1 (555) 567-8901'
  },
  {
    id: '6',
    name: 'Bristean Luzey',
    avatar: '🧔‍♂️',
    status: 'online',
    lastSeen: 'now',
    favorite: true,
    phone: '+1 (555) 678-9012'
  }
];

const mockRecentCalls = [
  {
    id: '1',
    contactId: '1',
    type: 'incoming',
    duration: '1:23:14',
    date: '2025-07-15T14:30:00',
    status: 'completed'
  },
  {
    id: '2',
    contactId: '2',
    type: 'outgoing',
    duration: '05:21',
    date: '2025-06-14T16:45:00',
    status: 'completed'
  },
  {
    id: '3',
    contactId: '3',
    type: 'missed',
    duration: '00:00',
    date: '2025-07-13T09:15:00',
    status: 'missed'
  },
  {
    id: '4',
    contactId: '4',
    type: 'incoming',
    duration: '5:45',
    date: '2025-01-25T20:20:00',
    status: 'completed'
  }
];

const FaceTime: React.FC<FaceTimeProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [facetimeView, setFacetimeView] = useState<'contacts' | 'call' | 'recent'>('contacts');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // FaceTime helper functions
  const getContactById = (id: string) => {
    return mockContacts.find(contact => contact.id === id);
  };

  const getRecentCallsWithContacts = () => {
    return mockRecentCalls.map(call => ({
      ...call,
      contact: getContactById(call.contactId)
    }));
  };

  const startCall = (contactId: string) => {
    setSelectedContact(contactId);
    setIsInCall(true);
    setFacetimeView('call');
  };

  const endCall = () => {
    setIsInCall(false);
    setSelectedContact(null);
    setFacetimeView('contacts');
    setIsMuted(false);
    setIsCameraOff(false);
  };

  const formatCallDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="facetime-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 900,
        height: 650,
        background: '#000',
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
      
      {/* FaceTime Title Bar */}
      <div
        style={{
          height: '32px',
          background: 'rgba(0,0,0,0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
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
          FaceTime
        </div>
      </div>
      
      {/* FaceTime Toolbar */}
      <div style={{
        height: '44px',
        background: 'rgba(0,0,0,0.8)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px'
      }}>
        <button 
          style={{
            background: facetimeView === 'contacts' ? 'rgba(0, 122, 255, 0.2)' : 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: facetimeView === 'contacts' ? '#007AFF' : '#fff',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          onClick={() => setFacetimeView('contacts')}
        >
          Contacts
        </button>
        <button 
          style={{
            background: facetimeView === 'recent' ? 'rgba(0, 122, 255, 0.2)' : 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: facetimeView === 'recent' ? '#007AFF' : '#fff',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          onClick={() => setFacetimeView('recent')}
        >
          Recent
        </button>
      </div>
      
      {/* FaceTime Content */}
      <div style={{ flex: 1, display: 'flex', background: '#000' }}>
        {facetimeView === 'call' && isInCall ? (
          // Call View
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Main Video Area */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {/* Remote Video (Large) */}
              <div style={{ 
                width: '100%', 
                height: '100%', 
                background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '120px'
              }}>
                {selectedContact && getContactById(selectedContact)?.avatar}
              </div>
              
              {/* Local Video (Small) */}
              <div style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '20px', 
                width: '120px', 
                height: '90px', 
                background: 'rgba(0,0,0,0.8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                border: '2px solid rgba(255,255,255,0.2)'
              }}>
                👤
              </div>
              
              {/* Call Info */}
              <div style={{ 
                position: 'absolute', 
                top: '20px', 
                left: '20px', 
                background: 'rgba(0,0,0,0.7)', 
                padding: '8px 12px', 
                borderRadius: '6px'
              }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>
                  {selectedContact && getContactById(selectedContact)?.name}
                </div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>
                  FaceTime • {isMuted ? 'Muted' : 'Live'}
                </div>
              </div>
            </div>
            
            {/* Call Controls */}
            <div style={{ 
              height: '80px', 
              background: 'rgba(0,0,0,0.8)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '20px'
            }}>
              <button 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: isMuted ? '#FF3B30' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? '🔇' : '🎤'}
              </button>
              
              <button 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: isCameraOff ? '#FF3B30' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setIsCameraOff(!isCameraOff)}
              >
                {isCameraOff ? '📷' : '📹'}
              </button>
              
              <button 
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#FF3B30',
                  border: 'none',
                  color: '#fff',
                  fontSize: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={endCall}
              >
                📞
              </button>
            </div>
          </div>
        ) : (
          // Contacts/Recent View
          <div style={{ flex: 1, display: 'flex' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', background: 'rgba(0,0,0,0.9)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>
                {facetimeView === 'contacts' ? 'Contacts' : 'Recent Calls'}
              </div>
              
              {facetimeView === 'contacts' ? (
                // Contacts List
                <div style={{ overflow: 'auto', height: 'calc(100vh - 200px)' }}>
                  {mockContacts.map(contact => (
                    <div 
                      key={contact.id}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '12px', 
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginBottom: '4px',
                        background: selectedContact === contact.id ? 'rgba(0, 122, 255, 0.2)' : 'transparent'
                      }}
                      onClick={() => setSelectedContact(contact.id)}
                    >
                      <div style={{ 
                        fontSize: '32px', 
                        marginRight: '12px',
                        opacity: contact.status === 'online' ? 1 : 0.5
                      }}>
                        {contact.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '2px' }}>
                          {contact.name}
                        </div>
                        <div style={{ fontSize: '12px', color: contact.status === 'online' ? '#4CD964' : '#aaa' }}>
                          {contact.status === 'online' ? '● Online' : `Last seen ${contact.lastSeen}`}
                        </div>
                      </div>
                      {contact.favorite && (
                        <div style={{ fontSize: '16px', color: '#FFD700' }}>⭐</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // Recent Calls List
                <div style={{ overflow: 'auto', height: 'calc(100vh - 200px)' }}>
                  {getRecentCallsWithContacts().map(call => (
                    <div 
                      key={call.id}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '12px', 
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginBottom: '4px'
                      }}
                      onClick={() => startCall(call.contactId)}
                    >
                      <div style={{ 
                        fontSize: '24px', 
                        marginRight: '12px',
                        color: call.status === 'missed' ? '#FF3B30' : 
                               call.type === 'incoming' ? '#4CD964' : '#007AFF'
                      }}>
                        {call.type === 'incoming' ? '📥' : call.type === 'outgoing' ? '📤' : '📞'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '2px' }}>
                          {call.contact?.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#aaa' }}>
                          {formatCallDate(call.date)} • {call.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: '#000' }}>
              {selectedContact ? (
                // Contact Details
                <div style={{
                  textAlign: 'center',
                  color: '#fff',
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 0,
                }}>
                  <div style={{ fontSize: '120px', marginBottom: '24px' }}>
                    {getContactById(selectedContact)?.avatar}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                    {getContactById(selectedContact)?.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#aaa', marginBottom: '24px' }}>
                    {getContactById(selectedContact)?.phone}
                  </div>
                  <button 
                    style={{
                      background: '#007AFF',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '12px 24px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                    onClick={() => startCall(selectedContact)}
                  >
                    📞 Start FaceTime
                  </button>
                </div>
              ) : (
                // Welcome Screen
                <div style={{ textAlign: 'center', color: '#fff' }}>
                  <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>FaceTime</div>
                  <div style={{ fontSize: '14px', color: '#86868b', marginBottom: '24px' }}>
                    Select a contact to start a video call
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceTime; 