import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KeyboardShortcuts: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle Alt key combinations
      if (event.altKey) {
        switch (event.key) {
          case '1':
            navigate('/');
            break;
          case '2':
            navigate('/matches');
            break;
          case '3':
            navigate('/comments');
            break;
          case '4':
            navigate('/profile');
            break;
          case '5':
            navigate('/settings');
            break;
          case '/':
            // Focus search input
            const searchInput = document.querySelector('[aria-label="بحث"]') as HTMLElement;
            searchInput?.focus();
            break;
          case 'n':
            // New comment shortcut
            navigate('/comments/new');
            break;
          default:
            break;
        }
      }

      // Handle Escape key
      if (event.key === 'Escape') {
        // Close any open dialogs or modals
        const closeButton = document.querySelector('[aria-label="إغلاق"]') as HTMLElement;
        closeButton?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default KeyboardShortcuts;
