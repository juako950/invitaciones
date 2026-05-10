import { useMemo } from 'react';
import './FloatingElements.css';

const EMOJIS = ['🌸', '💖', '🌷', '🌹', '💐', '🩷', '✿', '❀'];
const SWAY_CLASSES = ['', 'floating-element--sway-left', 'floating-element--sway-right'];

function FloatingElements({ count = 18 }) {
  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const sway = SWAY_CLASSES[Math.floor(Math.random() * SWAY_CLASSES.length)];
      const left = Math.random() * 100;
      const duration = 10 + Math.random() * 15; // 10-25s
      const delay = Math.random() * 20; // 0-20s stagger
      const size = 0.8 + Math.random() * 1.2; // 0.8-2rem

      return {
        id: i,
        emoji,
        sway,
        style: {
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          fontSize: `${size}rem`,
        },
      };
    });
  }, [count]);

  return (
    <div className="floating-elements" aria-hidden="true">
      {elements.map((el) => (
        <span
          key={el.id}
          className={`floating-element ${el.sway}`}
          style={el.style}
        >
          {el.emoji}
        </span>
      ))}
    </div>
  );
}

export default FloatingElements;
