import { socket } from './index';

export const socketEvents = ({ setValue }) => {
    socket.on('init', ( characterList ) => {
        setValue(state => { 
            return { ...state, characterList }
        });
    });

    socket.on('search', ( currentCharacters ) => {
        console.log(currentCharacters)
        setValue(state => {
            return { ...state, currentCharacters } 
        });
    });

    socket.on('random', ( currentCharacters ) => {
        console.log(currentCharacters)
        setValue(state => {
            return { ...state, currentCharacters } 
        });
    });

};
