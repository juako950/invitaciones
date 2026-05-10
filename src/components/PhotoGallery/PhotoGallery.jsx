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
            Nuestra <span>Galería</span> 💐
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
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 8,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        spaceBetween={30}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id}>
            <img
              src={photo.url}
              alt={photo.name || `Foto ${index + 1}`}
              className="photo-gallery__slide-img"
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
