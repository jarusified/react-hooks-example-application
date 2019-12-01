import { socket } from "./index";

export const connect = () => {
    socket.emit('connect');
};

export const disconnect = () => {
    socket.emit('disconnect');
};

export const init = () => {
    socket.emit('init', {});
};

export const search = (query) => {
    socket.emit('search', query);
};

export const random = (query) => {
    socket.emit('random', query)
}