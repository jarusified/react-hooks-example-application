// eslint-disable
import React, { useState, useCallback, Component } from "react";

import Button from 'react-bootstrap/Button'
// Card imports
import Card from 'react-bootstrap/Card'

function Character() {

	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>
				<Card.Title> </Card.Title>

				<Card.Text>
				</Card.Text>
				<Button variant="dark">Reveal more information</Button>
			</Card.Body>
		</Card>
	);
};

export default Character;