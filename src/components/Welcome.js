import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DungeonService from '../services/dungeonService';


function Welcome() {
  // [Variable in State, Setter of Variable]
  // hooks are indicated by the word `use` (linter looks for use keyword)
  const [welcome, setWelcome] = useState('Just a moment...');

  // Effects run immediately after render (including the first render)
  // Don't be tempted to make useEffect async console will scream at you
  useEffect(() => {
    // Async calls are to be made inside useEffect then immediately called below
    (async function getWelcome() {
      try {
        const welcomeServer = await DungeonService.getWelcome();
        setWelcome(welcomeServer);
      } catch (error) {
        console.error(error);
      }
    }());
    // Array at the end is requried to avoid looping
    // indicates that this is only triggered on mount
    // if we put [propVariable] inside it would trigger again on propVariable change
    // See https://www.robinwieruch.de/react-hooks-fetch-data/ for indepth material
  }, []);

  return (
    <Title>
      { welcome }
    </Title>
  );
}
export default Welcome;

const Title = styled.h1`
    padding: 20px;
    margin: 0px;
    `;
