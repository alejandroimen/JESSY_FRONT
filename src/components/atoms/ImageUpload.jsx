import React, { useState } from 'react';
import '../styles/atoms/ImageUpload.css';

const ImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null); // State for error message

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ['jpg', 'jpeg', 'png']; // Allowed extensions
    const extension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setError('Formato de imagen no válido. Elige JPG, JPEG o PNG.');
      return;
    }
    onUpload(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      setError('Error al leer la imagen.'); // Handle read error
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setError(null); // Clear error if set
  };

  return (
    <div className="image-upload">
      {image ? (
        <div className="image-preview-container">
          <img src={image} alt="Upload Preview" className="image-preview" />
          <button className="remove-image-button" onClick={handleRemoveImage}>
            &times;
          </button>
        </div>
      ) : (
        <>
          <input
            id="file-input"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="file-input" className="add-image-button">
          <i className="fas fa-plus"></i>
          </label>
        </>
      )}
      {error && <p className="error-message">{error}</p>}  {/* Display error message */}
    </div>
  );
};

export default ImageUpload;