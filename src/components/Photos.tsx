import React, { useState } from 'react';

interface PhotosProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setWindowPosition: (pos: { x: number; y: number }) => void;
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

// Mock photo data
const mockPhotos = [
  {
    id: '1',
    name: 'IMG_001.jpg',
    type: 'photo',
    date: '2024-01-15',
    size: '2.4 MB',
    location: 'El Zonte, El Salvador',
    category: 'vacation',
    favorite: true,
    thumbnail: '🏔️'
  },
  {
    id: '2',
    name: 'Screenshot_2024-01-10.png',
    type: 'screenshot',
    date: '2024-01-10',
    size: '1.8 MB',
    location: '',
    category: 'screenshots',
    favorite: false,
    thumbnail: '💻'
  },
  {
    id: '3',
    name: 'IMG_002.jpg',
    type: 'photo',
    date: '2024-01-08',
    size: '3.1 MB',
    location: 'Santa Lucia',
    category: 'vacation',
    favorite: true,
    thumbnail: '🌉'
  },
  {
    id: '4',
    name: 'IMG_003.jpg',
    type: 'photo',
    date: '2024-01-05',
    size: '2.7 MB',
    location: 'Utila Island',
    category: 'vacation',
    favorite: false,
    thumbnail: '🏝️'
  },
  {
    id: '5',
    name: 'Screenshot_2024-01-03.png',
    type: 'screenshot',
    date: '2024-01-03',
    size: '1.2 MB',
    location: '',
    category: 'screenshots',
    favorite: false,
    thumbnail: '📱'
  },
  {
    id: '6',
    name: 'IMG_004.jpg',
    type: 'photo',
    date: '2023-12-28',
    size: '4.2 MB',
    location: 'Christmas Dinner',
    category: 'family',
    favorite: true,
    thumbnail: '🎄'
  },
  {
    id: '7',
    name: 'IMG_005.jpg',
    type: 'photo',
    date: '2023-12-25',
    size: '3.8 MB',
    location: 'Home',
    category: 'family',
    favorite: false,
    thumbnail: '🎁'
  },
  {
    id: '8',
    name: 'Screenshot_2023-12-20.png',
    type: 'screenshot',
    date: '2023-12-20',
    size: '0.9 MB',
    location: '',
    category: 'screenshots',
    favorite: false,
    thumbnail: '📊'
  },
  {
    id: '9',
    name: 'IMG_006.jpg',
    type: 'photo',
    date: '2023-12-15',
    size: '2.9 MB',
    location: 'Office',
    category: 'work',
    favorite: false,
    thumbnail: '🏢'
  },
  {
    id: '10',
    name: 'IMG_007.jpg',
    type: 'photo',
    date: '2023-12-10',
    size: '3.5 MB',
    location: 'Coffee Shop',
    category: 'daily',
    favorite: true,
    thumbnail: '☕'
  },
  {
    id: '11',
    name: 'IMG_008.jpg',
    type: 'photo',
    date: '2023-12-05',
    size: '2.1 MB',
    location: 'Park',
    category: 'daily',
    favorite: false,
    thumbnail: '🌳'
  },
  {
    id: '12',
    name: 'Screenshot_2023-12-01.png',
    type: 'screenshot',
    date: '2023-12-01',
    size: '1.5 MB',
    location: '',
    category: 'screenshots',
    favorite: false,
    thumbnail: '🎯'
  }
];

const mockAlbums = [
  {
    id: 'vacation-2024',
    name: 'El Zonte Trip',
    coverPhoto: '🏔️',
    photoCount: 3,
    date: 'January 2024'
  },
  {
    id: 'family-2023',
    name: 'West Bay Christmas 2024',
    coverPhoto: '🎄',
    photoCount: 2,
    date: 'December 2023'
  },
  {
    id: 'screenshots',
    name: 'Screenshots',
    coverPhoto: '💻',
    photoCount: 4,
    date: 'Various'
  }
];

