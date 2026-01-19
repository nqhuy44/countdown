import { useState, useEffect } from 'react';
import CountdownTimer from './components/CountdownTimer';
import ConfigModal from './components/ConfigModal';
import { launchFireworks } from './utils/fireworks';

function App() {
  const [targetDate, setTargetDate] = useState(() => {
    const saved = localStorage.getItem('countdown-target');
    // Default to 24 hours from now if no saved date or if saved date is invalid
    if (saved) {
      const date = new Date(saved);
      if (!isNaN(date.getTime())) return date;
    }
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleDateChange = (newDate) => {
    setTargetDate(newDate);
    localStorage.setItem('countdown-target', newDate.toISOString());
    setComplete(false); // Reset completion status
    setIsConfigOpen(false);
  };

  const onComplete = () => {
    if (!complete) {
      setComplete(true);
      launchFireworks();
    }
  };

  return (
    <>
      <div
        className="settings-btn glass"
        onClick={() => setIsConfigOpen(true)}
        title="Settings"
      >
        <span>⚙️</span>
      </div>

      <main className="container">
        <h1 className="title">Countdown to <span className="highlight-text">Event</span></h1>

        <CountdownTimer
          targetDate={targetDate}
          onComplete={onComplete}
        />

        {complete && (
          <div className="celebration-message glass">
            <h2>Time's Up!</h2>
          </div>
        )}
      </main>

      {isConfigOpen && (
        <ConfigModal
          currentDate={targetDate}
          onSave={handleDateChange}
          onClose={() => setIsConfigOpen(false)}
        />
      )}
    </>
  );
}

export default App;
