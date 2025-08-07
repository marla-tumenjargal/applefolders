'use client';

import React, { useEffect, useState } from 'react';
import Dock from './dock';
import Header from './header';
import Game2048 from './game2048'; // Import the separate Game2048 component

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windowPosition, setWindowPosition] = useState({ x: 80, y: 80 });
  const [show2048, setShow2048] = useState(false);
  const [game2048Position, setGame2048Position] = useState({ x: 300, y: 150 });
  const [isDragging2048, setIsDragging2048] = useState(false);
  const [dragOffset2048, setDragOffset2048] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const portfolioLetters = ['c','s','k','_', 'w','e','b','_','d','e','v'];

  const rightIcons = [
    { name: '2048 Game', type: 'game', icon: '/applefolder.png', action: () => setShow2048(true) },
  ];

  const dockIcons = [];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof Element && e.target.closest('.browser-top')) {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseDown2048 = (e: React.MouseEvent) => {
    if (e.target instanceof Element && e.target.closest('.browser-top-2048')) {
      setIsDragging2048(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset2048({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setWindowPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
    if (isDragging2048) {
      setGame2048Position({
        x: e.clientX - dragOffset2048.x,
        y: e.clientY - dragOffset2048.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDragging2048(false);
  };

  useEffect(() => {
    if (isDragging || isDragging2048) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isDragging2048, dragOffset, dragOffset2048]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        
        .grid-bg {
          background-color: #fefcf6;
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .welcome-text {
          font-family: 'Public Sans', sans-serif;
          letter-spacing: -0.05em;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s;
        }
        
        .welcome-text.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        .portfolio-container {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease-out 0.5s, transform 1s ease-out 0.5s;
        }
        
        .portfolio-container.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        .portfolio-letter {
          font-family: 'Libre Baskerville', serif;
          font-style: italic;
          transition: font-weight 0.3s ease-in-out;
          font-weight: 400;
          display: inline-block;
        }
        
        .sticky-note {
          background: linear-gradient(135deg, #fff9c4 0%, #fef3c7 50%, #fde68a 100%);
          box-shadow: 
            0 4px 8px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: rotate(-2deg);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          padding: 16px 20px;
          font-family: 'Caveat', cursive;
          font-size: 16px;
          font-weight: 500;
          color: #1f2937;
          border-radius: 2px;
          border-left: 3px solid rgba(251, 191, 36, 0.3);
          min-width: 180px;
          max-width: 220px;
        }
        
        .sticky-note::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 15px;
          background: linear-gradient(135deg, rgba(254, 240, 138, 0.8) 0%, rgba(251, 191, 36, 0.6) 100%);
          border-radius: 0 0 50% 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .sticky-note:hover {
          transform: rotate(0deg) translateY(-2px);
          box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.15),
            0 16px 24px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        
        .sticky-note-text {
          line-height: 1.4;
          margin: 0;
        }
        
        .desktop-icon {
          transition: transform 0.2s ease;
        }
        
        .desktop-icon:hover {
          transform: scale(1.05);
        }
        
        .dock-icon {
          position: relative;
          transition: transform 0.2s ease;
          border-radius: 16px;
          padding: 8px;
        }
        
        .dock-icon:hover {
          transform: translateY(-8px);
        }
        
        .dock-icon:hover::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%);
          border-radius: 20px;
          z-index: -1;
          animation: glow 0.3s ease-in-out;
        }
        
        .fullscreen-btn {
          position: fixed;
          top: 48px;
          right: 20px;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .fullscreen-btn:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        
        .fullscreen-btn:active {
          transform: scale(0.95);
        }
        
        .top-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 28px;
          background: rgba(246, 246, 246, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          font-size: 13px;
          color: #333;
        }
        
        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .top-bar-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 500;
        }
        
        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .menu-item {
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        
        .menu-item:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .status-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.15s ease;
        }
        
        .status-icon:hover {
          opacity: 1;
        }
        
        .apple-logo {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        
        .website-preview {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .website-preview:hover {
          transform: translateY(-2px);
        }
        
        .browser-frame {
          width: 840px;
          height: 370px;
          background: white;
          border-radius: 8px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 4px 16px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: absolute;
          user-select: none;
        }
        
        .browser-frame:hover {
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 6px 20px rgba(0, 0, 0, 0.1);
        }
        
        .browser-frame.dragging {
          cursor: grabbing;
          z-index: 1000;
        }
        
        .browser-top {
          background: #f6f6f6;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          cursor: grab;
        }
        
        .browser-top:active {
          cursor: grabbing;
        }
        
        .browser-top-2048 {
          background: #f6f6f6;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          cursor: grab;
        }
        
        .browser-top-2048:active {
          cursor: grabbing;
        }
        
        .browser-dots {
          display: flex;
          gap: 6px;
          margin-right: 12px;
        }
        
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .dot.red { background: #ff5f57; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #28ca42; }
        
        .url-bar {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 11px;
          color: #666;
          flex: 1;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }
        
        .iframe-container {
          position: relative;
          height: 320px;
          overflow: hidden;
        }
        
        .website-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: white;
          transform: scale(1);
          transform-origin: top left;
        }
        
        .iframe-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          z-index: 1;
        }
        
        .game-2048-frame {
          width: 420px;
          height: 500px;
          background: white;
          border-radius: 8px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 4px 16px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: absolute;
          user-select: none;
        }
        
        .game-2048-frame:hover {
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 6px 20px rgba(0, 0, 0, 0.1);
        }
        
        .game-2048-frame.dragging {
          cursor: grabbing;
          z-index: 1000;
        }
        
        .game-container {
          height: 468px;
          overflow: hidden;
        }
        
        @keyframes glow {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      
      <div className="min-h-screen grid-bg relative overflow-hidden">
        
        {/* Header Component */}
        <Header />
        
        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="fullscreen-btn"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
              <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
              <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
              <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
            </svg>
          )}
        </button>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ paddingTop: '24px' }}>
          <div className="text-center">
            <div className={`welcome-text text-lg text-gray-600 mb-2 font-light ${isLoaded ? 'loaded' : ''}`}>
              marla's final project:
            </div>
            <div className={`portfolio-container text-4xl md:text-6xl text-gray-800 ${isLoaded ? 'loaded' : ''}`}>

            {portfolioLetters.map((letter, index) => {
                const getLetterWeight = () => {
                  if (hoveredIndex === null) return 400;
                  if (hoveredIndex === index) return 700;
                  
                  const distance = Math.abs(hoveredIndex - index);
                  if (distance === 1) return 600;
                  if (distance === 2) return 500;
                  return 400;
                };

                return (
                  <span 
                    key={index} 
                    className="portfolio-letter cursor-default"
                    style={{ fontWeight: getLetterWeight() }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Website Preview */}
        <div 
          className="absolute"
          style={{ 
            left: `${windowPosition.x}px`, 
            top: `${windowPosition.y}px`,
            transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="website-preview">
            <div 
              className={`browser-frame ${isDragging ? 'dragging' : ''}`}
            >
              <div 
                className="browser-top"
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <div className="browser-dots">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className="url-bar">marlatumenjargal.vercel.app</div>
              </div>
              <a 
                href="https://marlatumenjargal.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
                onClick={(e) => isDragging && e.preventDefault()}
                style={{ cursor: 'pointer' }}
              >
                <div className="iframe-container">
                  <iframe
                    src="https://marlatumenjargal.vercel.app/"
                    className="website-iframe"
                    title="Marla's Bio"
                    loading="lazy"
                  />
                  <div className="iframe-overlay"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
        

        {/* 2048 Game Window */}
        {show2048 && (
          <div 
            className="absolute"
            style={{ 
              left: `${game2048Position.x}px`, 
              top: `${game2048Position.y}px`,
              transition: isDragging2048 ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div 
              className={`game-2048-frame ${isDragging2048 ? 'dragging' : ''}`}
            >
              <div 
                className="browser-top-2048"
                onMouseDown={handleMouseDown2048}
                style={{ cursor: isDragging2048 ? 'grabbing' : 'grab' }}
              >
                <div className="browser-dots">
                  <div className="dot red" onClick={() => setShow2048(false)}></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className="url-bar">localhost:3000/2048</div>
              </div>
              <div className="game-container">
                <Game2048 />
              </div>
            </div>
          </div>
        )}

        {/* Right Side Icons */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-6" style={{ marginTop: '12px' }}>
          {rightIcons.map((item, index) => (
            <div 
              key={index} 
              className="desktop-icon cursor-pointer"
              onClick={item.action || (() => {})}
            >
              <div className="flex flex-col items-center space-y-2">
                <img src={item.icon} alt={item.name} className="w-12 h-12" />
                <div className="text-xs text-center text-gray-700 bg-white bg-opacity-80 px-2 py-1 rounded max-w-24">
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dock Component */}
        <Dock />
      </div>
    </>
  );
}