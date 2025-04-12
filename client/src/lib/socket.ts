import { io } from 'socket.io-client';

const socket = io('wss://atomica.live', {
  reconnectionDelayMax: 10000,
  transports: ['websocket'],
  path: '/socket.io', 
});

export default socket;
