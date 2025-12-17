import React, { useState } from 'react';

interface RemindersProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

// Mock Reminders data
const mockReminders = [
  {
    id: '1',
    title: 'Review project proposal',
    completed: false,
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    list: 'work',
    notes: 'Need to review the Q1 project proposal before the meeting'
  },
  {
    id: '2',
    title: 'Buy groceries',
    completed: false,
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    list: 'personal',
    notes: 'Milk, bread, eggs, and vegetables'
  },
  {
    id: '3',
    title: 'Call dentist office',
    completed: true,
    priority: 'low',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    list: 'health',
    notes: 'Schedule annual checkup'
  },
  {
    id: '4',
    title: 'Prepare presentation slides',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    list: 'work',
    notes: 'Client presentation for new product launch'
  },
  {
    id: '5',
    title: 'Pay electricity bill',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
    list: 'personal',
    notes: 'Due by end of month'
  },
  {
    id: '6',
    title: 'Update portfolio website',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days from now
    list: 'work',
    notes: 'Add new projects and update skills section'
  },
  {
    id: '7',
    title: 'Book flight tickets',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 604800000).toISOString().split('T')[0], // 1 week from now
    list: 'personal',
    notes: 'Business trip to Dallas, TX'
  },
  {
    id: '8',
    title: 'Schedule team meeting',
    completed: true,
    priority: 'low',
    dueDate: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    list: 'work',
    notes: 'Weekly team sync'
  },
  {
    id: '9',
    title: 'Buy birthday gift',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 1209600000).toISOString().split('T')[0], // 2 weeks from now
    list: 'personal',
    notes: 'Sean \'s birthday is coming up'
  },
  {
    id: '10',
    title: 'Complete code review',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 43200000).toISOString().split('T')[0], // 12 hours from now
    list: 'work',
    notes: 'Review pull request #456 for the dashboard feature'
  }
];

const reminderLists = [
  { id: 'work', name: 'Work', color: '#007AFF' },
  { id: 'personal', name: 'Personal', color: '#34C759' },
  { id: 'health', name: 'Health', color: '#FF3B30' }
];

const Reminders: React.FC<RemindersProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [remindersView, setRemindersView] = useState<'today' | 'scheduled' | 'all' | 'completed'>('today');
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<any>(null);

  // Reminders helper functions
  const getFilteredReminders = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (remindersView) {
      case 'today':
        return mockReminders.filter(reminder => reminder.dueDate === today);
      case 'scheduled':
        return mockReminders.filter(reminder => reminder.dueDate > today && !reminder.completed);
      case 'all':
        return mockReminders.filter(reminder => !reminder.completed);
      case 'completed':
        return mockReminders.filter(reminder => reminder.completed);
      default:
        return mockReminders;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#007AFF';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '🔵';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate !== new Date().toISOString().split('T')[0];
  };

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dueDate === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dueDate === tomorrow.toISOString().split('T')[0]) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const toggleReminderCompletion = (reminderId: string) => {
    const reminder = mockReminders.find(r => r.id === reminderId);
    if (reminder) {
      reminder.completed = !reminder.completed;
      // Force re-render by updating state
      setRemindersView(remindersView);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="reminders-window"
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
      
      {/* Reminders Title Bar */}
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
          Reminders
        </div>
      </div>
      
      {/* Reminders Toolbar */}
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
          New Reminder
        </button>
      </div>
      
      {/* Reminders Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '200px', background: 'rgba(36, 36, 40, 0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Lists</div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: remindersView === 'today' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: remindersView === 'today' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setRemindersView('today')}
          >
            📅 Today
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: remindersView === 'scheduled' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: remindersView === 'scheduled' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setRemindersView('scheduled')}
          >
            📅 Scheduled
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: remindersView === 'all' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: remindersView === 'all' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setRemindersView('all')}
          >
            📋 All
          </div>
          <div 
            style={{ 
              fontSize: '12px', 
              color: remindersView === 'completed' ? '#007AFF' : '#fff', 
              padding: '6px 0', 
              cursor: 'pointer',
              fontWeight: remindersView === 'completed' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setRemindersView('completed')}
          >
            ✅ Completed
          </div>
          
          <div style={{ marginTop: '20px', fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
            Categories
          </div>
          {reminderLists.map(list => (
            <div 
              key={list.id}
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
                background: list.color 
              }} />
              {list.name}
            </div>
          ))}
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
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '20px' }}>
            {remindersView === 'today' && 'Today'}
            {remindersView === 'scheduled' && 'Scheduled'}
            {remindersView === 'all' && 'All Reminders'}
            {remindersView === 'completed' && 'Completed'}
          </div>
          
          <div>
            {getFilteredReminders().map(reminder => (
              <div 
                key={reminder.id}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  padding: '12px', 
                  borderBottom: '1px solid rgba(80,80,90,0.1)',
                  background: reminder.completed ? 'rgba(0,0,0,0.2)' : 'transparent',
                  opacity: reminder.completed ? 0.6 : 1
                }}
              >
                <div style={{ marginRight: '12px', marginTop: '2px' }}>
                  <div 
                    style={{ 
                      width: '18px', 
                      height: '18px', 
                      borderRadius: '50%', 
                      border: '2px solid rgba(255,255,255,0.3)',
                      background: reminder.completed ? '#34C759' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#fff',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => toggleReminderCompletion(reminder.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = '2px solid #34C759';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {reminder.completed && '✓'}
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <div style={{ 
                      fontSize: '14px', 
                      color: reminder.completed ? '#666' : '#fff',
                      textDecoration: reminder.completed ? 'line-through' : 'none',
                      fontWeight: '500'
                    }}>
                      {reminder.title}
                    </div>
                    <div style={{ fontSize: '12px' }}>
                      {getPriorityIcon(reminder.priority)}
                    </div>
                    <div style={{ 
                      display: 'inline-block',
                      background: reminderLists.find(l => l.id === reminder.list)?.color,
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '10px'
                    }}>
                      {reminderLists.find(l => l.id === reminder.list)?.name}
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '12px',
                    color: '#aaa'
                  }}>
                    <div style={{ 
                      color: isOverdue(reminder.dueDate) ? '#FF3B30' : '#aaa',
                      fontWeight: isOverdue(reminder.dueDate) ? '500' : '400'
                    }}>
                      {isOverdue(reminder.dueDate) ? 'Overdue' : formatDueDate(reminder.dueDate)}
                    </div>
                    {reminder.notes && (
                      <div style={{ 
                        color: '#666',
                        fontStyle: 'italic'
                      }}>
                        {reminder.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {getFilteredReminders().length === 0 && (
              <div style={{ textAlign: 'center', color: '#aaa', marginTop: '100px' }}>
                <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                  {remindersView === 'today' && 'No reminders for today'}
                  {remindersView === 'scheduled' && 'No scheduled reminders'}
                  {remindersView === 'all' && 'No reminders'}
                  {remindersView === 'completed' && 'No completed reminders'}
                </div>
                <div style={{ fontSize: '13px' }}>
                  {remindersView !== 'completed' && 'Create a new reminder to get started'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders; 