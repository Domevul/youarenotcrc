/**
 * イベントデータを定義します。
 * SCENE1_SPEC.md に基づいています。
 */
export const gameEvents = {
  // 固定イベント (Turn 5)
  FIXED_EVENT_TURN_5: {
    id: 'E_FIXED_01',
    title: '最初の報告',
    description:
      '参加者から軽微だが未予測の副作用（継続的な頭痛など）が報告された。どう対応しますか？',
    choices: [
      {
        id: 'C01a',
        text: '即時公表し、治験を一時中断',
        description:
          '2ターンの間、アクションが実行できなくなる。短期的には評判が下がるが、最終的には誠実な対応として評価される。',
        effects: {
          money: -50000,
          reputation: -10, // 即時低下
          // +15は2ターン後に発生させる必要がある
          // 2ターン停止はgameStateで管理
          stopTurns: 2,
          reputationGainLater: {
            turns: 2,
            amount: 25, // -10から+15になるので、差分は+25
          },
        },
      },
      {
        id: 'C01b',
        text: '経過観察とし、治験を継続',
        description:
          '進行は止まらないが、50%の確率で後に重大イベントが発生し、評判が-30される可能性がある。',
        effects: {
          // 50%の確率はApp.jsxで処理
          potentialRisk: {
            chance: 0.5,
            reputation: -30,
          },
        },
      },
      {
        id: 'C01c',
        text: '報告を隠蔽する',
        description:
          '短期的な影響はないが、発覚した場合はゲームオーバー級のペナルティ。',
        effects: {
          // 隠蔽リスクはApp.jsxでフラグ管理
          hideReport: true,
        },
      },
    ],
  },
  // --- Action-specific Random Events ---
  RANDOM_TEAM_MORALE_DROP: {
    id: 'E_RANDOM_03',
    title: 'チームの士気低下',
    description:
      '現状維持が続いたことで、チームの士気が少し低下したようだ。研究の効率がわずかに落ちるかもしれない。',
    choices: [
      {
        id: 'CR03a',
        text: '気合を入れ直す',
        effects: { reputation: -2 }, // Acknowledging the issue has a small cost
      },
    ],
  },
  RANDOM_SECONDARY_DATA: {
    id: 'E_RANDOM_04',
    title: '副次データの発見',
    description:
      '高度なデータ解析の過程で、予期せぬ副次的なデータが見つかった。これは新薬の別の可能性を示唆しているかもしれない。',
    choices: [
      {
        id: 'CR04a',
        text: '素晴らしい！',
        effects: { reputation: 5 }, // A positive discovery boosts reputation
      },
    ],
  },
  // ランダムイベントの例
  RANDOM_RIVAL_NEWS: {
    id: 'E_RANDOM_01',
    title: 'ライバルの影',
    description:
      '競合のヘリオス製薬が、同様のプロジェクトで大きな進捗を遂げたとニュースになっている。我々の評判が相対的に少し下がり、プレッシャーを感じる。',
    choices: [
      {
        id: 'CR01a',
        text: '内容を確認する',
        effects: { reputation: -5 },
      },
    ],
  },
  RANDOM_MEDIA_INTEREST: {
    id: 'E_RANDOM_02',
    title: 'メディアの注目',
    description:
      'あなたのプロジェクトが、ある医療ジャーナリストの目に留まった。情報提供の見返りに、評判を上げるチャンスかもしれない。',
    choices: [
      {
        id: 'CR02a',
        text: '限定的な情報を提供する',
        effects: { reputation: 10, money: -5000 },
      },
      {
        id: 'CR02b',
        text: '関わらない',
        effects: {},
      },
    ],
  },
};
