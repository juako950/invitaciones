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
          Mamá, hoy queremos darte las gracias por todo lo que haces por nosotros. Por estar en los días buenos y también en los malos, por cuidarnos, escucharnos y darnos amor incluso cuando no lo decimos mucho. Eres esa persona que siempre está ahí, sin importar qué pase.
Gracias también por aguantar tantas peleas, malos momentos y nuestras mañas, porque aun así nunca dejas de estar para nosotros y de querernos con el mismo amor de siempre.
Puede que a veces no encontremos las palabras correctas para demostrarte cuánto te queremos, pero de verdad significas muchísimo para nosotros. Gracias por cada consejo, cada abrazo y cada esfuerzo que haces día a día.
Te amamos demasiado y esperamos que hoy tengas un día tan lindo como tú. Feliz Día de la Madre
          </p>

          <p className="message__text">
            Gracias por ser mi guía, mi refugio y mi inspiración. 
            Te amo más de lo que las palabras pueden decir. 🌹
          </p>

          <p className="message__signature">
            Con todo nuestro amor ♥
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
