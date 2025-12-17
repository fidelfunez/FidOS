import React, { useState, useRef, useEffect } from 'react';

interface NotesProps {
  isOpen: boolean;
  onClose: () => void;
  windowPosition: { x: number; y: number };
  setIsDragging: (dragging: boolean) => void;
  setDragStart: (pos: { x: number; y: number }) => void;
}

const Notes: React.FC<NotesProps> = ({
  isOpen,
  onClose,
  windowPosition,
  setIsDragging,
  setDragStart
}) => {
  const [selectedNote, setSelectedNote] = useState('welcome');
  const [notesContentFocused, setNotesContentFocused] = useState(false);
  const notesScrollContainerRef = useRef<HTMLDivElement>(null);
  
  // State for editable note content
  const [noteContent, setNoteContent] = useState({
    welcome: `Welcome to FidOS! 👋🏼

What is this exactly? 🚀
FidOS is my personal digital portfolio disguised as a macOS-style operating system. It's a fully interactive web experience that showcases my skills, projects, and personality through a familiar desktop interface.

What can you do here? 🎮
• 📁 Open desktop folders (See my Projects, Photos, FidOS)
• 🖱️ Drag and drop items around the desktop
• 💻 Launch apps from the dock (Safari, Mail, iMessage, etc.)
• 💬 Chat in iMessage with realistic conversations
• 📱 Try the launchpad (Delete some apps)
• 🗑️ Empty the trash (try it!)
• ⚙️ Interact with system menus and controls
• 🎨 Experience smooth animations and dark mode UI

Technical Features 🔧
• Built with Next.js 15 and React
• TypeScript for type safety
• Responsive design with smooth animations
• Dark mode optimized interface
• Real-time clock and system status
• Draggable windows and desktop items

How to navigate 🧭
• Click on any desktop folder to open a Finder window
• Click dock apps to launch their windows
• Drag items around the desktop
• Use the system bar menus (Apple, Account, etc.)
• Try the welcome tooltip that appears when you first visit!

Enjoy exploring! 🎉
This is more than just a portfolio, it's an interactive experience that demonstrates my passion for creating engaging, user-friendly interfaces. Feel free to poke around and discover all the little details I've added!`,
    
    about: `👨🏽‍💻 About Me

Who am I? 🙋🏽‍♂️
Hey! I\'m Fidel Fúnez, an independent full-stack developer, and passionate Bitcoiner, with a strong focus on clean open-source code, smooth user experiences, and a deep appreciation for elegant design. I care about building things that aren\’t just functional; they look and feel good to use.

My Coding Journey 🛤️
I started by learning how to think like a programmer. When I first began studying, one of the first tools we used was Flowgorithm, which helped me understand algorithm logic visually before I ever touched a real programming language. From there, I moved on to writing basic programs, then building websites, and eventually developing full-stack applications. That journey led me to building backend APIs, designing database schemas, and creating systems from the ground up. Over time, that curiosity turned into a real skillset, developing complete products, integrating APIs, experimenting with design systems, and refining every interaction until it feels just right. This isn’t just a career path for me, it’s something I genuinely enjoy.

What Drives Me 🎯
• Making interfaces feel intuitive and natural
• Writing code that\’s clean and easy to maintain
• Solving tricky problems with smart, scalable solutions
• Creating open-source projects that are useful to the community
• Always learning, always experimenting
• Building tools that are actually useful

My Projects 🚀
I\’ve built everything from productivity tools to Bitcoin-based apps, and each one reflects something I\’ve learned along the way. This FidOS project is a mashup of all those experiences: part portfolio, part playground, and part proof of concept.

My Philosophy 💭
Software should feel human. The best apps don\’t require a tutorial, they just make sense. That\’s what I aim for every time I build. My goal is to build tools that non-technical users can use without a tutorial.

Beyond the Code 🌴
When I\’m not building, I\’m probably thinking about what to build next. Or teaching Bitcoin. Or sketching out the next project over green tea or intermittent fasting lol. I love clean interfaces, smart systems, and ambitious side projects. Always down to share what I know, learn from others, and collaborate when it clicks.

Let\’s Connect 🤝
If you\’ve got an idea, want feedback, or just want to talk shop,I\’m all ears. Let\’s build something cool.`,
    
    react: `⚡ React Performance Tips

Optimizing React Applications 🚀
Here are some key performance tips I've learned while building React applications like this FidOS dashboard:

1. Use React.memo() Wisely 🧠
Wrap components that receive the same props frequently to prevent unnecessary re-renders:

const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>
});

2. Optimize State Updates 📊
Batch state updates and use functional updates when new state depends on previous state:

// Good
setCount(prev => prev + 1);

// Avoid
setCount(count + 1);

3. Lazy Loading Components 📦
Use React.lazy() and Suspense for code splitting:

const LazyComponent = React.lazy(() => 
  import('./LazyComponent')
);

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>

4. Optimize Event Handlers 🎯
Use useCallback for event handlers passed to child components:

const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);

5. Virtual Scrolling for Large Lists 📜
For large datasets, consider libraries like react-window or react-virtualized to only render visible items.

6. Use Production Builds 🏭
Always test performance with production builds, as development builds include extra overhead for debugging.

7. Monitor Bundle Size 📦
Use tools like webpack-bundle-analyzer to identify and reduce large dependencies.

Remember: 🎯
Performance optimization is an iterative process. Profile your app, identify bottlenecks, and optimize accordingly. Sometimes the best optimization is removing unnecessary code!`
  });

  // Global scroll handler for Notes window
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (isOpen && notesContentFocused && notesScrollContainerRef.current) {
        e.preventDefault();
        e.stopPropagation();
        const scrollAmount = e.deltaY;
        const container = notesScrollContainerRef.current;
        const contentHeight = container.scrollHeight;
        const containerHeight = container.clientHeight;
        console.log('Scrolling Notes:', { 
          scrollAmount, 
          currentScrollTop: container.scrollTop,
          contentHeight,
          containerHeight,
          canScroll: contentHeight > containerHeight
        });
        container.scrollTop += scrollAmount;
        console.log('New scrollTop:', container.scrollTop);
      }
    };

    if (isOpen) {
      document.addEventListener('wheel', handleGlobalWheel, { passive: false, capture: true });
    }

    return () => {
      document.removeEventListener('wheel', handleGlobalWheel, { capture: true });
    };
  }, [isOpen, notesContentFocused]);

  if (!isOpen) return null;



  return (
    <div
      className="notes-window"
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
      
      {/* Notes Title Bar */}
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
          Notes
        </div>
      </div>
      
      {/* Notes Toolbar */}
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
          All Notes
        </button>
        <button style={{
          background: 'transparent',
          border: '1px solid rgba(80,80,90,0.22)',
          borderRadius: '6px',
          padding: '6px 12px',
          color: '#fff',
          fontSize: '12px',
          cursor: 'pointer'
        }}>
          Recently Modified
        </button>
        <button 
          style={{
            background: '#007AFF',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#fff',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
          onClick={() => {
            const newNoteId = `note_${Date.now()}`;
            setNoteContent(prev => ({
              ...prev,
              [newNoteId]: '📝 New Note\n\nStart writing here...'
            }));
            setSelectedNote(newNoteId);
          }}
        >
          + New Note
        </button>
      </div>
      
      {/* Notes Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'rgba(28,28,32,0.98)', borderRight: '1px solid rgba(80,80,90,0.22)', padding: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>Notes</div>
          {Object.entries(noteContent).map(([noteId, content]) => {
            const title = content.split('\n')[0] || 'Untitled Note';
            const isSelected = selectedNote === noteId;
            return (
              <div 
                key={noteId}
                style={{ 
                  fontSize: '12px', 
                  color: isSelected ? '#007AFF' : '#fff', 
                  padding: '8px 0', 
                  cursor: 'pointer', 
                  fontWeight: isSelected ? '500' : '400',
                  background: isSelected ? 'rgba(0,122,255,0.1)' : 'transparent',
                  borderRadius: '6px',
                  paddingLeft: '8px',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => setSelectedNote(noteId)}
                title={title}
              >
                {title}
              </div>
            );
          })}
        </div>
        
        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div 
            ref={notesScrollContainerRef}
            style={{ 
              padding: '20px', 
              background: 'rgba(28,28,32,0.98)', 
              overflowY: 'auto',
              overflowX: 'hidden',
              height: '400px',
              maxHeight: '400px'
            }}
          >
            <textarea
              value={noteContent[selectedNote as keyof typeof noteContent] || ''}
              onChange={(e) => {
                setNoteContent(prev => ({
                  ...prev,
                  [selectedNote]: e.target.value
                }));
              }}
              style={{ 
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff', 
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
                fontSize: '14px',
                lineHeight: '1.6',
                resize: 'none',
                padding: '0',
                margin: '0',
                caretColor: '#fff'
              }}
              onFocus={() => setNotesContentFocused(true)}
              onBlur={() => setNotesContentFocused(false)}
              placeholder="Start writing your note here..."
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes; 