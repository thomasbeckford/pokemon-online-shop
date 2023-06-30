import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { PokemonListProps, Pokemon } from '@/types'

const PokemonList = ({ data }: PokemonListProps) => {
  let results = []
  if (data.error) {
    return (
      <Box>
        <Text>Something went wrong with the API.</Text>
      </Box>
    )
  }

  if (data.results.length > 0) {
    results = data.results
  }

  if (!results.length) {
    return (
      <Box>
        <Text>No results found.</Text>
      </Box>
    )
  }

  return (
    <Box>
      {results?.map((pokemon: Pokemon) => (
        <Box
          key={pokemon.url + pokemon.name}
          p={3}
          mb={1}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          display="flex"
          justifyContent="space-between"
        >
          <Link href={`/pokemon/${pokemon.name}`}>
            <Text textTransform="capitalize">{pokemon.name}</Text>
          </Link>
        </Box>
      ))}
    </Box>
  )
}

export default PokemonList
