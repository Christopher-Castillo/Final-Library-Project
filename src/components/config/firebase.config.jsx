import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAcRdkfwaIUe5qnlh8YhMFDCsiRkuUSdeE",
    authDomain: "final-library-project.firebaseapp.com",
    projectId: "final-library-project",
    storageBucket: "final-library-project.appspot.com",
    messagingSenderId: "50597820299",
    appId: "1:50597820299:web:d0fb3e5ccf16640f6ea18e",
    measurementId: "G-87KTRTN7L7"
  };
  const app = initializeApp(firebaseConfig, {}); // add an empty object as the second argument
  export default firebaseConfig;
