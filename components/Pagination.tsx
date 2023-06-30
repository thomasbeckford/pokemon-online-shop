import { Box, Button, Text } from '@chakra-ui/react'
import { PaginationProps } from '@/types'

const Pagination = ({
  offset,
  pageSize,
  data,
  handlePreviousPage,
  handleNextPage,
}: PaginationProps) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
    <Button onClick={handlePreviousPage} disabled={offset === 0}>
      Previous
    </Button>
    <Text>Page {offset / pageSize + 1}</Text>
    <Button onClick={handleNextPage} disabled={!data?.next}>
      Next
    </Button>
  </Box>
)

export default Pagination
