import React, { useState } from 'react';
import { SkipBack, SkipForward, Play, Pause } from 'lucide-react';

interface MusicProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

// Mock Music data
const mockMusicAlbums = [
  {
    id: '1',
    title: 'Good Kid, M.A.A.D City',
    artist: 'Kendrick Lamar',
    year: 2012,
    genre: 'Rap',
    cover: '/album covers/kendrick-lamar-gkmc.webp',
    tracks: [
      { id: '1-1', title: 'Bitch, Don\'t Kill My Vibe', duration: '3:22', artist: 'Kendrick Lamar' },
      { id: '1-2', title: 'The Art of Peer Pressure', duration: '3:38', artist: 'Kendrick Lamar' },
      { id: '1-3', title: 'Swimming Pools (Drank)', duration: '3:20', artist: 'Kendrick Lamar' },
      { id: '1-4', title: 'Poetic Justice', duration: '4:16', artist: 'Kendrick Lamar' },
      { id: '1-5', title: 'Money Trees', duration: '3:14', artist: 'Kendrick Lamar' }
    ]
  },
  {
    id: '2',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
    genre: 'Rock',
    cover: '/album covers/pink-floyd-tdsotm.webp',
    tracks: [
      { id: '2-1', title: 'Speak to Me', duration: '1:30', artist: 'Pink Floyd' },
      { id: '2-2', title: 'Breathe (In the Air)', duration: '2:43', artist: 'Pink Floyd' },
      { id: '2-3', title: 'On the Run', duration: '3:36', artist: 'Pink Floyd' },
      { id: '2-4', title: 'Time', duration: '6:53', artist: 'Pink Floyd' },
      { id: '2-5', title: 'The Great Gig in the Sky', duration: '4:36', artist: 'Pink Floyd' }
    ]
  },
  {
    id: '3',
    title: 'Discovery',
    artist: 'Daft Punk',
    year: 2001,
    genre: 'Electronic',
    cover: '/album covers/daft-punk-discovery.webp',
    tracks: [
      { id: '3-1', title: 'One More Time', duration: '5:20', artist: 'Daft Punk' },
      { id: '3-2', title: 'Aerodynamic', duration: '3:21', artist: 'Daft Punk' },
      { id: '3-3', title: 'Digital Love', duration: '3:52', artist: 'Daft Punk' },
      { id: '3-4', title: 'Harder, Better, Faster, Stronger', duration: '3:48', artist: 'Daft Punk' },
      { id: '3-5', title: 'Veridis Quo', duration: '5:37', artist: 'Daft Punk' }
    ]
  },
  {
    id: '4',
    title: 'Abbey Road',
    artist: 'The Beatles',
    year: 1969,
    genre: 'Rock',
    cover: '/album covers/the-beatles-abbey-road.webp',
    tracks: [
      { id: '4-1', title: 'Come Together', duration: '4:20', artist: 'The Beatles' },
      { id: '4-2', title: 'Something', duration: '3:03', artist: 'The Beatles' },
      { id: '4-3', title: 'Maxwell\'s Silver Hammer', duration: '3:27', artist: 'The Beatles' },
      { id: '4-4', title: 'Oh! Darling', duration: '3:26', artist: 'The Beatles' },
      { id: '4-5', title: 'Octopus\'s Garden', duration: '2:51', artist: 'The Beatles' }
    ]
  },
  {
    id: '5',
    title: 'Bubba',
    artist: 'Kaytranada',
    year: 2019,
    genre: 'Electronic',
    cover: '/album covers/kaytranada-bubba.webp',
    tracks: [
      { id: '5-1', title: 'DO IT', duration: '5:14', artist: 'Kaytranada' },
      { id: '5-2', title: 'What You Need', duration: '4:09', artist: 'Kaytranada' },
      { id: '5-3', title: 'Taste', duration: '3:04', artist: 'Kaytranada' },
      { id: '5-4', title: 'Oh No', duration: '1:26', artist: 'Kaytranada' },
      { id: '5-5', title: 'Intimidated', duration: '4:17', artist: 'Kaytranada' }
    ]
  },
  {
    id: '6',
    title: 'The Divine Feminine',
    artist: 'Mac Miller',
    year: 2016,
    genre: 'Rap',
    cover: '/album covers/mac-miller-divine-feminine.webp',
    tracks: [
      { id: '6-1', title: 'Congradulations', duration: '4:16', artist: 'Mac Miller' },
      { id: '6-2', title: 'Dang!', duration: '5:06', artist: 'Mac Miller' },
      { id: '6-3', title: 'Stay', duration: '5:26', artist: 'Mac Miller' },
      { id: '6-4', title: 'Skin', duration: '4:48', artist: 'Mac Miller' },
      { id: '6-5', title: 'Cinderella', duration: '8:00', artist: 'Mac Miller' }
    ]
  }
];

