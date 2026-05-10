import './Hero.css';

function Hero() {
  const scrollToGallery = () => {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Decorative circles */}
      <div className="hero__deco-circle hero__deco-circle--1" />
      <div className="hero__deco-circle hero__deco-circle--2" />
      <div className="hero__deco-circle hero__deco-circle--3" />

      <div className="hero__content">
        <span className="hero__emoji">🌷</span>

        <h1 className="hero__title">
          Feliz Día
          <span>de las Madres</span>
        </h1>

        <div className="hero__divider" />

        <p className="hero__subtitle">
          Gracias por cada abrazo, cada palabra de aliento y cada sacrificio silencioso.
          Hoy celebramos a la persona más increíble del mundo: tú, mamá. 💐
        </p>
      </div>

      <div className="hero__scroll-hint" onClick={scrollToGallery}>
        <span>Descubre más</span>
        <div className="hero__scroll-arrow" />
      </div>
    </section>
  );
}

export default Hero;
