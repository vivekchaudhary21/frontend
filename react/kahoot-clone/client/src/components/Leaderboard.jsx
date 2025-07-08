import React from 'react'
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
} from '@chakra-ui/react'

const MidGameLeaderboard = ({ players }) => {
  const sortedPlayers = [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return (
    <Box mt={6}>
      <Heading as="h2" size="lg" color="gray.800" mb={4}>
        Leaderboard
      </Heading>
      <Table variant="simple">
        <Thead bg="gray.200">
          <Tr>
            <Th color="gray.700">Rank</Th>
            <Th color="gray.700">Player</Th>
            <Th color="gray.700">Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedPlayers.map((player, index) => (
            <Tr key={player.username} borderBottom="1px" borderColor="gray.200">
              <Td color="gray.600">{index + 1}</Td>
              <Td color="gray.600">{player.username}</Td>
              <Td color="gray.600">{player.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

const FinalLeaderboard = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  console.log({ sortedPlayers })

  return (
    <Box mt={6}>
      <Heading as="h2" size="lg" color="gray.800" mb={4}>
        Final Leaderboard
      </Heading>
      <VStack spacing={4}>
        {sortedPlayers.map((player, index) => (
          <Box
            key={player.username}
            display="flex"
            alignItems="center"
            p={4}
            rounded="lg"
            shadow="md"
            w="full"
            bg={
              index === 0
                ? 'yellow.100'
                : index === 1
                ? 'gray.100'
                : index === 2
                ? 'orange.100'
                : 'white'
            }
            borderWidth={index < 3 ? 2 : 1}
            borderColor={
              index === 0
                ? 'yellow.400'
                : index === 1
                ? 'gray.400'
                : index === 2
                ? 'orange.400'
                : 'gray.200'
            }
            opacity={player.explicitlyLeft ? 0.7 : 1}
            fontStyle={player.explicitlyLeft ? 'italic' : 'normal'}
            animation={`fadeIn 0.5s ease-in-out ${index * 0.2}s both`}
          >
            <Text fontSize="2xl" fontWeight="bold" mr={4}>
              {index === 0
                ? '🥇'
                : index === 1
                ? '🥈'
                : index === 2
                ? '🥉'
                : index + 1}
            </Text>
            <Text fontSize="lg" color="gray.700" flex={1}>
              {player.username}
              {player.explicitlyLeft && ' (Left)'}
            </Text>
            <Text fontSize="lg" color="gray.700">
              {player.score}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

const Leaderboard = ({ players, gameOver }) => {
  return gameOver ? (
    <FinalLeaderboard players={players} />
  ) : (
    <MidGameLeaderboard players={players} />
  )
}

export default Leaderboard
