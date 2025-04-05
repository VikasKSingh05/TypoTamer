import React, { useState, useEffect, useRef } from 'react';
import { generateText } from '../utils/wordGenerator';
import Results from './Results';
import ModeSelector from './ModeSelector';

const TypingTest = ({ onWpmUpdate, mode, setMode }) => {
  const [state, setState] = useState({
    text: '',
    userInput: '',
    startTime: null,
    isActive: false,
    accuracy: 100,
    wpm: 0,
    isComplete: false,
    testStats: null,
    wpmHistory: [],
    correctChars: 0,
    incorrectChars: 0,
    timeLeft: null
  });
  
  const [difficulty, setDifficulty] = useState('medium');
  const inputRef = useRef(null);
  const hasStarted = useRef(false);

  const generateNewText = (keepWordCount = false) => {
    if (hasStarted.current) return;
    const wordCount = mode.category === 'Time' ? 100 : 
                     keepWordCount ? state.text.trim().split(/\s+/).length : 
                     mode.value;
    setState(prev => ({ ...prev, text: generateText(difficulty, wordCount) }));
  };

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyPress = (e) => {
      if (!state.isComplete && e.target.tagName !== 'INPUT') {
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [state.isComplete]);

  useEffect(() => {
    if (state.text) generateNewText(true);
  }, [difficulty]);

  useEffect(() => {
    generateNewText(false);
  }, [mode]);

  useEffect(() => {
    if (state.isActive && mode.category === 'Time' && state.timeLeft !== null) {
      const timer = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(timer);
            completeTest();
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.isActive, mode.category, state.timeLeft]);

  const calculateWPM = (chars, timeInMinutes) => 
    Math.round((chars / 5) / timeInMinutes);

  const completeTest = () => {
    if (!state.startTime) return;
    const timeElapsed = (Date.now() - state.startTime) / 1000;
    const finalWpm = calculateWPM(state.correctChars, timeElapsed / 60);

    setState(prev => ({
      ...prev,
      isActive: false,
      isComplete: true,
      wpm: finalWpm,
      testStats: {
        wpm: finalWpm,
        accuracy: prev.accuracy,
        time: Math.round(timeElapsed),
        characters: prev.userInput.length,
        correctChars: prev.correctChars,
        incorrectChars: prev.incorrectChars,
        wpmHistory: prev.wpmHistory
      }
    }));
  };

  const handleInput = (e) => {
    if (state.isComplete) return;
    const value = e.target.value;
    
    if (!state.startTime && value.length === 1) {
      hasStarted.current = true;
      setState(prev => ({
        ...prev,
        startTime: Date.now(),
        isActive: true,
        timeLeft: mode.category === 'Time' ? mode.value : null
      }));
    }

    const textChars = state.text.substring(0, value.length).split('');
    const inputChars = value.split('');
    const correct = textChars.reduce((acc, char, i) => 
      acc + (char === inputChars[i] ? 1 : 0), 0);
    const incorrect = textChars.length - correct;

    const timeElapsed = state.startTime ? (Date.now() - state.startTime) / 1000 / 60 : 0;
    const currentWpm = calculateWPM(correct, timeElapsed);

    setState(prev => ({
      ...prev,
      userInput: value,
      correctChars: correct,
      incorrectChars: incorrect,
      accuracy: Math.round((correct / value.length) * 100) || 0,
      wpm: currentWpm,
      wpmHistory: [...prev.wpmHistory, currentWpm]
    }));

    onWpmUpdate(currentWpm);

    if (mode.category === 'Words' && 
        value.trim().split(/\s+/).length >= mode.value && 
        value.endsWith(' ')) {
      completeTest();
    }
  };

  const resetTest = () => {
    hasStarted.current = false;
    setState({
      text: generateText(difficulty, mode.value),
      userInput: '',
      startTime: null,
      isActive: false,
      accuracy: 100,
      wpm: 0,
      isComplete: false,
      testStats: null,
      wpmHistory: [],
      correctChars: 0,
      incorrectChars: 0,
      timeLeft: mode.category === 'Time' ? mode.value : null
    });
    inputRef.current?.focus();
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--theme-background)' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <ModeSelector onModeSelect={setMode} currentMode={mode} />
          <div className="flex space-x-4">
            {['easy', 'medium', 'hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  difficulty === diff ? 'bg-accent text-primary' : 
                  'bg-[var(--theme-secondary)] text-[var(--theme-text)]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4 text-[var(--theme-text-secondary)] text-sm">
          <span className="px-3 py-1 rounded-full bg-[var(--theme-secondary)]">
            {state.isActive ? 'Test in progress' : 'Ready'}
          </span>
          {mode.category === 'Time' && state.timeLeft !== null && (
            <span className="px-3 py-1 rounded-full bg-[var(--theme-secondary)]">
              Time: {state.timeLeft}s
            </span>
          )}
          <button 
            onClick={resetTest}
            className="px-3 py-1 rounded-full bg-[var(--theme-secondary)] hover:bg-accent hover:text-primary transition-colors"
          >
            Reset Test (Tab)
          </button>
        </div>

        <div className="relative">
          <div className="mb-8 text-[var(--theme-text)] text-xl md:text-2xl leading-relaxed tracking-wide font-mono bg-[var(--theme-secondary)] bg-opacity-30 p-8 rounded-xl">
            {state.text.split('').map((char, i) => (
              <span
                key={i}
                className={`transition-colors duration-150 ${
                  !state.userInput[i] ? '' :
                  state.userInput[i] === char ? 'text-success' : 'text-error'
                } ${i === state.userInput.length ? 'border-l-2 border-accent animate-pulse-subtle' : ''}`}
              >
                {char}
              </span>
            ))}
          </div>
          <input
            ref={inputRef}
            value={state.userInput}
            onChange={handleInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-default"
            autoFocus
            onBlur={e => {
              if (!e.relatedTarget?.tagName === 'INPUT') {
                e.target.focus();
              }
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'WPM', value: state.wpm },
            { label: 'Accuracy', value: `${state.accuracy}%` },
            { label: 'Time', value: `${state.startTime ? 
              Math.round((Date.now() - state.startTime) / 1000) : 0}s` }
          ].map(({ label, value }) => (
            <div key={label} className="bg-[var(--theme-secondary)] p-6 rounded-xl">
              <div className="text-accent text-3xl md:text-4xl font-bold mb-2">{value}</div>
              <div className="text-[var(--theme-text-secondary)] text-sm uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {state.isComplete && state.testStats && (
        <Results 
          stats={state.testStats}
          onRestart={resetTest}
          mode={mode}
        />
      )}
    </div>
  );
};

export default TypingTest;