# React開発のベストプラクティスガイド

このドキュメントは、高品質でスケーラブル、かつメンテナンス性の高いReactアプリケーションを開発するためのベストプラクティスをまとめたものです。

## 1. コンポーネントの設計と整理

### 1.1. フォルダ構成

一貫性のあるフォルダ構成は、プロジェクトの見通しを良くし、新しい開発者が参加しやすくします。

```
src/
|-- assets/         # 画像、フォントなどの静的ファイル
|-- components/     # 再利用可能な共通コンポーネント
|   |-- Button/
|   |   |-- index.js
|   |   `-- Button.test.js
|   `-- Input/
|       |-- index.js
|       `-- Input.test.js
|-- features/       # 特定の機能に関連するコンポーネントやロジック
|   `-- UserProfile/
|       |-- components/
|       |-- hooks/
|       |-- index.js
|       `-- UserProfile.js
|-- hooks/          # 汎用的なカスタムフック
|-- pages/          # 各ページを表すコンポーネント
|-- services/       # API通信などの外部サービス連携
|-- styles/         # グローバルなスタイル
`-- utils/          # 汎用的なユーティリティ関数
```

### 1.2. 小さく再利用可能なコンポーネント

- **単一責任の原則:** 1つのコンポーネントは1つのことだけを行うべきです。コンポーネントが複雑になりすぎたら、より小さなコンポーネントに分割しましょう。
- **Presentational/Containerパターン:** ロジック（Container）と見た目（Presentational）を分離することで、コンポーネントの再利用性とテストのしやすさが向上します。

### 1.3. 関数コンポーネントとHooks

- **関数コンポーネントを優先:** クラスコンポーネントよりもシンプルで、Hooksの恩恵を最大限に活用できます。
- **Hooksのルールを守る:**
  1. HooksはReact関数のトップレベルでのみ呼び出す。
  2. HooksはReactコンポーネントまたはカスタムフックの中からのみ呼び出す。

## 2. 状態管理

### 2.1. イミュータブルな状態更新

- `useState`や`useReducer`で状態を更新する際は、元の状態を直接変更せず、必ず新しいオブジェクトや配列を生成して更新します。これにより、Reactは変更を効率的に検知し、予期せぬ副作用を防ぎます。

```javascript
// Bad
const [user, setUser] = useState({ name: 'John' });
const updateName = () => {
  user.name = 'Jane'; // 直接変更はNG
  setUser(user);
};

// Good
const [user, setUser] = useState({ name: 'John' });
const updateName = () => {
  setUser({ ...user, name: 'Jane' }); // 新しいオブジェクトを生成
};
```

### 2.2. カスタムフックによるロジックの共通化

- 複数のコンポーネントで同じロジック（API通信、フォームハンドリングなど）が必要な場合は、カスタムフックに切り出して共通化します。

```javascript
// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... fetchData logic
  }, [url]);

  return { data, loading, error };
};
```

## 3. パフォーマンス最適化

### 3.1. 不要な再レンダリングを防ぐ

- **`React.memo`:** propsが変更されない限り、コンポーネントの再レンダリングをスキップします。
- **`useCallback`:** 関数をメモ化し、propsとして渡す際の不要な再レンダリングを防ぎます。
- **`useMemo`:** 重い計算結果をメモ化し、依存関係が変更されるまで再計算を防ぎます。

### 3.2. コード分割 (Code Splitting)

- `React.lazy`と`Suspense`を使い、ルートごとやコンポーネントごとにコードを分割します。これにより、初期ロードに必要なJavaScriptの量を減らし、表示速度を向上させます。

```javascript
import React, { Suspense, lazy } from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

### 3.3. リストの仮想化 (List Virtualization)

- 長大なリストを表示する際は、`react-window`や`react-virtualized`といったライブラリを使い、画面に表示されている部分だけをレンダリングします。

### 3.4. その他

- **`React.Fragment` (<>...</>):** 不要な`div`要素の生成を防ぎ、DOMをクリーンに保ちます。
- **画像の遅延読み込み (Lazy Loading):** 画面に入るまで画像の読み込みを遅らせ、初期表示を高速化します。

## 4. テスト

- **React Testing Libraryを推奨:** 実装の詳細ではなく、ユーザーの視点からコンポーネントがどのように振る舞うかをテストします。
- **カバレッジ:** 重要なビジネスロジックやUIのインタラクションを中心に、適切なテストカバレッジを目指します。

## 5. コードスタイルと規約

- **命名規則:**
  - コンポーネント: `PascalCase` (`MyComponent.js`)
  - フック: `use`プレフィックスをつけた`camelCase` (`useFetchData.js`)
- **Linter/Formatter:** `ESLint`と`Prettier`を導入し、コードスタイルを自動で統一します。

## 6. アクセシビリティ (a11y)

- **セマンティックHTML:** `div`や`span`の代わりに、適切なHTMLタグ（`nav`, `button`, `main`など）を使用します。
- **`aria-*`属性:** 必要に応じて`aria-*`属性を付与し、スクリーンリーダーなどの支援技術に対応します。
- **キーボード操作:** すべてのインタラクティブな要素がキーボードで操作できるようにします。

## 7. エラーハンドリング

- **エラー境界 (Error Boundaries):** UIの一部で発生したJavaScriptエラーがアプリケーション全体をクラッシュさせないように、エラー境界コンポーネントでラップします。
- **外部サービス連携:** `Sentry`などのエラー追跡サービスを導入し、本番環境でのエラーを監視・記録します。
