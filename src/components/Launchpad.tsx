import React, { useState, useEffect } from 'react';

interface LaunchpadProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

interface App {
  id: string;
  name: string;
  icon: string;
  color: string;
  folder?: string;
  isImage?: boolean;
}

const Launchpad: React.FC<LaunchpadProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Apps organized by pages and folders
  const appPages: App[][] = [
    // Page 1 - Main Apps
    [
      { id: 'safari', name: 'Safari', icon: '/icons-png/safari/safari_page_01.webp', color: '#007AFF', isImage: true },
      { id: 'mail', name: 'Mail', icon: '/icons-png/mail_16x16x32,mail_32x32x32,mail_256x256x32/mail_1024x1024x32.webp', color: '#007AFF', isImage: true },
      { id: 'photos', name: 'Photos', icon: '/icons-png/photos_16x16x32,photos_32x32x32,photos_256x256x32/photos_1024x1024x32.webp', color: '#FF3B30', isImage: true },
      { id: 'facetime', name: 'FaceTime', icon: '/icons-png/facetime_16x16x32,facetime_32x32x32,facetime_256x256x32/facetime_1024x1024x32.webp', color: '#34C759', isImage: true },
      { id: 'calendar', name: 'Calendar', icon: '/icons-png/calendar_16x16x32,calendar_32x32x32,calendar_256x256x32/calendar_1024x1024x32.webp', color: '#FF9500', isImage: true },
      { id: 'reminders', name: 'Reminders', icon: '/icons-png/reminders/reminders_page_01.webp', color: '#FF9500', isImage: true },
      { id: 'music', name: 'Music', icon: '/icons-png/apple-music_16x16x32,apple-music_32x32x32,apple-music_256x256x32/apple-music_1024x1024x32.webp', color: '#FF2D92', isImage: true },
      { id: 'imessage', name: 'iMessage', icon: '/icons-png/imessage_16x16x32,imessage_32x32x32,imessage_256x256x32/imessage_1024x1024x32.webp', color: '#34C759', isImage: true },
      { id: 'notes', name: 'Notes', icon: '/icons-png/notes_16x16x32,notes_32x32x32,notes_256x256x32/notes_1024x1024x32.webp', color: '#FFCC02', isImage: true },
      { id: 'app-store', name: 'App Store', icon: '/icons-png/app-store_16x16x32,app-store_32x32x32,app-store_256x256x32/app-store_1024x1024x32.webp', color: '#007AFF', isImage: true },
      { id: 'iphone-mirroring', name: 'iPhone Mirroring', icon: '/icons-png/screen-mirroring/screen-mirroring_page_01.webp', color: '#007AFF', isImage: true },
      { id: 'slack', name: 'Slack', icon: '/icons-png/slack/slack_page_01.webp', color: '#4A154B', isImage: true },
      { id: 'vscode', name: 'VS Code', icon: '/icons-png/vs-code/vs-code_page_01.webp', color: '#007ACC', isImage: true },
      { id: 'notion', name: 'Notion', icon: '/icons-png/notion.webp', color: '#000000', isImage: true },
      { id: 'finder', name: 'Finder', icon: '/icons-png/finder_16x16x32,finder_32x32x32,finder_256x256x32/finder_1024x1024x32.webp', color: '#007AFF', isImage: true },
      { id: 'calculator', name: 'Calculator', icon: '/other icons/calculator_16x16x32,calculator_32x32x32,calculator_256x256x32/calculator_1024x1024x32.webp', color: '#FF9500', isImage: true },
      { id: 'weather', name: 'Weather', icon: '/other icons/weather.webp', color: '#007AFF', isImage: true },
      { id: 'maps', name: 'Maps', icon: '/other icons/maps_1024x1024x32.webp', color: '#FF3B30', isImage: true },
      { id: 'clock', name: 'Clock', icon: '/other icons/clock_16x16x32,clock_32x32x32,clock_256x256x32/clock_1024x1024x32.webp', color: '#FF9500', isImage: true },
      { id: 'brave', name: 'Brave', icon: '/icons-png/brave_16x16x32,brave_32x32x32,brave_256x256x32/brave_1024x1024x32.webp', color: '#FF2000', isImage: true },
      { id: 'system-settings', name: 'System Settings', icon: '/icons-png/system-settings/system-settings_page_01.webp', color: '#8E8E93', isImage: true },
    ],
    // Page 2 - Development Tools & Utilities
    [
      { id: 'git', name: 'Git', icon: '/other icons/git_16x16x32,git_32x32x32,git_256x256x32/git_1024x1024x32.webp', color: '#F05032', isImage: true },
      { id: 'docker', name: 'Docker', icon: '/other icons/docker_16x16x32,docker_32x32x32,docker_256x256x32/docker_1024x1024x32.webp', color: '#2496ED', isImage: true },
      { id: 'postman', name: 'Postman', icon: '/other icons/postman_16x16x32,postman_32x32x32,postman_256x256x32/postman_1024x1024x32.webp', color: '#FF6C37', isImage: true },
      { id: 'figma', name: 'Figma', icon: '/other icons/figma_256x256x32,figma_512x512x32,figma_1024x1024x32/figma_1024x1024x32.webp', color: '#F24E1E', isImage: true },
      { id: 'books', name: 'Books', icon: '/other icons/books_16x16x32,books_32x32x32,books_256x256x32/books_1024x1024x32.webp', color: '#FF9500', isImage: true },
      { id: 'podcasts', name: 'Podcasts', icon: '/other icons/podcasts_16x16x32,podcasts_32x32x32,podcasts_256x256x32/podcasts_1024x1024x32.webp', color: '#FF2D92', isImage: true },
      { id: 'tv', name: 'TV', icon: '/other icons/tv.webp', color: '#FF3B30', isImage: true },
      { id: 'sketch', name: 'Sketch', icon: '/other icons/sketch_256x256x32,sketch_512x512x32,sketch_1024x1024x32/sketch_1024x1024x32.webp', color: '#FFAE00', isImage: true },
      { id: 'zeplin', name: 'Zeplin', icon: '/other icons/zeplin.webp', color: '#FF9000', isImage: true },
      { id: 'xcode', name: 'Xcode', icon: '/other icons/xcode.webp', color: '#007ACC', isImage: true },
      { id: 'terminal', name: 'Terminal', icon: '/other icons/terminal.webp', color: '#000000', isImage: true },
      { id: 'voice-memos', name: 'Voice Memos', icon: '/other icons/voice-memos.webp', color: '#FF2D92', isImage: true },
    ]
  ];

  // Folders
  const folders = [
    {
      id: 'productivity',
      name: 'Productivity',
      icon: '📊',
      color: '#007AFF',
      apps: [
        { id: 'pages', name: 'Pages', icon: '📄', color: '#007AFF', isImage: false },
        { id: 'numbers', name: 'Numbers', icon: '📊', color: '#34C759', isImage: false },
        { id: 'keynote', name: 'Keynote', icon: '🎤', color: '#FF9500', isImage: false },
      ]
    },
    {
      id: 'creativity',
      name: 'Creativity',
      icon: '🎨',
      color: '#FF2D92',
      apps: [
        { id: 'garageband', name: 'GarageBand', icon: '🎸', color: '#FF2D92', isImage: false },
        { id: 'imovie', name: 'iMovie', icon: '🎬', color: '#FF3B30', isImage: false },
        { id: 'photoshop', name: 'Photoshop', icon: '🖼️', color: '#31A8FF', isImage: false },
      ]
    }
  ];

  const allApps = [...appPages.flat(), ...folders.flatMap(f => f.apps)];
  const filteredApps = searchQuery 
    ? allApps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : appPages[currentPage];

  const totalPages = appPages.length;

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      setSearchQuery('');
      setIsDeleting(false);
    }
  }, [isOpen]);

  const handleAppClick = (app: App) => {
    if (isDeleting) {
      // In a real app, this would delete the app
      console.log(`Deleting ${app.name}`);
      return;
    }
    console.log(`Opening ${app.name}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="launchpad-window"
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(30px)',
        zIndex: 1000,
        animation: 'launchpadFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <style>{`
        @keyframes launchpadFadeIn {
          0% { 
            opacity: 0; 
            transform: scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes appFlyIn {
          0% { 
            opacity: 0; 
            transform: scale(0.5) translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        @keyframes appShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        @keyframes pageSlide {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .app-icon {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          animation: appFlyIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        
        .app-icon:hover {
          transform: scale(1.1) translateY(-4px);
          filter: brightness(1.1);
        }
        
        .app-icon.deleting {
          animation: appShake 0.5s ease-in-out infinite;
        }
        
        .page-dot {
          transition: all 0.3s ease;
        }
        
        .page-dot.active {
          transform: scale(1.3);
          background: rgba(255,255,255,0.9);
        }
        
        .search-bar {
          animation: appFlyIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
          animation-delay: 0.05s;
        }
        
        .page-container {
          animation: pageSlide 0.3s ease-out;
        }
      `}</style>
      
      {/* Search Bar */}
      <div className="search-bar" style={{
        position: 'absolute',
        top: '60px',
        left: 'calc(50% - 200px)',
        width: '400px',
        height: '44px',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '22px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 10,
        pointerEvents: 'auto'
      }}>
        <div style={{ fontSize: '16px', color: '#ffffff', marginRight: '12px' }}>🔍</div>
        <input
          type="text"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '500'
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Apps Grid */}
      <div className="page-container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '40px',
        padding: '140px 80px 100px',
        maxWidth: '1200px',
        width: '100%',
        minHeight: '500px',
        margin: '0 auto'
      }}>
        {filteredApps.map((app, index) => (
          <div
            key={app.id}
            className={`app-icon ${isDeleting ? 'deleting' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '20px',
              borderRadius: '20px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animationDelay: `${index * 0.02}s`,
              position: 'relative'
            }}
            onMouseEnter={() => setHoveredApp(app.id)}
            onMouseLeave={() => setHoveredApp(null)}
            onClick={() => handleAppClick(app)}
          >
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '14px',
              background: app.isImage ? 'transparent' : app.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: app.isImage ? 'inherit' : '32px',
              marginBottom: '12px',
              boxShadow: hoveredApp === app.id 
                ? '0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)' 
                : '0 4px 16px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {app.isImage ? (
                <img 
                  src={app.icon} 
                  alt={app.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                />
              ) : (
                app.icon
              )}
              {/* Shine effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                transform: 'rotate(45deg)',
                transition: 'transform 0.3s ease'
              }} />
            </div>
            <div style={{
              fontSize: '12px',
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: '500',
              textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              maxWidth: '70px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {app.name}
            </div>
            
            {/* Delete button when in delete mode */}
            {isDeleting && (
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#FF3B30',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(255,59,48,0.4)'
              }}>
                ✕
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Page Dots */}
      {!searchQuery && totalPages > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-dot ${currentPage === i ? 'active' : ''}`}
              onClick={() => setCurrentPage(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: currentPage === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {!searchQuery && totalPages > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            style={{
              position: 'absolute',
              left: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '20px',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 0 ? 0.3 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            style={{
              position: 'absolute',
              right: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '20px',
              cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages - 1 ? 0.3 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Close Button */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          color: '#ffffff',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
        onClick={onClose}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ✕
      </div>

      {/* Delete Mode Toggle */}
      <button
        onClick={() => setIsDeleting(!isDeleting)}
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          background: isDeleting ? '#FF3B30' : 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '20px',
          padding: '8px 16px',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
      >
        {isDeleting ? 'Done' : 'Delete Apps'}
      </button>
    </div>
  );
};

export default Launchpad; 