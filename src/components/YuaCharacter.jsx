import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './YuaCharacter.css';

/**
 * Gets the color representing Yua's health.
 * @param {number} health - Yua's current health (0-100).
 * @returns {string} A CSS color string.
 */
const getHealthColor = (health) => {
  if (health > 70) {
    return '#4caf50'; // green
  }
  if (health > 40) {
    return '#ff9800'; // orange
  }
  return '#f44336'; // red
};

/**
 * A component to visually represent Yua and her status.
 * @param {{health: number, affection: number}} props
 */
const YuaCharacter = ({ health, affection }) => {
  const bodyStyle = {
    backgroundColor: getHealthColor(health),
  };

  // Base size + affection value. Min size ensures visibility.
  const heartSize = Math.max(16, 16 + affection / 2);

  return (
    <div className="yua-character-container">
      <div className="yua-character-body" style={bodyStyle}>
        {/* This div represents Yua's body shape */}
      </div>
      <div className="yua-character-status">
        <FavoriteIcon style={{ color: '#e91e63', fontSize: heartSize }} />
        <span className="yua-character-health-text">Health: {health}</span>
      </div>
    </div>
  );
};

export default YuaCharacter;
