import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Leaderboard from './Leaderboard'
import { socket } from '../socket'
import {
  Box,
  Button,
  Text,
  Heading,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Game = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [gameState, setGameState] = useState(null)
  const [players, setPlayers] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFinalLeaderboard, setShowFinalLeaderboard] = useState(false)
  const [questionSource, setQuestionSource] = useState('')
  const [timerExpired, setTimerExpired] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null)
  const [answerCounts, setAnswerCounts] = useState([])
  const prevPlayersRef = useRef([])
  const lastGameStateRef = useRef(null)

  useEffect(() => {
    console.log('Game.jsx useEffect, gameId:', gameId)
    const username = localStorage.getItem('username')
    if (!username) {
      console.log('No username in localStorage, redirecting to /')
      setFormStatus('No username found. Please join a game.')
      navigate('/')
      return
    }

    const savedAnswer = localStorage.getItem(
      `selectedAnswer_${gameId}_${username}`
    )
    const savedQuestionIndex = localStorage.getItem(
      `questionIndex_${gameId}_${username}`
    )
    if (savedAnswer !== null && savedQuestionIndex !== null) {
      console.log(
        `Restoring selectedAnswer: ${savedAnswer} for question ${savedQuestionIndex}, game ${gameId}, username ${username}`
      )
      setSelectedAnswer(parseInt(savedAnswer))
    }

    socket.io.opts.query = { gameId, username }
    socket.connect()

    console.log(
      'Emitting reconnect for player, username:',
      username,
      'gameId:',
      gameId
    )
    socket.emit('reconnect', { gameId, username, role: 'player' })

    socket.on(
      'reconnectSuccess',
      ({
        gameState,
        players,
        showLeaderboard,
        gameOver,
        questionSource,
        showFinalLeaderboard,
        gameId,
      }) => {
        console.log('Player received reconnectSuccess:', {
          gameState,
          players,
          showLeaderboard,
          gameOver,
          questionSource,
          showFinalLeaderboard,
          gameId,
        })
        setGameState(gameState)
        setPlayers(players)
        setGameOver(gameOver)
        setQuestionSource(questionSource || 'Quiz Game')
        setShowFinalLeaderboard(showFinalLeaderboard)
        setTimerExpired(showLeaderboard)
        setCurrentQuestionIndex(gameState?.currentQuestionIndex ?? null)
        setAnswerCounts(gameState?.answerCounts || [])
        lastGameStateRef.current = gameState
        if (
          gameState?.currentQuestionIndex !== null &&
          savedAnswer !== null &&
          savedQuestionIndex !== String(gameState?.currentQuestionIndex)
        ) {
          console.log(
            `Question index changed (saved: ${savedQuestionIndex}, current: ${gameState?.currentQuestionIndex}), clearing selectedAnswer`
          )
          setSelectedAnswer(null)
          setIsAnswerCorrect(null)
          localStorage.removeItem(`selectedAnswer_${gameId}_${username}`)
        }
        localStorage.setItem(
          `questionIndex_${gameId}_${username}`,
          gameState?.currentQuestionIndex ?? ''
        )
      }
    )

    socket.on('reconnectError', ({ message }) => {
      console.error('Player reconnect error:', message)
      setFormStatus(`Reconnect failed: ${message}`)
      localStorage.removeItem('username')
      localStorage.removeItem('gameId')
      localStorage.removeItem(`selectedAnswer_${gameId}_${username}`)
      localStorage.removeItem(`questionIndex_${gameId}_${username}`)
      navigate('/')
      toast.error(message, { position: 'top-right', autoClose: 3000 })
    })

    socket.on('connect', () => {
      console.log('Player connected to server with socket ID:', socket.id)
      socket.emit('playerReady', { username, gameId })
    })

    socket.on('connect_error', (error) => {
      console.error('Player socket connection error:', error.message)
      setFormStatus('Failed to connect to server. Please try again.')
    })

    socket.on('gameState', (state) => {
      console.log('Player received gameState:', {
        currentQuestionIndex: state.currentQuestionIndex,
        previousQuestionIndex: currentQuestionIndex,
        selectedAnswer,
        hasQuestion: !!state.currentQuestion,
        timeLeft: state.timeLeft,
        answerCounts: state.answerCounts,
      })
      if (
        lastGameStateRef.current &&
        lastGameStateRef.current.currentQuestionIndex ===
          state.currentQuestionIndex &&
        lastGameStateRef.current.timeLeft === state.timeLeft
      ) {
        console.log('Skipping redundant gameState update')
        return
      }
      lastGameStateRef.current = state
      if (
        state.currentQuestionIndex !== null &&
        state.currentQuestionIndex !== undefined &&
        state.currentQuestion &&
        state.currentQuestionIndex !== currentQuestionIndex
      ) {
        console.log(
          'New question detected, resetting selectedAnswer and isAnswerCorrect'
        )
        setSelectedAnswer(null)
        setIsAnswerCorrect(null)
        setAnswerCounts([])
        localStorage.removeItem(`selectedAnswer_${gameId}_${username}`)
        localStorage.setItem(
          `questionIndex_${gameId}_${username}`,
          state.currentQuestionIndex
        )
      }
      setGameState(state)
      setCurrentQuestionIndex(state.currentQuestionIndex ?? null)
      setGameOver(false)
      setShowFinalLeaderboard(false)
      setTimerExpired(false)
      setAnswerCounts(state.answerCounts || [])
    })

    socket.on('updatePlayers', (playerList) => {
      console.log('Player received updatePlayers:', playerList)
      const prevPlayers = prevPlayersRef.current
      const currentPlayers = playerList

      const joinedPlayers = currentPlayers.filter(
        (cp) => !prevPlayers.some((pp) => pp.username === cp.username)
      )
      const leftPlayers = prevPlayers.filter(
        (pp) => !currentPlayers.some((cp) => cp.username === pp.username)
      )

      joinedPlayers.forEach((player) => {
        if (player.username !== username) {
          toast.info(`${player.username} has joined the game!`, {
            position: 'top-right',
            autoClose: 3000,
          })
        }
      })

      leftPlayers.forEach((player) => {
        if (player.username !== username) {
          toast.warn(`${player.username} has left the game.`, {
            position: 'top-right',
            autoClose: 3000,
          })
        }
      })

      setPlayers(currentPlayers)
      prevPlayersRef.current = currentPlayers
    })

    socket.on('timerExpired', ({ questionSource, gameId, answerCounts }) => {
      console.log('Player received timerExpired:', {
        questionSource,
        gameId,
        answerCounts,
      })
      setTimerExpired(true)
      setQuestionSource(questionSource || 'Quiz Game')
      setAnswerCounts(answerCounts || [])
      if (selectedAnswer !== null && gameState?.currentQuestion) {
        const isCorrect =
          selectedAnswer === gameState.currentQuestion.correctAnswer
        setIsAnswerCorrect(isCorrect)
        console.log(
          `Answer check: selectedAnswer=${selectedAnswer}, correctAnswer=${gameState.currentQuestion.correctAnswer}, isCorrect=${isCorrect}`
        )
      }
    })

    socket.on('gameOver', ({ leaderboard, questionSource, gameId }) => {
      console.log('Player received gameOver:', {
        leaderboard,
        questionSource,
        gameId,
      })
      setPlayers(leaderboard)
      setGameOver(true)
      setQuestionSource(questionSource || 'Quiz Game')
      setShowFinalLeaderboard(false)
      setTimerExpired(false)
      setSelectedAnswer(null)
      setIsAnswerCorrect(null)
      setAnswerCounts([])
      localStorage.removeItem(`selectedAnswer_${gameId}_${username}`)
      localStorage.removeItem(`questionIndex_${gameId}_${username}`)
    })

    socket.on(
      'showFinalLeaderboard',
      ({ leaderboard, questionSource, gameId, gameOver }) => {
        console.log('Player received showFinalLeaderboard:', {
          leaderboard,
          questionSource,
          gameId,
          gameOver,
        })
        setPlayers(leaderboard)
        setShowFinalLeaderboard(true)
        setQuestionSource(questionSource || 'Quiz Game')
        setGameOver(gameOver)
        setTimerExpired(false)
        setSelectedAnswer(null)
        setIsAnswerCorrect(null)
        setAnswerCounts([])
        localStorage.removeItem(`selectedAnswer_${gameId}_${username}`)
        localStorage.removeItem(`questionIndex_${gameId}_${username}`)
      }
    )

    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('gameState')
      socket.off('updatePlayers')
      socket.off('timerExpired')
      socket.off('gameOver')
      socket.off('showFinalLeaderboard')
      socket.off('reconnectSuccess')
      socket.off('reconnectError')
    }
  }, [gameId, navigate, currentQuestionIndex, selectedAnswer])

  const submitAnswer = (answerIndex) => {
    const username = localStorage.getItem('username')
    if (selectedAnswer === null && gameState && !gameOver && !timerExpired) {
      console.log('Submitting answer:', {
        gameId,
        username,
        answerIndex,
        currentQuestionIndex,
      })
      setSelectedAnswer(answerIndex)
      localStorage.setItem(`selectedAnswer_${gameId}_${username}`, answerIndex)
      localStorage.setItem(
        `questionIndex_${gameId}_${username}`,
        currentQuestionIndex
      )
      socket.emit('submitAnswer', {
        gameId,
        username,
        answerIndex,
      })
    } else {
      console.log('Answer submission blocked:', {
        selectedAnswer,
        gameState: !!gameState,
        gameOver,
        timerExpired,
      })
    }
  }

  const leaveGame = () => {
    const username = localStorage.getItem('username')
    console.log(`Player ${username} is leaving game ${gameId}`)
    socket.emit('leaveGame', { gameId, username })
    localStorage.removeItem('username')
    localStorage.removeItem('gameId')
    localStorage.removeItem(`selectedAnswer_${gameId}_${username}`)
    localStorage.removeItem(`questionIndex_${gameId}_${username}`)
    navigate('/join')
    toast.info('You have left the game.', {
      position: 'top-right',
      autoClose: 3000,
    })
  }

  const chartData = {
    labels:
      gameState?.currentQuestion?.options?.map(
        (_, index) => `Option ${index + 1}`
      ) || [],
    datasets: [
      {
        label: 'Votes',
        data: answerCounts,
        backgroundColor:
          gameState?.currentQuestion?.options?.map((_, index) =>
            index === gameState.currentQuestion.correctAnswer
              ? 'rgba(75, 192, 192, 0.6)'
              : selectedAnswer === index
              ? isAnswerCorrect
                ? 'rgba(75, 192, 192, 0.6)'
                : 'rgba(255, 99, 132, 0.6)'
              : 'rgba(54, 162, 235, 0.6)'
          ) || [],
        borderColor:
          gameState?.currentQuestion?.options?.map((_, index) =>
            index === gameState.currentQuestion.correctAnswer
              ? 'rgba(75, 192, 192, 1)'
              : selectedAnswer === index
              ? isAnswerCorrect
                ? 'rgba(75, 192, 192, 1)'
                : 'rgba(255, 99, 132, 1)'
              : 'rgba(54, 162, 235, 1)'
          ) || [],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Answer Distribution',
        color: 'gray.800',
        font: { size: 16, weight: 'bold' },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: 'gray.600' },
        title: { display: true, text: 'Number of Votes', color: 'gray.800' },
      },
      x: {
        ticks: { color: 'gray.600' },
        title: { display: true, text: 'Options', color: 'gray.800' },
      },
    },
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.500, purple.600)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      position="relative"
    >
      <Box bg="white" rounded="2xl" shadow="2xl" p={8} maxW="3xl" w="full">
        {gameOver && !showFinalLeaderboard ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="4xl" color="gray.800">
              {questionSource || 'Quiz Game'}
            </Heading>
            <Heading as="h2" size="lg" color="gray.800">
              Game Over!
            </Heading>
            <Text color="gray.600">
              Waiting for the host to show the leaderboard...
            </Text>
          </VStack>
        ) : showFinalLeaderboard ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="4xl" color="gray.800">
              {questionSource || 'Quiz Game'}
            </Heading>
            <Leaderboard players={players} gameOver={gameOver} />
          </VStack>
        ) : timerExpired && !gameOver ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="4xl" color="gray.800">
              {questionSource || 'Quiz Game'}
            </Heading>
            <Heading as="h2" size="lg" color="gray.800">
              Question Ended
            </Heading>
            {gameState && gameState.currentQuestion && (
              <>
                <Text
                  fontSize="2xl"
                  fontWeight="semibold"
                  color="gray.800"
                  mb={2}
                >
                  Question {gameState.currentQuestionIndex + 1}:{' '}
                  {gameState.currentQuestion.text}
                </Text>
                {selectedAnswer === null && (
                  <Text fontSize="lg" color="gray.600" mb={4}>
                    You did not submit an answer.
                  </Text>
                )}
                <Box w="full" maxW="600px" mb={4}>
                  <Bar data={chartData} options={chartOptions} />
                </Box>
                <SimpleGrid columns={[1, 2]} gap={4} mb={4}>
                  {gameState.currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      colorScheme={
                        index === gameState.currentQuestion.correctAnswer
                          ? 'green'
                          : selectedAnswer === index
                          ? isAnswerCorrect
                            ? 'green'
                            : 'red'
                          : 'blue'
                      }
                      opacity={
                        index !== gameState.currentQuestion.correctAnswer &&
                        selectedAnswer !== index
                          ? 0.5
                          : 1
                      }
                      p={4}
                      rounded="lg"
                      isDisabled
                      aria-label={`Option ${index + 1}`}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text>{option}</Text>
                    </Button>
                  ))}
                </SimpleGrid>
                <Text color="gray.600">Waiting for the host to proceed...</Text>
              </>
            )}
          </VStack>
        ) : gameState && gameState.currentQuestion ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="3xl" color="gray.800">
              {questionSource || 'Quiz Game'}
            </Heading>
            <Box>
              <Text
                fontSize="2xl"
                fontWeight="semibold"
                color="gray.800"
                mb={2}
              >
                Question {gameState.currentQuestionIndex + 1}:{' '}
                {gameState.currentQuestion.text}
              </Text>
              <Text fontSize="lg" color="gray.600" mb={4}>
                Time Left: {gameState.timeLeft}s
              </Text>
              <SimpleGrid columns={[1, 2]} gap={4}>
                {gameState.currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => submitAnswer(index)}
                    colorScheme={selectedAnswer === index ? 'green' : 'blue'}
                    p={4}
                    rounded="lg"
                    isDisabled={selectedAnswer !== null || timerExpired}
                    _hover={
                      selectedAnswer === null && !timerExpired
                        ? { transform: 'scale(1.05)', transition: 'all 0.3s' }
                        : {}
                    }
                    aria-label={`Select option ${index + 1}`}
                  >
                    {option}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        ) : (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="3xl" color="gray.800">
              {questionSource || 'Quiz Game'}
            </Heading>
            <Text color="gray.600">
              Waiting for the host to start the game...
            </Text>
          </VStack>
        )}
        {formStatus && (
          <Text
            fontSize="sm"
            color="red.700"
            bg="red.50"
            p={2}
            rounded="lg"
            mt={3}
          >
            {formStatus}
          </Text>
        )}
      </Box>
      <Button
        onClick={leaveGame}
        colorScheme="red"
        px={6}
        py={3}
        rounded="full"
        position="fixed"
        bottom={4}
        right={4}
        _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
        aria-label="Leave game"
        zIndex={10}
      >
        Leave Game
      </Button>
    </Box>
  )
}

export default Game
