import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import './PhotoGallery.css';

function PhotoGallery({ photos }) {
  if (photos.length === 0) {
    return (
      <section className="photo-gallery" id="gallery">
        <div className="photo-gallery__header">
          <h2 className="photo-gallery__title">
            Algunas <span>de nuestras fotos</span> 💐
          </h2>
          <p className="photo-gallery__desc">
            Los mejores momentos juntos
          </p>
        </div>

        <div className="photo-gallery__empty">
          <span className="photo-gallery__empty-icon">📷</span>
          <p className="photo-gallery__empty-text">
            Aún no hay fotos en la galería
          </p>
          <p className="photo-gallery__empty-hint">
            Sube tus fotos favoritas arriba para verlas aquí ↑
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="photo-gallery" id="gallery">
      <div className="photo-gallery__header">
        <h2 className="photo-gallery__title">
          Nuestra <span>Galería</span> 💐
        </h2>
        <p className="photo-gallery__desc">
          Los mejores momentos juntos
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={photos.length > 2}
        speed={600}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 5,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        spaceBetween={30}
        watchSlidesProgress={true}
        preloadImages={false}
        lazy={{ loadPrevNext: true, loadPrevNextAmount: 2 }}
        touchRatio={1.2}
        touchAngle={45}
        resistance={true}
        resistanceRatio={0.85}
        threshold={5}
        breakpoints={{
          0: {
            spaceBetween: 16,
            coverflowEffect: {
              rotate: 3,
              depth: 80,
              modifier: 1.5,
              slideShadows: false,
            },
          },
          768: {
            spaceBetween: 30,
            coverflowEffect: {
              rotate: 5,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            },
          },
        }}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id}>
            <img
              src={photo.url}
              alt={photo.name || `Foto ${index + 1}`}
              className="photo-gallery__slide-img"
              loading="lazy"
              decoding="async"
            />
            <div className="photo-gallery__slide-overlay">
              <p className="photo-gallery__slide-caption">
                Con amor 💕
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default PhotoGallery;
