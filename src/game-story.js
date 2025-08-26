// src/game-story.js

export const story = {
  1: {
    title: '第1章: プロジェクトの始動',
    description: '治験を開始するには、まず参加者を集める必要があります。',
    goalText: '目標: 参加者を10人集める',
    isCompleted: (state) => state.participants >= 10,
    completionMessage:
      '参加者が集まり、本格的なデータ収集が可能になりました。次の目標に進みます。',
  },
  2: {
    title: '第2章: 最初の壁',
    description:
      '治験は順調に進んでいますが、予期せぬ副作用が報告されました。倫理的な判断が求められます。',
    goalText: '目標: ターン5のイベントを乗り越え、評判を40以上に保つ',
    isCompleted: (state) => state.turn > 5 && state.reputation >= 40,
    completionMessage:
      '難しい判断でしたが、うまく乗り越えました。この調子で研究を完遂させましょう。',
  },
  3: {
    title: '第3章: データ収集の加速',
    description:
      '残すは治験データの収集のみです。リソースを管理し、最後までやり遂げましょう。',
    goalText: '目標: データ収集率を100%にする',
    isCompleted: (state) => state.data >= 100,
    completionMessage: '素晴らしい！すべてのデータが集まり、フェーズ1は成功です！',
  },
};
