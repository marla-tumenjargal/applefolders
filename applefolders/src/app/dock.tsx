import React, { useState } from 'react';

interface DockIconProps {
  name: string;
  icon: string;
  isActive?: boolean;
  index: number;
  hoveredIndex: number | null;
}

const DockIcon: React.FC<DockIconProps> = ({ 
  name, 
  icon, 
  isActive = false, 
  index, 
  hoveredIndex 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate transform based on distance from hovered icon
  const getTransform = () => {
    if (hoveredIndex === null) return 'scale(1) translateY(0px)';
    
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) {
      // Hovered icon
      return 'scale(1.4) translateY(-20px)';
    } else if (distance === 1) {
      // Adjacent icons
      return 'scale(1.1) translateY(-5px)';
    } else if (distance === 2) {
      // Second adjacent icons
      return 'scale(1.05) translateY(-2px)';
    }
    
    return 'scale(1) translateY(0px)';
  };

  return (
    <div className="group relative flex flex-col items-center">
      {/* Icon Container */}
      <div 
        className="dock-icon-wrapper transform transition-all duration-300 ease-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: getTransform(),
          transformOrigin: 'bottom center',
          willChange: 'transform'
        }}
      >
        <img 
          src={icon} 
          alt={name}
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl shadow-lg object-cover"
          draggable={false}
        />
      </div>
      
      {/* Active Indicator Dot */}
      <div 
        className={`w-1 h-1 bg-gray-600 rounded-full mt-1 transition-opacity duration-200 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-gray-800 bg-opacity-90 text-white text-sm rounded-lg transition-all duration-300 ease-out pointer-events-none whitespace-nowrap z-10 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 border-t-opacity-90" />
      </div>
    </div>
  );
};

const Dock: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dockIcons: Omit<DockIconProps, 'index' | 'hoveredIndex'>[] = [
    { name: 'Finder', icon: '/finder.png', isActive: true },
    { name: 'Apple Folder', icon: '/applefolder.png', isActive: false },
    { name: 'Apple Notes', icon: '/applenotes.jpg', isActive: true },
    { name: 'Cursor', icon: '/cursor.webp', isActive: false },
    { name: 'Messages', icon: '/messages.png', isActive: true },
    { name: 'Notion', icon: '/notion.png', isActive: false },
    { name: 'Podcast', icon: '/podcast.jpg', isActive: true },
    { name: 'Photo Booth', icon: '/photobooth.png', isActive: false }
  ];

  return (
    <>
      <style jsx>{`
        .dock-container {
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          background: rgba(108, 108, 108, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className="dock-container rounded-3xl px-4 py-4 md:px-6 md:py-5"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex items-end space-x-3 md:space-x-4">
            {dockIcons.map((iconProps, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <DockIcon
                  name={iconProps.name}
                  icon={iconProps.icon}
                  isActive={iconProps.isActive}
                  index={index}
                  hoveredIndex={hoveredIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dock;