// eslint-disable
import React, { useState, useEffect, } from 'react';

// For NavBar.
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// For Random number dropdown
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';

// For Random number input
import Form from 'react-bootstrap/Form';

// Styling
import styled from 'styled-components';

// For the Search bar. Refer components/search.js
import Search from './search'
import Button from 'react-bootstrap/Button';
import { random } from '../sockets/emit';

const Header = ({ placeholder, characterList }) => {
	const [character, setCharacter] = useState({})
	const [randomNumber, setRandomNumber] = useState(10)

	const generateRandom = (e) => {
		random({
			"random_number": randomNumber
		})
	}

	const updateRandomNumber = (e) => {
		let number = e.target.value
		if (isNaN(number)){
			// Return error
		}
		else{
			if(number >= 1 && number <= 732){
				setRandomNumber(number)
			}
			else{
				// Return error
			}
		}
	}

	return (
		<header className="App-header">
			<Navbar fixed="top" bg="light" expand="sm">
				<Navbar.Brand href="#home"> {placeholder} </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{/* Button to determine the number of random characters. Not quite working*/}
						{/* <SplitButton
							title={`Generate ${randomNumber} random characters`}
							variant="outline-info"
							id={`dropdown-split-variants-random`}
							key='asas'
						>
							<Dropdown.Item eventKey="1">
								Number = 
								<Form.Control onClick={ updateRandomNumber } size="sm" type="text" placeholder="Enter number (1 to 732)" />
							</Dropdown.Item>
						</SplitButton> */}
						<Button variant="outline-info"
							onClick={generateRandom}>
							Generate 10 random characters
						</Button>
					</Nav>
					<Search value={character} onChange={setCharacter} placeholder="Enter one or more characters. " characterList={characterList} />
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
}

export default Header;