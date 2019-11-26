import React, { Component } from 'react';

// Panel imports
// import Panel from 'react-bootstrap/Panel'

// CSS imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Header from './components/header';
import Character from './components/character';

function App() {
	return (
		<Component>
			<div className="App">
				<Header placeholder="SuperHero API challenge - Suraj" />
				<Character />
			</div >
		</Component>

	);
}

export default App;