const mockPlaylists = [
  {
    id: '1',
    name: 'Favorites',
    description: 'My favorite tracks',
    cover: '/album covers/kendrick-lamar-gkmc.webp',
    tracks: ['1-3', '2-4', '3-5', '4-1', '5-2']
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing',
    cover: '/album covers/kaytranada-bubba.webp',
    tracks: ['5-1', '5-3', '6-1', '6-3']
  },
  {
    id: '3',
    name: 'Workout Mix',
    description: 'High energy tracks',
    cover: '/album covers/daft-punk-discovery.webp',
    tracks: ['1-1', '1-2', '3-1', '3-3']
  },
  {
    id: '4',
    name: 'Classic Rock',
    description: 'Timeless rock music',
    cover: '/album covers/the-beatles-abbey-road.webp',
    tracks: ['2-1', '2-2', '2-3', '4-1', '4-2']
  }
];

// Witty no-result messages for search
const noResultMessages = [
  "Sorry, not even Apple Music has that one (I'm not sorry).",
  "More music? How about no?",
  "HA! Not even in the vaults of Spotify.",
  "That track must be in another universe.",
  "No luck. Try humming it?",
  "404: Your song not found (Thank goodness).",
  "If you find it, let me know lol."
];

function getRandomNoResultMessage() {
  return noResultMessages[Math.floor(Math.random() * noResultMessages.length)];
}

// Add 'album' to musicView type
type MusicView = 'library' | 'playlists' | 'search' | 'album' | 'now-playing';

