import { useState, useMemo } from 'react';
import CountdownTimer from './components/CountdownTimer';
import { launchFireworks } from './utils/fireworks';
import { CONFIG } from './config';
import './styles/main.css';

function App() {
  const [targetDate] = useState(() => new Date(CONFIG.targetDate));
  const [complete, setComplete] = useState(false);

  const onComplete = () => {
    if (!complete) {
      setComplete(true);
      launchFireworks();
    }
  };

  // Generate 500 stars for the background
  const stars = useMemo(() => {
    const starCount = 500;
    const generated = [];
    for (let i = 0; i < starCount; i++) {
      generated.push({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        size: Math.random() * 2 + 1 + 'px',
      });
    }
    return generated;
  }, []);

  return (
    <>
      <div className="scene-background">
        {/* Full Screen Nebula Layers */}
        <div className="nebula-container">
          <div className="nebula-1"></div>
          <div className="nebula-2"></div>
          <div className="nebula-3"></div>
        </div>

        {/* Star Field Layers */}
        <div className="star-field star-layer-1">
          {stars.slice(0, 125).map((s, i) => (
            <div key={i} style={{ position: 'absolute', left: s.left, top: s.top, width: s.size, height: s.size, background: '#fff', borderRadius: '50%' }} />
          ))}
        </div>
        <div className="star-field star-layer-2">
          {stars.slice(125, 250).map((s, i) => (
            <div key={i + 125} style={{ position: 'absolute', left: s.left, top: s.top, width: s.size, height: s.size, background: '#fff', borderRadius: '50%' }} />
          ))}
        </div>
        <div className="star-field star-layer-3">
          {stars.slice(250, 375).map((s, i) => (
            <div key={i + 250} style={{ position: 'absolute', left: s.left, top: s.top, width: s.size, height: s.size, background: '#fff', borderRadius: '50%' }} />
          ))}
        </div>
        <div className="star-field star-layer-4">
          {stars.slice(375).map((s, i) => (
            <div key={i + 375} style={{ position: 'absolute', left: s.left, top: s.top, width: s.size, height: s.size, background: '#fff', borderRadius: '50%' }} />
          ))}
        </div>

        {/* Galaxy */}
        <div className="galaxy-container">
          <div className="galaxy-arms"></div>
          <div className="galaxy-center"></div>
        </div>

        {/* Distant Planets (Deep Space) */}
        <div className="planet-distant-1"></div>
        <div className="planet-distant-2"></div>

        {/* Main Planets */}
        <div className="planet-gas"></div>
        <div className="planet-ice"></div>
        <div className="planet-ringed"></div>

        {/* Dynamic Objects */}
        <div className="ufo-container">
          <div className="ufo-body">
            <div className="ufo-dome"></div>
            <div className="ufo-lights">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <div className="astronaut">👨‍🚀</div>

        <div className="satellite-container">
          <div className="satellite">🛰️</div>
        </div>

        {/* Comet Shower */}
        <div className="comet comet-1"></div>
        <div className="comet comet-2"></div>
        <div className="comet comet-3"></div>
        <div className="comet comet-4"></div>

        <div className="rocket-container">
          <div className="rocket">🚀</div>
        </div>
      </div>

      <main className="container">
        <h1 className="title">{CONFIG.title} <span className="highlight-text">{CONFIG.highlight}</span></h1>

        <CountdownTimer
          targetDate={targetDate}
          onComplete={onComplete}
        />

        {complete && (
          <div className="celebration-wrapper">
            <div className="celebration-message">
              <h2>{CONFIG.completionTitle}</h2>
              <p>{CONFIG.completionMessage}</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
