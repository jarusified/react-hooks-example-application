import { useEffect, useState } from "react";

// Socket imports
// import { ClientSocket, useSocket } from "use-socketio";
import socket from 'socket.io-client';

// Use socket to fetch request to data 
// Socket server's url and action 
const useSocket = (serverUrl, action, query) => {
	const [data, setData] = useState([]);
	const [isConnected, setConnected] = useState(false);

	useEffect(() => {
		const client = socket.connect(serverUrl);

		let debounced = undefined;
		
		client.on("connect", () => {
			console.log("Connected :)")
			setConnected(true)
			debounced = setTimeout(() => {
				client.emit(action, query)
			}, 300)
		});

		client.on("disconnect", () => {
			console.log("Disconnected :(")
			setConnected(false)
		});

		client.on(action, (data) => {
			console.log("Data incoming [", action, "]: ", data)
			setData(data);
			// setConnected(false)
			// client.emit('disconnect')
		})

		return () => {
			clearTimeout(debounced)
		}

	}, [serverUrl]);

	return { data, isConnected } ;
}

export default useSocket;