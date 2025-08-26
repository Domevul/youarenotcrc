# 今後の開発・運用ToDoリスト

このプロジェクトを開発、運用していく上でのToDoリストです。

## 1. Firebase設定（最重要）

現在、Firebaseの接続設定がダミーの値になっています (`src/firebase/firebase.js`)。このままではアプリケーションがFirebaseに接続できず、機能しません。

**対応手順:**

1.  **Firebaseプロジェクトの作成**: もしまだであれば、[Firebaseコンソール](https://console.firebase.google.com/)でプロジェクトを作成します。
2.  **ウェブアプリの登録**: プロジェクトにウェブアプリを登録し、`firebaseConfig`オブジェクト（APIキーなどを含む）を取得します。
3.  **機密情報の設定**:
    - **ローカル開発環境**:
      1.  リポジトリのルートに`.env`というファイルを作成します。
      2.  `.env`ファイルに、Firebaseから取得した設定値を`VITE_`プレフィックスを付けて記述します。（例: `VITE_API_KEY="your-api-key"`）
      3.  `src/firebase/firebase.js`を修正し、`import.meta.env.VITE_API_KEY`のように環境変数から値を読み込むように変更します。
      4.  `.gitignore`ファイルに`.env`を追加して、機密情報がリポジトリにコミットされないようにします。
    - **GitHub Actions（本番環境）**:
      1.  リポジトリの`Settings` > `Secrets and variables` > `Actions`に移動します。
      2.  `New repository secret`をクリックし、ローカルの`.env`ファイルと同じキーと値（例: `VITE_API_KEY`）を登録します。
      3.  `.github/workflows/deploy.yml`を修正し、ビルドステップでこれらのシークレットを環境変数として渡すように設定します。

## 2. 初回デプロイの手順

このプルリクエストをマージした後、サイトを公開するために以下の手動設定が必要です。

1.  **プルリクエストのマージ**: このプルリクエストを`main`ブランチにマージします。
2.  **Actionsの実行確認**: マージ後、[リポジトリのActionsタブ](https://github.com/Domevul/youarenotcrc/actions)で`Deploy to GitHub Pages`ワークフローが自動的に実行され、正常に完了するのを待ちます。（緑のチェックマークが付けば成功です）
3.  **GitHub Pagesの設定**:
    1.  リポジトリの`Settings` > `Pages`に移動します。
    2.  `Source`（または`Branch`）のドロップダウンメニューから`gh-pages`ブランチを選択します。
    3.  `Save`をクリックします。
4.  **公開の確認**: 設定後、数分待ってから `https://Domevul.github.io/youarenotcrc/` にアクセスしてサイトが表示されることを確認します。

---

以上の設定を行うことで、今後の`main`ブランチへの変更は自動的にサイトへ反映されるようになります。
