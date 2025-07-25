'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }) + '  ' + now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx>{`
        .menu-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 28px;
          background: linear-gradient(180deg, rgba(255, 254, 248, 0.85) 0%, rgba(255, 255, 255, 0.85) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1001;
          display: flex;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #1d1d1d;
          user-select: none;
          -webkit-user-select: none;
          padding: 0;
        }

        .menu-left {
          display: flex;
          align-items: center;
          height: 100%;
          padding-left: 14px;
        }

        .apple-logo {
          width: 14px;
          height: 14px;
          margin-right: 16px;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.1s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .apple-logo:hover {
          opacity: 1;
        }

        .menu-items {
          display: flex;
          align-items: center;
          height: 100%;
          gap: 0;
        }

        .menu-item {
          height: 100%;
          padding: 0 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.1s ease;
          font-weight: 400;
          letter-spacing: -0.005em;
        }

        .menu-item:hover {
          background-color: rgba(0, 0, 0, 0.06);
        }

        .menu-item:active {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .menu-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          height: 100%;
          padding-right: 14px;
          gap: 8px;
        }

        .status-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 4px;
          transition: background-color 0.1s ease;
          font-size: 13px;
          font-weight: 400;
        }

        .status-item:hover {
          background-color: rgba(0, 0, 0, 0.06);
        }

        .status-icon {
          width: 16px;
          height: 16px;
          opacity: 0.85;
        }

        .battery-text {
          font-size: 13px;
          font-weight: 400;
          margin-left: 2px;
        }

        .time-text {
          font-size: 13px;
          font-weight: 400;
          white-space: nowrap;
        }

        .control-center-icon {
          width: 14px;
          height: 14px;
        }
      `}</style>

      <div className="menu-bar">
        <div className="menu-left">
          
        </div>

        <div className="menu-right">

          
          <div className="status-item" title="Battery">
            <span className="battery-text">97%</span>
            <svg className="status-icon" viewBox="0 0 24 12" fill="currentColor" style={{ marginLeft: '2px' }}>
              <rect x="1" y="2" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="21.5" y="4.5" width="1.5" height="3" rx="0.5" fill="currentColor"/>
              <rect x="2" y="3" width="19" height="6" rx="1" fill="currentColor"/>
            </svg>
          </div>

          <div className="status-item" title="Date & Time">
            <span className="time-text">{currentTime}</span>
          </div>
        </div>
      </div>
    </>
  );
}