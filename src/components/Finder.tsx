import React, { useState } from 'react';

// File system type definitions
type FileItem = {
  type: 'file';
  size: string;
  date: string;
  kind: string;
};

type FolderItem = {
  type: 'folder';
  items: Record<string, FileItem | FolderItem>;
};

type FileSystem = Record<string, FolderItem>;

// Helper function to safely navigate file system
const getFileSystemItem = (path: string[], fs: FileSystem): Record<string, FileItem | FolderItem> => {
  let current: any = fs;
  for (const segment of path) {
    if (current[segment] && current[segment].type === 'folder') {
      current = current[segment].items;
    } else {
      return {};
    }
  }
  return current;
};

// Mock file system structure
const fileSystem: FileSystem = {
  Desktop: {
    type: 'folder',
    items: {
      'Projects': { 
        type: 'folder', 
        items: {
          'FidOS Dashboard': { type: 'file', size: '2.3 MB', date: 'Today', kind: 'Project' },
          'Portfolio Website': { type: 'file', size: '1.8 MB', date: 'Yesterday', kind: 'Project' },
          'Mobile App': { type: 'file', size: '4.1 MB', date: 'Jul 4', kind: 'Project' },
          'API Backend': { type: 'file', size: '3.2 MB', date: 'Jul 2', kind: 'Project' },
          'Design System': { type: 'file', size: '1.5 MB', date: 'Jun 28', kind: 'Project' },
          'React Components': { type: 'folder', items: {} },
          'Documentation': { type: 'folder', items: {} }
        }
      },
      'Photos': { 
        type: 'folder', 
        items: {
          'Screenshot 2024-07-06.png': { type: 'file', size: '2.1 MB', date: 'Today', kind: 'PNG Image' },
          'Portfolio Shot.jpg': { type: 'file', size: '3.8 MB', date: 'Yesterday', kind: 'JPEG Image' },
          'Design Mockup.png': { type: 'file', size: '1.9 MB', date: 'Jul 4', kind: 'PNG Image' },
          'Vacation 2024': { type: 'folder', items: {} },
          'Work Screenshots': { type: 'folder', items: {} },
          'Screenshots': { type: 'folder', items: {} }
        }
      },
      'FidOS': { 
        type: 'folder', 
        items: {
          'README.md': { type: 'file', size: '12 KB', date: 'Today', kind: 'Markdown' },
          'package.json': { type: 'file', size: '2.1 KB', date: 'Today', kind: 'JSON' },
          'src': { type: 'folder', items: {} },
          'public': { type: 'folder', items: {} },
          'components': { type: 'folder', items: {} },
          'assets': { type: 'folder', items: {} },
          'docs': { type: 'folder', items: {} }
        }
      }
    }
  },
  Documents: {
    type: 'folder',
    items: {
      'Resume.pdf': { type: 'file', size: '245 KB', date: 'Today', kind: 'PDF Document' },
      'Portfolio.docx': { type: 'file', size: '1.2 MB', date: 'Yesterday', kind: 'Word Document' },
      'Project Ideas.txt': { type: 'file', size: '12 KB', date: 'Jul 4', kind: 'Plain Text' },
      'Work': { type: 'folder', items: {} },
      'Personal': { type: 'folder', items: {} }
    }
  },
  Downloads: {
    type: 'folder',
    items: {
      'react-18.2.0.tgz': { type: 'file', size: '45.2 MB', date: 'Today', kind: 'Archive' },
      'node-v18.15.0.pkg': { type: 'file', size: '28.7 MB', date: 'Yesterday', kind: 'Installer' },
      'screenshot.png': { type: 'file', size: '2.1 MB', date: 'Jul 3', kind: 'PNG Image' },
      'sisyphus-ii.key': { type: 'file', size: '15.8 MB', date: 'Jul 2', kind: 'Keynote Presentation' }
    }
  },
  Applications: {
    type: 'folder',
    items: {
      'Safari.app': { type: 'file', size: '45.2 MB', date: 'Jul 1', kind: 'Application' },
      'Mail.app': { type: 'file', size: '32.1 MB', date: 'Jul 1', kind: 'Application' },
      'Photos.app': { type: 'file', size: '28.9 MB', date: 'Jul 1', kind: 'Application' },
      'Notes.app': { type: 'file', size: '12.3 MB', date: 'Jul 1', kind: 'Application' },
      'VS Code.app': { type: 'file', size: '156.7 MB', date: 'Jun 30', kind: 'Application' }
    }
  }
};

interface FinderProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setWindowPosition: (position: { x: number; y: number }) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDragStart: (dragStart: { x: number; y: number }) => void;
  initialFolder?: string;
}

