# Clinical Trial Simulator

This is a browser-based simulation game where you manage a clinical trial for a new drug. This project was bootstrapped with Vite and uses React and Firebase.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Firebase project.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/clinical-trial-sim.git
    cd clinical-trial-sim
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Configure Firebase:**
    - Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    - In your project's settings, create a new Web App.
    - Copy the `firebaseConfig` object.
    - Paste your configuration into `src/firebase/firebase.js`, replacing the placeholder values.
    - In the same Firebase project, update `.firebaserc` with your Firebase Project ID.

### Running the Development Server

To run the app in development mode, use:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the URL provided in your terminal) to view it in the browser. The page will reload if you make edits.

### Building for Production

To create a production-ready build of the app, run:

```bash
npm run build
```

This will create a `dist` folder in the project root, which contains the optimized static files for your application.

### Deploying to Firebase Hosting

To deploy the application to Firebase Hosting, you'll need the Firebase CLI.

1.  **Install Firebase CLI:**
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase:**
    ```bash
    firebase login
    ```

3.  **Deploy:**
    ```bash
    firebase deploy --only hosting
    ```
