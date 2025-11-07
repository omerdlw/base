import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const DATABASE_CONFIG = {
    databaseURL: "https://povs-xyz-default-rtdb.firebaseio.com",
    appId: "1:837844751991:web:71a2237085b254d9a81872",
    apiKey: "AIzaSyBNNgnlmFjeiOE__Gd7FPvdDYtM--mz0aY",
    storageBucket: "povs-xyz.firebasestorage.app",
    authDomain: "povs-xyz.firebaseapp.com",
    messagingSenderId: "837844751991",
    projectId: "povs-xyz",
};

let app;
if (!getApps().length) {
    app = initializeApp(DATABASE_CONFIG);
} else {
    app = getApps()[0];
}

const database = getDatabase(app);

export { database };