const Music: React.FC<MusicProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [musicView, setMusicView] = useState<MusicView>('library');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<any>(null);
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [navStack, setNavStack] = useState<Array<{ view: MusicView, album?: any, playlist?: any, track?: any }>>([]);

  // Helper to go to a new view and push current context to stack
  const goToView = (view: MusicView, context: { album?: any, playlist?: any, track?: any } = {}) => {
    setNavStack(stack => [...stack, { view: musicView, album: currentAlbum, playlist: currentPlaylist, track: currentTrack }]);
    setMusicView(view);
    if (context.album !== undefined) setCurrentAlbum(context.album);
    if (context.playlist !== undefined) setCurrentPlaylist(context.playlist);
    if (context.track !== undefined) setCurrentTrack(context.track);
  };
  // Helper to go back
  const goBack = () => {
    setNavStack(stack => {
      if (stack.length === 0) return stack;
      const prev = stack[stack.length - 1];
      setMusicView(prev.view);
      setCurrentAlbum(prev.album ?? null);
      setCurrentPlaylist(prev.playlist ?? null);
      setCurrentTrack(prev.track ?? null);
      return stack.slice(0, -1);
    });
  };

  // Music helper functions
  const getTrackById = (trackId: string) => {
    for (const album of mockMusicAlbums) {
      const track = album.tracks.find(t => t.id === trackId);
      if (track) return { ...track, album: album.title, albumArtist: album.artist };
    }
    return null;
  };

  const getPlaylistTracks = (playlist: any) => {
    return playlist.tracks.map((trackId: string) => getTrackById(trackId)).filter(Boolean);
  };

  const playTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setMusicView('now-playing');
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getFilteredAlbums = () => {
    if (!searchQuery) return mockMusicAlbums;
    const query = searchQuery.toLowerCase();
    return mockMusicAlbums.filter(album => 
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query) ||
      album.genre.toLowerCase().includes(query)
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="music-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 900,
        height: '650px',
        background: 'rgba(28, 28, 32, 0.98)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
        border: '1px solid rgba(60,60,70,0.32)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
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
      
      {/* Music Title Bar */}
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
          Music
        </div>
      </div>
      
      {/* Music Toolbar */}
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
            background: musicView === 'library' ? '#007AFF' : 'transparent',
            border: musicView === 'library' ? 'none' : '1px solid rgba(80,80,90,0.22)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#fff',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
          onClick={() => goToView('library')}
        >
          Library
        </button>
        <button 
          style={{
            background: musicView === 'playlists' ? '#007AFF' : 'transparent',
            border: musicView === 'playlists' ? 'none' : '1px solid rgba(80,80,90,0.22)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#fff',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          onClick={() => goToView('playlists')}
        >
          Playlists
        </button>
        <button 
          style={{
            background: musicView === 'search' ? '#007AFF' : 'transparent',
            border: musicView === 'search' ? 'none' : '1px solid rgba(80,80,90,0.22)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#fff',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          onClick={() => goToView('search')}
        >
          Search
        </button>
        {currentTrack && (
          <button 
            style={{
              background: musicView === 'now-playing' ? '#007AFF' : 'transparent',
              border: musicView === 'now-playing' ? 'none' : '1px solid rgba(80,80,90,0.22)',
              borderRadius: '6px',
              padding: '6px 12px',
              color: '#fff',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            onClick={() => goToView('now-playing')}
          >
            Now Playing
          </button>
        )}
      </div>
      
      {/* Music Content */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Sidebar */}
        <div style={{ width: '200px', background: 'rgba(36, 36, 40, 0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Library</div>
          <div style={{ fontSize: '12px', color: '#7AC7FF', padding: '6px 0', cursor: 'pointer', borderRadius: '4px', paddingLeft: '8px' }}>Recently Added</div>
          <div style={{ fontSize: '12px', color: '#aaa', padding: '6px 0', cursor: 'pointer', borderRadius: '4px', paddingLeft: '8px' }}>Songs</div>
          <div style={{ fontSize: '12px', color: '#aaa', padding: '6px 0', cursor: 'pointer', borderRadius: '4px', paddingLeft: '8px' }}>Albums</div>
          <div style={{ fontSize: '12px', color: '#aaa', padding: '6px 0', cursor: 'pointer', borderRadius: '4px', paddingLeft: '8px' }}>Artists</div>
          <div style={{ fontSize: '12px', color: '#aaa', padding: '6px 0', cursor: 'pointer', borderRadius: '4px', paddingLeft: '8px' }}>Genres</div>
          
          <div style={{ marginTop: '20px', fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Playlists</div>
          {mockPlaylists.map(playlist => (
            <div key={playlist.id} style={{ fontSize: '12px', color: '#aaa', padding: '6px 0', cursor: 'pointer', borderRadius: '4px', paddingLeft: '8px' }}>
              {playlist.name}
            </div>
          ))}
        </div>
        
        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', background: 'rgba(28,28,32,0.98)', display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
          {navStack.length > 0 && (
            <button
              onClick={goBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: 0.8,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
            >
              <span style={{ fontSize: '20px', display: 'inline-block', transform: 'translateY(1px)' }}>←</span> Back
            </button>
          )}
          {musicView === 'library' && (
            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '20px' }}>Music Library</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {getFilteredAlbums().map(album => (
                  <div key={album.id} style={{ cursor: 'pointer' }} onClick={() => {
                    goToView('album', { album });
                  }}>
                    <div style={{ 
                      background: 'rgba(60,60,70,0.3)', 
                      borderRadius: '8px', 
                      height: '200px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginBottom: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)'
                    }}>
                      <img src={album.cover} alt={album.title + ' cover'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '4px' }}>
                      {album.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px' }}>
                      {album.artist} • {album.year}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      {album.tracks.length} songs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {musicView === 'album' && currentAlbum && (
            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
                <img src={currentAlbum.cover} alt={currentAlbum.title + ' cover'} style={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 12, boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)' }} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{currentAlbum.title}</div>
                  <div style={{ fontSize: 15, color: '#aaa', marginBottom: 8 }}>{currentAlbum.artist} • {currentAlbum.year}</div>
                  <div style={{ fontSize: 13, color: '#666' }}>{currentAlbum.tracks.length} songs</div>
                </div>
              </div>
              <div style={{ maxWidth: 500 }}>
                {currentAlbum.tracks.map((track: any, index: number) => (
                  <div
                    key={track.id || index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 0',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      marginBottom: '2px',
                      background: currentTrack?.id === track.id ? 'rgba(0,122,255,0.12)' : 'transparent',
                      transition: 'background 0.13s',
                    }}
                    onClick={() => {
                      goToView('now-playing', { track, album: currentAlbum });
                      setIsPlaying(true);
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#666', width: '30px' }}>{index + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', color: '#fff', marginBottom: '2px' }}>{track.title}</div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>{track.artist}</div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{track.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {musicView === 'playlists' && (
            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '20px' }}>Playlists</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {mockPlaylists.map(playlist => (
                  <div key={playlist.id} style={{ cursor: 'pointer' }} onClick={() => {
                    // Show playlist tracks
                    setCurrentPlaylist({ ...playlist, tracks: getPlaylistTracks(playlist) });
                    goToView('now-playing');
                  }}>
                    <div style={{ 
                      background: 'rgba(60,60,70,0.3)', 
                      borderRadius: '8px', 
                      height: '200px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginBottom: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)'
                    }}>
                      <img src={playlist.cover} alt={playlist.name + ' cover'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '4px' }}>
                      {playlist.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>
                      {playlist.tracks.length} songs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {musicView === 'search' && (
            <div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '20px' }}>Search</div>
              <input
                type="text"
                placeholder="Search for songs, artists, or albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(60,60,70,0.3)',
                  border: '1px solid rgba(80,80,90,0.22)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  marginBottom: '20px'
                }}
              />
              {searchQuery && (
                getFilteredAlbums().length === 0 ? (
                  <div style={{ color: '#aaa', fontSize: '16px', textAlign: 'center', marginTop: '40px' }}>
                    {getRandomNoResultMessage()}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {getFilteredAlbums().map(album => (
                      <div key={album.id} style={{ cursor: 'pointer' }} onClick={() => {
                        // Show album tracks
                        setCurrentPlaylist({ ...album, tracks: album.tracks.map(t => ({ ...t, album: album.title, albumArtist: album.artist })) });
                        goToView('now-playing');
                      }}>
                        <div style={{ 
                          background: 'rgba(60,60,70,0.3)', 
                          borderRadius: '8px', 
                          height: '200px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          marginBottom: '12px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)'
                        }}>
                          <img src={album.cover} alt={album.title + ' cover'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '4px' }}>
                          {album.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#aaa' }}>
                          {album.artist}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
          
          {musicView === 'now-playing' && currentTrack && (
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{ 
                  background: 'rgba(60,60,70,0.3)', 
                  borderRadius: '12px', 
                  width: '220px', 
                  height: '220px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)'
                }}>
                  <img src={currentAlbum?.cover} alt={currentTrack.title + ' cover'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                </div>
                <div style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '10px' }}>
                  {currentTrack.title}
                </div>
                <div style={{ fontSize: '15px', color: '#aaa', marginBottom: '22px' }}>
                  {currentTrack.artist}
                </div>
                {/* Playback Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '22px' }}>
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '50%',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <SkipBack size={28} />
                  </button>
                  <button 
                    onClick={togglePlayPause}
                    style={{
                      background: '#007AFF',
                      border: 'none',
                      borderRadius: '50%',
                      width: '54px',
                      height: '54px',
                      color: '#fff',
                      fontSize: '28px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,122,255,0.18)',
                      transition: 'background 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0056CC'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,86,204,0.18)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#007AFF'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,122,255,0.18)'; }}
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </button>
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '50%',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <SkipForward size={28} />
                  </button>
                </div>
                {/* Progress Bar */}
                <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                  <div style={{ 
                    width: '100%', 
                    height: '4px', 
                    background: 'rgba(60,60,70,0.3)', 
                    borderRadius: '2px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ 
                      width: '30%', 
                      height: '100%', 
                      background: '#007AFF', 
                      borderRadius: '2px' 
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#aaa' }}>
                    <span>1:23</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Music; 