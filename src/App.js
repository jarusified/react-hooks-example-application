import React, { useState, useMemo, useContext } from 'react';
import { CharacterContext } from './CharacterContext'

// Panel imports
// import Panel from 'react-bootstrap/Panel'

// CSS imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Header from './components/header';
import Character from './components/character';

import SocketContext from './components/socket_context/context'

const App = () => {
	const [superhero, setSuperHero] = useState([])

	const providerValue = useMemo(() => ({ superhero, setSuperHero }), [superhero, setSuperHero])

	const { currentCharacters, characterList } = useContext(SocketContext)

	return (
		<CharacterContext.Provider value={providerValue}>
			<Header placeholder="SuperHero API challenge - Suraj" characterList={ characterList }/>
			<Character currentCharacters={ currentCharacters }/>
		</CharacterContext.Provider>
	);
}

export default App;
