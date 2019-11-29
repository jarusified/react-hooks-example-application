// eslint-disable
import React, { useState, useCallback, Component, useContext } from "react";
import { For } from 'react-loops'

// Card imports
import Card from 'react-bootstrap/Card'

import { CharacterContext } from "../CharacterContext";

function Character() {
    const { superhero, setSuperHero } = useContext(CharacterContext)

    console.log(superhero)

    return (
        <For of={superhero} as= { hero =>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title> </Card.Title>
                    {hero['name']}
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
            </Card>
        }/>
	);
};

export default Character;