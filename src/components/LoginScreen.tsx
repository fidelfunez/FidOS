import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import PasswordInput from './PasswordInput';

interface LoginScreenProps {
  onLogin: () => void;
}

const quote =
  '"Chancellor on brink of second bailout for banks."\n— The Times, January 3rd, 2009.';

const fontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// Tooltip component for system bar icons
const SystemBarTooltip: React.FC<{ message: React.ReactNode; show: boolean }> = ({ message, show }) => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (show) {
      setVisible(true);
      setFading(false);
    } else if (visible) {
      setFading(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [show]);
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '28px',
        transform: fading ? 'translateX(-50%) translateY(-8px) scale(0.98)' : 'translateX(-50%)',
        background: 'rgba(30, 28, 26, 0.97)',
        color: '#fff',
        fontSize: 12,
        fontWeight: 500,
        borderRadius: 12,
        padding: '11px 14px 7px 14px',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
        maxWidth: 180,
        whiteSpace: 'normal',
        zIndex: 100,
        pointerEvents: 'none',
        fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
        opacity: fading ? 0 : 0.97,
        transition: 'opacity 0.22s cubic-bezier(.4,0,.2,1), transform 0.22s cubic-bezier(.4,0,.2,1)',
      }}
    >
      {message}
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: -8,
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderBottom: '8px solid rgba(30, 28, 26, 0.97)',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))',
          zIndex: 101,
        }}
      />
    </div>
  );
};

// Subtle shadow style for system bar icons
const barIconShadow = {
  filter: 'drop-shadow(0 1.5px 4px rgba(0,0,0,0.18))',
};

// Special tooltip component for logout with wider styling
const LogoutTooltip: React.FC<{ message: React.ReactNode; show: boolean; onClose?: () => void }> = ({ message, show, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (show) {
      setVisible(true);
      setFading(false);
    } else if (visible) {
      setFading(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [show]);
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'fixed',
        right: '8px',
        top: '48px',
        transform: fading ? 'translateY(-8px) scale(0.98)' : 'none',
        background: 'rgba(30, 28, 26, 0.97)',
        color: '#fff',
        fontSize: 12,
        fontWeight: 500,
        borderRadius: 12,
        padding: '4px 14px',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
        width: 178,
        whiteSpace: 'normal',
        zIndex: 100,
        pointerEvents: 'auto',
        cursor: 'pointer',
        fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
        opacity: fading ? 0 : 0.97,
        transition: 'opacity 0.22s cubic-bezier(.4,0,.2,1), transform 0.22s cubic-bezier(.4,0,.2,1)',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClose?.();
      }}
    >
      {message}
      <span
        style={{
          position: 'absolute',
          left: '82%',
          top: -8,
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderBottom: '8px solid rgba(30, 28, 26, 0.97)',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))',
          zIndex: 101,
        }}
      />
    </div>
  );
};

