import React, { useState } from 'react';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

// Mock Calendar data
const generateMockEvents = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  return [
    {
      id: '1',
      title: 'Team Standup',
      date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
      time: '09:00',
      duration: 30,
      type: 'work',
      location: 'Zoom Meeting',
      description: 'Daily team standup meeting'
    },
    {
      id: '2',
      title: 'Lunch with Vale',
      date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
      time: '12:30',
      duration: 60,
      type: 'personal',
      location: 'Downtown Cafe',
      description: 'Catch up over lunch'
    },
    {
      id: '3',
      title: 'Project Review',
      date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
      time: '14:00',
      duration: 90,
      type: 'work',
      location: 'Conference Room A',
      description: 'Q1 project milestone review'
    },
    {
      id: '4',
      title: 'Grappling Session',
      date: new Date(currentYear, currentMonth, 16).toISOString().split('T')[0],
      time: '07:00',
      duration: 60,
      type: 'personal',
      location: 'Fitness Center',
      description: 'Morning Sparring Session'
    },
    {
      id: '5',
      title: 'Client Meeting',
      date: new Date(currentYear, currentMonth, 16).toISOString().split('T')[0],
      time: '10:00',
      duration: 120,
      type: 'work',
      location: 'Client Office',
      description: 'New project discussion'
    },
    {
      id: '6',
      title: 'Dentist Appointment',
      date: new Date(currentYear, currentMonth, 17).toISOString().split('T')[0],
      time: '15:30',
      duration: 45,
      type: 'health',
      location: 'Dr. Julia Harris\' Office',
      description: 'Regular checkup'
    },
    {
      id: '7',
      title: 'Movie Night',
      date: new Date(currentYear, currentMonth, 17).toISOString().split('T')[0],
      time: '19:00',
      duration: 180,
      type: 'personal',
      location: 'Cinema',
      description: 'Watch the new Superman movie'
    },
    {
      id: '8',
      title: 'Birthday Party',
      date: new Date(currentYear, currentMonth, 18).toISOString().split('T')[0],
      time: '18:00',
      duration: 240,
      type: 'family',
      location: 'Home',
      description: 'Sean\'s birthday celebration'
    },
    {
      id: '9',
      title: 'Code Review',
      date: new Date(currentYear, currentMonth, 19).toISOString().split('T')[0],
      time: '11:00',
      duration: 60,
      type: 'work',
      location: 'Slack',
      description: 'Review pull request #123'
    },
    {
      id: '10',
      title: 'Weekend Trip',
      date: new Date(currentYear, currentMonth, 20).toISOString().split('T')[0],
      time: '08:00',
      duration: 1440,
      type: 'personal',
      location: 'Roatan Island',
      description: 'Weekend getaway'
    },
    {
      id: '11',
      title: 'Morning Tea',
      date: new Date(currentYear, currentMonth, today.getDate()).toISOString().split('T')[0],
      time: '08:30',
      duration: 30,
      type: 'personal',
      location: 'Local Coffee Shop',
      description: 'Start the day right'
    },
    {
      id: '12',
      title: 'Product Demo',
      date: new Date(currentYear, currentMonth, today.getDate() + 1).toISOString().split('T')[0],
      time: '13:00',
      duration: 60,
      type: 'work',
      location: 'Conference Room B',
      description: 'Demo new features to stakeholders'
    }
  ];
};

const mockEvents = generateMockEvents();

const calendarCategories = [
  { id: 'work', name: 'Work', color: '#007AFF' },
  { id: 'personal', name: 'Personal', color: '#34C759' },
  { id: 'family', name: 'Family', color: '#FF9500' },
  { id: 'health', name: 'Health', color: '#FF3B30' }
];

