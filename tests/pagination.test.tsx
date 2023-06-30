import { render, fireEvent } from '@testing-library/react'
import Pagination from '../components/Pagination'
import '@testing-library/jest-dom/extend-expect' // Import the Jest DOM matchers

describe('Pagination', () => {
  test('renders previous and next buttons correctly', () => {
    const handlePreviousPage = jest.fn()
    const handleNextPage = jest.fn()
    const data = {
      next: 'http://example.com/next',
    }
    const { getByText } = render(
      <Pagination
        offset={0}
        pageSize={10}
        data={data}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    )

    const previousButton = getByText('Previous')
    const nextButton = getByText('Next')

    expect(previousButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    fireEvent.click(nextButton)
    expect(handleNextPage).toHaveBeenCalledTimes(1)

    fireEvent.click(previousButton)
    expect(handlePreviousPage).toHaveBeenCalledTimes(1)
  })

  test('displays the correct page number', () => {
    const { getByText } = render(
      <Pagination
        offset={20}
        pageSize={10}
        data={null}
        handlePreviousPage={jest.fn()}
        handleNextPage={jest.fn()}
      />
    )

    const pageText = getByText('Page 3')

    expect(pageText).toBeInTheDocument()
  })
})
