// eslint-disable
import React, { useState } from 'react';

// For NavBar.
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import styled from 'styled-components';

// For the Search bar. Refer components/search.js
import Search from './search'

const Header = ({ placeholder }) => {
	const [character, setCharacter] = useState({})
    const [compare, setCompare] = useState(false)


    const handleEnableCompare = (e) => {
        if (compare){
            setCompare(false)
        }
        else{
            setCompare(true)
        }
    }

	return (
		<header className="App-header">
			<Navbar fixed="top" bg="light" expand="sm">
				<Navbar.Brand href="#home"> {placeholder} </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link>Generate 10 random characters</Nav.Link>
						<Nav.Link onClick={handleEnableCompare}>Compare with target</Nav.Link>
					</Nav>
					<Search value={character} onChange={setCharacter} placeholder="Enter one or more characters. " />
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
}

export default Header;