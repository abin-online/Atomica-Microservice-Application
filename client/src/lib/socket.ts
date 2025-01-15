import { io } from 'socket.io-client';

const socketURL = 'ws://localhost:5005';

const socket = io(socketURL, {
    reconnectionDelayMax: 10000,
})

export default socket