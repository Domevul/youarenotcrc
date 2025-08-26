export const gameEvents = [
  {
    id: 'E001',
    title: '予期せぬ副作用',
    description:
      '治験参加者の数名から、予測されていなかった軽微な副作用の報告があった。この事実を公表しますか？',
    choices: [
      {
        id: 'C001a',
        text: '直ちに公表する',
        description:
          '追加の検査費用が発生し、薬の安全性評価は少し下がるが、高い倫理性が評価される。',
        effects: { funds: -50000000, ethics: 5, safety: -2 },
      },
      {
        id: 'C001b',
        text: 'しばらく様子を見る',
        description:
          '短期的なコストはかからないが、問題が発覚した場合、倫理と安全性の評価が大きく損なわれるリスクがある。',
        effects: { ethics: -10, safety: -5 },
      },
    ],
  },
  {
    id: 'E002',
    title: 'メディアからの取材依頼',
    description:
      'あなたの画期的な新薬について、大手メディアから取材の申し込みがあった。治験の進捗を大々的にアピールするチャンスだが、期待を煽りすぎるリスクもある。',
    choices: [
      {
        id: 'C002a',
        text: '積極的に協力する',
        description:
          'メディアへの露出により、投資家からの期待が高まり、追加資金を得られる。しかし、少し大げさに話す必要があるかもしれない。',
        effects: { funds: 100000000, ethics: -5 },
      },
      {
        id: 'C002b',
        text: '慎重に断る',
        description:
          '誠実な対応として倫理評価は上がるが、資金調達の機会を逃すことになる。',
        effects: { funds: 0, ethics: 5 },
      },
    ],
  },
  {
    id: 'E003',
    title: '研究員の画期的な発見',
    description:
      'チームの研究員が、薬の効果をわずかに高める新しい投与方法を発見した。すぐさま臨床試験に反映させるか？',
    choices: [
      {
        id: 'C003a',
        text: 'すぐに採用する',
        description:
          '有効性のデータが少し向上するが、プロトコルの変更にはコストがかかる。',
        effects: { funds: -30000000, efficacy: 2 },
      },
      {
        id: 'C003b',
        text: '今回は見送る',
        description: 'コストはかからないが、改善の機会を逃す。',
        effects: {},
      },
    ],
  },
];
