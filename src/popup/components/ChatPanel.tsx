import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
}

export default function ChatPanel({ isMinimized, onMinimize, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [tokenCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const models: string[] = []; // Empty options for now

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = '20px';
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div className="w-full h-12 bg-discord-darker flex items-center justify-between px-4 rounded-lg">
        <span className="text-discord-text font-medium">Key3 Chat</span>
          <button
            onClick={onMinimize}
            className="text-discord-muted hover:text-discord-text transition-colors"
            aria-label="Expand panel"
            title="Expand"
          >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-discord-dark rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-discord-darker border-b border-discord-light">
        <div className="flex items-center gap-3">
          {/* Left Spacer - adds space before model selector. Change w-2 to w-4, w-6, etc. for more space */}
          <div className="w-0" />
          
          {/* Model Selector */}
          <div className="relative">
            <button
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="flex items-center justify-center gap-2 px-3 py-1.5 bg-discord-light hover:bg-discord-hover rounded-md text-xs text-discord-text transition-colors"
            >
              <span>{selectedModel || 'Select Model'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isModelDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-discord-darker border border-discord-light rounded-md shadow-lg z-10">
                {models.length === 0 ? (
                  <div className="px-3 py-2 text-discord-muted text-sm">No models available</div>
                ) : (
                  models.map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-discord-text hover:bg-discord-hover transition-colors"
                    >
                      {model}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Token Badge */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-discord-light rounded-md">
            <svg className="w-4 h-4 text-discord-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-discord-muted">{tokenCount} tokens</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <button
            className="p-1.5 text-discord-muted hover:text-discord-text hover:bg-discord-hover rounded-md transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Minimize Button */}
          <button
            onClick={onMinimize}
            className="p-1.5 text-discord-muted hover:text-discord-text hover:bg-discord-hover rounded-md transition-colors"
            title="Minimize"
            aria-label="Minimize"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 text-discord-muted hover:text-red-400 hover:bg-discord-hover rounded-md transition-colors"
            title="Close"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-discord-accent flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-discord-text font-semibold mb-2">Start a conversation</h3>
            <p className="text-discord-muted text-sm">Send a message to get started</p>
            <p className="text-discord-muted text-xs mt-2">Press Ctrl+Shift+K to toggle</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-discord-accent text-white'
                    : 'bg-discord-lighter text-discord-text'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="flex items-end gap-3 bg-discord-input rounded-lg px-4 py-3 shadow-lg shadow-black/30">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // Auto-resize textarea
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
            onKeyDown={handleKeyDown}
            placeholder=" What can I do for ya?"
            rows={1}
            className="flex-1 bg-transparent text-discord-text placeholder-discord-muted text-sm resize-none outline-none leading-5"
            style={{ minHeight: '20px', maxHeight: '120px', overflowY: 'auto' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="Send message"
            title="Send"
            className={`p-2 rounded-lg transition-colors ${
              inputValue.trim()
                ? 'bg-discord-accent hover:bg-discord-accentHover text-white'
                : 'bg-discord-hover text-discord-muted cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
