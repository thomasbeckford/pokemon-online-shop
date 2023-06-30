'use client'
import { useState, useEffect } from 'react'
import { Box, Heading, Text, Input } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useDebounce } from '@/hooks/useDebounce'
import { usePokemonList } from '@/hooks/usePokemonList'
import PokemonList from '@/components/PokemonList'
import Pagination from '@/components/Pagination'

export default function Home() {
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([])
  const [filterBy, setFilterBy] = useState<'id' | 'name'>('id')
  const [selectedValue, setSelectedValue] = useState<number | string>('')
  const debouncedSelectedValue = useDebounce(selectedValue, 500)
  const [abilities, setAbilities] = useState<string[]>([])

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/ability?limit=1000000'
        )
        const data = await response.json()
        const abilityNames = data.results.map((ability: any) => ability.name)
        setAbilities(abilityNames)
      } catch (error) {
        console.error('Error fetching abilities:', error)
      }
    }

    fetchAbilities()
  }, [])

  const handlePreviousPage = () => {
    if (offset - pageSize >= 0) {
      setOffset(offset - pageSize)
    }
  }

  const handleNextPage = () => {
    if (data && data.next) {
      setOffset(offset + pageSize)
    }
  }

  const handlePageSizeChange = (value: string) => {
    const newPageSize = parseInt(value)
    setPageSize(newPageSize)
    setOffset(0)
  }

  const handleAbilityChange = (value: any) => {
    if (!value.length) {
      setSelectedAbilities([])
      return
    }

    setSelectedAbilities((prevSelectedAbilities) => {
      const isAlreadySelected = prevSelectedAbilities.includes(value)
      let updatedAbilities: string[]

      if (isAlreadySelected) {
        updatedAbilities = prevSelectedAbilities.filter(
          (ability) => ability !== value
        )
      } else {
        updatedAbilities = [...prevSelectedAbilities, value]
      }

      setOffset(0)
      return updatedAbilities
    })
  }

  const handleFilterByChange = (value: 'id' | 'name') => {
    setFilterBy(value)
    setSelectedValue('')
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  const data: any = usePokemonList(
    pageSize,
    offset,
    selectedAbilities,
    debouncedSelectedValue
  )

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Pokemons
      </Heading>

      <Box mb={4}>
        <Text>Page Size:</Text>
        <Select
          options={[
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '50', value: '50' },
            { label: '100', value: '100' },
          ]}
          value={{
            label: pageSize.toString(),
            value: pageSize.toString(),
          }}
          onChange={({ value }: any) => handlePageSizeChange(value)}
        />
      </Box>

      <Box mb={4}>
        <Text>Abilities:</Text>
        <Select
          isMulti
          onChange={(res: any) => {
            res = res.map((r: any) => r.value)
            handleAbilityChange(res)
          }}
          options={abilities.map((ability) => ({
            label: ability,
            value: ability,
          }))}
        />
      </Box>

      <Box mb={4}>
        <Text>Filter by:</Text>
        <Select
          options={[
            { label: 'ID', value: 'id' },
            { label: 'Name', value: 'name' },
          ]}
          value={{
            label: filterBy === 'id' ? 'ID' : 'Name',
            value: filterBy,
          }}
          onChange={({ value }: any) => handleFilterByChange(value)}
        />
      </Box>

      <Box mb={4}>
        <Text>{filterBy === 'id' ? 'Filter by ID:' : 'Filter by Name:'}</Text>
        <Input
          type={filterBy === 'id' ? 'number' : 'text'}
          value={selectedValue}
          onChange={handleValueChange}
        />
      </Box>

      <PokemonList data={data} />

      <Pagination
        offset={offset}
        pageSize={pageSize}
        data={data}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />

      <Text mt={2}>
        Showing {offset + 1} - {offset + (data?.results?.length || 0)} of{' '}
        {data?.count} results
      </Text>
    </Box>
  )
}