const Photos: React.FC<PhotosProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setWindowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [photosCategory, setPhotosCategory] = useState('all');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [photosViewMode, setPhotosViewMode] = useState<'grid' | 'list'>('grid');

  // Photos helper functions
  const getFilteredPhotos = () => {
    switch (photosCategory) {
      case 'all':
        return mockPhotos;
      case 'favorites':
        return mockPhotos.filter(photo => photo.favorite);
      case 'recently-added':
        return mockPhotos.filter(photo => {
          const photoDate = new Date(photo.date);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return photoDate > thirtyDaysAgo;
        });
      case 'albums':
        return mockPhotos; // Will show albums instead
      default:
        return mockPhotos;
    }
  };

  const formatDate = (dateString: string) => {
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
      className="photos-window"
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
      
      {/* Photos Title Bar */}
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
          Photos
        </div>
      </div>
      
      {/* Photos Toolbar */}
      <div style={{
        height: '44px',
        background: 'rgba(36, 36, 40, 0.98)',
        borderBottom: '1px solid rgba(80,80,90,0.22)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px'
      }}>
        <button style={{
          background: '#007AFF',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 12px',
          color: '#fff',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Import
        </button>
        <button style={{
          background: selectedPhotos.length > 0 ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
          border: '1px solid rgba(80,80,90,0.22)',
          borderRadius: '6px',
          padding: '6px 12px',
          color: selectedPhotos.length > 0 ? '#007AFF' : '#aaa',
          fontSize: '12px',
          cursor: selectedPhotos.length > 0 ? 'pointer' : 'not-allowed',
          opacity: selectedPhotos.length > 0 ? 1 : 0.5
        }}>
          Share
        </button>
        <button 
          style={{
            background: photosViewMode === 'grid' ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
            border: '1px solid rgba(80,80,90,0.22)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: photosViewMode === 'grid' ? '#007AFF' : '#aaa',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          onClick={() => setPhotosViewMode('grid')}
        >
          Grid
        </button>
        <button 
          style={{
            background: photosViewMode === 'list' ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
            border: '1px solid rgba(80,80,90,0.22)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: photosViewMode === 'list' ? '#007AFF' : '#aaa',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          onClick={() => setPhotosViewMode('list')}
        >
          List
        </button>
      </div>
      
      {/* Photos Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '200px', background: 'rgba(36, 36, 40, 0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Library</div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: photosCategory === 'all' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: photosCategory === 'all' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setPhotosCategory('all')}
          >
            📸 All Photos
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: photosCategory === 'favorites' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: photosCategory === 'favorites' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setPhotosCategory('favorites')}
          >
            ⭐ Favorites
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: photosCategory === 'recently-added' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: photosCategory === 'recently-added' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setPhotosCategory('recently-added')}
          >
            🕒 Recently Added
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: photosCategory === 'albums' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: photosCategory === 'albums' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setPhotosCategory('albums')}
          >
            📁 Albums
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ 
          flex: 1, 
          padding: '20px', 
          background: 'rgba(28,28,32,0.98)', 
          overflow: 'auto',
          height: 'calc(100vh - 200px)',
          maxHeight: 'calc(100vh - 200px)'
        }}>
          {photosCategory === 'albums' ? (
            // Albums View
            <div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '20px' }}>Albums</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {mockAlbums.map(album => (
                  <div key={album.id} style={{ cursor: 'pointer' }}>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.1)', 
                      borderRadius: '8px', 
                      height: '150px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '48px',
                      marginBottom: '8px'
                    }}>
                      {album.coverPhoto}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '4px' }}>
                      {album.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>
                      {album.photoCount} photos • {album.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Photos View
            <div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '20px' }}>
                {photosCategory === 'all' && 'All Photos'}
                {photosCategory === 'favorites' && 'Favorites'}
                {photosCategory === 'recently-added' && 'Recently Added'}
              </div>
              
              {photosViewMode === 'grid' ? (
                // Grid View
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                  {getFilteredPhotos().map(photo => (
                    <div 
                      key={photo.id}
                      style={{ 
                        cursor: 'pointer',
                        position: 'relative',
                        border: selectedPhotos.includes(photo.id) ? '2px solid #007AFF' : '2px solid transparent',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}
                      onClick={() => {
                        if (selectedPhotos.includes(photo.id)) {
                          setSelectedPhotos(selectedPhotos.filter(id => id !== photo.id));
                        } else {
                          setSelectedPhotos([...selectedPhotos, photo.id]);
                        }
                      }}
                    >
                      <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        height: '160px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '48px'
                      }}>
                        {photo.thumbnail}
                      </div>
                      <div style={{ padding: '8px', background: 'rgba(0,0,0,0.8)' }}>
                        <div style={{ fontSize: '12px', color: '#fff', marginBottom: '2px' }}>
                          {photo.name}
                        </div>
                        <div style={{ fontSize: '10px', color: '#aaa' }}>
                          {formatDate(photo.date)} • {photo.size}
                        </div>
                        {photo.location && (
                          <div style={{ fontSize: '10px', color: '#666' }}>
                            📍 {photo.location}
                          </div>
                        )}
                      </div>
                      {photo.favorite && (
                        <div style={{ 
                          position: 'absolute', 
                          top: '8px', 
                          right: '8px', 
                          background: 'rgba(0,0,0,0.7)', 
                          borderRadius: '50%', 
                          width: '24px', 
                          height: '24px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '12px'
                        }}>
                          ⭐
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div>
                  {getFilteredPhotos().map(photo => (
                    <div 
                      key={photo.id}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '12px', 
                        borderBottom: '1px solid rgba(80,80,90,0.1)',
                        cursor: 'pointer',
                        background: selectedPhotos.includes(photo.id) ? 'rgba(0, 122, 255, 0.1)' : 'transparent'
                      }}
                      onClick={() => {
                        if (selectedPhotos.includes(photo.id)) {
                          setSelectedPhotos(selectedPhotos.filter(id => id !== photo.id));
                        } else {
                          setSelectedPhotos([...selectedPhotos, photo.id]);
                        }
                      }}
                    >
                      <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '6px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '24px',
                        marginRight: '12px'
                      }}>
                        {photo.thumbnail}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', color: '#fff', marginBottom: '4px' }}>
                          {photo.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#aaa' }}>
                          {formatDate(photo.date)} • {photo.size}
                          {photo.location && ` • 📍 ${photo.location}`}
                        </div>
                      </div>
                      {photo.favorite && (
                        <div style={{ fontSize: '16px', marginRight: '8px' }}>⭐</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {getFilteredPhotos().length === 0 && (
                <div style={{ textAlign: 'center', color: '#aaa', marginTop: '100px' }}>
                  <div style={{ fontSize: '16px', marginBottom: '8px' }}>No Photos Found</div>
                  <div style={{ fontSize: '13px' }}>
                    {photosCategory === 'favorites' && 'No favorite photos yet'}
                    {photosCategory === 'recently-added' && 'No recently added photos'}
                    {photosCategory === 'albums' && 'No albums created yet'}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photos; 