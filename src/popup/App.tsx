import { useState, useEffect } from 'react';
import ChatPanel from './components/ChatPanel';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+K to toggle panel
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        setIsVisible((prev) => !prev);
        if (!isVisible) {
          setIsMinimized(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <div className="w-full h-full bg-discord-darker flex items-center justify-center">
        <div className="text-center">
          <p className="text-discord-muted text-sm mb-2">Panel closed</p>
          <p className="text-discord-muted text-xs">Press Ctrl+Shift+K to reopen</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-discord-dark">
      <ChatPanel
        isMinimized={isMinimized}
        onMinimize={handleMinimize}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
