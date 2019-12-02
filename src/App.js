import React, { useState, useMemo, useContext, Fragment } from 'react';

// Panel imports
// import Panel from 'react-bootstrap/Panel'

// CSS imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Component imports
import Header from './components/header';
import Character from './components/character';

// Socket context
import SocketContext from './components/socket_context/context'

const App = () => {
	const { currentCharacters, characterList } = useContext(SocketContext)

	return (
		<Fragment>
			<Header placeholder="SuperHero API challenge - Suraj" characterList={characterList} />
			<Character currentCharacters={currentCharacters} />
		</Fragment>
	);
}

export default App;
