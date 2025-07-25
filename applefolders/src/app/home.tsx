import React from 'react';

const HomePage = () => {
  const portfolioLetters = ['p', 'o', 'r', 't', 'f', 'o', 'l', 'i', 'o', '.'];
  
  const todoItems = [
    'dream job',
    'school',
    'playlist', 
    'training pace',
    'travel'
  ];

  const leftIcons = [
    { name: 'Resume.pdf', type: 'file', icon: '📄' },
    { name: 'About Me', type: 'folder', icon: '📁' }
  ];

  const rightIcons = [
    { name: 'Project 01 (AboutMe)', type: 'folder', icon: '📁' },
    { name: 'Project 02 (Simpleproj)', type: 'folder', icon: '📁' },
    { name: 'Project 03 (Lastpress)', type: 'folder', icon: '📁' },
    { name: "Don't Look", type: 'file', icon: '📄' }
  ];

  const dockIcons = [
    { name: 'Finder', color: 'bg-blue-500', icon: '🔍' },
    { name: 'Safari', color: 'bg-blue-400', icon: '🧭' },
    { name: 'Calendar', color: 'bg-red-500', icon: '📅' },
    { name: 'Music', color: 'bg-pink-500', icon: '🎵' },
    { name: 'Messages', color: 'bg-green-500', icon: '💬' },
    { name: 'Spotify', color: 'bg-green-400', icon: '🎧' }
  ];

  return (
    <>
      <style jsx global>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .portfolio-letter {
          transition: font-weight 0.3s ease-in-out;
          font-weight: 300;
        }
        
        .portfolio-letter:hover {
          font-weight: 700;
        }
        
        .sticky-note {
          background: linear-gradient(135deg, #fff3a0 0%, #fef08a 100%);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: rotate(-1deg);
          transition: transform 0.2s ease;
        }
        
        .sticky-note:hover {
          transform: rotate(0deg);
        }
        
        .desktop-icon {
          transition: transform 0.2s ease;
        }
        
        .desktop-icon:hover {
          transform: scale(1.05);
        }
        
        .dock-icon {
          transition: transform 0.2s ease;
        }
        
        .dock-icon:hover {
          transform: translateY(-8px);
        }
      `}</style>
      
      <div className="min-h-screen grid-bg bg-gray-50 relative overflow-hidden">
        {/* Sticky Note - Top Left */}
        <div className="absolute top-8 left-8 z-10">
          <div className="sticky-note w-48 h-56 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-800 mb-3">To Do</div>
            <ul className="space-y-2">
              {todoItems.map((item, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Left Side Icons */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-6">
          {leftIcons.map((item, index) => (
            <div key={index} className="desktop-icon cursor-pointer">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl">{item.icon}</div>
                <div className="text-xs text-center text-gray-700 bg-white bg-opacity-80 px-2 py-1 rounded">
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-lg text-gray-600 mb-2 font-light">
              welcome to my
            </div>
            <div className="text-6xl md:text-8xl text-gray-800 font-light">
              {portfolioLetters.map((letter, index) => (
                <span key={index} className="portfolio-letter cursor-default">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-6">
          {rightIcons.map((item, index) => (
            <div key={index} className="desktop-icon cursor-pointer">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl">{item.icon}</div>
                <div className="text-xs text-center text-gray-700 bg-white bg-opacity-80 px-2 py-1 rounded max-w-24">
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dock - Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-3 border border-white border-opacity-30">
            <div className="flex items-center space-x-2">
              {dockIcons.map((item, index) => (
                <div key={index} className="dock-icon cursor-pointer">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white text-lg shadow-lg`}>
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;