import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { config } from "./config/firebase";
import { firebase } from "@firebase/app";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import "@firebase/auth";

firebase.initializeApp(config);
const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <App />
    </FirebaseAuthProvider>
  </StrictMode>,
  rootElement
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
