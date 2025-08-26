import React, { useState } from 'react';
import Header from './components/Header.jsx';
import GameScreen from './components/GameScreen.jsx';
import Footer from './components/Footer.jsx';
import { gameEvents } from './game-events.js';
import './App.css';

// ゲームのバランスを定義する定数
const GAME_SETTINGS = {
  COST_PER_TURN: 50000000,
  PARTICIPANTS_PER_TURN: 5,
  MAX_PARTICIPANTS_PER_PHASE: { 1: 50, 2: 200, 3: 1000 },
  EFFICACY_GAIN_PER_TURN: 0.1,
  SAFETY_RISK_PER_TURN: 0.5,
  EVENT_CHANCE_PER_TURN: 0.4, // 1ターンにイベントが発生する確率
};

function App() {
  const [gameState, setGameState] = useState({
    funds: 1000000000,
    phase: 1,
    turn: 1,
    participants: 0,
    efficacy: 0,
    safety: 100,
    ethics: 100,
    drugName: '画期的新薬A',
    gameStatus: 'ongoing', // 'ongoing', 'event', 'won', 'lost'
  });
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleEventChoice = (choice) => {
    const effects = choice.effects;
    setGameState((prevState) => ({
      ...prevState,
      funds: prevState.funds + (effects.funds || 0),
      efficacy: Math.min(100, prevState.efficacy + (effects.efficacy || 0)),
      safety: Math.max(0, prevState.safety + (effects.safety || 0)),
      ethics: Math.max(0, prevState.ethics + (effects.ethics || 0)),
      gameStatus: 'ongoing', // イベントが終了し、ゲーム再開
    }));
    setCurrentEvent(null);
  };

  const handleNextTurn = () => {
    if (gameState.gameStatus !== 'ongoing') return;

    // イベント発生判定
    if (Math.random() < GAME_SETTINGS.EVENT_CHANCE_PER_TURN) {
      const randomEvent =
        gameEvents[Math.floor(Math.random() * gameEvents.length)];
      setCurrentEvent(randomEvent);
      setGameState((prevState) => ({ ...prevState, gameStatus: 'event' }));
      return; // イベント中はターン進行を止める
    }

    setGameState((prevState) => {
      const newFunds = prevState.funds - GAME_SETTINGS.COST_PER_TURN;
      const maxParticipants =
        GAME_SETTINGS.MAX_PARTICIPANTS_PER_PHASE[prevState.phase];
      const newParticipants = Math.min(
        maxParticipants,
        prevState.participants + GAME_SETTINGS.PARTICIPANTS_PER_TURN
      );
      const efficacyGain =
        GAME_SETTINGS.EFFICACY_GAIN_PER_TURN +
        (newParticipants / maxParticipants) * 0.5;
      const newEfficacy = Math.min(100, prevState.efficacy + efficacyGain);
      const safetyDrop = Math.random() * GAME_SETTINGS.SAFETY_RISK_PER_TURN;
      const newSafety = Math.max(0, prevState.safety - safetyDrop);

      let newGameStatus = prevState.gameStatus;
      if (newFunds <= 0) {
        newGameStatus = 'lost';
      }

      return {
        ...prevState,
        turn: prevState.turn + 1,
        funds: newFunds,
        participants: newParticipants,
        efficacy: parseFloat(newEfficacy.toFixed(2)),
        safety: parseFloat(newSafety.toFixed(2)),
        gameStatus: newGameStatus,
      };
    });
  };

  return (
    <div className="App">
      <Header drugName={gameState.drugName} turn={gameState.turn} />
      <main>
        <GameScreen
          gameState={gameState}
          onNextTurn={handleNextTurn}
          currentEvent={currentEvent}
          onEventChoice={handleEventChoice}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
