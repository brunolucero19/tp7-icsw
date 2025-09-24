import { useState } from 'react';
import PropTypes from 'prop-types';
import './DuckCard.css';

const DuckCard = ({ duck }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="duck-card">
      {!imageError ? (
        <img
          src={duck.image}
          alt={duck.commonName}
          className="duck-image"
          onError={handleImageError}
        />
      ) : (
        <div className="duck-image-placeholder">
          <span>🦆</span>
          <p>Imagen no disponible</p>
        </div>
      )}
      <div className="duck-info">
        <h3 className="duck-name">{duck.commonName}</h3>
        <p className="scientific-name">
          <em>{duck.scientificName}</em>
        </p>
        <p className="habitat">
          <strong>Hábitat:</strong> {duck.habitat}
        </p>
        <p className="description">{duck.description}</p>
      </div>
    </div>
  );
};

DuckCard.propTypes = {
  duck: PropTypes.shape({
    id: PropTypes.number.isRequired,
    commonName: PropTypes.string.isRequired,
    scientificName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    habitat: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default DuckCard;
