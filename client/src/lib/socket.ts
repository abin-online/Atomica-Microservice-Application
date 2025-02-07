import { io } from 'socket.io-client';
import config from '@/config';
const socketURL = 'ws://localhost:5005';
console.log(socketURL)
console.log(config.SOCKET_URL)
const socket = io(socketURL, {
    reconnectionDelayMax: 10000,
})

export default socket