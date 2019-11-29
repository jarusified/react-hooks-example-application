import React, { useRef, useState, useCallback, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button'
import socket from 'socket.io-client';
import { CharacterContext } from '../CharacterContext'

const getUrl = "http://127.0.0.1:4000"

export default ({ characters }) => {
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)
    const { superhero, setSuperHero } = useContext(CharacterContext)

    const client = socket.connect(getUrl);

    function socket_request() {
        client.emit('search', {
            'characters': characters
        })
        client.on('search', (data) => {
            // data = JSON.parse(data)
            console.log("Data incoming: ", data)
            
            setSuperHero(data)
        })
    }

    // set isMounted to false when we unmount the component
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const sendRequest = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
        // update state
        setIsSending(true)
        
        // send the actual request
        const data = await socket_request(characters)
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
            setIsSending(false)
    }, [isSending, characters]) // update the callback if the state changes

    return (
        <Button variant="outline-success" disabled={isSending} onClick={sendRequest}>Search</Button>
    )
}