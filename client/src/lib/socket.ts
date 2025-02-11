// import { io } from 'socket.io-client';
// import config from '@/config';
// const socketURL = 'ws://localhost:5005';
// console.log(socketURL)
// console.log(config.SOCKET_URL)
// const socket = io(socketURL, {
//     reconnectionDelayMax: 10000,
// })

// export default socket

import { io } from 'socket.io-client';
const socketURL = 'https://atomica.live/collaboration';

const socket = io(socketURL, {
    reconnectionDelayMax: 10000,
    transports: ['websocket'], // Ensure it's using WebSocket for communication
});

export default socket;

