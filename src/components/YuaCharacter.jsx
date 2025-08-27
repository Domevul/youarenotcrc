import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './YuaCharacter.css';

/**
 * A component to visually represent Yua and her status.
 * @param {{health: number, affection: number}} props
 */
const YuaCharacter = ({ health, affection }) => {
  // Base size + affection value. Min size ensures visibility.
  const heartSize = Math.max(16, 16 + affection / 2);

  return (
    <div className="yua-character-container">
      <img
        src="/yua-placeholder.svg"
        className="yua-character-body"
        alt="Yua"
      />
      <div className="yua-character-status">
        <FavoriteIcon style={{ color: '#e91e63', fontSize: heartSize }} />
        <span className="yua-character-health-text">Health: {health}</span>
      </div>
    </div>
  );
};

export default YuaCharacter;
