import React, { useState } from 'react';

interface SystemSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
  initialSection?: string;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart,
  initialSection = 'general'
}) => {
  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [appearanceMode, setAppearanceMode] = useState('dark');

  // Update selectedSection when initialSection prop changes
  React.useEffect(() => {
    setSelectedSection(initialSection);
  }, [initialSection]);
  const [accentColor, setAccentColor] = useState('blue');
  const [batteryPercentage, setBatteryPercentage] = useState(80);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [showBatteryPercentage, setShowBatteryPercentage] = useState(true);
  const [userName, setUserName] = useState('Fidel Fúnez C.');
  const [userEmail, setUserEmail] = useState('funez1022@gmail.com');
  const [dockSize, setDockSize] = useState(50);
  const [dockPosition, setDockPosition] = useState('bottom');
  const [dockAutoHide, setDockAutoHide] = useState(false);
  const [displayBrightness, setDisplayBrightness] = useState(70);
  const [nightShift, setNightShift] = useState(true);
  const [trueTone, setTrueTone] = useState(true);
  const [systemVolume, setSystemVolume] = useState(60);
  const [soundEffects, setSoundEffects] = useState(true);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [cameraAccess, setCameraAccess] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className="system-settings-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 900,
        height: 650,
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
      
      {/* System Settings Title Bar */}
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
          System Settings
        </div>
      </div>
      
      {/* System Settings Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'rgba(36, 36, 40, 0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Settings</div>
          
          <div 
            style={{ 
              fontSize: '12px', 
              color: selectedSection === 'general' ? '#7AC7FF' : '#aaa', 
              padding: '6px 8px', 
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedSection === 'general' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
              marginBottom: '4px'
            }}
            onClick={() => setSelectedSection('general')}
          >
            General
          </div>
          
          <div 
            style={{ 
              fontSize: '12px', 
              color: selectedSection === 'battery' ? '#7AC7FF' : '#aaa', 
              padding: '6px 8px', 
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedSection === 'battery' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
              marginBottom: '4px'
            }}
            onClick={() => setSelectedSection('battery')}
          >
            Battery
          </div>
          
          <div 
            style={{ 
              fontSize: '12px', 
              color: selectedSection === 'account' ? '#7AC7FF' : '#aaa', 
              padding: '6px 8px', 
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedSection === 'account' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
              marginBottom: '4px'
            }}
            onClick={() => setSelectedSection('account')}
          >
            Users & Groups
          </div>
          
          <div 
            style={{ 
              fontSize: '12px', 
              color: selectedSection === 'desktop' ? '#7AC7FF' : '#aaa', 
              padding: '6px 8px', 
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedSection === 'desktop' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
              marginBottom: '4px'
            }}
            onClick={() => setSelectedSection('desktop')}
          >
            Desktop & Dock
          </div>
          
          <div 
            style={{ 
              fontSize: '12px', 
              color: selectedSection === 'displays' ? '#7AC7FF' : '#aaa', 
              padding: '6px 8px', 
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedSection === 'displays' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
              marginBottom: '4px'
            }}
            onClick={() => setSelectedSection('displays')}
          >
            Displays
          </div>
          
          <div 
            style={{ 
              fontSize: '12px', 
              color: selectedSection === 'sound' ? '#7AC7FF' : '#aaa', 
              padding: '6px 8px', 
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedSection === 'sound' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
              marginBottom: '4px'
            }}
            onClick={() => setSelectedSection('sound')}
          >
            Sound
          </div>
          
          <div 
            style={{ 
              fontSize: '12px', 
              color: selectedSection === 'network' ? '#7AC7FF' : '#aaa', 
              padding: '6px 8px', 
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedSection === 'network' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
              marginBottom: '4px'
            }}
            onClick={() => setSelectedSection('network')}
          >
            Network
          </div>
          
          <div 
            style={{ 
              fontSize: '12px', 
              color: selectedSection === 'privacy' ? '#7AC7FF' : '#aaa', 
              padding: '6px 8px', 
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedSection === 'privacy' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
              marginBottom: '4px'
            }}
            onClick={() => setSelectedSection('privacy')}
          >
            Privacy & Security
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', background: 'rgba(28,28,32,0.98)', overflowY: 'auto' }}>
          {selectedSection === 'general' && (
            <>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>General</div>
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>Configure your system preferences</div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Appearance</div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: appearanceMode === 'light' ? '1px solid #7AC7FF' : '1px solid rgba(80,80,90,0.22)',
                      background: appearanceMode === 'light' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
                      color: appearanceMode === 'light' ? '#7AC7FF' : '#aaa',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                    onClick={() => setAppearanceMode('light')}
                  >
                    Light
                  </button>
                  <button
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: appearanceMode === 'dark' ? '1px solid #7AC7FF' : '1px solid rgba(80,80,90,0.22)',
                      background: appearanceMode === 'dark' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
                      color: appearanceMode === 'dark' ? '#7AC7FF' : '#aaa',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                    onClick={() => setAppearanceMode('dark')}
                  >
                    Dark
                  </button>
                  <button
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: appearanceMode === 'auto' ? '1px solid #7AC7FF' : '1px solid rgba(80,80,90,0.22)',
                      background: appearanceMode === 'auto' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
                      color: appearanceMode === 'auto' ? '#7AC7FF' : '#aaa',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                    onClick={() => setAppearanceMode('auto')}
                  >
                    Auto
                  </button>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Accent Color</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'gray'].map(color => (
                    <button
                      key={color}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: color === 'blue' ? '#007AFF' : 
                                   color === 'purple' ? '#AF52DE' :
                                   color === 'pink' ? '#FF2D92' :
                                   color === 'red' ? '#FF3B30' :
                                   color === 'orange' ? '#FF9500' :
                                   color === 'yellow' ? '#FFCC00' :
                                   color === 'green' ? '#34C759' :
                                   '#8E8E93',
                        border: accentColor === color ? '2px solid #fff' : '2px solid transparent',
                        cursor: 'pointer',
                        boxShadow: accentColor === color ? '0 0 0 2px rgba(255,255,255,0.3)' : 'none'
                      }}
                      onClick={() => setAccentColor(color)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          
          {selectedSection === 'battery' && (
            <>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Battery</div>
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>Manage your battery settings</div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Battery Level</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{batteryPercentage}%</div>
                  <div style={{ 
                    width: '200px', 
                    height: '8px', 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${batteryPercentage}%`, 
                      height: '100%', 
                      background: batteryPercentage > 20 ? '#34C759' : '#FF3B30',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>
                  {batteryPercentage > 20 ? 'Battery is in good condition' : 'Battery is low'}
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Low Power Mode</div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={lowPowerMode}
                    onChange={(e) => setLowPowerMode(e.target.checked)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '12px', color: '#aaa' }}>
                    Enable Low Power Mode to reduce battery usage
                  </span>
                </label>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Show Battery Percentage</div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showBatteryPercentage}
                    onChange={(e) => setShowBatteryPercentage(e.target.checked)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '12px', color: '#aaa' }}>
                    Show battery percentage in menu bar
                  </span>
                </label>
              </div>
            </>
          )}
          
          {selectedSection === 'account' && (
            <>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Users & Groups</div>
              <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>Manage user accounts and settings</div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Current User</div>
                <div style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  borderRadius: '8px', 
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <img 
                      src="/avatar.webp" 
                      alt="User Avatar" 
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.2)'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '4px' }}>
                        {userName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>
                        {userEmail}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>
                    Administrator • This user can administer this computer
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Login Options</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '12px', color: '#aaa' }}>
                    Show password hints
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '12px', color: '#aaa' }}>
                    Show fast user switching menu
                  </span>
                </div>
              </div>
                         </>
           )}
           
           {selectedSection === 'desktop' && (
             <>
               <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Desktop & Dock</div>
               <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>Customize your desktop and dock appearance</div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Dock Size</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                   <div style={{ fontSize: '12px', color: '#aaa', minWidth: '40px' }}>Small</div>
                   <input
                     type="range"
                     min="20"
                     max="80"
                     value={dockSize}
                     onChange={(e) => setDockSize(parseInt(e.target.value))}
                     style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}
                   />
                   <div style={{ fontSize: '12px', color: '#aaa', minWidth: '40px' }}>Large</div>
                 </div>
                 <div style={{ fontSize: '12px', color: '#aaa' }}>Size: {dockSize}%</div>
               </div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Dock Position</div>
                 <div style={{ display: 'flex', gap: '12px' }}>
                   <button
                     style={{
                       padding: '6px 12px',
                       borderRadius: '6px',
                       border: dockPosition === 'left' ? '1px solid #7AC7FF' : '1px solid rgba(80,80,90,0.22)',
                       background: dockPosition === 'left' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
                       color: dockPosition === 'left' ? '#7AC7FF' : '#aaa',
                       cursor: 'pointer',
                       fontSize: '12px'
                     }}
                     onClick={() => setDockPosition('left')}
                   >
                     Left
                   </button>
                   <button
                     style={{
                       padding: '6px 12px',
                       borderRadius: '6px',
                       border: dockPosition === 'bottom' ? '1px solid #7AC7FF' : '1px solid rgba(80,80,90,0.22)',
                       background: dockPosition === 'bottom' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
                       color: dockPosition === 'bottom' ? '#7AC7FF' : '#aaa',
                       cursor: 'pointer',
                       fontSize: '12px'
                     }}
                     onClick={() => setDockPosition('bottom')}
                   >
                     Bottom
                   </button>
                   <button
                     style={{
                       padding: '6px 12px',
                       borderRadius: '6px',
                       border: dockPosition === 'right' ? '1px solid #7AC7FF' : '1px solid rgba(80,80,90,0.22)',
                       background: dockPosition === 'right' ? 'rgba(122, 199, 255, 0.1)' : 'transparent',
                       color: dockPosition === 'right' ? '#7AC7FF' : '#aaa',
                       cursor: 'pointer',
                       fontSize: '12px'
                     }}
                     onClick={() => setDockPosition('right')}
                   >
                     Right
                   </button>
                 </div>
               </div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Dock Behavior</div>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                   <input
                     type="checkbox"
                     checked={dockAutoHide}
                     onChange={(e) => setDockAutoHide(e.target.checked)}
                     style={{ width: '16px', height: '16px' }}
                   />
                   <span style={{ fontSize: '12px', color: '#aaa' }}>
                     Automatically hide and show the dock
                   </span>
                 </label>
               </div>
             </>
           )}
           
           {selectedSection === 'displays' && (
             <>
               <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Displays</div>
               <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>Configure your display settings</div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Brightness</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                   <div style={{ fontSize: '12px', color: '#aaa', minWidth: '40px' }}>Dim</div>
                   <input
                     type="range"
                     min="0"
                     max="100"
                     value={displayBrightness}
                     onChange={(e) => setDisplayBrightness(parseInt(e.target.value))}
                     style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}
                   />
                   <div style={{ fontSize: '12px', color: '#aaa', minWidth: '40px' }}>Bright</div>
                 </div>
                 <div style={{ fontSize: '12px', color: '#aaa' }}>Brightness: {displayBrightness}%</div>
               </div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Display Features</div>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
                   <input
                     type="checkbox"
                     checked={nightShift}
                     onChange={(e) => setNightShift(e.target.checked)}
                     style={{ width: '16px', height: '16px' }}
                   />
                   <span style={{ fontSize: '12px', color: '#aaa' }}>
                     Night Shift
                   </span>
                 </label>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                   <input
                     type="checkbox"
                     checked={trueTone}
                     onChange={(e) => setTrueTone(e.target.checked)}
                     style={{ width: '16px', height: '16px' }}
                   />
                   <span style={{ fontSize: '12px', color: '#aaa' }}>
                     True Tone
                   </span>
                 </label>
               </div>
             </>
           )}
           
           {selectedSection === 'sound' && (
             <>
               <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Sound</div>
               <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>Configure audio settings</div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>System Volume</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                   <div style={{ fontSize: '12px', color: '#aaa', minWidth: '40px' }}>Mute</div>
                   <input
                     type="range"
                     min="0"
                     max="100"
                     value={systemVolume}
                     onChange={(e) => setSystemVolume(parseInt(e.target.value))}
                     style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}
                   />
                   <div style={{ fontSize: '12px', color: '#aaa', minWidth: '40px' }}>Max</div>
                 </div>
                 <div style={{ fontSize: '12px', color: '#aaa' }}>Volume: {systemVolume}%</div>
               </div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Sound Effects</div>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                   <input
                     type="checkbox"
                     checked={soundEffects}
                     onChange={(e) => setSoundEffects(e.target.checked)}
                     style={{ width: '16px', height: '16px' }}
                   />
                   <span style={{ fontSize: '12px', color: '#aaa' }}>
                     Play user interface sound effects
                   </span>
                 </label>
               </div>
             </>
           )}
           
           {selectedSection === 'network' && (
             <>
               <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Network</div>
               <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>Manage network connections</div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Wi-Fi</div>
                 <div style={{ 
                   background: 'rgba(255,255,255,0.05)', 
                   borderRadius: '8px', 
                   padding: '12px',
                   border: '1px solid rgba(255,255,255,0.1)'
                 }}>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span style={{ fontSize: '12px', color: '#fff' }}>Wi-Fi</span>
                     <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                       <input
                         type="checkbox"
                         checked={wifiEnabled}
                         onChange={(e) => setWifiEnabled(e.target.checked)}
                         style={{ width: '16px', height: '16px' }}
                       />
                     </label>
                   </div>
                   <div style={{ fontSize: '12px', color: '#aaa' }}>
                     {wifiEnabled ? 'Connected to "Fidel\'s WiFi"' : 'Wi-Fi is turned off'}
                   </div>
                 </div>
               </div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Bluetooth</div>
                 <div style={{ 
                   background: 'rgba(255,255,255,0.05)', 
                   borderRadius: '8px', 
                   padding: '12px',
                   border: '1px solid rgba(255,255,255,0.1)'
                 }}>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span style={{ fontSize: '12px', color: '#fff' }}>Bluetooth</span>
                     <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                       <input
                         type="checkbox"
                         checked={bluetoothEnabled}
                         onChange={(e) => setBluetoothEnabled(e.target.checked)}
                         style={{ width: '16px', height: '16px' }}
                       />
                     </label>
                   </div>
                   <div style={{ fontSize: '12px', color: '#aaa' }}>
                     {bluetoothEnabled ? 'Bluetooth is turned on' : 'Bluetooth is turned off'}
                   </div>
                 </div>
               </div>
             </>
           )}
           
           {selectedSection === 'privacy' && (
             <>
               <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Privacy & Security</div>
               <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>Manage privacy and security settings</div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Location Services</div>
                 <div style={{ 
                   background: 'rgba(255,255,255,0.05)', 
                   borderRadius: '8px', 
                   padding: '12px',
                   border: '1px solid rgba(255,255,255,0.1)'
                 }}>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span style={{ fontSize: '12px', color: '#fff' }}>Location Services</span>
                     <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                       <input
                         type="checkbox"
                         checked={locationServices}
                         onChange={(e) => setLocationServices(e.target.checked)}
                         style={{ width: '16px', height: '16px' }}
                       />
                     </label>
                   </div>
                   <div style={{ fontSize: '12px', color: '#aaa' }}>
                     {locationServices ? 'Location services are enabled' : 'Location services are disabled'}
                   </div>
                 </div>
               </div>
               
               <div style={{ marginBottom: '20px' }}>
                 <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Camera Access</div>
                 <div style={{ 
                   background: 'rgba(255,255,255,0.05)', 
                   borderRadius: '8px', 
                   padding: '12px',
                   border: '1px solid rgba(255,255,255,0.1)'
                 }}>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span style={{ fontSize: '12px', color: '#fff' }}>Camera</span>
                     <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                       <input
                         type="checkbox"
                         checked={cameraAccess}
                         onChange={(e) => setCameraAccess(e.target.checked)}
                         style={{ width: '16px', height: '16px' }}
                       />
                     </label>
                   </div>
                   <div style={{ fontSize: '12px', color: '#aaa' }}>
                     {cameraAccess ? 'Camera access is allowed' : 'Camera access is denied'}
                   </div>
                 </div>
               </div>
             </>
           )}
         </div>
      </div>
    </div>
  );
};

export default SystemSettings; 