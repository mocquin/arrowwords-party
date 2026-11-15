// The only Firebase functions the site uses. `npm run build:vendor` bundles
// them into vendor/firebase.js, so the site loads no script from another host.
export { initializeApp } from 'firebase/app';
export {
  getAuth,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  connectAuthEmulator,
} from 'firebase/auth';
export {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove,
  onValue,
  off,
  push,
  serverTimestamp,
  connectDatabaseEmulator,
} from 'firebase/database';