const Finder: React.FC<FinderProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setWindowPosition,
  setIsDragging,
  setDragStart,
  initialFolder
}) => {
  // Finder-specific state
  const [currentPath, setCurrentPath] = useState(() => {
    // If initialFolder is provided, start in that folder, otherwise start in Desktop
    if (initialFolder) {
      return ['Desktop', initialFolder];
    }
    return ['Desktop'];
  });
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'icons'>('list');
  
  // Navigation history state
  const [navigationHistory, setNavigationHistory] = useState<string[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Finder helper functions
  const getCurrentFolderItems = () => {
    return getFileSystemItem(currentPath, fileSystem);
  };

  const navigateToFolder = (folderName: string) => {
    const newPath = [...currentPath, folderName];
    setCurrentPath(newPath);
    setSelectedFiles([]);
    
    // Add to navigation history
    const newHistory = navigationHistory.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const navigateBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setCurrentPath(navigationHistory[newIndex]);
      setHistoryIndex(newIndex);
      setSelectedFiles([]);
    } else if (currentPath.length > 1) {
      // Fallback to breadcrumb navigation
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFiles([]);
    }
  };

  const navigateForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setCurrentPath(navigationHistory[newIndex]);
      setHistoryIndex(newIndex);
      setSelectedFiles([]);
    }
  };

  const navigateToSidebar = (folderName: string) => {
    const newPath = [folderName];
    setCurrentPath(newPath);
    setSelectedFiles([]);
    
    // Add to navigation history
    const newHistory = navigationHistory.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  if (!isOpen) return null;

  return (
    <div
      className="finder-dock-window"
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
      
      {/* Finder Title Bar */}
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
          Finder
        </div>
      </div>
      
      {/* Finder Toolbar */}
      <div style={{
        height: '44px',
        background: 'rgba(36, 36, 40, 0.98)',
        borderBottom: '1px solid rgba(80,80,90,0.22)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px'
      }}>
        {/* Navigation Buttons */}
        <button 
          style={{
            background: 'transparent',
            border: '1px solid rgba(120,120,130,0.18)',
            borderRadius: '6px',
            padding: '6px 8px',
            fontSize: '12px',
            color: (historyIndex > 0 || currentPath.length > 1) ? '#fff' : '#666',
            cursor: (historyIndex > 0 || currentPath.length > 1) ? 'pointer' : 'default',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease'
          }}
          onClick={navigateBack}
          disabled={historyIndex <= 0 && currentPath.length <= 1}
        >
          ← Back
        </button>
        <button 
          style={{
            background: 'transparent',
            border: '1px solid rgba(120,120,130,0.18)',
            borderRadius: '6px',
            padding: '6px 8px',
            fontSize: '12px',
            color: historyIndex < navigationHistory.length - 1 ? '#fff' : '#666',
            cursor: historyIndex < navigationHistory.length - 1 ? 'pointer' : 'default',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease'
          }}
          onClick={navigateForward}
          disabled={historyIndex >= navigationHistory.length - 1}
        >
          Forward →
        </button>
        
        <div style={{ width: '1px', height: '20px', background: 'rgba(120,120,130,0.18)', margin: '0 8px' }} />
        
        <button 
          style={{
            background: viewMode === 'list' ? 'rgba(0, 122, 255, 0.13)' : 'transparent',
            border: viewMode === 'list' ? '1px solid rgba(0, 122, 255, 0.32)' : '1px solid rgba(120,120,130,0.18)',
            borderRadius: '6px',
            padding: '4px 12px',
            fontSize: '12px',
            color: viewMode === 'list' ? '#7AC7FF' : '#aaa',
            cursor: 'pointer',
            fontWeight: 600
          }}
          onClick={() => setViewMode('list')}
        >
          List
        </button>
        <button 
          style={{
            background: viewMode === 'icons' ? 'rgba(0, 122, 255, 0.13)' : 'transparent',
            border: viewMode === 'icons' ? '1px solid rgba(0, 122, 255, 0.32)' : '1px solid rgba(120,120,130,0.18)',
            borderRadius: '6px',
            padding: '4px 12px',
            fontSize: '12px',
            color: viewMode === 'icons' ? '#7AC7FF' : '#aaa',
            cursor: 'pointer',
            fontWeight: 600
          }}
          onClick={() => setViewMode('icons')}
        >
          Icons
        </button>
      </div>
      
      {/* Content Area */}
      <div style={{ flex: 1, display: 'flex', background: 'rgba(28,28,32,0.98)' }}>
        {/* Sidebar */}
        <div style={{ width: '200px', background: 'rgba(36, 36, 40, 0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Favorites</div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: currentPath[0] === 'Desktop' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: currentPath[0] === 'Desktop' ? '500' : '400'
            }}
            onClick={() => navigateToSidebar('Desktop')}
          >
            🖥️ Desktop
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: currentPath[0] === 'Documents' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: currentPath[0] === 'Documents' ? '500' : '400'
            }}
            onClick={() => navigateToSidebar('Documents')}
          >
            📄 Documents
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: currentPath[0] === 'Downloads' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: currentPath[0] === 'Downloads' ? '500' : '400'
            }}
            onClick={() => navigateToSidebar('Downloads')}
          >
            ⬇️ Downloads
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: currentPath[0] === 'Applications' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: currentPath[0] === 'Applications' ? '500' : '400'
            }}
            onClick={() => navigateToSidebar('Applications')}
          >
            🚀 Applications
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Breadcrumb */}
          <div style={{ 
            height: '32px', 
            background: 'rgba(36, 36, 40, 0.98)', 
            borderBottom: '1px solid rgba(80,80,90,0.22)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            fontSize: '12px',
            color: '#fff'
          }}>
            {currentPath.map((segment, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span style={{ margin: '0 8px', color: '#666' }}>›</span>}
                <span 
                  style={{ 
                    cursor: index < currentPath.length - 1 ? 'pointer' : 'default',
                    color: index < currentPath.length - 1 ? '#007AFF' : '#fff'
                  }}
                  onClick={() => {
                    if (index < currentPath.length - 1) {
                      const newPath = currentPath.slice(0, index + 1);
                      setCurrentPath(newPath);
                      setSelectedFiles([]);
                      
                      // Add to navigation history
                      const newHistory = navigationHistory.slice(0, historyIndex + 1);
                      newHistory.push(newPath);
                      setNavigationHistory(newHistory);
                      setHistoryIndex(newHistory.length - 1);
                    }
                  }}
                >
                  {segment}
                </span>
              </React.Fragment>
            ))}
          </div>
          
          {/* File List */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {viewMode === 'list' ? (
              <>
                {/* List Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 80px 80px',
                  padding: '8px 12px',
                  background: 'rgba(36, 36, 40, 0.98)',
                  borderBottom: '1px solid rgba(80,80,90,0.22)',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#aaa'
                }}>
                  <div>Name</div>
                  <div>Date Modified</div>
                  <div>Size</div>
                  <div>Kind</div>
                </div>
                
                {/* File Items - List View */}
                {Object.entries(getCurrentFolderItems()).map(([name, item]) => (
                  <div
                    key={name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 100px 80px 80px',
                      padding: '8px 12px',
                      fontSize: '13px',
                      borderBottom: '1px solid rgba(80,80,90,0.10)',
                      cursor: 'pointer',
                      transition: 'background 0.1s',
                      color: '#fff',
                      background: selectedFiles.includes(name) ? 'rgba(0, 122, 255, 0.2)' : 'transparent'
                    }}
                    onMouseEnter={(e) => !selectedFiles.includes(name) && (e.currentTarget.style.background = 'rgba(0, 122, 255, 0.13)')}
                    onMouseLeave={(e) => !selectedFiles.includes(name) && (e.currentTarget.style.background = 'transparent')}
                    onClick={() => {
                      if (item.type === 'folder') {
                        navigateToFolder(name);
                      } else {
                        setSelectedFiles([name]);
                      }
                    }}
                    onDoubleClick={() => {
                      if (item.type === 'folder') {
                        navigateToFolder(name);
                      }
                    }}
                  >
                    <div style={{ color: '#fff', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.type === 'folder' ? '📁' : '📄'} {name}
                    </div>
                    <div style={{ color: '#aaa' }}>{item.type === 'file' ? item.date : ''}</div>
                    <div style={{ color: '#aaa' }}>{item.type === 'file' ? item.size : '--'}</div>
                    <div style={{ color: '#aaa' }}>{item.type === 'file' ? item.kind : 'Folder'}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Icons View */}
                <div style={{
                  padding: '20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: '20px',
                  alignItems: 'start'
                }}>
                  {Object.entries(getCurrentFolderItems()).map(([name, item]) => (
                    <div
                      key={name}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '8px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: selectedFiles.includes(name) ? 'rgba(0, 122, 255, 0.2)' : 'transparent',
                        border: selectedFiles.includes(name) ? '1px solid rgba(0, 122, 255, 0.4)' : '1px solid transparent',
                        minHeight: '80px',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        if (!selectedFiles.includes(name)) {
                          e.currentTarget.style.background = 'rgba(0, 122, 255, 0.13)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selectedFiles.includes(name)) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                      onClick={() => {
                        if (item.type === 'folder') {
                          navigateToFolder(name);
                        } else {
                          setSelectedFiles([name]);
                        }
                      }}
                      onDoubleClick={() => {
                        if (item.type === 'folder') {
                          navigateToFolder(name);
                        }
                      }}
                    >
                      <div style={{
                        fontSize: '48px',
                        marginBottom: '8px',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}>
                        {item.type === 'folder' ? '📁' : '📄'}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '500',
                        lineHeight: '1.2',
                        wordBreak: 'break-word',
                        maxWidth: '100%',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                      }}>
                        {name}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {Object.keys(getCurrentFolderItems()).length === 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                color: '#aaa',
                fontSize: '14px'
              }}>
                This folder is empty
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finder; 