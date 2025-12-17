import React from 'react';

interface SlackProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

const Slack: React.FC<SlackProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="slack-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 1000,
        height: 700,
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
      
      {/* Slack Title Bar */}
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
          Slack
        </div>
      </div>
      
      {/* Slack Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: '#4A154B', padding: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>Workspaces</div>
          <div style={{ fontSize: '12px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>My Workspace</div>
          <div style={{ fontSize: '12px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>Channels</div>
          <div style={{ fontSize: '12px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>Direct Messages</div>
        </div>
        
        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(28,28,32,0.98)' }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: '16px', marginBottom: '8px' }}>Welcome to Slack</div>
              <div style={{ fontSize: '13px', color: '#aaa' }}>Connect with your team</div>
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
              Message #general
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slack; 