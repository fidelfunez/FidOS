import React, { useState } from 'react';

interface WeatherProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setWindowPosition: (position: { x: number; y: number }) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDragStart: (dragStart: { x: number; y: number }) => void;
}

// Mock weather data
const mockWeatherData = {
  current: {
    location: 'The Woodlands, TX',
    temperature: 26,
    condition: 'Partly Cloudy',
    high: 26,
    low: 18,
    humidity: 65,
    wind: '8 mph',
    feelsLike: 23
  },
  hourly: [
    { time: 'Now', temp: 25, condition: 'Partly Cloudy', icon: '⛅' },
    { time: '1 PM', temp: 25, condition: 'Partly Cloudy', icon: '⛅' },
    { time: '2 PM', temp: 27, condition: 'Sunny', icon: '☀️' },
    { time: '3 PM', temp: 27, condition: 'Sunny', icon: '☀️' },
    { time: '4 PM', temp: 24, condition: 'Partly Cloudy', icon: '⛅' },
    { time: '5 PM', temp: 23, condition: 'Partly Cloudy', icon: '⛅' },
    { time: '6 PM', temp: 22, condition: 'Partly Cloudy', icon: '⛅' },
    { time: '7 PM', temp: 21, condition: 'Clear', icon: '🌙' },
    { time: '8 PM', temp: 20, condition: 'Clear', icon: '🌙' },
    { time: '9 PM', temp: 18, condition: 'Clear', icon: '🌙' },
    { time: '10 PM', temp: 18, condition: 'Clear', icon: '🌙' },
    { time: '11 PM', temp: 17, condition: 'Clear', icon: '🌙' }
  ],
  weekly: [
    { day: 'Today', high: 78, low: 65, condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Tomorrow', high: 82, low: 68, condition: 'Sunny', icon: '☀️' },
    { day: 'Wed', high: 79, low: 66, condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Thu', high: 75, low: 63, condition: 'Cloudy', icon: '☁️' },
    { day: 'Fri', high: 73, low: 61, condition: 'Rain', icon: '🌧️' },
    { day: 'Sat', high: 76, low: 64, condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Sun', high: 80, low: 67, condition: 'Sunny', icon: '☀️' }
  ]
};

const Weather: React.FC<WeatherProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setWindowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [selectedTab, setSelectedTab] = useState<'current' | 'hourly' | 'weekly'>('current');

  if (!isOpen) return null;

  return (
    <div
      className="weather-window"
      style={{
        position: 'fixed',
        left: `${windowPosition.x}px`,
        top: `${windowPosition.y}px`,
        width: 480,
        height: 640,
        background: 'rgba(28, 28, 32, 0.98)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
        border: '1px solid rgba(60,60,70,0.32)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'weatherFadeIn 0.32s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <style>{`
        @keyframes weatherFadeIn {
          0% { opacity: 0; transform: scale(0.96) translateY(24px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      
      {/* Weather Title Bar */}
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
          Weather
        </div>
      </div>
      
      {/* Weather Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(28,28,32,0.98)' }}>
        {/* Location Header */}
        <div style={{
          padding: '20px 24px 16px 24px',
          borderBottom: '1px solid rgba(80,80,90,0.22)'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '4px'
          }}>
            {mockWeatherData.current.location}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#aaa',
            fontWeight: '400'
          }}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Current Weather */}
        <div style={{
          padding: '24px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(80,80,90,0.22)'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '8px'
          }}>
            {mockWeatherData.current.temperature}°
          </div>
          <div style={{
            fontSize: '18px',
            color: '#fff',
            fontWeight: '500',
            marginBottom: '8px'
          }}>
            {mockWeatherData.current.condition}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#aaa',
            marginBottom: '16px'
          }}>
            H: {mockWeatherData.current.high}° L: {mockWeatherData.current.low}°
          </div>
          
          {/* Weather Details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '20px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Feels Like</div>
              <div style={{ fontSize: '16px', color: '#fff', fontWeight: '500' }}>{mockWeatherData.current.feelsLike}°</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Humidity</div>
              <div style={{ fontSize: '16px', color: '#fff', fontWeight: '500' }}>{mockWeatherData.current.humidity}%</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Wind</div>
              <div style={{ fontSize: '16px', color: '#fff', fontWeight: '500' }}>{mockWeatherData.current.wind}</div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(80,80,90,0.22)'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '16px'
          }}>
            Hourly Forecast
          </div>
          <div style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '8px'
          }}>
            {mockWeatherData.hourly.map((hour, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '60px'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#aaa',
                  marginBottom: '8px'
                }}>
                  {hour.time}
                </div>
                <div style={{
                  fontSize: '24px',
                  marginBottom: '4px'
                }}>
                  {hour.icon}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#fff',
                  fontWeight: '500'
                }}>
                  {hour.temp}°
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Forecast */}
        <div style={{
          padding: '20px 24px',
          flex: 1
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '16px'
          }}>
            7-Day Forecast
          </div>
          {mockWeatherData.weekly.map((day, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: index < mockWeatherData.weekly.length - 1 ? '1px solid rgba(80,80,90,0.22)' : 'none'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#fff',
                fontWeight: '500',
                width: '60px'
              }}>
                {day.day}
              </div>
              <div style={{
                fontSize: '20px',
                marginRight: '16px'
              }}>
                {day.icon}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#fff',
                fontWeight: '500',
                marginRight: '16px'
              }}>
                {day.condition}
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#fff',
                  fontWeight: '500'
                }}>
                  {day.high}°
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#aaa'
                }}>
                  {day.low}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather; 