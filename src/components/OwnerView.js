import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CharacterBackground from './CharacterBackground';
import DungeonService from '../services/dungeonService';

function OwnerView({ owner }) {
  const [characters, updateCharacters] = useState([]);

  useEffect(() => {
    (async function getCharactersByOwner() {
      const characterList = await DungeonService.getCharactersByOwner(owner);
      updateCharacters(characterList);
    }());
  }, []);

  const characterCards = [];
  characters.forEach((character) => {
    characterCards.push(
      <Link to={{
        pathname: '/character',
        search: `?id=${character.id}`,
        state: character,
      }}
      >
        <CharacterBackground character={character} key={character.id} />
      </Link>,
    );
  });

  return (
    <Container>
      { characterCards }
    </Container>
  );
}

export default OwnerView;

OwnerView.propTypes = {
  owner: PropTypes.string.isRequired,
};

const Container = styled.div`
    display:flex;
`;
