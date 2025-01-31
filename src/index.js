import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase/app';
import App from './App';
import * as serviceWorker from './serviceWorker';

const secret = process.env.SECRET || './secret_auth_config.json';
const firebaseConfig = require(secret);

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
