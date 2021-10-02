import React, { useEffect, useState } from 'react'
import { Container, Dropdown } from 'semantic-ui-react'
import '../css/mainpagecss.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import data from '../data/finalData.json'
import AutoComplete from '../utils/AutoComplete'

const AdvancedSearch = props => {
  const { buildSearchList } = props
  let inputElement;
  const searchFilterOptions = [
    {
      key: 0,
      text: 'Tech Stack',
      value: 0
    },
    {
      key: 1,
      text: 'Organisation Name',
      value: 1
    },
    {
      key: 2,
      text: 'Category',
      value: 2
    },
    {
      key: 3,
      text: 'Topic',
      value: 3
    }
  ]

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(0)
  const [autoComplete, setAutoComplete] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [isInputInFocus, setIsInputInFocus] = useState(false)

  const handleFilter = (unNeccesaryThing, e) => {
    setFilter(e.value)
  }

  const handleSearch = e => {
    e && e.preventDefault()
    document.activeElement.blur()
    buildSearchList(search, filter)
  }

  const focusHandler = e => {
    setTimeout(() => {
      setIsInputInFocus(document.activeElement === inputElement)
    }, 0);
  }

  useEffect(() => {
    document.body.addEventListener('click', focusHandler)
    inputElement = document.getElementById('inputBox')
    return () => {
      document.body.removeEventListener('click', focusHandler)
    }
  }, [])

  useEffect(() => {
    let list = []
    if (filter === 0) {
      let dataSet = new Set();
      data.forEach(e => {
        dataSet.add(...e.tech)
      })
      list.push(...[...dataSet].sort((a, b) => (a - b)))
    }
    if (filter === 1) {
      data.forEach(e => {
        list.push(e.name.replaceAll('/', '').replaceAll('  ', ' ').toLowerCase())
      })
    }
    if (filter === 2) {
      data.forEach(e => {
        list.push(e.cat.replaceAll('/', '').replaceAll('  ', ' ').toLowerCase())
      })
    }
    if (filter === 3) {
      let dataSet = new Set();
      data.forEach(e => {
        dataSet.add(...e.top)
      })
      list.push(...[...dataSet].sort((a, b) => (a - b)))
    }
    setAutoComplete(new AutoComplete(list))
    setSuggestions([])
    setSearch('')

  }, [filter])

  useEffect(() => {
    autoComplete && setSuggestions(autoComplete.suggest(search))
  }, [search])

  return (
    <Container textAlign='center'>
      <form className="search-form">
        <div id='searchBox'>
          <input
            value={search}
            onChange={e => {
              if (e.keyCode === 13) {
                handleSearch()
                return
              }
              setSearch(e.target.value.toLowerCase())
            }}
            type='text'
            name='search'
            placeholder='Search..'
            id="inputBox"
          />
          <div className="suggestions-dropDown">
            {isInputInFocus && suggestions.map(content => (
              content !== search && <p
                key={content}
                onClick={() => {
                  setSearch(content)
                  buildSearchList(content, filter)
                }}>{content}</p>
            ))}
          </div>
        </div>
        <button type='submit' onClick={handleSearch} className='search-btn'>
          <FontAwesomeIcon color='white' className='fa-2x' icon={faSearch} />{' '}
        </button>

        <Dropdown
          value={filter}
          onChange={handleFilter}
          id='searchFilter'
          selection
          options={searchFilterOptions}
        />

      </form>
    </Container>
  )
}

export default AdvancedSearch
