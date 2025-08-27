/**
 * イベントデータを定義します。
 * 新しい仕様書 `SCENE1_SPEC.md` に基づいています。
 * Code Name: YUA
 */
export const gameEvents = {
  // --- 固定イベント (Turn 4) ---
  FIXED_EVENT_TURN_4: {
    id: 'E_FIXED_01',
    character: 'AIクロエ',
    title: '最初の変異',
    description:
      '「警告。被験者ユアの生体データに、予測されていないパターンを検出」\nモニターを見ると、ユアの腕に奇妙な紋様が浮かび上がっている。これは一体…？',
    choices: [
      {
        id: 'C01a',
        text: '即時投与を中断し、原因を調査',
        description: '「ユア、大丈夫か？すぐに調べる」\n彼女の安全が最優先だ。',
        effects: {
          stopTurns: 1,
          affection: 15,
          money: -30000,
        },
      },
      {
        id: 'C01b',
        text: '些細な反応とみなし、投与を継続',
        description:
          '「計画通りだ。問題ない。続けよう」\n研究を遅らせるわけにはいかない。',
        effects: {
          health: -5,
          potentialRisk: {
            chance: 0.5,
            effect: { healthMax: -10 }, // healthの上限が-10
            message: '無理な投与がたたり、ユアの体に後遺症が残ってしまった…',
          },
        },
      },
      {
        id: 'C01c',
        text: '変異を「成功の兆候」として報告',
        description:
          '「素晴らしい…！これを成功例として報告するんだ」\nこれはチャンスだ。利用しない手はない。',
        effects: {
          money: 50000,
          affection: -20,
        },
      },
    ],
  },

  // --- ランダムイベントの例 ---
  RANDOM_NIGHTMARE: {
    id: 'E_RANDOM_01',
    trigger: (state) => state.yuaHealth < 35, // Healthが35未満の時に発生しやすい
    character: 'ユア',
    title: '悪夢',
    description:
      '深夜、研究室にユアの苦しそうな声が響く。「う…、やめて…」\n彼女は悪夢にうなされているようだ。',
    choices: [
      {
        id: 'CR01a',
        text: 'そばにいてあげる',
        description: '「大丈夫、僕がそばにいる」',
        effects: { affection: 10, health: 5 },
      },
      {
        id: 'CR01b',
        text: '鎮静剤を投与する',
        description: '最も手っ取り早い解決策だ。',
        effects: { health: 10, money: -10000 },
      },
      {
        id: 'CR01c',
        text: 'データ収集のチャンスと捉える',
        description: 'この状態の脳波は貴重なデータになるかもしれない。',
        effects: { affection: -25, data: 2 },
      },
    ],
  },
  RANDOM_MEMORY_FRAGMENT: {
    id: 'E_RANDOM_02',
    trigger: (state) => state.yuaAffection > 40, // Affectionが高い時に発生
    character: 'ユア',
    title: '思い出話',
    description:
      '「ねえ、聞いてくれる…？」\nふとした瞬間に、ユアが自分の過去についてぽつりぽつりと話し始めた。',
    choices: [
      {
        id: 'CR02a',
        text: '黙って話を聞く',
        description: '彼女のことを、もっと知りたい。',
        effects: { affection: 15 },
        unlocksStory: 'yua_past_1', // ストーリーフラグをアンロック
      },
      {
        id: 'CR02b',
        text: '興味がないと流す',
        description: '今は研究に集中したい。',
        effects: { affection: -10 },
      },
    ],
  },
  RANDOM_SYSTEM_ALERT: {
    id: 'E_RANDOM_03',
    trigger: () => Math.random() < 0.08, // 8%の確率で発生
    character: 'AIクロエ',
    title: 'システムの警告',
    description:
      '「警告。生命維持装置に異常を検知。パラメータが不安定です」\nモニターに赤いアラートが点滅している。すぐに対応が必要だ。',
    choices: [
      {
        id: 'CR03a',
        text: '即時修復する',
        description: '「すぐに手動で修復するんだ！」',
        effects: { money: -40000, health: 5 },
      },
      {
        id: 'CR03b',
        text: '予備システムに切り替える',
        description: 'コストはかかるが、こちらの方が安全だ。',
        effects: { money: -75000, health: 15 },
      },
    ],
  },
};
