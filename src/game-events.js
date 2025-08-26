/**
 * イベントデータを定義します。
 * SCENE1_SPEC.md に基づいています。
 */
export const gameEvents = {
  // 固定イベント (Turn 5)
  FIXED_EVENT_TURN_5: {
    id: 'E_FIXED_01',
    character: '山本 紗季',
    title: '最初の報告',
    description:
      '「木島君、少し耳に入れておきたい情報があるわ」\n参加者の一人から、継続的な頭痛という、予測されていなかった副作用の報告が上がってきた。軽微ではあるが、どう対応する？',
    choices: [
      {
        id: 'C01a',
        text: '即時公表し、治験を一時中断',
        description:
          '「すぐに公表し、原因が特定できるまで治験は中断だ」\n誠実な対応は、長期的には信頼に繋がるはずだ。',
        effects: {
          money: -50000,
          reputation: -10, // 即時低下
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
          '「もう少し様子を見よう。すぐに大きな問題になるとは考えにくい」\nリスクはあるが、プロジェクトの遅延は避けたい。',
        effects: {
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
          '「…この件は、一旦我々の胸に収めておこう」\n最もリスクの高い選択肢。しかし、成功のためには時に決断が必要だ。',
        effects: {
          hideReport: true,
        },
      },
    ],
  },
  // --- Action-specific Random Events ---
  RANDOM_TEAM_MORALE_DROP: {
    id: 'E_RANDOM_03',
    character: 'チームメンバー',
    title: 'チームの士気低下',
    description:
      '研究室の空気が少し重い。「最近、少し停滞気味じゃないか…？」という声が聞こえてきた。現状維持が続いたことで、チームの士気が低下しているようだ。',
    choices: [
      {
        id: 'CR03a',
        text: '気合を入れ直す',
        description: '「皆、もう一度目標を確認しよう！」',
        effects: { reputation: -2 },
      },
    ],
  },
  RANDOM_SECONDARY_DATA: {
    id: 'E_RANDOM_04',
    character: '研究員',
    title: '副次データの発見',
    description:
      '「リーダー！すごいものが見つかりました！」\n高度なデータ解析の過程で、FMA-214が持つ別の薬効を示唆するデータが偶然発見された。',
    choices: [
      {
        id: 'CR04a',
        text: '素晴らしい！',
        description: '「これは大きな発見だ！すぐに記録しておいてくれ」',
        effects: { reputation: 5 },
      },
    ],
  },
  // ランダムイベントの例
  RANDOM_RIVAL_NEWS: {
    id: 'E_RANDOM_01',
    character: 'ニュース速報',
    title: 'ライバルの影',
    description:
      'スマホが震える。ニュースアプリの通知だ。『ヘリオス製薬、画期的新薬で臨床試験開始』…我々のFMA-214と同じ領域の薬だ。プレッシャーがかかる。',
    choices: [
      {
        id: 'CR01a',
        text: '内容を詳しく確認する',
        description: '先を越された…？いや、まだだ。',
        effects: { reputation: -5 },
      },
    ],
  },
  RANDOM_MEDIA_INTEREST: {
    id: 'E_RANDOM_02',
    character: '医療ジャーナリスト',
    title: 'メディアの注目',
    description:
      '一本の電話が鳴る。「もしもし、月刊メディカル・トゥデイの者ですが、FMA-214について少しお話を伺えませんか？」 プロジェクトが外部の注目を集め始めたようだ。',
    choices: [
      {
        id: 'CR02a',
        text: '限定的な情報を提供する',
        description: 'うまく利用すれば、評判を高めるチャンスになるかもしれない。',
        effects: { reputation: 10, money: -5000 },
      },
      {
        id: 'CR02b',
        text: '今はまだ、と断る',
        description: '下手に情報を出すべき時ではない。',
        effects: {},
      },
    ],
  },
};
