# TypoTamer: Modern Typing Test

A minimalist typing test application built with React and Tailwind CSS, inspired by MonkeyType. Test and improve your typing speed and accuracy with different modes and difficulty levels.


## Features

- 🎯 Multiple Test Modes
  - Word-based (10, 25, 50, 100 words)
  - Time-based (15, 30, 60 seconds)

- 🎚️ Difficulty Levels
  - Easy: Common words
  - Medium: Mix of common and advanced words
  - Hard: Advanced and complex words

- 📊 Real-time Statistics
  - Words Per Minute (WPM)
  - Accuracy Percentage
  - Time Elapsed
  - Character Count

- 🎨 Theme Options
  - Default (Dark)
  - Light
  - Dark

- ⚡ Additional Features
  - Real-time error checking
  - Live WPM calculation
  - Detailed results modal
  - Responsive design
  - Keyboard shortcuts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn


## Usage

1. Select your preferred mode (Words/Time)
2. Choose the difficulty level (Easy/Medium/Hard)
3. Start typing to begin the test
4. Press Tab to restart at any time
5. View your results after completion

## Keyboard Shortcuts

- `Tab`: Restart test
- Any key: Focus typing input
- `Click anywhere`: Focus typing input

## Technologies Used

- React
- Tailwind CSS
- Chart.js (for statistics)
- Hero Icons

## Project Structure 

src/
├── components/
│ ├── TypingTest.jsx
│ ├── ModeSelector.jsx
│ ├── ThemeSwitcher.jsx
│ └── Results.jsx
├── utils/
│ └── wordGenerator.jsx
├── App.jsx
└── index.jsx

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [MonkeyType](https://monkeytype.com/)
- Word lists curated from various typing test resources
- Community feedback and contributions


Made with ❤️ by Vikas
