import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import MediaDisplay from '../index'
import { extendedTheme, gallery } from '../sample'

// Mock Spotlight so it won't throw error
jest.mock('spotlight.js/src/js/spotlight.js', () => {
    return { show: () => {} }
})

// Mock AutoSizer to provide a fixed 1000px width
jest.mock('react-virtualized-auto-sizer', () => {
    return ({ children }) => <>{children({ width: 1000 })}</>
})

const showSpotlight = jest.fn()

const CustomSearchInput = ({ globalFilter, setGlobalFilter }) => (
    <input
        data-testid="search-input"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search media"
    />
)

const CustomFilters = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => (
    <CustomSearchInput
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
    />
)

const MediaItem = ({ item }) => (
    <div className="image-container" onClick={showSpotlight}>
        <img src={item.original.thumbnail} alt={item.original.title} />
    </div>
)

describe('MediaDisplay component should display media gallery correctly', () => {
    test('display default filter and media item', () => {
        const { queryByPlaceholderText } = render(
            <ChakraProvider theme={extendedTheme}>
                <MediaDisplay data={gallery} />
            </ChakraProvider>
        )

        // Should have a search input
        const searchInput = queryByPlaceholderText('Search media')
        expect(searchInput).toBeTruthy()
    })

    test('display custom filter and custom media item', () => {
        const { getByTestId } = render(
            <ChakraProvider theme={extendedTheme}>
                <MediaDisplay
                    data={gallery}
                    components={{ Filters: CustomFilters, MediaItem }}
                />
            </ChakraProvider>
        )

        // Should have a search input
        const searchInput = getByTestId('search-input')
        expect(searchInput).toBeTruthy()
    })
})
