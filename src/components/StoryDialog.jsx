import React, { useState } from 'react';
import './StoryDialog.css';

const StoryDialog = ({ scenes, onComplete }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  const handleNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else {
      onComplete();
    }
  };

  const scene = scenes[currentSceneIndex];

  return (
    <div className="story-dialog-overlay" onClick={handleNextScene}>
      <div className="story-dialog-box">
        <p className="character-name">{scene.character}</p>
        <p className="dialog-text">{scene.text}</p>
        <div className="next-indicator">▼</div>
      </div>
    </div>
  );
};

export default StoryDialog;