const Calendar: React.FC<CalendarProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Calendar helper functions
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateString);
  };

  const getEventsForDateRange = (startDate: Date, endDate: Date) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || days.length < 42) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="calendar-window"
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
        
        {/* Calendar Title Bar */}
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
            Calendar
          </div>
        </div>
        
        {/* Calendar Toolbar */}
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
              background: calendarView === 'month' ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
              border: '1px solid rgba(80,80,90,0.22)',
              borderRadius: '6px',
              padding: '6px 12px',
              color: calendarView === 'month' ? '#007AFF' : '#aaa',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            onClick={() => setCalendarView('month')}
          >
            Month
          </button>
          <button 
            style={{
              background: calendarView === 'week' ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
              border: '1px solid rgba(80,80,90,0.22)',
              borderRadius: '6px',
              padding: '6px 12px',
              color: calendarView === 'week' ? '#007AFF' : '#aaa',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            onClick={() => setCalendarView('week')}
          >
            Week
          </button>
          <button 
            style={{
              background: calendarView === 'day' ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
              border: '1px solid rgba(80,80,90,0.22)',
              borderRadius: '6px',
              padding: '6px 12px',
              color: calendarView === 'day' ? '#007AFF' : '#aaa',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            onClick={() => setCalendarView('day')}
          >
            Day
          </button>
          <div style={{ flex: 1 }} />
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
            New Event
          </button>
          <button 
            style={{
              background: 'transparent',
              border: '1px solid rgba(80,80,90,0.22)',
              borderRadius: '6px',
              padding: '6px 12px',
              color: '#fff',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </button>
        </div>
        
        {/* Calendar Content */}
        <div style={{ flex: 1, display: 'flex' }}>
          {/* Sidebar */}
          <div style={{ width: '200px', background: 'rgba(36, 36, 40, 0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Calendars</div>
            {calendarCategories.map(category => (
              <div 
                key={category.id}
                style={{ 
                  fontSize: '12px', 
                  color: '#fff', 
                  padding: '6px 0', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  background: category.color 
                }} />
                {category.name}
              </div>
            ))}
            
            <div style={{ marginTop: '20px', fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
              Today's Events
            </div>
            <div style={{ overflow: 'auto', height: '200px' }}>
              {getEventsForDate(new Date()).map(event => (
                <div 
                  key={event.id}
                  style={{ 
                    fontSize: '11px', 
                    color: '#fff', 
                    padding: '4px 0',
                    borderLeft: `3px solid ${calendarCategories.find(c => c.id === event.type)?.color}`,
                    paddingLeft: '8px',
                    marginBottom: '4px'
                  }}
                >
                  <div style={{ fontWeight: '500' }}>{event.title}</div>
                  <div style={{ color: '#aaa', fontSize: '10px' }}>
                    {formatTime(event.time)} • {event.location}
                  </div>
                </div>
              ))}
              {getEventsForDate(new Date()).length === 0 && (
                <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                  No events today
                </div>
              )}
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
            {calendarView === 'month' && (
              // Month View
              <div>
                {/* Month Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <button 
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(80,80,90,0.22)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigateMonth('prev')}
                  >
                    ←
                  </button>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <button 
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(80,80,90,0.22)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigateMonth('next')}
                  >
                    →
                  </button>
                </div>
                
                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'rgba(80,80,90,0.22)' }}>
                  {/* Day Headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} style={{ 
                      background: 'rgba(36, 36, 40, 0.98)', 
                      padding: '12px', 
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#aaa'
                    }}>
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar Days */}
                  {getMonthDays(currentDate).map((date, index) => {
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const events = getEventsForDate(date);
                    
                    return (
                      <div 
                        key={index}
                        style={{ 
                          background: 'rgba(36, 36, 40, 0.98)', 
                          minHeight: '100px',
                          padding: '8px',
                          cursor: 'pointer',
                          border: isToday ? '2px solid #007AFF' : '1px solid transparent',
                          opacity: isCurrentMonth ? 1 : 0.3
                        }}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div style={{ 
                          fontSize: '12px', 
                          color: isCurrentMonth ? '#fff' : '#666',
                          fontWeight: isToday ? '600' : '400',
                          marginBottom: '4px'
                        }}>
                          {date.getDate()}
                        </div>
                        <div style={{ fontSize: '10px' }}>
                          {events.slice(0, 2).map(event => (
                            <div 
                              key={event.id}
                              style={{ 
                                background: calendarCategories.find(c => c.id === event.type)?.color,
                                color: '#fff',
                                padding: '2px 4px',
                                borderRadius: '2px',
                                marginBottom: '2px',
                                fontSize: '9px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEventClick(event);
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {events.length > 2 && (
                            <div style={{ color: '#aaa', fontSize: '9px' }}>
                              +{events.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {calendarView === 'week' && (
              // Week View
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '20px' }}>
                  Week of {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'rgba(80,80,90,0.22)' }}>
                  {Array.from({ length: 7 }, (_, i) => {
                    const date = new Date(currentDate);
                    date.setDate(date.getDate() - date.getDay() + i);
                    const events = getEventsForDate(date);
                    
                    return (
                      <div key={i} style={{ background: 'rgba(36, 36, 40, 0.98)', minHeight: '400px', padding: '12px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                          {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div>
                          {events.map(event => (
                            <div 
                              key={event.id}
                              style={{ 
                                background: calendarCategories.find(c => c.id === event.type)?.color,
                                color: '#fff',
                                padding: '6px 8px',
                                borderRadius: '4px',
                                marginBottom: '4px',
                                fontSize: '11px',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleEventClick(event)}
                            >
                              <div style={{ fontWeight: '500' }}>{event.title}</div>
                              <div style={{ fontSize: '10px', opacity: 0.9 }}>
                                {formatTime(event.time)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {calendarView === 'day' && (
              // Day View
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '20px' }}>
                  {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div style={{ display: 'grid', gridTemplateRows: 'repeat(24, 60px)', gap: '1px', background: 'rgba(80,80,90,0.22)' }}>
                  {Array.from({ length: 24 }, (_, hour) => {
                    const events = getEventsForDate(currentDate).filter(event => {
                      const eventHour = parseInt(event.time.split(':')[0]);
                      return eventHour === hour;
                    });
                    
                    return (
                      <div key={hour} style={{ 
                        background: 'rgba(36, 36, 40, 0.98)', 
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          width: '60px', 
                          fontSize: '12px', 
                          color: '#aaa',
                          textAlign: 'right',
                          paddingRight: '12px'
                        }}>
                          {hour === 0 ? '12 AM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                        </div>
                        <div style={{ flex: 1 }}>
                          {events.map(event => (
                            <div 
                              key={event.id}
                              style={{ 
                                background: calendarCategories.find(c => c.id === event.type)?.color,
                                color: '#fff',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                marginBottom: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleEventClick(event)}
                            >
                              <div style={{ fontWeight: '500' }}>{event.title}</div>
                              <div style={{ fontSize: '10px', opacity: 0.9 }}>
                                {formatTime(event.time)} • {event.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: 'rgba(36, 36, 40, 0.98)',
            borderRadius: '12px',
            padding: '24px',
            width: '400px',
            border: '1px solid rgba(80,80,90,0.22)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.55)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>
                Event Details
              </div>
              <button 
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#aaa',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                onClick={() => setShowEventModal(false)}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>
                {selectedEvent.title}
              </div>
              <div style={{ 
                display: 'inline-block',
                background: calendarCategories.find(c => c.id === selectedEvent.type)?.color,
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                marginBottom: '8px'
              }}>
                {calendarCategories.find(c => c.id === selectedEvent.type)?.name}
              </div>
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Date & Time</div>
              <div style={{ fontSize: '14px', color: '#fff' }}>
                {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })} at {formatTime(selectedEvent.time)}
              </div>
            </div>
            
            {selectedEvent.location && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Location</div>
                <div style={{ fontSize: '14px', color: '#fff' }}>{selectedEvent.location}</div>
              </div>
            )}
            
            {selectedEvent.description && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Description</div>
                <div style={{ fontSize: '14px', color: '#fff' }}>{selectedEvent.description}</div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button 
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(80,80,90,0.22)',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  color: '#fff',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowEventModal(false)}
              >
                Close
              </button>
              <button 
                style={{
                  background: '#007AFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  color: '#fff',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Edit Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar; 