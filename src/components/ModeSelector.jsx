import React, { useState } from 'react';

const modes = [
  { category: 'Words', options: [10, 25, 50, 100] },
  { category: 'Time', options: [15, 30, 60] }
];

const ModeSelector = ({ onModeSelect, currentMode = { category: 'Words', value: 25 } }) => {
  const [activeCategory, setActiveCategory] = useState(currentMode.category);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // When changing category, select the first option of that category
    onModeSelect({
      category,
      value: modes.find(m => m.category === category).options[0]
    });
  };

  const handleOptionChange = (option) => {
    onModeSelect({
      category: activeCategory,
      value: option
    });
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="flex space-x-2">
        {modes.map(({ category }) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`mode-button ${
              activeCategory === category
                ? 'bg-accent text-primary'
                : 'bg-[var(--theme-secondary)] text-[var(--theme-text)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {modes
          .find(m => m.category === activeCategory)
          .options.map(option => (
            <button
              key={option}
              onClick={() => handleOptionChange(option)}
              className={`mode-button ${
                currentMode.value === option && currentMode.category === activeCategory
                  ? 'bg-accent text-primary'
                  : 'bg-[var(--theme-secondary)] text-[var(--theme-text)]'
              }`}
            >
              {option} {activeCategory === 'Time' ? 's' : 'w'}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ModeSelector;