import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import GameScreen from './components/GameScreen.jsx';
import Footer from './components/Footer.jsx';
import TitleScreen from './components/TitleScreen.jsx'; // 追加
import { gameEvents } from './game-events.js';
import {
  INITIAL_GAME_STATE,
  ACTIONS,
  GAME_CONDITIONS,
} from './game-settings.js';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [view, setView] = useState('title'); // 'title' or 'game'

  // ゲーム開始処理
  const startGame = () => {
    setGameState(INITIAL_GAME_STATE);
    setCurrentEvent(null);
    setView('game');
  };

  const triggerEvent = (turn) => {
    // Turn 5 Fixed Event
    if (turn === 5) {
      setCurrentEvent(gameEvents.FIXED_EVENT_TURN_5);
      setGameState((prev) => ({ ...prev, gameStatus: 'event' }));
      return true;
    }
    // Random Event Logic (e.g., 25% chance)
    if (Math.random() < 0.25) {
      const randomEvents = [
        gameEvents.RANDOM_RIVAL_NEWS,
        gameEvents.RANDOM_MEDIA_INTEREST,
      ];
      const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      setCurrentEvent(event);
      setGameState((prev) => ({ ...prev, gameStatus: 'event' }));
      return true;
    }
    return false;
  };

  const handleEventChoice = (choice) => {
    const effects = choice.effects;
    let newState = { ...gameState };

    // Apply immediate effects
    newState.money = (newState.money || 0) + (effects.money || 0);
    newState.reputation = (newState.reputation || 0) + (effects.reputation || 0);

    // Handle special effects
    if (effects.stopTurns) {
      newState.stopTurns = effects.stopTurns;
    }
    if (effects.reputationGainLater) {
      newState.reputationGainLater = effects.reputationGainLater;
    }
    if (effects.potentialRisk) {
      newState.potentialRisk = effects.potentialRisk;
    }
    if (effects.hideReport) {
      newState.hiddenReport = true;
    }

    newState.gameStatus = 'ongoing';
    newState.currentMessage =
      'イベントの結果を反映し、アクションを再開します。';
    setGameState(newState);
    setCurrentEvent(null);
  };

  const handleAction = (actionType) => {
    if (gameState.gameStatus !== 'ongoing') return;

    if (gameState.stopTurns > 0) {
      const newTurn = gameState.turn + 1;
      const newStopTurns = gameState.stopTurns - 1;
      let newReputation = gameState.reputation;
      let newMessage = `治験中断中... 残り${newStopTurns}ターン。`;

      // Apply delayed reputation gain
      if (
        gameState.reputationGainLater &&
        gameState.reputationGainLater.turns === newStopTurns + 1
      ) {
        newReputation += gameState.reputationGainLater.amount;
        newMessage += '誠実な対応が評価され、評判が回復した！';
      }

      setGameState({
        ...gameState,
        turn: newTurn,
        stopTurns: newStopTurns,
        reputation: newReputation,
        currentMessage: newMessage,
      });
      return;
    }

    const action = ACTIONS[actionType];
    if (!action || gameState.money < action.cost) {
      setGameState((prev) => ({
        ...prev,
        currentMessage: '資金が不足しています。',
      }));
      return;
    }

    // --- Action Execution ---
    const effects = action.effect(gameState.reputation);
    let newMoney = gameState.money - action.cost + (effects.money || 0);
    let newParticipants = gameState.participants + (effects.participants || 0);
    // Apply bonus data and reset it
    let newData =
      gameState.data + (effects.data || 0) + gameState.dataCollectionBonus;
    let newReputation = gameState.reputation + (effects.reputation || 0);
    const newTurn = gameState.turn + 1;
    let newMessage = action.message;
    let newBonus = 0; // Reset bonus by default

    // Handle special action logic
    if (actionType === 'INVEST_IN_TEAM') {
      newBonus = 2; // Set bonus for the *next* turn
      newMessage += ' 次のターンのデータ収集率が2%アップします。';
    }

    // --- Post-Action Checks & State Updates ---
    let eventTriggered = false;
    // Check for action-specific events
    if (actionType === 'MAINTAIN_STATUS_QUO' && Math.random() < 0.2) {
      setCurrentEvent(gameEvents.RANDOM_TEAM_MORALE_DROP);
      setGameState((prev) => ({ ...prev, gameStatus: 'event' }));
      eventTriggered = true;
    }
    if (actionType === 'ADVANCED_DATA_ANALYSIS' && Math.random() < 0.15) {
      setCurrentEvent(gameEvents.RANDOM_SECONDARY_DATA);
      setGameState((prev) => ({ ...prev, gameStatus: 'event' }));
      eventTriggered = true;
    }

    // --- Post-Action Checks & State Updates ---
    // Check for potential risk materializing
    if (gameState.potentialRisk && Math.random() < gameState.potentialRisk.chance) {
      newReputation += gameState.potentialRisk.reputation;
      newMessage += '経過観察にしていた問題が悪化し、評判が大きく下がった！';
      gameState.potentialRisk = null; // Risk materializes only once
    }
    // Check for hidden report discovery (e.g., 10% chance each turn)
    if (gameState.hiddenReport && Math.random() < 0.1) {
      setGameState({ ...gameState, gameStatus: 'lost', currentMessage: "隠蔽が発覚した！プロジェクトは強制終了だ！" });
      return;
    }

    // --- Win/Loss Condition Check ---
    let newGameStatus = 'ongoing';
    if (newData >= GAME_CONDITIONS.WIN_DATA_PERCENTAGE) {
      newGameStatus = 'won';
      newMessage = 'データ収集率が100%に到達！フェーズ1臨床試験は成功です！';
    } else if (newMoney < GAME_CONDITIONS.LOSE_MONEY_THRESHOLD) {
      newGameStatus = 'lost';
      newMessage = '資産が底をつきました... プロジェクトは失敗です。';
    } else if (newTurn > GAME_CONDITIONS.MAX_TURNS) {
      newGameStatus = 'lost';
      newMessage = '規定ターン数を超えました... プロジェクトは失敗です。';
    }

    setGameState({
      ...gameState,
      money: newMoney,
      participants: newParticipants,
      data: Math.min(100, newData),
      reputation: Math.max(0, Math.min(100, newReputation)),
      turn: newTurn,
      gameStatus: newGameStatus,
      currentMessage: newMessage,
      dataCollectionBonus: newBonus, // Set the bonus for the next turn
    });

    // Trigger event for the *next* turn if the game is still ongoing and no other event was triggered
    if (newGameStatus === 'ongoing' && !eventTriggered) {
      triggerEvent(newTurn);
    }
  };

  if (view === 'title') {
    return <TitleScreen onStartGame={startGame} />;
  }

  return (
    <div className="App">
      <Header drugName="FMA-214" turn={gameState.turn} />
      <main>
        <GameScreen
          gameState={gameState}
          onAction={handleAction}
          currentEvent={currentEvent}
          onEventChoice={handleEventChoice}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
