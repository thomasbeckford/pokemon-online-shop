'use client'

import { Box, Heading, Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { PokemonDetail, IPokemonDetailPage } from '@/types'

export default function PokemonDetailPage(props: IPokemonDetailPage) {
  const { pokemonName } = props.params
  const { data, error } = useSWR<PokemonDetail>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    fetcher
  )

  if (error) return <div>Failed to load Pokémon details</div>
  if (!data) return <div>Loading Pokémon details...</div>

  const { name, abilities } = data

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        {name}
      </Heading>
      <Text mb={2}>Abilities:</Text>
      <ul>
        {abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </Box>
  )
}
