import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import OwnerView from './components/OwnerView';
import CharacterView from './components/CharacterView';

import './App.css';

function App() {
  const [user, updateUser] = useState();

  async function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user: info } = await firebase.auth().signInWithPopup(provider);
    return { name: info.displayName, email: info.email, photo: info.photoURL };
  }

  useEffect(() => {
    (async function getUser() {
      const info = await login();
      updateUser(info);
    }());
  }, []);

  return (
    <Router>
      <div className="App ">
        <NavBar user={user} />
        { user
          && <Content>
            <Route path="/" exact render={() => <OwnerView owner={user.email} />} />
            <Route path="/character" exact render={() => <CharacterView />} />
             </Content>
        }
      </div>
    </Router>
  );
}

export default App;

const Content = styled.div`
  display: flex;
`;
