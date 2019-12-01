import io from "socket.io-client";

import { socketEvents } from "./on";
import { init } from "./emit";

const url = "http://localhost:4000"

export const socket = io(url);

export const initSockets = ({ setValue }) => {
    socketEvents({ setValue });

    init();
};