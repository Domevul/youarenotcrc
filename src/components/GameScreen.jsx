import React from 'react';
import './GameScreen.css';

function GameScreen({ gameState, onNextTurn }) {
  // 数値をフォーマットするヘルパー関数
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
  };

  return (
    <div className="game-screen">
      <h2>現在の状況</h2>
      <div className="status-grid">
        <div className="status-item">
          <span className="label">資金</span>
          <span className="value funds">{formatCurrency(gameState.funds)}</span>
        </div>
        <div className="status-item">
          <span className="label">治験フェーズ</span>
          <span className="value">フェーズ {gameState.phase}</span>
        </div>
        <div className="status-item">
          <span className="label">参加者数</span>
          <span className="value">{gameState.participants} 人</span>
        </div>
        <div className="status-item">
          <span className="label">有効性</span>
          <span className="value">{gameState.efficacy} %</span>
        </div>
        <div className="status-item">
          <span className="label">安全性</span>
          <span className="value">{gameState.safety} %</span>
        </div>
        <div className="status-item">
          <span className="label">倫理</span>
          <span className="value">{gameState.ethics}</span>
        </div>
      </div>
      <button onClick={onNextTurn} disabled={gameState.gameStatus !== 'ongoing'}>
        次のターンへ
      </button>
    </div>
  );
}

export default GameScreen;
