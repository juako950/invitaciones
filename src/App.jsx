import { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero/Hero';

import PhotoGallery from './components/PhotoGallery/PhotoGallery';
import Message from './components/Message/Message';
import Footer from './components/Footer/Footer';
import FloatingElements from './components/FloatingElements/FloatingElements';
import './App.css';

const SECTIONS = ['hero', 'gallery', 'message', 'footer'];

function App() {
  const [photos, setPhotos] = useState([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [folderLoaded, setFolderLoaded] = useState(false);

  // Cargar fotos automáticamente desde la carpeta public/fotos/
  useEffect(() => {
    async function loadFolderPhotos() {
      try {
        const baseUrl = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
        const res = await fetch(import.meta.env.DEV ? `${baseUrl}/api/photos` : `${baseUrl}/api/photos.json`);
        if (!res.ok) return;
        const photoPaths = await res.json();

        if (photoPaths.length > 0) {
          const folderPhotos = photoPaths.map((path, index) => ({
            id: `folder-${index}-${Date.now()}`,
            url: path,
            name: path.split('/').pop(),
            fromFolder: true, // Marcar que viene de la carpeta (no revocar URL)
          }));
          setPhotos(folderPhotos);
        }
        setFolderLoaded(true);
      } catch (err) {
        console.log('No se encontraron fotos en la carpeta public/fotos/', err);
        setFolderLoaded(true);
      }
    }

    loadFolderPhotos();
  }, []);

  // Track active section for navigation dots
  useEffect(() => {
    const observerOptions = {
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <FloatingElements count={15} />

      {/* Side Navigation Dots */}
      <nav className="app__nav" aria-label="Navegación de secciones">
        {SECTIONS.map(section => (
          <button
            key={section}
            className={`app__nav-dot ${activeSection === section ? 'app__nav-dot--active' : ''}`}
            onClick={() => scrollTo(section)}
            aria-label={`Ir a ${section}`}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          />
        ))}
      </nav>

      <Hero />
      <PhotoGallery photos={photos} />
      <Message />
      <Footer />
    </div>
  );
}

export default App;
