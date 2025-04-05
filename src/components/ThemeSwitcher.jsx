import React, { useState } from 'react';

const themes = [
  { 
    name: 'Default',
    style: { 
      backgroundColor: '#232428', 
      color: '#E2E2E2',
      '--theme-secondary': '#2C2E31',
      '--theme-text': '#E2E2E2',
      '--theme-text-secondary': '#646669',
      '--theme-background': '#232428'
    }
  },
  { 
    name: 'Light',
    style: { 
      backgroundColor: '#ffffff', 
      color: '#1a1a1a',
      '--theme-secondary': '#f3f4f6',
      '--theme-text': '#1a1a1a',
      '--theme-text-secondary': '#4b5563',
      '--theme-background': '#ffffff'
    }
  },
  { 
    name: 'Dark',
    style: { 
      backgroundColor: '#111827', 
      color: '#f3f4f6',
      '--theme-secondary': '#1f2937',
      '--theme-text': '#f3f4f6',
      '--theme-text-secondary': '#9ca3af',
      '--theme-background': '#111827'
    }
  }
];
const ThemeSwitcher = ({ setCurrentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-secondary px-4 py-2 rounded-lg text-text-primary hover:bg-accent hover:text-primary transition-colors"
        >
          Theme
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-secondary shadow-lg py-2 animate-fade-in">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setCurrentTheme(theme);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-accent hover:text-primary transition-colors"
                style={theme.style}
              >
                {theme.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;