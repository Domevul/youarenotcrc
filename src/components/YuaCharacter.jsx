import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealingIcon from '@mui/icons-material/Healing';
import './YuaCharacter.css';

/**
 * A component to visually represent Yua and her status.
 * @param {{health: number, affection: number}} props
 */
const YuaCharacter = ({ health, affection }) => {
  const getHeartColor = (affectionLevel) => {
    if (affectionLevel >= 50) return '#f06292'; // Bright, warm pink
    if (affectionLevel >= 0) return '#e91e63'; // Standard pink
    return '#64b5f6'; // Cold blue
  };

  const getExpressionImage = (affectionLevel) => {
    const base = import.meta.env.BASE_URL;
    if (affectionLevel >= 50) return `${base}yua-happy.svg`;
    if (affectionLevel < 0) return `${base}yua-sad.svg`;
    return `${base}yua-neutral.svg`;
  };

  const [imageSrc, setImageSrc] = useState(getExpressionImage(affection));

  useEffect(() => {
    setImageSrc(getExpressionImage(affection));
  }, [affection]);

  const handleImageError = () => {
    const base = import.meta.env.BASE_URL;
    setImageSrc(`${base}yua-placeholder.svg`);
  };

  const heartSize = Math.max(16, 16 + affection / 2);
  const heartColor = getHeartColor(affection);
  const heartClass = affection >= 50 ? 'glowing-heart' : '';

  return (
    <div className="yua-character-container">
      <div className="yua-character-name">ユア</div>
      <img
        src={imageSrc}
        onError={handleImageError}
        className="yua-character-body"
        alt="Yua"
      />
      <div className="yua-character-status">
        {/* Affection Status */}
        <div className="status-item affection-status">
          <FavoriteIcon
            className={heartClass}
            style={{ color: heartColor, fontSize: heartSize }}
          />
          <span className="yua-character-affection-text">{affection}</span>
        </div>

        {/* Health Status */}
        <div className="status-item health-status">
          <HealingIcon style={{ color: '#4caf50', fontSize: '24px' }} />
          <span className="yua-character-health-text">{health}</span>
        </div>
      </div>
    </div>
  );
};

export default YuaCharacter;
