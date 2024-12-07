import React, { useEffect, useRef } from 'react';

interface ScreenReaderProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

const ScreenReader: React.FC<ScreenReaderProps> = ({ 
  message, 
  priority = 'polite' 
}) => {
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (announcerRef.current) {
      // Clear the content first
      announcerRef.current.textContent = '';
      
      // Set the new message after a brief delay
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      }, 100);
    }
  }, [message]);

  return (
    <div
      ref={announcerRef}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      }}
    />
  );
};

export default ScreenReader;
