import { io } from 'socket.io-client'

const socket = io('http://localhost:4000', {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  query: {
    gameId: localStorage.getItem('gameId') || '',
    username: localStorage.getItem('username') || '',
  },
})

socket.on('connect', () => {
  console.log('Socket connected:', socket.id)
})

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message)
})

export { socket }
