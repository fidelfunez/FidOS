import React, { useState } from 'react';

interface SafariProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setWindowPosition: (pos: { x: number; y: number }) => void;
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

const defaultTabs = [
  { id: 1, title: 'Wikipedia', url: 'https://en.wikipedia.org', active: true },
  { id: 2, title: 'YouTube', url: 'https://www.youtube.com/embed/UlKZ83REIkA', active: false },
  { id: 3, title: 'Google Maps', url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus', active: false }
];

const Safari: React.FC<SafariProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setWindowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [safariTabs, setSafariTabs] = useState(defaultTabs);
  const [safariCurrentUrl, setSafariCurrentUrl] = useState('https://en.wikipedia.org');
  const [addressBarValue, setAddressBarValue] = useState('https://en.wikipedia.org');
  const [isLoading, setIsLoading] = useState(false);
  const [browserHistory, setBrowserHistory] = useState<{ [tabId: number]: string[] }>({});
  const [historyIndex, setHistoryIndex] = useState<{ [tabId: number]: number }>({});

  const getCurrentTabId = () => {
    const activeTab = safariTabs.find(tab => tab.active);
    return activeTab?.id || 1;
  };

  const addToHistory = (url: string) => {
    const currentTabId = getCurrentTabId();
    const currentHistory = browserHistory[currentTabId] || [];
    const currentIndex = historyIndex[currentTabId] || -1;
    
    // Remove any URLs after current index (for forward navigation)
    const newHistory = currentHistory.slice(0, currentIndex + 1);
    newHistory.push(url);
    
    setBrowserHistory(prev => ({
      ...prev,
      [currentTabId]: newHistory
    }));
    setHistoryIndex(prev => ({
      ...prev,
      [currentTabId]: newHistory.length - 1
    }));
  };

  const goBack = () => {
    const currentTabId = getCurrentTabId();
    const currentHistory = browserHistory[currentTabId] || [];
    const currentIndex = historyIndex[currentTabId] || 0;
    
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const newUrl = currentHistory[newIndex];
      setSafariCurrentUrl(newUrl);
      setAddressBarValue(newUrl);
      setHistoryIndex(prev => ({
        ...prev,
        [currentTabId]: newIndex
      }));
      
      // Update the active tab with the new URL
      setSafariTabs(tabs => tabs.map(tab => 
        tab.active ? { ...tab, url: newUrl, title: getTitleFromUrl(newUrl) } : tab
      ));
    }
  };

  const goForward = () => {
    const currentTabId = getCurrentTabId();
    const currentHistory = browserHistory[currentTabId] || [];
    const currentIndex = historyIndex[currentTabId] || 0;
    
    if (currentIndex < currentHistory.length - 1) {
      const newIndex = currentIndex + 1;
      const newUrl = currentHistory[newIndex];
      setSafariCurrentUrl(newUrl);
      setAddressBarValue(newUrl);
      setHistoryIndex(prev => ({
        ...prev,
        [currentTabId]: newIndex
      }));
      
      // Update the active tab with the new URL
      setSafariTabs(tabs => tabs.map(tab => 
        tab.active ? { ...tab, url: newUrl, title: getTitleFromUrl(newUrl) } : tab
      ));
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const openBookmarkInNewTab = (url: string) => {
    // Open the bookmark in the real browser (new tab)
    window.open(url, '_blank');
    
    // Also create a new tab in our Safari browser that shows the site
    const newTab = {
      id: Math.max(...safariTabs.map(t => t.id)) + 1,
      title: 'New Tab',
      url: 'new-tab',
      active: true
    };
    setSafariTabs(tabs => tabs.map(tab => ({ ...tab, active: false })).concat(newTab));
    setSafariCurrentUrl('new-tab');
    setAddressBarValue('');
  };

  const switchSafariTab = (tabId: number) => {
    setSafariTabs(tabs => tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
    const activeTab = safariTabs.find(tab => tab.id === tabId);
    if (activeTab) {
      setSafariCurrentUrl(activeTab.url);
      setAddressBarValue(activeTab.url);
    }
  };

  const closeSafariTab = (tabId: number) => {
    const newTabs = safariTabs.filter(tab => tab.id !== tabId);
    if (newTabs.length > 0) {
      const lastTab = newTabs[newTabs.length - 1];
      setSafariTabs(newTabs.map(tab => ({
        ...tab,
        active: tab.id === lastTab.id
      })));
      setSafariCurrentUrl(lastTab.url);
      setAddressBarValue(lastTab.url);
    }
  };

  const addSafariTab = () => {
    const newTab = {
      id: Math.max(...safariTabs.map(t => t.id)) + 1,
      title: 'New Tab',
      url: 'new-tab',
      active: true
    };
    setSafariTabs(tabs => tabs.map(tab => ({ ...tab, active: false })).concat(newTab));
    setSafariCurrentUrl('new-tab');
    setAddressBarValue('');
  };

  const navigateToUrl = (url: string) => {
    setIsLoading(true);
    
    // Convert YouTube URLs to embed format
    let processedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        processedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (url.includes('youtube.com/') && !url.includes('/embed/')) {
      // Handle other YouTube URLs
      const videoId = url.split('youtube.com/')[1]?.split('/')[0];
      if (videoId && videoId !== 'embed') {
        processedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Special handling for just "youtube.com" - show a YouTube homepage
    if (url === 'https://youtube.com' || url === 'https://www.youtube.com') {
      processedUrl = 'https://www.youtube.com/embed/UlKZ83REIkA'; // Default to a fun video
    }
    
    setSafariCurrentUrl(processedUrl);
    setAddressBarValue(processedUrl);
    addToHistory(processedUrl);
    
    // Update the active tab with the new URL
    setSafariTabs(tabs => tabs.map(tab => 
      tab.active ? { ...tab, url: processedUrl, title: getTitleFromUrl(processedUrl) } : tab
    ));
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  };

  const getTitleFromUrl = (url: string) => {
    if (url === 'new-tab') return 'New Tab';
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.charAt(0).toUpperCase() + domain.slice(1);
    } catch {
      return 'New Tab';
    }
  };

  const handleAddressBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = addressBarValue;
    
    // Add https:// if no protocol specified
    if (!url.startsWith('http://') && !url.startsWith('https://') && url !== 'new-tab') {
      url = 'https://' + url;
    }
    
    navigateToUrl(url);
  };

  const canGoBack = () => {
    const currentTabId = getCurrentTabId();
    const currentIndex = historyIndex[currentTabId] || 0;
    return currentIndex > 0;
  };

  const canGoForward = () => {
    const currentTabId = getCurrentTabId();
    const currentHistory = browserHistory[currentTabId] || [];
    const currentIndex = historyIndex[currentTabId] || 0;
    return currentIndex < currentHistory.length - 1;
  };

  const renderContent = (url: string) => {
    // New Tab page
    if (url === 'new-tab') {
      return (
        <div style={{ 
          padding: '40px', 
          color: '#fff', 
          fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          height: '100%',
          overflow: 'auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌐</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Safari</div>
            <div style={{ fontSize: '18px', color: '#eee', marginBottom: '32px' }}>Welcome to the web</div>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '24px', 
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '32px'
            }}>
              <div style={{ fontSize: '16px', color: '#eee', flex: 1 }}>
                Search or enter website name
              </div>
              <div style={{ fontSize: '20px', color: '#eee' }}>🔍</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Wikipedia', url: 'https://en.wikipedia.org', icon: '📚' },
                { name: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
                { name: 'GitHub', url: 'https://github.com', icon: '💻' },
                { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '❓' },
                { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: '📖' },
                { name: 'Google Maps', url: 'https://maps.google.com', icon: '🗺️' }
              ].map((site, index) => (
                <div 
                  key={index} 
                  style={{ 
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={() => openBookmarkInNewTab(site.url)}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{site.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{site.name}</div>
                  <div style={{ fontSize: '12px', color: '#ccc' }}>{site.url.replace('https://', '')}</div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '32px', color: '#ccc', fontSize: '14px' }}>
              Type a URL in the address bar above to get started
            </div>
          </div>
        </div>
      );
    }

    // Special handling for YouTube homepage
    if (url === 'https://youtube.com' || url === 'https://www.youtube.com') {
      return (
        <div style={{ 
          padding: '40px', 
          color: '#fff', 
          fontFamily: 'Roboto,Arial,sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          height: '100%',
          overflow: 'auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>▶️</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>YouTube</div>
            <div style={{ fontSize: '18px', color: '#eee', marginBottom: '32px' }}>Broadcast Yourself</div>
          </div>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '24px', 
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '32px'
            }}>
              <div style={{ fontSize: '16px', color: '#eee', flex: 1 }}>
                Search YouTube or enter a video URL
              </div>
              <div style={{ fontSize: '20px', color: '#eee' }}>🔍</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { title: 'How to Build a macOS-Style Dashboard', views: '2.1M views', time: '3 days ago', thumbnail: '🎥' },
                { title: 'React Performance Optimization Tips', views: '856K views', time: '1 week ago', thumbnail: '🎥' },
                { title: 'The Future of Web Development', views: '1.4M views', time: '2 weeks ago', thumbnail: '🎥' },
                { title: 'TypeScript Best Practices 2024', views: '623K views', time: '3 weeks ago', thumbnail: '🎥' }
              ].map((video, index) => (
                <div key={index} style={{ cursor: 'pointer' }}>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '8px', 
                    height: '160px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '48px',
                    marginBottom: '8px'
                  }}>
                    {video.thumbnail}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px', lineHeight: '1.3' }}>
                    {video.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#ccc' }}>
                    {video.views} • {video.time}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '32px', color: '#ccc', fontSize: '14px' }}>
              Try typing a specific video URL like: youtube.com/watch?v=dQw4w9WgXcQ
            </div>
          </div>
        </div>
      );
    }

    // Sites that allow iframe embedding
    const iframeAllowedSites = [
      'https://en.wikipedia.org',
      'https://www.youtube.com/embed/',
      'https://www.google.com/maps/embed',
      'https://www.google.com/maps/embed?',
      'https://calendar.google.com/calendar/embed',
      'https://codepen.io',
      'https://jsfiddle.net',
      'https://replit.com',
      'https://glitch.com',
      'https://observablehq.com',
      'https://github.io',
      'https://netlify.app',
      'https://vercel.app'
    ];

    if (iframeAllowedSites.some(site => url.startsWith(site))) {
      return (
        <iframe
          src={url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: '#fff'
          }}
          title="Safari Browser"
          allowFullScreen
        />
      );
    }

    // Fallback for sites that don't allow iframes
    return (
      <div style={{ 
        color: '#fff', 
        padding: 40, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        <div style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>🌐</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Site Not Available</div>
        <div style={{ fontSize: 14, color: '#aaa', marginBottom: 20 }}>
          This site doesn't allow embedding in iframes.
        </div>
        <button
          onClick={() => window.open(url, '_blank')}
          style={{
            background: '#007AFF',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Open in New Tab
        </button>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="safari-window"
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
      {/* Safari Title Bar */}
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
          Safari
        </div>
      </div>
      {/* Safari Tabs */}
      <div style={{
        height: '36px',
        background: 'rgba(36, 36, 40, 0.98)',
        borderBottom: '1px solid rgba(80,80,90,0.22)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        gap: '4px'
      }}>
        {safariTabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: tab.active ? 'rgba(28,28,32,0.98)' : 'rgba(36,36,40,0.98)',
              border: tab.active ? '1px solid rgba(80,80,90,0.22)' : '1px solid transparent',
              borderRadius: '6px',
              padding: '6px 12px',
              cursor: 'pointer',
              minWidth: '120px',
              maxWidth: '200px',
              position: 'relative'
            }}
            onClick={() => switchSafariTab(tab.id)}
          >
            <div style={{ 
              fontSize: '12px', 
              color: tab.active ? '#fff' : '#aaa',
              fontWeight: tab.active ? '500' : '400',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1
            }}>
              {tab.title}
            </div>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: '#666',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '2px',
                borderRadius: '2px',
                marginLeft: '8px'
              }}
              onClick={e => {
                e.stopPropagation();
                closeSafariTab(tab.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          style={{
            background: 'transparent',
            border: '1px solid rgba(80,80,90,0.22)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '16px',
            marginLeft: '4px'
          }}
          onClick={addSafariTab}
        >
          +
        </button>
      </div>
      {/* Safari Toolbar */}
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
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: canGoBack() ? 'pointer' : 'default',
            borderRadius: '4px',
            color: canGoBack() ? '#fff' : '#666',
            fontSize: '16px'
          }}
          onClick={canGoBack() ? goBack : undefined}
        >
          ←
        </button>
        <button 
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: canGoForward() ? 'pointer' : 'default',
            borderRadius: '4px',
            color: canGoForward() ? '#fff' : '#666',
            fontSize: '16px'
          }}
          onClick={canGoForward() ? goForward : undefined}
        >
          →
        </button>
        <button 
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '16px'
          }}
          onClick={refresh}
        >
          ↻
        </button>
        <form onSubmit={handleAddressBarSubmit} style={{ flex: 1, margin: '0 8px' }}>
          <input
            type="text"
            value={addressBarValue}
            onChange={(e) => setAddressBarValue(e.target.value)}
            style={{
              width: '100%',
              height: '28px',
              background: 'rgba(28,28,32,0.98)',
              border: '1px solid rgba(80,80,90,0.22)',
              borderRadius: '8px',
              padding: '0 12px',
              fontSize: '13px',
              color: '#fff',
              outline: 'none'
            }}
            placeholder="Search or enter website name"
          />
        </form>
        <button style={{
          background: 'transparent',
          border: 'none',
          padding: '4px',
          cursor: 'pointer',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '16px'
        }}>
          ⋯
        </button>
      </div>
      {/* Safari Content */}
      <div style={{ flex: 1, background: 'rgba(28,28,32,0.98)', overflow: 'hidden', position: 'relative' }}>
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontSize: '16px',
            zIndex: 10
          }}>
            Loading...
          </div>
        )}
        {(() => {
          const activeTab = safariTabs.find(tab => tab.active);
          if (!activeTab) return null;
          return renderContent(activeTab.url);
        })()}
      </div>
    </div>
  );
};

export default Safari;

 