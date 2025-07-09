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
  List,
  ListItem,
  Collapse,
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

const Host = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [gameState, setGameState] = useState(null)
  const [players, setPlayers] = useState([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem('selectedQuestions') || '[]')
  )
  const [questionSource, setQuestionSource] = useState(
    localStorage.getItem('questionSource') || ''
  )
  const [predefinedQuestions, setPredefinedQuestions] = useState(
    JSON.parse(localStorage.getItem('predefinedQuestions') || '[]')
  )
  const [showFinalLeaderboard, setShowFinalLeaderboard] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [answerCounts, setAnswerCounts] = useState([])
  const prevPlayersRef = useRef([])

  useEffect(() => {
    console.log('Host.jsx useEffect, gameId:', gameId)
    const username =
      localStorage.getItem('hostUsername') || localStorage.getItem('username')
    if (!username) {
      console.log(
        'No hostUsername or username in localStorage, redirecting to /'
      )
      setFormStatus('No host username found. Please create a new game.')
      navigate('/')
      return
    }

    socket.io.opts.query = { gameId, username }
    socket.connect()

    console.log(
      'Emitting reconnect for host, username:',
      username,
      'gameId:',
      gameId
    )
    socket.emit('reconnect', { gameId, username, role: 'host' })

    socket.on('gameCreated', ({ gameId, predefinedQuestions }) => {
      console.log('Received gameCreated:', { gameId, predefinedQuestions })
      if (predefinedQuestions && predefinedQuestions.length > 0) {
        setPredefinedQuestions(predefinedQuestions)
        localStorage.setItem(
          'predefinedQuestions',
          JSON.stringify(predefinedQuestions)
        )
      }
    })

    socket.on('questionsSet', ({ predefinedQuestions }) => {
      console.log('Received questionsSet:', { predefinedQuestions })
      if (predefinedQuestions && predefinedQuestions.length > 0) {
        setPredefinedQuestions(predefinedQuestions)
        localStorage.setItem(
          'predefinedQuestions',
          JSON.stringify(predefinedQuestions)
        )
      }
    })

    socket.on(
      'reconnectSuccess',
      ({
        gameState,
        players,
        showLeaderboard,
        gameOver,
        questions,
        questionSource,
        predefinedQuestions,
        showFinalLeaderboard,
        gameId,
      }) => {
        console.log('Host received reconnectSuccess:', {
          gameState,
          players,
          showLeaderboard,
          gameOver,
          questions,
          questionSource,
          predefinedQuestions,
          showFinalLeaderboard,
          gameId,
        })
        setGameState(gameState)
        setPlayers(players)
        setShowLeaderboard(showLeaderboard)
        setGameOver(gameOver)
        setShowFinalLeaderboard(showFinalLeaderboard)
        setQuestionSource(questionSource || 'Quiz Game')
        setTimerExpired(showLeaderboard)
        setAnswerCounts(gameState?.answerCounts || [])

        prevPlayersRef.current = players
        if (predefinedQuestions && predefinedQuestions.length > 0) {
          setPredefinedQuestions(predefinedQuestions)
          localStorage.setItem(
            'predefinedQuestions',
            JSON.stringify(predefinedQuestions)
          )
        }
        if (questionSource) {
          setQuestionSource(questionSource)
          localStorage.setItem('questionSource', questionSource)
          if (
            predefinedQuestions.some(
              (topic) => topic.category === questionSource
            ) &&
            questions &&
            questions.length > 0
          ) {
            setQuestions(questions)
            localStorage.setItem('selectedQuestions', JSON.stringify(questions))
          } else {
            const predefined = predefinedQuestions.find(
              (topic) => topic.category === questionSource
            )
            if (predefined) {
              setQuestions(predefined.questions)
              localStorage.setItem(
                'selectedQuestions',
                JSON.stringify(predefined.questions)
              )
            }
          }
        }
        if (gameOver && !gameState) {
          console.warn(
            'gameOver is true but gameState is null, forcing gameOver to false'
          )
        }
      }
    )

    socket.on('reconnectError', ({ message }) => {
      console.error('Host reconnect error:', message)
      setFormStatus(`Reconnect failed: ${message}`)
      localStorage.removeItem('hostUsername')
      localStorage.removeItem('username')
      localStorage.removeItem('gameId')
      localStorage.removeItem('selectedQuestions')
      localStorage.removeItem('questionSource')
      localStorage.removeItem('predefinedQuestions')
      navigate('/')
      alert(message)
    })

    socket.on('connect', () => {
      console.log('Host connected to server with socket ID:', socket.id)
      socket.emit('hostReady', { gameId })
    })

    socket.on('connect_error', (error) => {
      console.error('Host socket connection error:', error.message)
      setFormStatus('Failed to connect to server. Please try again.')
    })

    socket.on('gameState', (state) => {
      console.log('Host received gameState:', state)
      setGameState(state)
      setShowLeaderboard(false)
      setShowFinalLeaderboard(false)
      setGameOver(false)
      setTimerExpired(false)
    })

    socket.on('updatePlayers', (playerList) => {
      console.log('Host received updatePlayers:', playerList)
      const prevPlayers = prevPlayersRef.current
      const currentPlayers = playerList

      const joinedPlayers = currentPlayers.filter(
        (cp) => !prevPlayers.some((pp) => pp.username === cp.username)
      )
      const leftPlayers = prevPlayers.filter(
        (pp) => !currentPlayers.some((cp) => cp.username === pp.username)
      )

      joinedPlayers.forEach((player) => {
        toast.info(`${player.username} has joined the game!`, {
          position: 'top-right',
          autoClose: 3000,
        })
      })

      leftPlayers.forEach((player) => {
        toast.warn(`${player.username} has left the game.`, {
          position: 'top-right',
          autoClose: 3000,
        })
      })

      setPlayers(currentPlayers)
      prevPlayersRef.current = currentPlayers
    })

    socket.on('timerExpired', ({ questionSource, gameId, answerCounts }) => {
      console.log('Host received timerExpired:', {
        questionSource,
        gameId,
        answerCounts,
      })
      setTimerExpired(true)
      setQuestionSource(questionSource || 'Quiz Game')
      setAnswerCounts(answerCounts || [])
    })

    socket.on('gameOver', ({ leaderboard, questionSource, gameId }) => {
      console.log('Host received gameOver:', {
        leaderboard,
        questionSource,
        gameId,
      })
      setPlayers(leaderboard)
      setShowLeaderboard(false)
      setShowFinalLeaderboard(false)
      setGameOver(true)
      setQuestionSource(questionSource || 'Quiz Game')
      setTimerExpired(false)
      setAnswerCounts([])
    })

    socket.on(
      'showFinalLeaderboard',
      ({ leaderboard, questionSource, gameId, gameOver }) => {
        console.log('Host received showFinalLeaderboard:', {
          leaderboard,
          questionSource,
          gameId,
          gameOver,
        })
        setPlayers(leaderboard)
        setShowFinalLeaderboard(true)
        setQuestionSource(questionSource || 'Quiz Game')
        setGameOver(gameOver)
        setTimerExpired(gameOver ? false : true)
        setAnswerCounts([])
      }
    )

    socket.on('setQuestionsError', ({ message }) => {
      console.error('Set questions error:', message)
      setFormStatus(message)
    })

    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('gameState')
      socket.off('updatePlayers')
      socket.off('timerExpired')
      socket.off('gameOver')
      socket.off('showFinalLeaderboard')
      socket.off('setQuestionsError')
      socket.off('reconnectSuccess')
      socket.off('reconnectError')
      socket.off('gameCreated')
      socket.off('questionsSet')
    }
  }, [gameId, navigate])

  const startGame = () => {
    if (questions.length === 0) {
      setFormStatus('No questions selected. Please set up questions first.')
      navigate(`/question-setup/${gameId}`)
      return
    }
    console.log(
      'Emitting setQuestions and startGame for gameId:',
      gameId,
      'with questions:',
      questions,
      'source:',
      questionSource
    )
    socket.emit('setQuestions', {
      gameId,
      questions,
      questionSource,
      isCustom: !predefinedQuestions.some(
        (topic) => topic.category === questionSource
      ),
    })
    socket.emit('startGame', { gameId })
  }

  const endGame = () => {
    console.log('Host ending game:', gameId)
    socket.emit('endGame', { gameId })
  }

  const showLeaderboardHandler = () => {
    console.log('Emitting showFinalLeaderboard for game:', gameId)
    socket.emit('showFinalLeaderboard', { gameId })
  }

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen)
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
              : 'rgba(54, 162, 235, 0.6)'
          ) || [],
        borderColor:
          gameState?.currentQuestion?.options?.map((_, index) =>
            index === gameState.currentQuestion.correctAnswer
              ? 'rgba(75, 192, 192, 1)'
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

  // Calculate total questions for the selected category
  const totalQuestions = questions.length
  const totalAvailableQuestions =
    predefinedQuestions.find((topic) => topic.category === questionSource)
      ?.questions.length || totalQuestions

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.500, purple.600)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box bg="white" rounded="2xl" shadow="2xl" p={8} maxW="3xl" w="full">
        {gameOver && !showFinalLeaderboard ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="4xl" color="gray.800">
              {questionSource || 'Quiz Game'} (Game ID: {gameId})
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Total Questions: {totalQuestions}
            </Text>
            <Heading as="h2" size="lg" color="gray.800">
              Game Over!
            </Heading>
            <Button
              onClick={showLeaderboardHandler}
              colorScheme="blue"
              px={6}
              py={3}
              rounded="full"
              _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
              aria-label="Show leaderboard"
            >
              Show Leaderboard
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem('hostUsername')
                localStorage.removeItem('username')
                localStorage.removeItem('gameId')
                localStorage.removeItem('selectedQuestions')
                localStorage.removeItem('questionSource')
                localStorage.removeItem('predefinedQuestions')
                navigate('/create')
              }}
              colorScheme="red"
              px={6}
              py={3}
              rounded="full"
              _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
              aria-label="Return to lobby"
            >
              Return to Lobby
            </Button>
          </VStack>
        ) : gameOver && showFinalLeaderboard ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="4xl" color="gray.800">
              {questionSource || 'Quiz Game'} (Game ID: {gameId})
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Total Questions: {totalQuestions}
            </Text>
            <Leaderboard players={players} gameOver={gameOver} />
            <Button
              onClick={() => {
                localStorage.removeItem('hostUsername')
                localStorage.removeItem('username')
                localStorage.removeItem('gameId')
                localStorage.removeItem('selectedQuestions')
                localStorage.removeItem('questionSource')
                localStorage.removeItem('predefinedQuestions')
                navigate('/')
              }}
              colorScheme="red"
              px={6}
              py={3}
              rounded="full"
              _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
              aria-label="Return to lobby"
            >
              Return to Lobby
            </Button>
          </VStack>
        ) : timerExpired && !gameOver && !showFinalLeaderboard ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="4xl" color="gray.800">
              {questionSource || 'Quiz Game'} (Game ID: {gameId})
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Total Questions: {totalQuestions}
            </Text>
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
                <Box w="full" maxW="600px" mb={4}>
                  <Bar data={chartData} options={chartOptions} />
                </Box>
                <SimpleGrid columns={[1, 2]} gap={4} mb={4}>
                  {gameState.currentQuestion.options.map((option, index) => (
                    <Box
                      key={index}
                      bg={
                        index === gameState.currentQuestion.correctAnswer
                          ? 'green.100'
                          : 'gray.100'
                      }
                      p={4}
                      rounded="lg"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text>{option}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
                <Button
                  onClick={showLeaderboardHandler}
                  colorScheme="blue"
                  px={6}
                  py={3}
                  rounded="full"
                  _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                  aria-label="Show leaderboard"
                >
                  Show Leaderboard
                </Button>
                <Button
                  onClick={() => socket.emit('nextQuestion', { gameId })}
                  colorScheme="blue"
                  px={6}
                  py={3}
                  rounded="full"
                  _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                  aria-label="Next question"
                >
                  Next Question
                </Button>
              </>
            )}
          </VStack>
        ) : timerExpired && !gameOver && showFinalLeaderboard ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="4xl" color="gray.800">
              {questionSource || 'Quiz Game'} (Game ID: {gameId})
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Total Questions: {totalQuestions}
            </Text>
            <Leaderboard players={players} gameOver={gameOver} />
            <Box display="flex" justifyContent="center" gap={4}>
              <Button
                onClick={() => socket.emit('nextQuestion', { gameId })}
                colorScheme="blue"
                px={6}
                py={3}
                rounded="full"
                _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                aria-label="Next question"
              >
                Next Question
              </Button>
              <Button
                onClick={endGame}
                colorScheme="red"
                px={6}
                py={3}
                rounded="full"
                _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                aria-label="End game"
              >
                End Game
              </Button>
            </Box>
          </VStack>
        ) : gameState && gameState.currentQuestion ? (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="3xl" color="gray.800">
              {questionSource || 'Quiz Game'} (Game ID: {gameId})
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Players: {players.length} | Total Questions: {totalQuestions}
            </Text>
            <Box w="full">
              <Button
                onClick={toggleAccordion}
                w="full"
                bg="gray.200"
                color="gray.800"
                rounded="lg"
                display="flex"
                justifyContent="space-between"
                _hover={{ bg: 'gray.300' }}
                aria-expanded={isAccordionOpen}
                aria-controls="player-list"
              >
                <Text>Player List</Text>
                <Text>{isAccordionOpen ? '▲' : '▼'}</Text>
              </Button>
              <Collapse in={isAccordionOpen}>
                <List id="player-list" mt={2} spacing={2}>
                  {players.map((player, index) => (
                    <ListItem
                      key={index}
                      bg="gray.100"
                      rounded="lg"
                      p={2}
                      display="flex"
                      justifyContent="space-between"
                      color="gray.700"
                    >
                      <Text>{player.username}</Text>
                      <Text fontWeight="semibold">
                        Score: {player.score || 0}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
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
              <Box display="flex" justifyContent="center" gap={4}>
                <Button
                  onClick={() => socket.emit('nextQuestion', { gameId })}
                  colorScheme="blue"
                  px={6}
                  py={3}
                  rounded="full"
                  _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                  aria-label="Next question"
                >
                  Next Question
                </Button>
                <Button
                  onClick={endGame}
                  colorScheme="red"
                  px={6}
                  py={3}
                  rounded="full"
                  _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                  aria-label="End game"
                >
                  End Game
                </Button>
              </Box>
            </Box>
          </VStack>
        ) : (
          <VStack
            spacing={6}
            textAlign="center"
            animation="fade-in 0.5s ease-out"
          >
            <Heading fontSize="3xl" color="gray.800">
              {questionSource || 'Quiz Game'} (Game ID: {gameId})
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Players: {players.length} | Total Questions: {totalQuestions}{' '}
              {questionSource !== 'custom' &&
              totalQuestions < totalAvailableQuestions
                ? `of ${totalAvailableQuestions} available`
                : ''}
            </Text>
            <Box w="full">
              <Button
                onClick={toggleAccordion}
                w="full"
                bg="gray.200"
                color="gray.800"
                rounded="lg"
                display="flex"
                justifyContent="space-between"
                _hover={{ bg: 'gray.300' }}
                aria-expanded={isAccordionOpen}
                aria-controls="player-list"
              >
                <Text>Player List</Text>
                <Text>{isAccordionOpen ? '▲' : '▼'}</Text>
              </Button>
              <Collapse in={isAccordionOpen}>
                <List id="player-list" mt={2} spacing={2}>
                  {players.map((player, index) => (
                    <ListItem
                      key={index}
                      bg="gray.100"
                      rounded="lg"
                      p={2}
                      display="flex"
                      justifyContent="space-between"
                      color="gray.700"
                    >
                      <Text>{player.username}</Text>
                      <Text fontWeight="semibold">
                        Score: {player.score || 0}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
            <Box display="flex" justifyContent="center" gap={4}>
              <Button
                onClick={() => navigate(`/question-setup/${gameId}`)}
                colorScheme="yellow"
                px={6}
                py={3}
                rounded="full"
                _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                aria-label="Edit questions"
              >
                Edit Questions
              </Button>
              <Button
                onClick={startGame}
                colorScheme="green"
                px={6}
                py={3}
                rounded="full"
                isDisabled={players.length === 0}
                _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                aria-label="Start game"
              >
                Start Game
              </Button>
              <Button
                onClick={endGame}
                colorScheme="red"
                px={6}
                py={3}
                rounded="full"
                _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                aria-label="End game"
              >
                End Game
              </Button>
            </Box>
            {formStatus && (
              <Text
                fontSize="sm"
                color="red.700"
                bg="red.50"
                p={2}
                rounded="lg"
              >
                {formStatus}
              </Text>
            )}
          </VStack>
        )}
      </Box>
    </Box>
  )
}

export default Host
