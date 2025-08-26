import React from 'react';
import './Header.css';

function Header({ drugName, turn }) {
  return (
    <header className="app-header">
      <h1>{drugName} - 治験シミュレーション</h1>
      <div className="turn-counter">Turn: {turn}</div>
    </header>
  );
}

export default Header;
