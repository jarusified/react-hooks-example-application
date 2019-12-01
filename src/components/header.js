// eslint-disable
import React, { useState, useEffect,  } from 'react';

// For NavBar.
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import styled from 'styled-components';

// For the Search bar. Refer components/search.js
import Search from './search'
import Button from 'react-bootstrap/Button';
import { random } from '../sockets/emit';

const Header = ({ placeholder, characterList }) => {
	const [character, setCharacter] = useState({})
	const [compare, setCompare] = useState(false)
	
	const [characterIDList, setCharacterIDList] = useState([])

	// Number of characters to show when random mode is selected.
	const [randomCharacter, setRandomCharacter] = useState(10)



	const handleEnableCompare = (e) => {
		if (compare) {
			setCompare(false)
		}
		else {
			setCompare(true)
		}
	}

	const generateRandom = (e) => {
		random({
			"random_number": 4
		})
	}

	return (
		<header className="App-header">
			<Navbar fixed="top" bg="light" expand="sm">
				<Navbar.Brand href="#home"> {placeholder} </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Button variant="outline-info"
							onClick={generateRandom}>
							Generate 10 random characters
						</Button>
					</Nav>
					<Search value={character} onChange={setCharacter} placeholder="Enter one or more characters. " characterList = { characterList } />
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
}

export default Header;