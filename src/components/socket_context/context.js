import React, { createContext } from "react";

const SocketContext = createContext({
    characterList: [],
    currentCharacters: []
});

export default SocketContext;