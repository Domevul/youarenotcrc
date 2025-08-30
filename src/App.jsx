import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import GameScreen from './components/GameScreen.jsx';
import Footer from './components/Footer.jsx';
import TitleScreen from './components/TitleScreen.jsx';
import StoryDialog from './components/StoryDialog.jsx';
import GameOverModal from './components/GameOverModal.jsx';
import { gameEvents } from './game-events.js';
import { story } from './game-story.js';
import './App.css';

// --- Game Settings (based on new spec) ---
const MAX_TURNS = 12;
const WIN_DATA_PERCENTAGE = 100;
const LOSE_MONEY_THRESHOLD = 0;
const LOSE_AFFECTION_THRESHOLD = -50;

const INITIAL_GAME_STATE = {
  money: 500000,
  turn: 1,
  data: 0,
  yuaHealth: 100,
  yuaHealthMax: 100,
  yuaAffection: 0,
  gameStatus: 'ongoing', // 'ongoing', 'event', 'won', 'lost'
  message: { text: '研究サイクルを開始します。', type: 'info' },
  stopTurns: 0,
  researchBonus: 0, // for 'BASIC_RESEARCH' action
};

// --- Narrative Actions ---
const getRandomMessage = (messages) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

const ACTIONS = {
  ADMINISTER_STANDARD: {
    cost: 30000,
    effect: (bonus) => ({ data: 15 + bonus, health: -10 }),
    messages: [
      '標準プロトコルを投与した。ユアはかすかに顔をしかめたが、何も言わなかった。',
      '淡々と投与は進む。モニターの数値が、研究の進捗と彼女の負担を同時に示している。',
      '「……はい。」ユアは静かに腕を差し出す。その目には、諦めと、ほんの少しの期待が混じっていた。',
    ],
  },
  ADMINISTER_HIGH_RISK: {
    cost: 50000,
    effect: (bonus) => ({ data: 30 + bonus, health: -25 }),
    messages: [
      '高リスク投与を敢行した。ユアの呼吸が荒くなるのがわかる。見ていることしかできない。',
      '「くっ…！」彼女は唇を噛みしめ、痛みに耐えている。これで、本当に正しいのだろうか？',
      '大きな成果の裏で、彼女の命が削られていく。胸が痛んだ。',
    ],
  },
  TALK_TO_YUA: {
    cost: 0,
    effect: () => ({ affection: 10 }),
    messages: [
      '他愛もない話をした。ユアは少しだけ、年相応の少女らしい笑顔を見せた。',
      'ユアと静かな時間を過ごした。言葉は少なくとも、心は少し通じ合った気がする。',
      '「研究員さんも、大変ですね」不意に、ユアがこちらを気遣う言葉をかけてきた。',
    ],
  },
  PROVIDE_PALLIATIVE_CARE: {
    cost: 40000,
    effect: () => ({ health: 20, affection: 5 }),
    messages: [
      '緩和ケアを行った。ユアの苦痛が和らいだようだ。「…ありがとうございます」と小さな声で言った。',
      '温かいタオルでユアの体を拭く。彼女の表情が、少しだけ穏やかになった。',
    ],
  },
  BASIC_RESEARCH: {
    cost: 20000,
    effect: () => ({ researchBonus: 3 }),
    messages: [
      '膨大な論文データを解析し、新しい知見を得た。次の投与が少し楽しみになった。',
      '深夜まで研究室にこもる。これで一歩、核心に近づいたはずだ。',
    ],
  },
  ANALYZE_SIDE_EFFECTS: {
    cost: 60000,
    effect: () => ({ sideEffectChanceModifier: -0.15 }),
    messages: [
      '過去の投与データを分析し、副作用のパターンを特定した。これでユアの負担を減らせるかもしれない。',
      'リスクを予測し、対策を立てる。これも主任研究員の重要な仕事だ。',
    ],
  },
};

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [gamePhase, setGamePhase] = useState('title');
  const [storyScenes, setStoryScenes] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [activeActionTab, setActiveActionTab] = useState(null);

  const handleActionTabChange = (newValue) => {
    // If the same tab is clicked, close the panel. Otherwise, open the new one.
    setActiveActionTab((prev) => (prev === newValue ? null : newValue));
  };

  useEffect(() => {
    if (gamePhase === 'prologue') {
      setStoryScenes(story.prologue);
      setShowStory(true);
    }
  }, [gamePhase]);

  const startGame = () => {
    setGameState(INITIAL_GAME_STATE);
    setCurrentEvent(null);
    setGamePhase('prologue');
  };

  const handlePrologueComplete = () => {
    setShowStory(false);
    setGamePhase('game');
  };

  const handleRestart = () => {
    setGameState(INITIAL_GAME_STATE);
    setCurrentEvent(null);
    setGamePhase('game');
  };

  const handleReturnToTitle = () => setGamePhase('title');

  const triggerEvent = (turn, state) => {
    // Fixed Event
    if (turn === 4) {
      setCurrentEvent(gameEvents.FIXED_EVENT_TURN_4);
      return;
    }
    // Random Events
    const potentialEvents = Object.values(gameEvents).filter(
      (event) => event.trigger && event.trigger(state)
    );
    if (potentialEvents.length > 0) {
      const event =
        potentialEvents[Math.floor(Math.random() * potentialEvents.length)];
      setCurrentEvent(event);
    }
  };

  const applyEffects = (state, effects) => {
    const newState = { ...state };
    newState.money = (newState.money || 0) + (effects.money || 0);
    newState.data = (newState.data || 0) + (effects.data || 0);
    newState.yuaHealth = (newState.yuaHealth || 0) + (effects.health || 0);
    newState.yuaAffection =
      (newState.yuaAffection || 0) + (effects.affection || 0);
    newState.yuaHealthMax =
      (newState.yuaHealthMax || 100) + (effects.healthMax || 0);
    newState.stopTurns = (newState.stopTurns || 0) + (effects.stopTurns || 0);

    if (effects.potentialRisk && Math.random() < effects.potentialRisk.chance) {
      return applyEffects(newState, effects.potentialRisk.effect);
    }
    return newState;
  };

  const handleEventChoice = (choice) => {
    let newState = applyEffects(gameState, choice.effects);
    newState.gameStatus = 'ongoing';
    newState.message = {
      text: 'イベントの結果を反映し、アクションを再開します。',
      type: 'info',
    };
    setCurrentEvent(null);
    endTurn(newState);
  };

  const handleAction = (actionType) => {
    if (gameState.gameStatus !== 'ongoing' || gameState.stopTurns > 0) return;

    const action = ACTIONS[actionType];
    if (!action || gameState.money < action.cost) {
      setGameState((prev) => ({
        ...prev,
        message: { text: '資金が不足しています。', type: 'error' },
      }));
      return;
    }

    let newState = { ...gameState };
    newState.money -= action.cost;

    const effects = action.effect(newState.researchBonus);
    newState = applyEffects(newState, effects);
    newState.message = { text: getRandomMessage(action.messages), type: 'info' };

    // Reset one-time bonuses
    newState.researchBonus = effects.researchBonus || 0;

    endTurn(newState);
  };

  const endTurn = (state) => {
    let newState = { ...state };

    // Clamp values
    newState.yuaHealth = Math.max(
      0,
      Math.min(newState.yuaHealth, newState.yuaHealthMax)
    );
    newState.data = Math.min(100, newState.data);

    // Win/Loss Condition Check
    if (newState.data >= WIN_DATA_PERCENTAGE) {
      newState.gameStatus = 'won';
      newState.message = {
        text: 'データ収集率が100%に到達！コードFMAの基礎開発は成功した！',
        type: 'success',
      };
    } else if (newState.yuaHealth <= 0) {
      newState.gameStatus = 'lost';
      newState.message = {
        text: 'ユアのバイタルが停止しました... 私たちの研究は、最悪の結末を迎えた。',
        type: 'error',
      };
    } else if (newState.money < LOSE_MONEY_THRESHOLD) {
      newState.gameStatus = 'lost';
      newState.message = {
        text: '資産が底をつきました... 研究室は閉鎖です。',
        type: 'error',
      };
    } else if (newState.yuaAffection <= LOSE_AFFECTION_THRESHOLD) {
      newState.gameStatus = 'lost';
      newState.message = {
        text: 'ユアとの信頼関係は完全に崩壊した。彼女はもう協力してくれない。',
        type: 'error',
      };
    } else if (newState.turn + 1 > MAX_TURNS) {
      newState.gameStatus = 'lost';
      newState.message = {
        text: '規定サイクル数を超えました... プロジェクトはタイムオーバーです。',
        type: 'error',
      };
    }

    if (newState.gameStatus === 'ongoing') {
      newState.turn++;
      setGameState(newState);
      // Trigger event for the *next* turn
      triggerEvent(newState.turn, newState);
    } else {
      setGameState(newState);
    }
  };

  if (gamePhase === 'title') {
    return <TitleScreen onStartGame={startGame} />;
  }

  return (
    <div className="App">
      {showStory && (
        <StoryDialog scenes={storyScenes} onComplete={handlePrologueComplete} />
      )}
      <Header
        drugName="コードFMA-214"
        turn={gameState.turn}
        onRestart={handleRestart}
        onReturnToTitle={handleReturnToTitle}
        onSave={() => alert('セーブ機能は現在開発中です。')}
      />
      <main className="app-main">
        <GameScreen
          gameState={gameState}
          onAction={handleAction}
          currentEvent={currentEvent}
          onEventChoice={handleEventChoice}
          yuaHealth={gameState.yuaHealth}
          yuaAffection={gameState.yuaAffection}
          activeActionTab={activeActionTab}
          initialMoney={INITIAL_GAME_STATE.money}
        />
      </main>
      <Footer
        onActionTabChange={handleActionTabChange}
        activeActionTab={activeActionTab}
      />
      <GameOverModal
        gameStatus={gameState.gameStatus}
        onRestart={handleRestart}
        onReturnToTitle={handleReturnToTitle}
      />
    </div>
  );
}

export default App;
