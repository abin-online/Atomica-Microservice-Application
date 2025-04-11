import { io } from 'socket.io-client';
import config from '@/config';

console.log("🔌 Using SOCKET_URL:", config.SOCKET_URL);

const socket = io('wss://atomica.live/socket.io', {
  reconnectionDelayMax: 10000,
  transports: ['websocket'],
  path: '/socket.io', 
});

export default socket;
