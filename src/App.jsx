import React, { useState } from 'react'
import Header from './components/Header.jsx'
import GameScreen from './components/GameScreen.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [gameState, setGameState] = useState({
    funds: 1000000000, // 資金: 10億円
    phase: 1,          // 現在の治験フェーズ
    turn: 1,           // 現在のターン
    participants: 0,   // 参加者数
    efficacy: 0,       // 有効性
    safety: 100,       // 安全性
    ethics: 100,       // 倫理
    drugName: '画期的新薬A',
    gameStatus: 'ongoing', // 'won', 'lost'
  });

  // 次のターンに進むロジック（今はシンプルにターンを進め、資金を減らすだけ）
  const handleNextTurn = () => {
    setGameState(prevState => ({
      ...prevState,
      turn: prevState.turn + 1,
      funds: prevState.funds - 50000000, // 1ターンあたり5000万円のコスト
    }));
  };

  return (
    <div className="App">
      <Header drugName={gameState.drugName} turn={gameState.turn} />
      <main>
        <GameScreen gameState={gameState} onNextTurn={handleNextTurn} />
      </main>
      <Footer />
    </div>
  )
}

export default App
