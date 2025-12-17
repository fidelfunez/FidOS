import React from 'react';

interface NotionProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

const Notion: React.FC<NotionProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  console.log('Notion component - isOpen:', isOpen);
  if (!isOpen) return null;

  return (
    <div
      className="notion-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 1000,
        height: 700,
        background: '#191919',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
        border: '1px solid #232323',
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
      
      {/* Notion Title Bar */}
      <div
        style={{
          height: '32px',
          background: '#232323',
          borderBottom: '1px solid #222',
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
          FidOS Portfolio - Notion
        </div>
      </div>
      
      {/* Notion Toolbar */}
      <div style={{
        height: '45px',
        background: '#232323',
        borderBottom: '1px solid #222',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px'
      }}>
        <div style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>📄</div>
        <div style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>FidOS Portfolio</div>
        <div style={{ fontSize: '12px', color: '#aaa', marginLeft: 'auto' }}>Updated 2 minutes ago</div>
      </div>
      
      {/* Notion Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '260px', background: '#18181b', borderRight: '1px solid #232323' }}>
          {/* Workspace */}
          <div style={{ padding: '16px', borderBottom: '1px solid #232323' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#aaa', marginBottom: '8px', textTransform: 'uppercase' }}>Workspace</div>
            <div style={{ fontSize: '14px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>🚀 FidOS Portfolio</div>
          </div>
          
          {/* Pages */}
          <div style={{ padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#aaa', marginBottom: '8px', textTransform: 'uppercase' }}>Pages</div>
            <div style={{ fontSize: '14px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>📋 About Me</div>
            <div style={{ fontSize: '14px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>💼 Projects</div>
            <div style={{ fontSize: '14px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>📧 Contact</div>
            <div style={{ fontSize: '14px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>🎯 Goals</div>
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Page Header */}
          <div style={{ padding: '24px 32px 16px', borderBottom: '1px solid #232323' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>FidOS Portfolio</div>
            <div style={{ fontSize: '14px', color: '#aaa' }}>A macOS-style portfolio built with React and TypeScript</div>
          </div>
          
          {/* Page Content */}
          <div style={{ flex: 1, padding: '24px 32px', fontSize: '16px', lineHeight: '1.6', color: '#f3f3f3', background: '#191919' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#fff' }}>About This Project</div>
              <div style={{ marginBottom: '16px', color: '#ccc' }}>
                FidOS is my attempt at a macOS-style portfolio website, where I can showcase my development skills through an interactive desktop environment. 
                Each app in the dock represents a different aspect of my work and my experience.
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#fff' }}>Technologies Used</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ background: '#232323', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>React</span>
                <span style={{ background: '#232323', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>TypeScript</span>
                <span style={{ background: '#232323', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>Next.js</span>
                <span style={{ background: '#232323', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>Tailwind CSS</span>
                <span style={{ background: '#232323', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>Framer Motion</span>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#fff' }}>Features</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: '4px', width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></span>
                  Interactive dock with app windows
                </li>
                <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: '4px', width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></span>
                  Draggable and resizable windows
                </li>
                <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: '4px', width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></span>
                  Realistic macOS UI components
                </li>
                <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: '4px', width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></span>
                  Responsive design for all devices
                </li>
              </ul>
            </div>
            
            <div style={{ background: '#232323', padding: '16px', borderRadius: '8px', border: '1px solid #232323' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#fff' }}>💡 Next Steps</div>
              <div style={{ fontSize: '14px', color: '#aaa' }}>
                Continue adding more interactive features and polish the existing apps to create an even more immersive experience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notion; 