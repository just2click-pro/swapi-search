import { FC, SetStateAction, useEffect, useState, useRef } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { Popover } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { search, resultsPerEntityType } from '@/services/GetData'
import { entities } from '@/assets/data/entities'

import SearchResults from './SearchResults'

import '@/assets/styles/search.css'

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<resultsPerEntityType>({})
  const [open, setOpen] = useState(false)
  const searchTextRef = useRef(null)

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(event.target.value)
  }

  const handlePopoverClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchTerm !== '' && searchTerm.length > 2) {
        const results = await search(searchTerm)

        setSearchResults(results)
        setOpen(true)
      } else {
        setSearchResults({})
        setOpen(false)
      }

      return () => clearTimeout(debounceSearch)
    }, 250)
  }, [searchTerm])

  return (
    <div className='search'>
      <Container maxWidth='md' sx={{ mt: 10 }}>
        <TextField
          type='search'
          id='search'
          placeholder='Search Star Wars world...'
          value={searchTerm}
          variant='outlined'
          onChange={handleChange}
          className={open ? 'search-bar__input_open' : 'search-bar__input'}
          inputRef={searchTextRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Popover
          open={open}
          className='search-popup'
          anchorEl={searchTextRef.current}
          anchorReference='anchorEl'
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          disableAutoFocus
        >
          <Box className='result-popup'>
            {entities.map((entity: string) => (
              <SearchResults results={searchResults[entity]} entity={entity} key={entity} />
            ))}
          </Box>
        </Popover>
      </Container>
    </div>
  )
}
export default Search
