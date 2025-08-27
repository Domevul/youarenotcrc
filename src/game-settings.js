// src/game-settings.js

/**
 * ゲームの初期状態を定義します。
 * SCENE1_SPEC.md に基づいています。
 */
export const INITIAL_GAME_STATE = {
  money: 1000000, // 資産
  turn: 1, // ターン
  reputation: 50, // 評判
  participants: 0, // 参加者
  data: 0, // データ収集率
  yuaHealth: 100, // ユアの体調
  yuaAffection: 20, // ユアの好感度
  gameStatus: 'ongoing', // 'ongoing', 'event', 'won', 'lost'
  currentMessage: 'プロジェクトを開始します。最初のアクションを選択してください。', // プレイヤーへのメッセージ
  currentChapter: 1, // 現在の章
  // イベント効果を管理するための追加ステート
  stopTurns: 0, // 治験が停止しているターン数
  reputationGainLater: null, // { turns: number, amount: number }
  potentialRisk: null, // { chance: number, reputation: number }
  hiddenReport: false, // 不正を隠蔽したかどうかのフラグ
  dataCollectionBonus: 0, // チーム投資による次ターンのデータ収集ボーナス
};

/**
 * ゲームのクリア・失敗条件を定義します。
 */
export const GAME_CONDITIONS = {
  MAX_TURNS: 10,
  WIN_DATA_PERCENTAGE: 100,
  LOSE_MONEY_THRESHOLD: 0,
};

/**
 * 各アクションのコストと効果を定義します。
 */
export const ACTIONS = {
  // 広報
  STANDARD_PR: {
    cost: 10000,
    effect: () => ({
      participants: Math.floor(Math.random() * 6) + 3, // 3〜8人増加
    }),
    message: '標準的な広報活動を行い、新たな参加者を確保した。',
  },
  LARGE_SCALE_PR: {
    cost: 50000,
    effect: (reputation) => {
      // 評判が低いとリスクあり（効果が下がる、など）
      const baseParticipants = Math.floor(Math.random() * 26) + 5; // 5〜30人増加
      const successRate = reputation / 100;
      const actualParticipants =
        Math.random() < successRate ? baseParticipants : Math.floor(baseParticipants / 2);
      return {
        participants: actualParticipants,
        reputation: actualParticipants > 15 ? 2 : -2, // 大成功/失敗で評判が少し変動
      };
    },
    message: '大規模な広報キャンペーンを展開。多くの注目を集めた。',
  },
  // 研究
  NORMAL_DATA_COLLECTION: {
    cost: 20000,
    effect: () => ({
      data: 12,
      yuaHealth: -5, // 体調への負担
      yuaAffection: 2, // 治験が進むことへの期待
    }),
    message: '通常のデータ収集を完了。ユアの体調に少し負担がかかったが、研究は進んだ。',
  },
  ADVANCED_DATA_ANALYSIS: {
    cost: 80000,
    effect: () => ({
      data: 25,
      yuaHealth: -12, // 体調への大きな負担
      yuaAffection: 4, // 大きな進捗への期待と感謝
      // 副次データ発見の可能性はイベントとして実装
    }),
    message: '高度なデータ解析を実施。ユアの体調は少し悪化したが、研究は大きく進展した。',
  },
  // チーム
  MAINTAIN_STATUS_QUO: {
    cost: 0,
    effect: () => ({
      yuaHealth: -2, // 環境が変わらないことによる軽微なストレス
      yuaAffection: -2, // 何もしてくれないという小さな失望
    }),
    message: 'チームの現状を維持することを決定した。ユアの表情は少し暗い。',
  },
  INVEST_IN_TEAM: {
    cost: 30000,
    effect: () => ({
      dataCollectionBonus: 2, // 次のターンのデータ収集率+2%
      yuaHealth: 5, // ケア環境の改善による体調の回復
      yuaAffection: 5, // スタッフが親切になったことへの感謝
    }),
    message: 'チームへの投資により、研究環境が改善された。ユアも少し安心したようだ。',
  },
};
