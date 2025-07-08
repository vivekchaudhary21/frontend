import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket.js'
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  VStack,
  Link,
} from '@chakra-ui/react'

const CreateGame = ({ setUsername }) => {
  const [inputUsername, setInputUsername] = useState(
    localStorage.getItem('hostUsername') || ''
  )
  const [formStatus, setFormStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('connect', () => {
      console.log('CreateGame connected to server with socket ID:', socket.id)
    })

    socket.on('connect_error', (error) => {
      console.error('CreateGame socket connection error:', error.message)
      setFormStatus('Failed to connect to server. Please try again.')
    })

    socket.on('gameCreated', ({ gameId }) => {
      console.log('Game created with ID:', gameId)
      localStorage.setItem('gameId', gameId)
      setUsername(inputUsername)
      setFormStatus('Game created successfully!')
      socket.io.opts.query = { gameId, username: inputUsername }
      navigate(`/question-setup/${gameId}`)
    })

    socket.on('createGameError', ({ message }) => {
      console.error('Create game error:', message)
      setFormStatus(message)
    })

    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('gameCreated')
      socket.off('createGameError')
    }
  }, [inputUsername, setUsername, navigate])

  const createGame = () => {
    console.log('CreateGame button clicked, username:', inputUsername)
    if (!inputUsername) {
      setFormStatus('Please enter a username.')
      return
    }
    setFormStatus('Creating game...')
    localStorage.setItem('hostUsername', inputUsername)
    localStorage.setItem('username', inputUsername)
    if (!socket.connected) {
      socket.connect()
    }
    socket.emit('createGame', { username: inputUsername })

    const timeout = setTimeout(() => {
      if (socket.connected) {
        setFormStatus('Server did not respond. Please try again.')
      }
    }, 5000)

    socket.once('gameCreated', () => clearTimeout(timeout))
    socket.once('createGameError', () => clearTimeout(timeout))
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
          Create Game
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
          onClick={createGame}
          colorScheme="blue"
          px={6}
          py={3}
          rounded="full"
          isDisabled={!inputUsername}
          _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
          aria-label="Create game"
        >
          Create Game
        </Button>
        <Link
          href="/join"
          color="blue.600"
          _hover={{ textDecoration: 'underline' }}
          aria-label="Go to join game page"
        >
          Want to join a game instead?
        </Link>
      </VStack>
    </Box>
  )
}

export default CreateGame
