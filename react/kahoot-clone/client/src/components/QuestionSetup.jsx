import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '../socket'
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  VStack,
  Select,
  IconButton,
  Collapse,
  SimpleGrid,
  List,
  ListItem,
  Checkbox,
  HStack,
} from '@chakra-ui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  CheckIcon,
} from '@chakra-ui/icons'

const QuestionSetup = () => {
  const navigate = useNavigate()
  const { gameId } = useParams()
  const savedQuestionSource = localStorage.getItem('questionSource') || ''
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem('selectedQuestions') || '[]'
    )
    return savedQuestionSource === 'custom' && savedQuestions.length > 0
      ? savedQuestions
      : [{ text: '', options: ['', ''], correctAnswer: 0 }]
  })
  const [customTopicName, setCustomTopicName] = useState('')
  const [questionSource, setQuestionSource] = useState(savedQuestionSource)
  const [predefinedQuestions, setPredefinedQuestions] = useState(
    JSON.parse(localStorage.getItem('predefinedQuestions') || '[]')
  )
  const [formStatus, setFormStatus] = useState('')
  const [showPreview, setShowPreview] = useState({})
  const [expandedQuestions, setExpandedQuestions] = useState(
    questions.reduce((acc, _, index) => ({ ...acc, [index]: index === 0 }), {})
  )
  const [selectedPredefinedQuestions, setSelectedPredefinedQuestions] =
    useState(
      predefinedQuestions.reduce(
        (acc, topic) => ({
          ...acc,
          [topic.category]: topic.questions.map((_, index) => true),
        }),
        {}
      )
    )

  useEffect(() => {
    const username = localStorage.getItem('hostUsername')
    if (!username || !gameId) {
      setFormStatus('Invalid session. Please create a new game.')
      navigate('/')
      return
    }

    socket.io.opts.query = { gameId, username }
    socket.connect()

    socket.emit('reconnect', { gameId, username, role: 'host' })

    socket.on('gameCreated', ({ gameId, predefinedQuestions }) => {
      console.log('Received gameCreated:', { gameId, predefinedQuestions })
      if (predefinedQuestions && predefinedQuestions.length > 0) {
        setPredefinedQuestions(predefinedQuestions)
        localStorage.setItem(
          'predefinedQuestions',
          JSON.stringify(predefinedQuestions)
        )
        setSelectedPredefinedQuestions(
          predefinedQuestions.reduce(
            (acc, topic) => ({
              ...acc,
              [topic.category]: topic.questions.map(() => true),
            }),
            {}
          )
        )
      }
    })

    socket.on(
      'reconnectSuccess',
      ({
        questions,
        questionSource: serverQuestionSource,
        predefinedQuestions,
      }) => {
        console.log('Restoring from server:', {
          questions,
          serverQuestionSource,
          predefinedQuestions,
        })
        if (predefinedQuestions && predefinedQuestions.length > 0) {
          setPredefinedQuestions(predefinedQuestions)
          localStorage.setItem(
            'predefinedQuestions',
            JSON.stringify(predefinedQuestions)
          )
          setSelectedPredefinedQuestions(
            predefinedQuestions.reduce(
              (acc, topic) => ({
                ...acc,
                [topic.category]: topic.questions.map(() => true),
              }),
              {}
            )
          )
        }
        if (serverQuestionSource && questions && questions.length > 0) {
          localStorage.setItem('questionSource', serverQuestionSource)
          setQuestionSource(serverQuestionSource)
          if (serverQuestionSource === 'custom') {
            setQuestions(questions)
            localStorage.setItem('selectedQuestions', JSON.stringify(questions))
            setExpandedQuestions(
              questions.reduce(
                (acc, _, index) => ({ ...acc, [index]: index === 0 }),
                {}
              )
            )
          } else {
            const predefined = predefinedQuestions.find(
              (topic) => topic.category === serverQuestionSource
            )
            if (predefined) {
              localStorage.setItem(
                'selectedQuestions',
                JSON.stringify(predefined.questions)
              )
              setQuestions(predefined.questions)
              setSelectedPredefinedQuestions((prev) => ({
                ...prev,
                [serverQuestionSource]: predefined.questions.map(() => true),
              }))
            }
          }
        }
      }
    )

    socket.on('reconnectError', ({ message }) => {
      console.error('Reconnect error:', message)
      setFormStatus(`Reconnect failed: ${message}`)
      navigate('/')
    })

    return () => {
      socket.off('gameCreated')
      socket.off('reconnectSuccess')
      socket.off('reconnectError')
    }
  }, [gameId, navigate])

  const addQuestion = () => {
    const newIndex = questions.length
    setQuestions([
      ...questions,
      { text: '', options: ['', ''], correctAnswer: 0 },
    ])
    setExpandedQuestions((prev) => ({ ...prev, [newIndex]: false }))
  }

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions]
    if (field === 'text') {
      newQuestions[index].text = value
    } else if (field === 'correctAnswer') {
      newQuestions[index].correctAnswer = parseInt(value)
    } else {
      newQuestions[index].options[field] = value
    }
    setQuestions(newQuestions)
  }

  const addOption = (index) => {
    const newQuestions = [...questions]
    if (newQuestions[index].options.length < 4) {
      newQuestions[index].options.push('')
      setQuestions(newQuestions)
    }
  }

  const removeOption = (index, optIndex) => {
    const newQuestions = [...questions]
    if (newQuestions[index].options.length > 2) {
      newQuestions[index].options.splice(optIndex, 1)
      if (
        newQuestions[index].correctAnswer >= newQuestions[index].options.length
      ) {
        newQuestions[index].correctAnswer =
          newQuestions[index].options.length - 1
      }
      setQuestions(newQuestions)
    }
  }

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
      setExpandedQuestions((prev) => {
        const newExpanded = { ...prev }
        delete newExpanded[index]
        return newExpanded
      })
    } else {
      setFormStatus('At least one question is required.')
    }
  }

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const togglePreview = (category) => {
    setShowPreview((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const togglePredefinedQuestion = (category, index) => {
    setSelectedPredefinedQuestions((prev) => {
      const newSelection = [...prev[category]]
      newSelection[index] = !newSelection[index]
      return { ...prev, [category]: newSelection }
    })
  }

  const selectAllPredefinedQuestions = (category) => {
    setSelectedPredefinedQuestions((prev) => ({
      ...prev,
      [category]: prev[category].map(() => true),
    }))
  }

  const deselectAllPredefinedQuestions = (category) => {
    setSelectedPredefinedQuestions((prev) => ({
      ...prev,
      [category]: prev[category].map(() => false),
    }))
  }

  const validateQuestions = () => {
    if (questionSource === 'custom') {
      if (!customTopicName.trim()) {
        return 'Custom question set category is required.'
      }
      if (
        predefinedQuestions.some(
          (topic) =>
            topic.category.toLowerCase() ===
            customTopicName.trim().toLowerCase()
        )
      ) {
        return 'Custom question set category already exists. Please choose a unique category.'
      }
      for (const q of questions) {
        if (!q.text.trim()) return 'All questions must have text.'
        if (q.options.some((opt) => !opt.trim()))
          return 'All options must be filled.'
        if (q.options.length < 2 || q.options.length > 4) {
          return 'Each question must have between 2 and 4 options.'
        }
        if (
          isNaN(q.correctAnswer) ||
          q.correctAnswer < 0 ||
          q.correctAnswer >= q.options.length
        ) {
          return `Correct answer must be a number between 0 and ${
            q.options.length - 1
          }.`
        }
      }
    } else {
      const selected = selectedPredefinedQuestions[questionSource]?.reduce(
        (count, isSelected) => count + (isSelected ? 1 : 0),
        0
      )
      if (!selected || selected === 0) {
        return `At least one question must be selected in the ${questionSource} category.`
      }
    }
    return ''
  }

  const saveQuestions = () => {
    let selectedQuestions = []
    if (questionSource === 'custom') {
      selectedQuestions = questions
    } else {
      const topic = predefinedQuestions.find(
        (t) => t.category === questionSource
      )
      if (topic) {
        selectedQuestions = topic.questions.filter(
          (_, index) => selectedPredefinedQuestions[questionSource][index]
        )
      }
    }
    const validationError = validateQuestions()
    if (validationError) {
      setFormStatus(validationError)
      return
    }
    localStorage.setItem('selectedQuestions', JSON.stringify(selectedQuestions))
    localStorage.setItem(
      'questionSource',
      questionSource === 'custom' ? customTopicName : questionSource
    )
    socket.emit('setQuestions', {
      gameId,
      questions: selectedQuestions,
      questionSource:
        questionSource === 'custom' ? customTopicName : questionSource,
      isCustom: questionSource === 'custom',
    })
    navigate(`/host/${gameId}`)
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
      <Box bg="white" rounded="2xl" shadow="2xl" p={8} maxW="7xl" w="full">
        <Heading fontSize="4xl" color="gray.800" mb={8} textAlign="center">
          Set Up Questions
        </Heading>
        <SimpleGrid columns={[1, null, 3]} gap={6}>
          <Box
            bg="blue.50"
            rounded="xl"
            p={6}
            borderWidth={2}
            borderColor="blue.300"
            shadow="lg"
            _hover={{ shadow: 'xl' }}
            transition="all 0.3s"
          >
            <Heading
              as="h2"
              size="lg"
              color="blue.800"
              mb={4}
              display="flex"
              justifyContent="space-between"
            >
              Custom Questions
              <Button
                onClick={() => {
                  console.log('Selecting Custom Questions')
                  setQuestionSource('custom')
                }}
                colorScheme="blue"
                variant={questionSource === 'custom' ? 'solid' : 'outline'}
                size="sm"
                leftIcon={questionSource === 'custom' ? <CheckIcon /> : null}
                bg={questionSource === 'custom' ? 'blue.500' : 'transparent'}
                color={questionSource === 'custom' ? 'white' : 'blue.700'}
                borderColor="blue.300"
                _hover={{
                  bg: questionSource === 'custom' ? 'blue.600' : 'blue.100',
                  color: questionSource === 'custom' ? 'white' : 'blue.800',
                }}
                aria-label="Select custom questions"
              >
                {questionSource === 'custom' ? 'Selected' : 'Select'}
              </Button>
            </Heading>
            {questionSource === 'custom' && (
              <VStack spacing={4}>
                <Input
                  type="text"
                  placeholder="Enter Custom Question Set Category"
                  value={customTopicName}
                  onChange={(e) => setCustomTopicName(e.target.value)}
                  borderColor="blue.200"
                  focusBorderColor="blue.400"
                  p={3}
                  aria-label="Custom question set category"
                />
                {questions.map((question, index) => (
                  <Box
                    key={index}
                    bg="white"
                    rounded="lg"
                    borderWidth={1}
                    borderColor="blue.200"
                    p={4}
                    w="full"
                  >
                    <Button
                      onClick={() => toggleQuestion(index)}
                      w="full"
                      bg="blue.100"
                      _hover={{ bg: 'blue.200' }}
                      rounded={expandedQuestions[index] ? 'lg' : 'lg'}
                      display="flex"
                      justifyContent="space-between"
                      aria-label={`Toggle question ${index + 1}`}
                    >
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color="blue.700"
                      >
                        Question {index + 1}
                      </Text>
                      {expandedQuestions[index] ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )}
                    </Button>
                    <Collapse in={expandedQuestions[index]}>
                      <VStack p={4} spacing={3}>
                        <Input
                          type="text"
                          placeholder="Enter question text"
                          value={question.text}
                          onChange={(e) =>
                            updateQuestion(index, 'text', e.target.value)
                          }
                          borderColor="blue.200"
                          focusBorderColor="blue.400"
                          p={3}
                          aria-label={`Question ${index + 1} text`}
                        />
                        {question.options.map((option, optIndex) => (
                          <Box
                            key={optIndex}
                            display="flex"
                            alignItems="center"
                            w="full"
                            gap={2}
                          >
                            <Input
                              type="text"
                              placeholder={`Option ${optIndex + 1}`}
                              value={option}
                              onChange={(e) =>
                                updateQuestion(index, optIndex, e.target.value)
                              }
                              borderColor="blue.200"
                              focusBorderColor="blue.400"
                              p={3}
                              aria-label={`Question ${index + 1} option ${
                                optIndex + 1
                              }`}
                            />
                            {question.options.length > 2 && (
                              <IconButton
                                onClick={() => removeOption(index, optIndex)}
                                colorScheme="red"
                                icon={<CloseIcon />}
                                aria-label={`Remove option ${
                                  optIndex + 1
                                } from question ${index + 1}`}
                              />
                            )}
                          </Box>
                        ))}
                        {question.options.length < 4 && (
                          <Button
                            onClick={() => addOption(index)}
                            colorScheme="blue"
                            variant="link"
                            aria-label={`Add option to question ${index + 1}`}
                          >
                            Add Option
                          </Button>
                        )}
                        <Select
                          value={question.correctAnswer}
                          onChange={(e) =>
                            updateQuestion(
                              index,
                              'correctAnswer',
                              e.target.value
                            )
                          }
                          borderColor="blue.200"
                          focusBorderColor="blue.400"
                          p={3}
                          aria-label={`Correct answer for question ${
                            index + 1
                          }`}
                        >
                          {question.options.map((_, optIndex) => (
                            <option key={optIndex} value={optIndex}>
                              Option {optIndex + 1}
                            </option>
                          ))}
                        </Select>
                        {questions.length > 1 && (
                          <Button
                            onClick={() => removeQuestion(index)}
                            colorScheme="red"
                            variant="link"
                            aria-label={`Remove question ${index + 1}`}
                          >
                            Remove Question
                          </Button>
                        )}
                      </VStack>
                    </Collapse>
                  </Box>
                ))}
                <Button
                  onClick={addQuestion}
                  colorScheme="blue"
                  w="full"
                  p={3}
                  rounded="lg"
                  _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
                  aria-label="Add another question"
                >
                  Add Another Question
                </Button>
              </VStack>
            )}
          </Box>

          {predefinedQuestions.map((topic) => (
            <Box
              key={topic.category}
              bg="blue.50"
              rounded="xl"
              p={6}
              borderWidth={2}
              borderColor="blue.300"
              shadow="lg"
              _hover={{ shadow: 'xl' }}
              transition="all 0.3s"
            >
              <Heading
                as="h2"
                size="lg"
                color="blue.800"
                mb={4}
                display="flex"
                justifyContent="space-between"
              >
                {topic.category} Questions
                <Button
                  onClick={() => {
                    console.log(`Selecting ${topic.category} Questions`)
                    setQuestionSource(topic.category)
                  }}
                  colorScheme="blue"
                  variant={
                    questionSource === topic.category ? 'solid' : 'outline'
                  }
                  size="sm"
                  leftIcon={
                    questionSource === topic.category ? <CheckIcon /> : null
                  }
                  bg={
                    questionSource === topic.category
                      ? 'blue.500'
                      : 'transparent'
                  }
                  color={
                    questionSource === topic.category ? 'white' : 'blue.700'
                  }
                  borderColor="blue.300"
                  _hover={{
                    bg:
                      questionSource === topic.category
                        ? 'blue.600'
                        : 'blue.100',
                    color:
                      questionSource === topic.category ? 'white' : 'blue.800',
                  }}
                  aria-label={`Select ${topic.category} questions`}
                >
                  {questionSource === topic.category ? 'Selected' : 'Select'}
                </Button>
              </Heading>
              <HStack mb={4}>
                <Button
                  onClick={() => selectAllPredefinedQuestions(topic.category)}
                  colorScheme="blue"
                  variant="link"
                  size="sm"
                  aria-label={`Select all ${topic.category} questions`}
                >
                  Select All
                </Button>
                <Button
                  onClick={() => deselectAllPredefinedQuestions(topic.category)}
                  colorScheme="red"
                  variant="link"
                  size="sm"
                  aria-label={`Deselect all ${topic.category} questions`}
                >
                  Deselect All
                </Button>
              </HStack>
              <Button
                onClick={() => togglePreview(topic.category)}
                colorScheme="blue"
                variant="link"
                w="full"
                textAlign="left"
                mb={2}
                aria-label={`Toggle ${topic.category} questions preview`}
              >
                {showPreview[topic.category]
                  ? `Hide ${topic.category} Questions`
                  : `Show ${topic.category} Questions`}
              </Button>
              <Collapse in={showPreview[topic.category]}>
                <VStack spacing={2}>
                  {topic.questions.map((q, qIndex) => (
                    <Box
                      key={qIndex}
                      bg="white"
                      rounded="lg"
                      borderWidth={1}
                      borderColor="blue.200"
                      p={3}
                      w="full"
                    >
                      <HStack>
                        <Checkbox
                          isChecked={
                            selectedPredefinedQuestions[topic.category][qIndex]
                          }
                          onChange={() =>
                            togglePredefinedQuestion(topic.category, qIndex)
                          }
                          aria-label={`Select question ${qIndex + 1} in ${
                            topic.category
                          }`}
                        />
                        <VStack align="start" flex={1}>
                          <Text fontWeight="semibold" color="gray.700">
                            {qIndex + 1}. {q.text}
                          </Text>
                          <List pl={5} styleType="disc" color="gray.600">
                            {q.options.map((opt, optIndex) => (
                              <ListItem
                                key={optIndex}
                                color={
                                  optIndex === q.correctAnswer
                                    ? 'green.600'
                                    : 'gray.600'
                                }
                              >
                                {opt}{' '}
                                {optIndex === q.correctAnswer
                                  ? '(Correct)'
                                  : ''}
                              </ListItem>
                            ))}
                          </List>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Collapse>
            </Box>
          ))}
        </SimpleGrid>

        {formStatus && (
          <Text
            fontSize="sm"
            color="red.700"
            bg="red.50"
            p={2}
            rounded="lg"
            mt={6}
            textAlign="center"
          >
            {formStatus}
          </Text>
        )}
        <Button
          onClick={saveQuestions}
          colorScheme="blue"
          w="full"
          p={3}
          rounded="lg"
          mt={6}
          isDisabled={!questionSource}
          _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
          aria-label="Save questions and proceed"
        >
          Save Questions and Proceed
        </Button>
      </Box>
    </Box>
  )
}

export default QuestionSetup
