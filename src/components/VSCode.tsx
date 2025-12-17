import React, { useState } from 'react';

interface VSCodeProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

const VSCode: React.FC<VSCodeProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [code, setCode] = useState(`import React from 'react';

interface DashboardProps {
  // Component props
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div>
      Hello, FidOS!
    </div>
  );
};

export default Dashboard;`);

  console.log('VSCode component - isOpen:', isOpen);
  if (!isOpen) return null;

  return (
    <div
      className="vscode-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 1000,
        height: 700,
        background: '#1e1e1e',
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
      
      {/* VS Code Title Bar */}
      <div
        style={{
          height: '32px',
          background: '#3c3c3c',
          borderBottom: '1px solid #555',
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
          Dashboard.tsx - FidOS - Visual Studio Code
        </div>
      </div>
      
      {/* VS Code Toolbar */}
      <div style={{
        height: '40px',
        background: '#2d2d30',
        borderBottom: '1px solid #555',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px'
      }}>
        <div style={{ fontSize: '12px', color: '#fff', marginRight: '16px' }}>File</div>
        <div style={{ fontSize: '12px', color: '#fff', marginRight: '16px' }}>Edit</div>
        <div style={{ fontSize: '12px', color: '#fff', marginRight: '16px' }}>View</div>
        <div style={{ fontSize: '12px', color: '#fff', marginRight: '16px' }}>Go</div>
        <div style={{ fontSize: '12px', color: '#fff', marginRight: '16px' }}>Run</div>
        <div style={{ fontSize: '12px', color: '#fff', marginRight: '16px' }}>Terminal</div>
        <div style={{ fontSize: '12px', color: '#fff' }}>Help</div>
      </div>
      
      {/* VS Code Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: '#252526', borderRight: '1px solid #555' }}>
          {/* Explorer */}
          <div style={{ padding: '12px', borderBottom: '1px solid #555' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>EXPLORER</div>
            <div style={{ fontSize: '12px', color: '#fff', padding: '4px 0', cursor: 'pointer' }}>📁 FidOS</div>
            <div style={{ fontSize: '12px', color: '#fff', padding: '4px 0', cursor: 'pointer', marginLeft: '12px' }}>📄 Dashboard.tsx</div>
            <div style={{ fontSize: '12px', color: '#fff', padding: '4px 0', cursor: 'pointer', marginLeft: '12px' }}>📄 Safari.tsx</div>
            <div style={{ fontSize: '12px', color: '#fff', padding: '4px 0', cursor: 'pointer', marginLeft: '12px' }}>📄 Mail.tsx</div>
            <div style={{ fontSize: '12px', color: '#fff', padding: '4px 0', cursor: 'pointer', marginLeft: '12px' }}>📄 Photos.tsx</div>
          </div>
          
          {/* Search */}
          <div style={{ padding: '12px', borderBottom: '1px solid #555' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>SEARCH</div>
            <div style={{ fontSize: '12px', color: '#aaa' }}>Search in files</div>
          </div>
          
          {/* Source Control */}
          <div style={{ padding: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>SOURCE CONTROL</div>
            <div style={{ fontSize: '12px', color: '#aaa' }}>No changes</div>
          </div>
        </div>
        
        {/* Main Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ height: '35px', background: '#2d2d30', borderBottom: '1px solid #555', display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              background: '#1e1e1e', 
              padding: '8px 16px', 
              fontSize: '12px', 
              color: '#fff',
              borderRight: '1px solid #555'
            }}>
              Dashboard.tsx
            </div>
            <div style={{ 
              background: '#2d2d30', 
              padding: '8px 16px', 
              fontSize: '12px', 
              color: '#aaa'
            }}>
              + 
            </div>
          </div>
          
                                          {/* Code Editor */}
           <div style={{ flex: 1, background: '#1e1e1e', display: 'flex' }}>
             {/* Line Numbers */}
             <div style={{ 
               width: '50px', 
               background: '#252526', 
               borderRight: '1px solid #555',
               padding: '16px 8px',
               fontFamily: 'Consolas, Monaco, monospace',
               fontSize: '14px',
               lineHeight: '1.5',
               color: '#858585',
               textAlign: 'right',
               userSelect: 'none'
             }}>
               {code.split('\n').map((_, index) => (
                 <div key={index} style={{ padding: '0 4px' }}>
                   {index + 1}
                 </div>
               ))}
             </div>
             
             {/* Editor Area */}
             <div style={{ flex: 1, padding: '16px 0 16px 16px' }}>
               <textarea
                 value={code}
                 onChange={(e) => setCode(e.target.value)}
                 style={{
                   width: '100%',
                   height: '100%',
                   background: 'transparent',
                   border: 'none',
                   outline: 'none',
                   color: '#fff',
                   fontFamily: 'Consolas, Monaco, monospace',
                   fontSize: '14px',
                   lineHeight: '1.5',
                   resize: 'none',
                   padding: '0',
                   margin: '0',
                   caretColor: '#fff'
                 }}
                 placeholder="Start coding here..."
                 spellCheck={false}
                 autoComplete="off"
                 autoCorrect="off"
                 autoCapitalize="off"
               />
             </div>
           </div>
          
          {/* Status Bar */}
          <div style={{ height: '22px', background: '#007acc', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: '12px', color: '#fff' }}>
            <div style={{ marginRight: '16px' }}>TypeScript React</div>
            <div style={{ marginRight: '16px' }}>Ln 15, Col 1</div>
            <div style={{ marginRight: '16px' }}>Spaces: 2</div>
            <div style={{ marginRight: '16px' }}>UTF-8</div>
            <div style={{ marginRight: '16px' }}>LF</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCode; 