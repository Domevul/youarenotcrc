import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
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

  const heartSize = Math.max(16, 16 + affection / 2);
  const heartColor = getHeartColor(affection);
  const heartClass = affection >= 50 ? 'glowing-heart' : '';

  return (
    <div className="yua-character-container">
      <div className="yua-character-name">ユア</div>
      <img
        src="/yua-placeholder.svg"
        className="yua-character-body"
        alt="Yua"
      />
      <div className="yua-character-status">
        <FavoriteIcon
          className={heartClass}
          style={{ color: heartColor, fontSize: heartSize }}
        />
        <span className="yua-character-health-text">Health: {health}</span>
      </div>
    </div>
  );
};

export default YuaCharacter;
