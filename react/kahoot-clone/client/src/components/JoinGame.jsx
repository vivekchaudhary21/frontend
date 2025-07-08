import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  VStack,
  Link,
} from '@chakra-ui/react'

const JoinGame = ({ setUsername }) => {
  const [inputUsername, setInputUsername] = useState(
    localStorage.getItem('username') || ''
  )
  const [inputGameId, setInputGameId] = useState(
    localStorage.getItem('gameId') || ''
  )
  const [formStatus, setFormStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('connect', () => {
      console.log('JoinGame connected to server with socket ID:', socket.id)
    })

    socket.on('connect_error', (error) => {
      console.error('JoinGame socket connection error:', error.message)
      setFormStatus('Failed to connect to server. Please try again.')
    })

    socket.on('joinSuccess', () => {
      console.log(
        'Join successful for gameId:',
        inputGameId,
        'username:',
        inputUsername
      )
      setUsername(inputUsername)
      setFormStatus('Joined game successfully!')
      navigate(`/game/${inputGameId}`)
    })

    socket.on('joinError', ({ message }) => {
      console.error('Join game error:', message)
      setFormStatus(message)
    })

    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('joinSuccess')
      socket.off('joinError')
    }
  }, [inputGameId, inputUsername, setUsername, navigate])

  const joinGame = () => {
    console.log(
      'JoinGame button clicked, gameId:',
      inputGameId,
      'username:',
      inputUsername
    )
    if (!inputUsername || !inputGameId) {
      setFormStatus('Please enter both username and game ID.')
      return
    }
    setFormStatus('Joining game...')
    localStorage.setItem('username', inputUsername)
    localStorage.setItem('gameId', inputGameId)
    if (!socket.connected) {
      socket.io.opts.query = { gameId: inputGameId, username: inputUsername }
      socket.connect()
    }
    socket.emit('joinGame', { gameId: inputGameId, username: inputUsername })

    const timeout = setTimeout(() => {
      if (socket.connected) {
        setFormStatus('Server did not respond. Please try again.')
      }
    }, 5000)

    socket.once('joinSuccess', () => clearTimeout(timeout))
    socket.once('joinError', () => clearTimeout(timeout))
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.500, purple.600)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <VStack
        bg="white"
        rounded="2xl"
        shadow="2xl"
        p={8}
        maxW="md"
        w="full"
        spacing={6}
        textAlign="center"
      >
        <Heading fontSize="4xl" color="gray.800">
          Join Game
        </Heading>
        <Input
          type="text"
          placeholder="Enter Username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          borderColor="gray.300"
          focusBorderColor="blue.500"
          p={3}
          aria-label="Username"
        />
        <Input
          type="text"
          placeholder="Enter Game ID"
          value={inputGameId}
          onChange={(e) => setInputGameId(e.target.value)}
          borderColor="gray.300"
          focusBorderColor="blue.500"
          p={3}
          aria-label="Game ID"
        />
        {formStatus && (
          <Text
            fontSize="sm"
            color={
              formStatus.includes('successfully') ? 'green.600' : 'red.600'
            }
          >
            {formStatus}
          </Text>
        )}
        <Button
          onClick={joinGame}
          colorScheme="blue"
          px={6}
          py={3}
          rounded="full"
          isDisabled={!inputUsername || !inputGameId}
          _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
          aria-label="Join game"
        >
          Join Game
        </Button>
        <Link
          href="/create"
          color="blue.600"
          _hover={{ textDecoration: 'underline' }}
          aria-label="Go to create game page"
        >
          Want to create a game instead?
        </Link>
      </VStack>
    </Box>
  )
}

export default JoinGame
