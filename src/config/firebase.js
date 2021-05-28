import { firebase } from "@firebase/app";
import "@firebase/auth";


export const config = {
    apiKey: "AIzaSyDuvbUVOCLozok7Fb4H7_e6xVtbXBFhBBw",
    authDomain: "team-cheapskate.firebaseapp.com",
    projectId: "team-cheapskate",
    storageBucket: "team-cheapskate.appspot.com",
    databaseURL: "https://team-cheapskate-default-rtdb.asia-southeast1.firebasedatabase.app",
    messagingSenderId: "823951002393",
    appId: "1:823951002393:web:1a7ff1774ac17316a55388",
    measurementId: "G-MPLZ3HJ3ZX"
};

firebase.initializeApp(config);
