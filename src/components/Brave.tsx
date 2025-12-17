import React, { useState, useRef, useEffect } from 'react';
import { Home, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

interface Bookmark {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface BraveProps {
  onClose?: () => void;
}

const Brave: React.FC<BraveProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'site'>('dashboard');
  const [currentSite, setCurrentSite] = useState<Bookmark | null>(null);
  const [addressBarValue, setAddressBarValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const bookmarks: Bookmark[] = [
    {
      id: '1',
      name: 'Sisyphus II',
      url: 'https://sisyphus-ii.netlify.app',
      icon: '🎨'
    },
    {
      id: '2',
      name: 'GitHub',
      url: 'https://github.com',
      icon: '🐙'
    },
    {
      id: '3',
      name: 'Stack Overflow',
      url: 'https://stackoverflow.com',
      icon: '💻'
    },
    {
      id: '4',
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      icon: '📚'
    },
    {
      id: '5',
      name: 'CSS-Tricks',
      url: 'https://css-tricks.com',
      icon: '🎨'
    },
    {
      id: '6',
      name: 'Dev.to',
      url: 'https://dev.to',
      icon: '💡'
    }
  ];

  const handleBookmarkClick = (bookmark: Bookmark) => {
    setCurrentSite(bookmark);
    setCurrentView('site');
    setAddressBarValue(bookmark.url);
  };

  const handleHomeClick = () => {
    setCurrentView('dashboard');
    setCurrentSite(null);
    setAddressBarValue('');
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-header')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - windowPosition.x, y: e.clientY - windowPosition.y });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setWindowPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div 
      ref={windowRef}
      className="fixed z-50 w-11/12 h-5/6 max-w-6xl bg-gray-900 rounded-lg border border-gray-700/50 shadow-2xl overflow-hidden"
      style={{
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div className="window-header flex items-center justify-between px-4 py-2 bg-gray-800/90 border-b border-gray-700/50 cursor-move">
        <div className="flex items-center space-x-3">
          {/* Window Controls */}
          <div className="flex space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
            />
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          {/* Brave Icon and Title */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-white text-sm font-medium">Brave Browser</span>
          </div>
        </div>
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-4 py-2 bg-gray-800/70 border-b border-gray-700/50 space-x-2">
        {/* Navigation Buttons */}
        <button
          onClick={handleHomeClick}
          className={`p-1 rounded ${currentView === 'site' ? 'text-blue-400' : 'text-gray-400'}`}
          disabled={currentView === 'dashboard'}
        >
          <Home size={16} />
        </button>
        <button className="p-1 rounded text-gray-400" disabled>
          <ArrowLeft size={16} />
        </button>
        <button className="p-1 rounded text-gray-400" disabled>
          <ArrowRight size={16} />
        </button>
        <button className="p-1 rounded text-gray-400" disabled>
          <RefreshCw size={16} />
        </button>
        
        {/* Address Bar */}
        <div className="flex-1 flex items-center bg-gray-700/50 rounded-lg px-3 py-1">
          <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
          <input
            type="text"
            value={addressBarValue}
            onChange={(e) => setAddressBarValue(e.target.value)}
            placeholder="Search or enter address..."
            className="flex-1 bg-transparent text-white text-sm outline-none"
            readOnly
          />
        </div>
        
        {/* Security Icon */}
        <div className="text-green-400 text-sm">🔒</div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-900 overflow-hidden">
        {currentView === 'dashboard' && (
          <div className="h-full p-6">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🦁</div>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome to Brave</h1>
              <p className="text-gray-400">Click on a bookmark to open it in a new tab</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  onClick={() => handleBookmarkClick(bookmark)}
                  className="group cursor-pointer p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                      {bookmark.icon}
                    </div>
                    <h3 className="text-white font-medium text-sm">{bookmark.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 truncate">{bookmark.url}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {currentView === 'site' && currentSite && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🦁</div>
              <h2 className="text-xl font-bold text-white mb-2">{currentSite.name}</h2>
              <p className="text-gray-400 mb-4">{currentSite.url}</p>
              <button
                onClick={() => window.open(currentSite.url, '_blank')}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                Open in New Tab
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brave; 