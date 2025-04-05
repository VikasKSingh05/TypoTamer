import React, { useState } from 'react';
import TypingTest from './components/TypingTest';
import ThemeSwitcher from './components/ThemeSwitcher';
import ResultsGraph from './components/ResultsGraph';

function App() {
  const [currentTheme, setCurrentTheme] = useState({
    name: 'Default',
    style: { 
      backgroundColor: '#232428', 
      color: '#E2E2E2',
      '--theme-secondary': '#2C2E31',
      '--theme-text': '#E2E2E2',
      '--theme-text-secondary': '#646669',
      '--theme-background': '#232428'
    }
  });
  const [wpmHistory, setWpmHistory] = useState([]);
  const [currentMode, setCurrentMode] = useState({ category: 'Words', value: 25 });

  const handleModeChange = (newMode) => {
    // Only allow mode changes if no test is in progress
    const typingTest = document.activeElement?.tagName === 'INPUT';
    if (!typingTest) {
      setCurrentMode(newMode);
    }
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 relative`}
      style={currentTheme.style}
    >
      <div className="container mx-auto px-4 pb-16">
        <ThemeSwitcher setCurrentTheme={setCurrentTheme} />
        <TypingTest 
          onWpmUpdate={(wpm) => setWpmHistory([...wpmHistory, wpm])}
          mode={currentMode}
          setMode={handleModeChange}
        />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 text-center text-[var(--theme-text-secondary)]">
        Made with <span className="text-red-500">❤️</span> by Vikas
      </footer>
    </div>
  );
}

export default App;