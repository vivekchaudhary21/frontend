import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, VStack, Button, Text } from '@chakra-ui/react'

const Home = () => {
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
          Quiz Game
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Welcome to the Quiz Game! Create your own quiz or join an existing one
          to test your knowledge.
        </Text>
        <VStack spacing={4} w="full">
          <Button
            as={Link}
            to="/create"
            colorScheme="blue"
            px={6}
            py={3}
            rounded="full"
            w="full"
            _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
            aria-label="Create a new game"
          >
            Create a Game
          </Button>
          <Button
            as={Link}
            to="/join"
            colorScheme="green"
            variant="outline"
            px={6}
            py={3}
            rounded="full"
            w="full"
            _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
            aria-label="Join an existing game"
          >
            Join a Game
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Home