// System bar icons with tooltips
const SystemBarIcons = () => {
  const [abcHover, setAbcHover] = useState(false);
  const [batteryHover, setBatteryHover] = useState(false);
  const [wifiHover, setWifiHover] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);
  const [logoutPressed, setLogoutPressed] = useState(false);
  const [showLogoutTooltip, setShowLogoutTooltip] = useState(false);

  // Show logout tooltip on component mount for 15 seconds
  useEffect(() => {
    setShowLogoutTooltip(true);
    const timer = setTimeout(() => {
      setShowLogoutTooltip(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <span
        className="text-xs tracking-tight font-bold text-white align-middle relative"
        style={{ fontFamily: fontStack, ...barIconShadow }}
        onMouseEnter={() => setAbcHover(true)}
        onMouseLeave={() => setAbcHover(false)}
      >
        ABC
        <SystemBarTooltip message="Input source: ABC" show={abcHover} />
      </span>
      {/* Keyboard icon (thicker, white) */}
      <svg key="keyboard" className="ml-0.5 align-middle" width="16" height="16" viewBox="0 0 24 24" fill="none" style={barIconShadow}><rect x="2" y="7" width="20" height="10" rx="1.5" stroke="#fff" strokeWidth="1.8"/><rect x="4" y="9" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="6.8" y="9" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="9.6" y="9" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="12.4" y="9" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="15.2" y="9" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="18" y="9" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="4" y="11.2" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="6.8" y="11.2" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="9.6" y="11.2" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="12.4" y="11.2" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="15.2" y="11.2" width="1.8" height="1.8" rx="0.3" fill="#fff"/><rect x="18" y="11.2" width="1.8" height="1.8" rx="0.3" fill="#fff"/></svg>
      {/* Battery icon (custom, matches screenshot) */}
      <span className="relative ml-4 align-middle" onMouseEnter={() => setBatteryHover(true)} onMouseLeave={() => setBatteryHover(false)}>
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" style={barIconShadow}><rect x="1" y="4" width="18" height="8" rx="3" stroke="#f4f4f5" strokeWidth="1.4"/><path d="M20.2 7a1 1 0 0 1 2 1 1 1 0 0 1-2 1z" fill="#f4f4f5"/><rect x="3.2" y="5.7" width="10.5" height="4.6" rx="1.2" fill="white"/></svg>
        <SystemBarTooltip message="Battery: 80%" show={batteryHover} />
      </span>
      {/* WiFi icon (custom, matches screenshot, no dot, thicker, white, perfectly vertically aligned) */}
      <span className="relative ml-4 align-middle" onMouseEnter={() => setWifiHover(true)} onMouseLeave={() => setWifiHover(false)}>
        <svg width="18" height="16" viewBox="0 3 18 15" fill="none" style={barIconShadow}><g transform="translate(0,-2)"><path d="M2.5 10c3-3 10-3 13 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/><path d="M5.2 12.7c1.7-1.7 5.9-1.7 7.6 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/><path d="M7.3 14.7c.7-.7 3.2-.7 3.9 0 .2.2.2.5 0 .5l-2 2.5-2-2.5c-.2 0-.2-.3 0-.5z" fill="#fff"/></g></svg>
        <SystemBarTooltip 
          message={"Connected to Fidel's WiFi"}
          show={wifiHover} 
        />
      </span>
      {/* Logout icon */}
      <span 
        className="relative ml-4 align-middle cursor-pointer" 
        style={{ 
          color: '#fff',
          transition: 'transform 0.16s cubic-bezier(.4,0,.2,1), box-shadow 0.16s cubic-bezier(.4,0,.2,1)',
          transform: logoutPressed ? 'scale(0.93)' : logoutHover ? 'scale(1.11)' : 'scale(1)',
          boxShadow: logoutHover || logoutPressed ? '0 4px 16px 0 rgba(0,0,0,0.18)' : 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={() => setLogoutHover(true)} 
        onMouseLeave={() => setLogoutHover(false)}
        onMouseDown={() => setLogoutPressed(true)}
        onMouseUp={() => setLogoutPressed(false)}
        onMouseOut={() => setLogoutPressed(false)}
        onClick={() => window.location.href = '/simple'}
      >
        <LogOut size={16} style={barIconShadow} />
      </span>
      
      {/* Logout tooltip - positioned beneath logout icon */}
      <LogoutTooltip 
        message={
          <>
            <div>Too much desktop magic?</div>
            <div>Switch to Simple View.</div>
          </>
        }
        show={logoutHover || showLogoutTooltip}
        onClose={() => setShowLogoutTooltip(false)}
      />
    </>
  );
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const [password, setPassword] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Allow Enter/Return to trigger login from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Return') {
        router.push('/dashboard');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const handlePasswordSubmit = () => {
    router.push('/dashboard');
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between bg-cover bg-center min-h-screen"
      style={{ backgroundImage: 'url(/wallpaper.webp)', fontFamily: fontStack }}
    >
      {/* Minimal dark overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.06)' }} />
      {/* System bar */}
      <div className="w-full flex justify-end items-center h-10 px-8 z-30 select-none mt-2 tracking-tight items-center" style={{ fontFamily: fontStack, fontSize: '14px' }}>
        <SystemBarIcons />
      </div>
      {/* Main content column, fills vertical space */}
      <div className="flex flex-col items-center justify-between flex-1 w-full h-full z-10">
        {/* Date and time even closer to the top */}
        <div className="flex flex-col items-center mt-2 mb-2">
          <div className="mb-0.5" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: fontStack, fontSize: '28px', fontWeight: 600, letterSpacing: '-0.01em', textShadow: '0 2px 8px rgba(0,0,0,0.20)' }}>
            {time.toLocaleDateString(undefined, { weekday: 'long' })}, {time.getDate()} {time.toLocaleDateString(undefined, { month: 'long' })}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontFamily: fontStack, fontSize: '124px', fontWeight: 800, letterSpacing: '-0.03em', textShadow: '0 6px 32px rgba(0,0,0,0.25), 0 1.5px 0 rgba(0,0,0,0.15), 0 3px 12px rgba(0,0,0,0.20)', lineHeight: 1 }}>
            {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s?(AM|PM)/i, '')}
          </div>
        </div>
        {/* Quote centered between time and profile card */}
        <div className="flex-1 flex flex-col justify-center items-center">
        </div>
        {/* Profile card even closer to the bottom */}
        <div className="flex flex-col items-center mb-8">
          {/* Quote right above the profile card */}
          <div className="mb-5" style={{ color: '#fff', fontFamily: fontStack, fontSize: '13px', fontWeight: 500, maxWidth: '600px', textAlign: 'center', textShadow: '0 1px 8px rgba(0,0,0,0.10)', whiteSpace: 'pre-line' }}>
            {quote}
          </div>
          <button
            className="w-[56px] h-[56px] rounded-full bg-gray-200 shadow-lg mb-4 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            tabIndex={0}
            aria-label="Profile avatar"
          >
            <img 
              src="/avatar.webp" 
              alt="Fidel Fúnez C. avatar" 
              className="w-full h-full object-cover object-top rounded-full bg-gray-200" 
              style={{ 
                aspectRatio: '1/1',
                transform: 'scale(1.1)',
                transformOrigin: 'center'
              }} 
            />
          </button>
          <div style={{ color: 'rgba(255,255,255,0.92)', fontFamily: fontStack, fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em', textShadow: '0 3px 12px rgba(0,0,0,0.30), 0 1px 6px rgba(0,0,0,0.25)' }}>
            Fidel Fúnez C.
          </div>
          <div className="w-full flex justify-center mt-4 mb-2">
            <PasswordInput onSubmit={handlePasswordSubmit} />
          </div>
          <div style={{ color: '#fff9ae', fontFamily: fontStack, fontSize: '12px', fontWeight: 600, marginTop: '4px', marginBottom: '2px', letterSpacing: '-0.01em', textShadow: '0 2.5px 10px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.18)' }}>
            Touch ID or Enter Password
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 