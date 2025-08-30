import React from 'react';
import SettingsMenu from './SettingsMenu.jsx';
import './Header.css';

function Header({ drugName, turn, onRestart, onReturnToTitle, onSave }) {
  return (
    <header className="app-header">
      <div className="header-title">
        <h1>{drugName} - Cure Human</h1>
        <div className="turn-counter">Turn: {turn}</div>
      </div>
      <SettingsMenu
        onRestart={onRestart}
        onReturnToTitle={onReturnToTitle}
        onSave={onSave}
      />
    </header>
  );
}

export default Header;
