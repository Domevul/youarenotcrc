import React from 'react';
import './GameScreen.css';
import EventModal from './EventModal.jsx';

function GameScreen({ gameState, onAction, currentEvent, onEventChoice }) {
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const isActionDisabled = gameState.gameStatus !== 'ongoing';

  return (
    <div className="game-screen">
      <EventModal event={currentEvent} onChoice={onEventChoice} />

      {/* Game Over or Win Message */}
      {(gameState.gameStatus === 'lost' || gameState.gameStatus === 'won') && (
        <div className="game-over-message">
          <h2>
            {gameState.gameStatus === 'won'
              ? 'フェーズ1成功！'
              : 'ゲームオーバー'}
          </h2>
          <p>{gameState.currentMessage}</p>
        </div>
      )}

      {/* Status Display */}
      <h2>現在の状況 (ターン: {gameState.turn} / 10)</h2>
      <div className="status-grid">
        <div className="status-item">
          <span className="label">資産</span>
          <span className="value funds">{formatMoney(gameState.money)}</span>
        </div>
        <div className="status-item">
          <span className="label">評判</span>
          <span className="value">{gameState.reputation} / 100</span>
        </div>
        <div className="status-item">
          <span className="label">参加者</span>
          <span className="value">{gameState.participants} 人</span>
        </div>
        <div className="status-item">
          <span className="label">データ収集率</span>
          <span className="value">{gameState.data} %</span>
        </div>
      </div>

      {/* Message Area */}
      <div className="message-area">
        <p>{gameState.currentMessage}</p>
      </div>

      {/* Action Buttons */}
      <h2>アクションを選択</h2>
      <div className="action-grid">
        <div className="action-category">
          <h3>広報</h3>
          <button
            onClick={() => onAction('STANDARD_PR')}
            disabled={isActionDisabled}
          >
            標準的な広報活動 ($10,000)
          </button>
          <button
            onClick={() => onAction('LARGE_SCALE_PR')}
            disabled={isActionDisabled}
          >
            大規模な広報キャンペーン ($50,000)
          </button>
        </div>
        <div className="action-category">
          <h3>研究</h3>
          <button
            onClick={() => onAction('NORMAL_DATA_COLLECTION')}
            disabled={isActionDisabled}
          >
            通常のデータ収集 ($20,000)
          </button>
          <button
            onClick={() => onAction('ADVANCED_DATA_ANALYSIS')}
            disabled={isActionDisabled}
          >
            高度なデータ解析 ($80,000)
          </button>
        </div>
        <div className="action-category">
          <h3>チーム</h3>
          <button
            onClick={() => onAction('MAINTAIN_STATUS_QUO')}
            disabled={isActionDisabled}
          >
            現状維持 ($0)
          </button>
          <button
            onClick={() => onAction('INVEST_IN_TEAM')}
            disabled={isActionDisabled}
          >
            チームへの投資 ($30,000)
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
