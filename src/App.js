import React from 'react';

// For NavBar.
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

// Panel imports
// import Panel from 'react-bootstrap/Panel'

// Card imports
import Card from 'react-bootstrap/Card'

// CSS imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Socket imports
// import { ClientSocket, useSocket } from "use-socketio";
import socket from 'socket.io-client';

// Use socket to fetch request to data 
// Socket server's url and action 
const useSocket = (serverUrl, action) => {
	const [data, setData] = React.useState([]);
	const [isConnected, setConnected] = React.useState(false);

	React.useEffect(() => {
		const client = socket.connect(serverUrl);

		client.emit('init')

		client.on("connect", () => {
			console.log("Connected :)")
			setConnected(true)
		});
		client.on("disconnect", () => {
			console.log("Disconnected :(")
			setConnected(false)
		});
		client.on(action, (data) => {
			console.log("Data incoming [", action, "]: ", data)
			setData(data);
		})
	}, [serverUrl, action, isConnected]);

	return { data, isConnected };
}

const Character = () => {

	// const [characters, setCharacter] = useState([])

	const getUrl = "http://127.0.0.1:5000"

	const { data, isConnected } = useSocket(getUrl, 'init')
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>
				<Card.Title>{ data } </Card.Title>
				<Card.Text>
					{`CONNECTED: ${isConnected}`}
    			</Card.Text>
				<Button variant="dark">Reveal more information</Button>
			</Card.Body>
		</Card>
	);
};

function App() {

	return (
		<div className="App">
			<header className="App-header">
				<Navbar fixed="top" bg="light" expand="sm">
					<Navbar.Brand href="#home"> SuperHero API challenge - Suraj</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#home">Compare Characters</Nav.Link>
							<NavDropdown title="Visualize using" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Form inline>
							<FormControl type="text" placeholder="Search" className="mr-sm-2" />
							<Button variant="outline-success">Search</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</header>
			<Character />
		</div>

	);
}

export default App;
