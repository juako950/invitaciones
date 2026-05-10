import { useEffect, useRef, useState } from 'react';
import './Message.css';

function Message() {
  const frameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (frameRef.current) {
      observer.observe(frameRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="message" id="message">
      <div className="message__deco message__deco--1" />
      <div className="message__deco message__deco--2" />

      <div className="message__inner">
        <div
          ref={frameRef}
          className={`message__frame ${isVisible ? 'message__frame--visible' : ''}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <span className="message__icon">💝</span>

          <h2 className="message__title">
            Para la mejor mamá del mundo
          </h2>

          <p className="message__text">
            Cada día agradezco a la vida por tenerte. Tu amor incondicional, 
            tu paciencia infinita y tu sonrisa que ilumina todo son los regalos 
            más grandes que he recibido. No hay palabras suficientes para 
            expresar todo lo que significas para mí.
          </p>

          <p className="message__text">
            Gracias por ser mi guía, mi refugio y mi inspiración. 
            Te amo más de lo que las palabras pueden decir. 🌹
          </p>

          <p className="message__signature">
            Con todo mi amor ♥
          </p>

          <div className="message__hearts">
            <span className="message__heart">🌸</span>
            <span className="message__heart">💖</span>
            <span className="message__heart">🌸</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Message;
