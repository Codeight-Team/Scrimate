import { createContext } from 'react';
import io from 'socket.io-client';

const socket = io.connect('ws://66.42.49.240:8900', {transport:['websocket'], jsonp: false})

const SocketContext = createContext();

export {socket, SocketContext};
