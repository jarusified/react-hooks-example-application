import React, { useState, useMemo } from 'react';
import { CharacterContext } from './CharacterContext'

// Panel imports
// import Panel from 'react-bootstrap/Panel'

// CSS imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Header from './components/header';
import Character from './components/character';

const App = () => {
	const [superhero, setSuperHero] = useState([])

	const providerValue = useMemo(() => ({ superhero, setSuperHero }), [superhero, setSuperHero])

	return (
		<CharacterContext.Provider value= {providerValue}>
			<div className="App">
				<Header placeholder="SuperHero API challenge - Suraj" />
				<Character />
			</div >
		</CharacterContext.Provider>

	);
}

export default App;
