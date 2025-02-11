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
const socketURL = 'wss://atomica.live/collaboration';  // Public WebSocket URL via the proxy
console.log(socketURL);

const socket = io(socketURL, {
  reconnectionDelayMax: 10000,
  transports: ['websocket'],  // Use WebSocket only
});

export default socket;
