// eslint-disable
import React from 'react';

// For NavBar.
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// For the Search bar. Refer components/search.js
import Search from './search'

function Header ( { placeholder } ) {
	return (
		<header className="App-header">
			<Navbar fixed="top" bg="light" expand="sm">
				<Navbar.Brand href="#home"> { placeholder } </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{/* <Nav.Link href="#home">Compare Characters</Nav.Link>
						<NavDropdown title="Visualize using" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
				<Search placeholder="Enter one or more characters. "/>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
}

export default Header