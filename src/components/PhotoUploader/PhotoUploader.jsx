import { useRef, useState } from 'react';
import './PhotoUploader.css';

function PhotoUploader({ photos, onAddPhotos, onRemovePhoto }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter(file =>
      file.type.startsWith('image/')
    );

    const newPhotos = imageFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    if (newPhotos.length > 0) {
      onAddPhotos(newPhotos);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="photo-uploader" id="uploader">
      <div className="photo-uploader__inner">
        <h2 className="photo-uploader__title">📸 Agrega tus Fotos</h2>
        <p className="photo-uploader__subtitle">
          Sube las fotos más bonitas con mamá para crear tu galería
        </p>

        <div
          className={`photo-uploader__dropzone ${isDragging ? 'photo-uploader__dropzone--active' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFilePicker}
        >
          <span className="photo-uploader__icon">🌸</span>
          <p className="photo-uploader__dropzone-text">
            Arrastra tus fotos aquí o haz clic para seleccionar
          </p>
          <p className="photo-uploader__dropzone-hint">
            Acepta JPG, PNG, WEBP y más formatos de imagen
          </p>

          <button
            type="button"
            className="photo-uploader__btn"
            onClick={(e) => {
              e.stopPropagation();
              openFilePicker();
            }}
          >
            🌷 Seleccionar Fotos
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="photo-uploader__input"
          accept="image/*"
          multiple
          onChange={handleInputChange}
          id="photo-input"
        />

        {photos.length > 0 && (
          <>
            <p className="photo-uploader__count">
              <strong>{photos.length}</strong> {photos.length === 1 ? 'foto agregada' : 'fotos agregadas'}
            </p>

            <div className="photo-uploader__preview">
              {photos.map((photo) => (
                <div key={photo.id} className="photo-uploader__preview-item">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="photo-uploader__preview-img"
                  />
                  <button
                    className="photo-uploader__preview-remove"
                    onClick={() => onRemovePhoto(photo.id)}
                    aria-label={`Eliminar ${photo.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default PhotoUploader;
