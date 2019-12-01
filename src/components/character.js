// eslint-disable
import React, { useState } from "react";
import { For } from 'react-loops'
import styled from 'styled-components';

// Card imports
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

//ListGroup imports
import ListGroup from 'react-bootstrap/ListGroup'

// Text import
import Text from 'react-bootstrap/FormText'

// Card flip animation. 
import ReactCardFlip from 'react-card-flip';

// Icon import.
import { FaRedo } from 'react-icons/fa';
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'

const ImgContainer = styled.div`
  position: relative;
  flex-basis: 100%;
  flex-basis: calc(33.333% - 20px);
  margin: 10px;
  cursor: pointer;
  transition: 0.5s all ease-in;
`;
const ImgIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-right: 20px;
  svg {
    margin-right: 10px;
  }
`;
const ImgMeta = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${ImgContainer}:hover & {
    display: flex !important;
  }
`;
const Img = styled.img`
  cursor: pointer;
  width: 100%;
  height: 300px;
`;

const MyCardGroup = styled(CardGroup)`
  padding-top: 60px;
  padding-left: 5px;
`;

const MyCharacterHeader = styled(Card.Header)`
  font-size: 20px;
  font-weight: 200%;
`

const MyBoldText = styled(Text)`
  font-weight: 900;
  font-size: 14px;
  padding-left: 2px
`

function Character({ currentCharacters }) {

    const [isFlipped, setIsFlipped] = useState(false)
    const [isTarget, setIsTarget] = useState(false)

    const reverseFlip = (e) => {

    }

    const assignAsTarget = (e) => {

    }

    const unassignAsTarget = (e) => {

    }

    return (
        <MyCardGroup style={{ width: 20 * currentCharacters.length + 'rem', fontSize: '12px' }}>
            <For of={currentCharacters} as={hero =>

                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <Card className="card" border="info" style={{ width: '18rem' }}>
                        <MyCharacterHeader>
                            {hero.name}
                            <FaRedo style={{ float: 'right' }} onClick={ reverseFlip }></FaRedo>

                            <AiTwotoneStar style={{ marginRight: '5px', float: 'right', display: isTarget ? 'block' : 'none' }} onClick={assignAsTarget}></AiTwotoneStar> :
                            <AiOutlineStar style={{ marginRight: '5px', float: 'right', display: isTarget ? 'none' : 'block' }} onClick={unassignAsTarget}></AiOutlineStar>

                        </MyCharacterHeader>
                        <ImgContainer>
                            <Img src={hero.image.url} />
                            <ImgMeta>
                                <ImgIcons>
                                </ImgIcons>
                            </ImgMeta>
                        </ImgContainer>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <MyBoldText> Real name </MyBoldText>
                                    {hero['biography']['full-name']}</ListGroup.Item>
                                <ListGroup.Item>
                                    <MyBoldText> Origin </MyBoldText>
                                    {hero['biography']['place-of-birth']}</ListGroup.Item>

                                <ListGroup.Item>
                                    <MyBoldText> Occupation </MyBoldText>
                                    {hero['work']['occupation']}</ListGroup.Item>
                                <ListGroup.Item>
                                    <MyBoldText> First Appearance </MyBoldText>
                                    {hero['work']['first-appearance']}</ListGroup.Item>
                                <ListGroup.Item>
                                    <MyBoldText> Publisher </MyBoldText>
                                    {hero['biography']['publisher']}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card className="card" border="info" style={{ width: '18rem' }}>
                        <MyCharacterHeader>
                            {hero.name}
                            <FaRedo style={{ float: 'right' }}></FaRedo>

                            {isTarget} ?
                            <AiTwotoneStar style={{ float: 'right' }}></AiTwotoneStar> :
                            <AiOutlineStar style={{ float: 'right' }}></AiOutlineStar>

                        </MyCharacterHeader>
                    </Card>


                </ReactCardFlip>

            } />
        </MyCardGroup>
    );
};

export default Character;