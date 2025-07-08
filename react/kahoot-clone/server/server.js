const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const games = {}

// Function to fetch questions from the /test endpoint
async function fetchQuestions() {
  try {
    const response = await axios.get('http://example.com/test') // Replace with actual GET endpoint URL
    return response.data
  } catch (error) {
    console.error(
      'Error fetching questions from /test endpoint:',
      error.message
    )
    // Fallback to default questions with id and category
    return [
      {
        category: 'GK',
        questions: [
          {
            text: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswer: 0,
          },
          {
            text: 'Which planet is known as the Red Planet?',
            options: ['Jupiter', 'Mars', 'Venus', 'Mercury'],
            correctAnswer: 1,
          },
        ],
      },
      {
        category: 'Science',
        questions: [
          {
            text: 'What is the chemical symbol for water?',
            options: ['H2O', 'CO2', 'O2', 'N2'],
            correctAnswer: 0,
          },
          {
            text: 'What gas do plants absorb from the atmosphere?',
            options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'],
            correctAnswer: 2,
          },
        ],
      },
    ]
  }
}

// Function to post custom question set to the /test endpoint
async function postCustomQuestions(customQuestionSet) {
  try {
    const response = await axios.post(
      'http://example.com/test',
      customQuestionSet
    )

    return response.data
  } catch (error) {
    console.error(
      'Error posting custom question set to /test endpoint:',
      error.message
    )
    // Log the error but do not throw, so game logic continues
    return null
  }
}

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('reconnect', async ({ gameId, username, role }) => {
    console.log(`Reconnect attempt: ${username} as ${role} for game ${gameId}`)
    if (!games[gameId]) {
      console.log(`Reconnect failed: Game ${gameId} not found`)
      socket.emit('reconnectError', { message: 'Game not found' })
      return
    }
    const predefinedQuestions = await fetchQuestions()
    if (role === 'host') {
      if (games[gameId].host.username === username) {
        games[gameId].host.socketId = socket.id
        socket.join(gameId)
        const game = games[gameId]
        const gameState =
          game.gameStarted && !game.isEnded
            ? {
                currentQuestion: game.questions[game.currentQuestionIndex],
                timeLeft: game.timeLeft,
                currentQuestionIndex: game.currentQuestionIndex,
                totalQuestions: game.questions.length,
                answerCounts: game.answerCounts,
              }
            : null
        const isGameOver =
          game.isEnded ||
          (game.gameStarted &&
            game.currentQuestionIndex >= game.questions.length)
        const showLeaderboard =
          game.gameStarted && game.timeLeft <= 0 && !isGameOver
        const reconnectPayload = {
          gameState,
          players: game.players,
          showLeaderboard,
          gameOver: isGameOver,
          questions: game.questions,
          questionSource: game.questionSource || '',
          predefinedQuestions,
          showFinalLeaderboard: game.showFinalLeaderboard || false,
          gameId,
        }
        console.log(
          `Host ${username} reconnected to game ${gameId}, emitting reconnectSuccess`
        )
        socket.emit('reconnectSuccess', reconnectPayload)
        io.to(gameId).emit('updatePlayers', game.players)
      } else {
        console.log(
          `Reconnect failed: ${username} not authorized as host for game ${gameId}`
        )
        socket.emit('reconnectError', {
          message: 'User not authorized as host',
        })
      }
    } else if (role === 'player') {
      const player = games[gameId].players.find(
        (p) => p.username === username && !p.explicitlyLeft
      )
      if (player) {
        const timeSinceDisconnect = player.disconnectedAt
          ? (new Date() - new Date(player.disconnectedAt)) / 1000
          : 0
        if (timeSinceDisconnect <= 30) {
          player.socketId = socket.id
          player.disconnectedAt = null
          socket.join(gameId)
          const game = games[gameId]
          const gameState =
            game.gameStarted && !game.isEnded
              ? {
                  currentQuestion: game.questions[game.currentQuestionIndex],
                  timeLeft: game.timeLeft,
                  currentQuestionIndex: game.currentQuestionIndex,
                  totalQuestions: game.questions.length,
                  answerCounts: game.answerCounts,
                }
              : null
          const isGameOver =
            game.isEnded ||
            (game.gameStarted &&
              game.currentQuestionIndex >= game.questions.length)
          const showLeaderboard =
            game.gameStarted && game.timeLeft <= 0 && !isGameOver
          const reconnectPayload = {
            gameState,
            players: game.players,
            showLeaderboard,
            gameOver: isGameOver,
            questionSource: game.questionSource || '',
            predefinedQuestions,
            showFinalLeaderboard: game.showFinalLeaderboard || false,
            gameId,
          }
          console.log(
            `Player ${username} reconnected to game ${gameId}, emitting reconnectSuccess`
          )
          socket.emit('reconnectSuccess', reconnectPayload)
          io.to(gameId).emit('updatePlayers', game.players)
        } else {
          console.log(
            `Reconnect failed: ${username} exceeded 30s grace period in game ${gameId}`
          )
          socket.emit('reconnectError', {
            message: 'Reconnection timeout. Please join a new game.',
          })
        }
      } else {
        console.log(
          `Reconnect failed: Player ${username} not found or explicitly left game ${gameId}`
        )
        socket.emit('reconnectError', {
          message: 'Player not found or has left the game.',
        })
      }
    } else {
      console.log(
        `Reconnect failed: Invalid role ${role} for ${username} in game ${gameId}`
      )
      socket.emit('reconnectError', { message: 'Invalid role' })
    }
  })

  socket.on('createGame', async ({ username }) => {
    if (!username) {
      console.log('Create game failed: Username is required')
      socket.emit('createGameError', { message: 'Username is required.' })
      return
    }
    const gameId = Math.random().toString(36).slice(2, 10)
    games[gameId] = {
      host: { username, socketId: socket.id },
      players: [],
      pastPlayers: [],
      questions: [],
      questionSource: '',
      currentQuestionIndex: 0,
      timeLeft: 10,
      gameStarted: false,
      isEnded: false,
      showFinalLeaderboard: false,
      answerCounts: [],
    }
    console.log(`Game created: ${gameId} by ${username}`)
    socket.join(gameId)
    const predefinedQuestions = await fetchQuestions()
    socket.emit('gameCreated', { gameId, predefinedQuestions })
    io.to(gameId).emit('updatePlayers', games[gameId].players)
  })

  socket.on(
    'setQuestions',
    async ({ gameId, questions, questionSource, isCustom }) => {
      if (!games[gameId] || games[gameId].host.socketId !== socket.id) {
        console.log(
          `Set questions failed: Invalid game ${gameId} or ${socket.id} not host`
        )
        socket.emit('setQuestionsError', {
          message: 'Invalid game or not the host.',
        })
        return
      }
      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        console.log(
          `Set questions failed: No questions provided for game ${gameId}`
        )
        socket.emit('setQuestionsError', {
          message: 'At least one question is required.',
        })
        return
      }
      for (const q of questions) {
        if (
          !q.text ||
          !Array.isArray(q.options) ||
          q.options.length < 2 ||
          q.options.length > 4 ||
          q.options.some((opt) => !opt) ||
          isNaN(q.correctAnswer) ||
          q.correctAnswer < 0 ||
          q.correctAnswer >= q.options.length
        ) {
          console.log(
            `Set questions failed: Invalid question format for game ${gameId}`
          )
          socket.emit('setQuestionsError', {
            message:
              'Invalid question format: each question must have text, 2–4 options, and a correct answer within the option range.',
          })
          return
        }
      }
      const predefinedQuestions = await fetchQuestions()
      if (isCustom && questionSource) {
        if (
          predefinedQuestions.some(
            (topic) =>
              topic.category.toLowerCase() === questionSource.toLowerCase()
          )
        ) {
          console.log(
            `Set questions failed: Custom question set category ${questionSource} already exists`
          )
          socket.emit('setQuestionsError', {
            message:
              'Custom question set category already exists. Please choose a unique category.',
          })
          return
        }
        const customQuestionSet = {
          id: Math.random().toString(36).slice(2, 10),
          category: questionSource,
          questions: questions.map((q) => ({
            text: q.text,
            options: [...q.options],
            correctAnswer: parseInt(q.correctAnswer),
          })),
        }
        predefinedQuestions.push(customQuestionSet)
        console.log(
          `Added custom question set ${questionSource} to predefinedQuestions`
        )
        // Post the custom question set to the /test endpoint
        await postCustomQuestions(customQuestionSet)
      }
      games[gameId].questions = questions.map((q) => ({
        text: q.text,
        options: [...q.options],
        correctAnswer: parseInt(q.correctAnswer),
      }))
      games[gameId].questionSource = questionSource || ''
      console.log(
        `Questions set for game ${gameId}: ${games[gameId].questions.length} questions, source: ${questionSource}`
      )
      socket.emit('questionsSet', { predefinedQuestions })
    }
  )

  socket.on('joinGame', ({ gameId, username }) => {
    console.log(`Join attempt: ${username} for game ${gameId}`)
    if (games[gameId]) {
      if (games[gameId].gameStarted && !games[gameId].isEnded) {
        console.log(`Join attempt failed: Game ${gameId} has already started`)
        socket.emit('joinError', { message: 'Game has already started!' })
        return
      }
      if (games[gameId].host.username === username) {
        console.log(
          `Join attempt failed: ${username} is the host and cannot join as a player`
        )
        socket.emit('joinError', { message: 'Host cannot join as a player!' })
        return
      }
      const existingPlayer = games[gameId].players.find(
        (p) => p.username === username
      )
      const pastPlayer = games[gameId].pastPlayers.find(
        (p) => p.username === username
      )
      if (existingPlayer || pastPlayer) {
        console.log(
          `Join attempt failed: ${username} is already in game ${gameId} or has previously left`
        )
        socket.emit('joinError', {
          message: 'Username already taken or previously left!',
        })
        return
      }
      games[gameId].players.push({
        username,
        socketId: socket.id,
        score: 0,
        answered: false,
        disconnectedAt: null,
        explicitlyLeft: false,
      })
      console.log(
        `Player ${username} joined game ${gameId} with socket ID: ${socket.id}`
      )
      socket.join(gameId)
      socket.emit('joinSuccess')
      io.to(gameId).emit('updatePlayers', games[gameId].players)
    } else {
      console.log(`Join attempt failed: Game ${gameId} not found`)
      socket.emit('joinError', { message: 'Game not found!' })
    }
  })

  socket.on('leaveGame', ({ gameId, username }) => {
    if (games[gameId]) {
      const playerIndex = games[gameId].players.findIndex(
        (p) => p.username === username
      )
      if (playerIndex !== -1) {
        console.log(`Player ${username} explicitly left game ${gameId}`)
        const player = games[gameId].players[playerIndex]
        games[gameId].pastPlayers.push({
          username: player.username,
          score: player.score,
          explicitlyLeft: true,
        })
        games[gameId].players.splice(playerIndex, 1)
        io.to(gameId).emit('updatePlayers', games[gameId].players)
        if (
          games[gameId].players.length === 0 &&
          games[gameId].gameStarted &&
          !games[gameId].isEnded
        ) {
          console.log(`Game ${gameId} empty, ending game`)
          games[gameId].isEnded = true
          const leaderboard = [
            ...games[gameId].players,
            ...games[gameId].pastPlayers,
          ].sort((a, b) => b.score - a.score)
          io.to(gameId).emit('gameOver', {
            leaderboard,
            questionSource: games[gameId].questionSource || '',
            gameId,
          })
          setTimeout(() => {
            if (games[gameId]) {
              console.log(`Game ${gameId} deleted after delay`)
              delete games[gameId]
            }
          }, 10000)
        }
      }
    }
  })

  socket.on('hostReady', ({ gameId }) => {
    console.log(`Host joined game ${gameId}`)
    socket.join(gameId)
    io.to(gameId).emit('updatePlayers', games[gameId]?.players || [])
  })

  socket.on('playerReady', ({ username, gameId }) => {
    console.log(
      `Player ${username} ready for game ${gameId} with socket ID: ${socket.id}`
    )
    socket.join(gameId)
    io.to(gameId).emit('updatePlayers', games[gameId]?.players || [])
  })

  socket.on('startGame', ({ gameId }) => {
    if (games[gameId] && games[gameId].host.socketId === socket.id) {
      if (games[gameId].questions.length === 0) {
        console.log(
          `Start game attempt failed: No questions set for game ${gameId}`
        )
        socket.emit('setQuestionsError', {
          message: 'At least one question is required to start the game.',
        })
        return
      }
      console.log(
        `Starting game ${gameId} with ${games[gameId].players.length} players`
      )
      games[gameId].gameStarted = true
      games[gameId].currentQuestionIndex = 0
      games[gameId].timeLeft = 10
      games[gameId].answerCounts = new Array(
        games[gameId].questions[0].options.length
      ).fill(0)
      startQuestion(gameId)
    } else {
      console.log(
        `Start game attempt failed: ${socket.id} is not the host or game ${gameId} not found`
      )
    }
  })

  socket.on('endGame', ({ gameId }) => {
    if (games[gameId] && games[gameId].host.socketId === socket.id) {
      console.log(`Host ending game ${gameId}`)
      games[gameId].isEnded = true
      games[gameId].showFinalLeaderboard = false
      const leaderboard = [
        ...games[gameId].players,
        ...games[gameId].pastPlayers,
      ].sort((a, b) => b.score - a.score)
      io.to(gameId).emit('gameOver', {
        leaderboard,
        questionSource: games[gameId].questionSource || '',
        gameId,
      })
      setTimeout(() => {
        if (games[gameId]) {
          console.log(`Game ${gameId} deleted after delay`)
          delete games[gameId]
        }
      }, 10000)
    } else {
      console.log(
        `End game attempt failed: ${socket.id} is not the host or game ${gameId} not found`
      )
    }
  })

  socket.on('showFinalLeaderboard', ({ gameId }) => {
    if (games[gameId] && games[gameId].host.socketId === socket.id) {
      console.log(`Host triggered showFinalLeaderboard for game ${gameId}`)
      games[gameId].showFinalLeaderboard = true
      const leaderboard = [
        ...games[gameId].players,
        ...games[gameId].pastPlayers,
      ].sort((a, b) => b.score - a.score)
      const isGameOver =
        games[gameId].isEnded ||
        games[gameId].currentQuestionIndex >= games[gameId].questions.length
      io.to(gameId).emit('showFinalLeaderboard', {
        leaderboard,
        questionSource: games[gameId].questionSource || '',
        gameId,
        gameOver: isGameOver,
      })
    } else {
      console.log(
        `Show final leaderboard attempt failed: ${socket.id} is not the host or game ${gameId} not found`
      )
    }
  })

  socket.on('submitAnswer', ({ username, answerIndex, gameId }) => {
    if (games[gameId] && games[gameId].gameStarted && !games[gameId].isEnded) {
      const player = games[gameId].players.find((p) => p.username === username)
      if (player && !player.answered) {
        player.answered = true
        games[gameId].answerCounts[answerIndex] =
          (games[gameId].answerCounts[answerIndex] || 0) + 1
        if (
          answerIndex ===
          games[gameId].questions[games[gameId].currentQuestionIndex]
            .correctAnswer
        ) {
          const scoreIncrement = Math.floor(
            1000 * (games[gameId].timeLeft / 10) * 2
          )
          player.score += scoreIncrement
          console.log(
            `Player ${username} submitted correct answer ${answerIndex} for game ${gameId}, score increased by ${scoreIncrement}`
          )
        } else {
          console.log(
            `Player ${username} submitted incorrect answer ${answerIndex} for game ${gameId}`
          )
        }
        io.to(gameId).emit('updatePlayers', games[gameId].players)
      } else {
        console.log(
          `Answer submission failed for ${username} in game ${gameId}: ` +
            (player ? 'Already answered' : 'Player not found')
        )
      }
    } else {
      console.log(
        `Answer submission failed for ${username}: Game ${gameId} not found, not started, or already ended`
      )
    }
  })

  socket.on('nextQuestion', ({ gameId }) => {
    if (games[gameId] && games[gameId].host.socketId === socket.id) {
      console.log(
        `Received nextQuestion for game ${gameId}, current index: ${games[gameId].currentQuestionIndex}`
      )
      games[gameId].currentQuestionIndex++
      games[gameId].players.forEach((player) => (player.answered = false))
      if (games[gameId].currentQuestionIndex < games[gameId].questions.length) {
        console.log(
          `Advancing to question ${games[gameId].currentQuestionIndex} for game ${gameId}`
        )
        games[gameId].timeLeft = 10
        games[gameId].showFinalLeaderboard = false
        games[gameId].answerCounts = new Array(
          games[gameId].questions[
            games[gameId].currentQuestionIndex
          ].options.length
        ).fill(0)
        startQuestion(gameId)
      } else {
        games[gameId].isEnded = true
        const leaderboard = [
          ...games[gameId].players,
          ...games[gameId].pastPlayers,
        ].sort((a, b) => b.score - a.score)
        console.log(`Game ${gameId} ended, emitting gameOver`)
        io.to(gameId).emit('gameOver', {
          leaderboard,
          questionSource: games[gameId].questionSource || '',
          gameId,
        })
        setTimeout(() => {
          if (games[gameId]) {
            console.log(`Game ${gameId} deleted after delay`)
            delete games[gameId]
          }
        }, 10000)
      }
    } else {
      console.log(
        `Next question attempt failed: ${socket.id} is not the host or game ${gameId} not found`
      )
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    for (const gameId in games) {
      if (games[gameId].host.socketId === socket.id) {
        console.log(`Host disconnected temporarily for game ${gameId}`)
      } else {
        const playerIndex = games[gameId].players.findIndex(
          (p) => p.socketId === socket.id && !p.explicitlyLeft
        )
        if (playerIndex !== -1) {
          const playerUsername = games[gameId].players[playerIndex].username
          console.log(
            `Player ${playerUsername} disconnected from game ${gameId}, marking for reconnection`
          )
          games[gameId].players[playerIndex].disconnectedAt = new Date()
          io.to(gameId).emit('updatePlayers', games[gameId].players)
          setTimeout(() => {
            if (
              games[gameId] &&
              games[gameId].players[playerIndex] &&
              games[gameId].players[playerIndex].disconnectedAt &&
              !games[gameId].players[playerIndex].explicitlyLeft
            ) {
              const timeSinceDisconnect =
                (new Date() -
                  new Date(games[gameId].players[playerIndex].disconnectedAt)) /
                1000
              if (timeSinceDisconnect > 30) {
                console.log(
                  `Removing player ${playerUsername} from game ${gameId} after 30s grace period`
                )
                const player = games[gameId].players[playerIndex]
                games[gameId].pastPlayers.push({
                  username: player.username,
                  score: player.score,
                  explicitlyLeft: false,
                })
                games[gameId].players.splice(playerIndex, 1)
                io.to(gameId).emit('updatePlayers', games[gameId].players)
                if (
                  games[gameId].players.length === 0 &&
                  games[gameId].gameStarted &&
                  !games[gameId].isEnded
                ) {
                  console.log(`Game ${gameId} empty, ending game`)
                  games[gameId].isEnded = true
                  const leaderboard = [
                    ...games[gameId].players,
                    ...games[gameId].pastPlayers,
                  ].sort((a, b) => b.score - a.score)
                  io.to(gameId).emit('gameOver', {
                    leaderboard,
                    questionSource: games[gameId].questionSource || '',
                    gameId,
                  })
                  setTimeout(() => {
                    if (games[gameId]) {
                      console.log(`Game ${gameId} deleted after delay`)
                      delete games[gameId]
                    }
                  }, 10000)
                }
              }
            }
          }, 30000)
        }
      }
    }
  })

  function startQuestion(gameId) {
    if (!games[gameId] || games[gameId].isEnded) {
      console.log(`Game ${gameId} not found or already ended!`)
      return
    }
    games[gameId].players.forEach((player) => (player.answered = false))
    games[gameId].answerCounts = new Array(
      games[gameId].questions[games[gameId].currentQuestionIndex].options.length
    ).fill(0)
    console.log(
      `Starting question ${games[gameId].currentQuestionIndex} for game ${gameId}`
    )
    io.to(gameId).emit('gameState', {
      currentQuestion:
        games[gameId].questions[games[gameId].currentQuestionIndex],
      timeLeft: games[gameId].timeLeft,
      currentQuestionIndex: games[gameId].currentQuestionIndex,
      totalQuestions: games[gameId].questions.length,
      answerCounts: games[gameId].answerCounts,
    })

    const timer = setInterval(() => {
      if (games[gameId] && !games[gameId].isEnded) {
        games[gameId].timeLeft--
        console.log(`Game ${gameId} time left: ${games[gameId].timeLeft}`)
        io.to(gameId).emit('gameState', {
          currentQuestion:
            games[gameId].questions[games[gameId].currentQuestionIndex],
          timeLeft: games[gameId].timeLeft,
          currentQuestionIndex: games[gameId].currentQuestionIndex,
          totalQuestions: games[gameId].questions.length,
          answerCounts: games[gameId].answerCounts,
        })
        if (games[gameId].timeLeft <= 0) {
          clearInterval(timer)
          console.log(
            `Timer expired for game ${gameId}, waiting for host to show leaderboard`
          )
          io.to(gameId).emit('timerExpired', {
            questionSource: games[gameId].questionSource || '',
            gameId,
            answerCounts: games[gameId].answerCounts,
          })
          if (
            games[gameId].currentQuestionIndex + 1 >=
            games[gameId].questions.length
          ) {
            games[gameId].isEnded = true
            games[gameId].showFinalLeaderboard = false
            const leaderboard = [
              ...games[gameId].players,
              ...games[gameId].pastPlayers,
            ].sort((a, b) => b.score - a.score)
            console.log(
              `Last question finished, emitting gameOver for game ${gameId}`
            )
            io.to(gameId).emit('gameOver', {
              leaderboard,
              questionSource: games[gameId].questionSource || '',
              gameId,
            })
            setTimeout(() => {
              if (games[gameId]) {
                console.log(`Game ${gameId} deleted after delay`)
                delete games[gameId]
              }
            }, 10000)
          }
        }
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }
})

server.listen(4000, () => {
  console.log('Server running on port 4000')
})
