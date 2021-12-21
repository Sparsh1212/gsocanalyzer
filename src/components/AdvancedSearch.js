import React, { forwardRef, useEffect, useState } from 'react'
import { Container, Dropdown } from 'semantic-ui-react'
import '../css/mainpagecss.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import sortAscending from '../assets/sort-ascending.svg'
import sortDescending from '../assets/sort-descending.svg'

import data from '../data/finalData.json'
import AutoComplete from '../utils/AutoComplete'

const { useImperativeHandle } = React;


const AdvancedSearch = forwardRef((props, ref) => {
  const { buildSearchList, sortParameter, setSortParameter, sortAscendingOrder, setSortAscendingOrder } = props
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

  const sortParameterOptions = [
    {
      key: 0,
      text: 'Number of GSoC Appearances',
      value: 0
    },
    {
      key: 1,
      text: 'Total Number of Projects',
      value: 1
    },
    {
      key: 2,
      text: 'Average Number of Projects',
      value: 2
    },
  ]

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(0)
  const [autoComplete, setAutoComplete] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [isInputInFocus, setIsInputInFocus] = useState(false)

  useImperativeHandle(ref, () => ({
    resetSearchState () {
      setSearch('');
      setFilter(0);
      setAutoComplete(null);
      setSuggestions([]);
      setIsInputInFocus(false);
    }
  }));

  const handleFilter = (unNeccesaryThing, e) => {
    setFilter(e.value)
  }

  const handleSortParameter = (unNeccesaryThing, e) => {
    setSortParameter(e.value)
  }

  const handleSearch = e => {
    e && e.preventDefault()
    document.activeElement.blur()
    buildSearchList(search, filter)
  }

  const focusHandler = e => {
    // setSuggestions(autoComplete.suggest(search))
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
      list = [...[...dataSet].sort((a, b) => (a - b))]
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
      list = [...[...dataSet].sort((a, b) => (a - b))]
    }
    setAutoComplete(new AutoComplete(list))
    setSuggestions([])
    setSearch('')
  }, [filter])

  useEffect(() => {
    autoComplete && setSuggestions(autoComplete.suggest(''))
  }, [autoComplete])

  useEffect(() => {
    autoComplete && setSuggestions(autoComplete.suggest(search))
  }, [search])

  return (
    <Container textAlign='center'>
      <form className="search-form" autocomplete="off">
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
            placeholder='Search...'
            id="inputBox"
            autocomplete="off"
          />
          {
            (isInputInFocus && suggestions.length > 0 && suggestions[0] !== search) && (<div className="suggestions-dropDown">
              {suggestions.map(content => (
                content !== search && <p
                  key={content}
                  onClick={() => {
                    setSearch(content)
                    buildSearchList(content, filter)
                  }}>{content}</p>
              ))}
            </div>)
          }
        </div>
        <button type='submit' onClick={handleSearch} className='search-btn'>
          <FontAwesomeIcon color='white' className='fa-2x' icon={faSearch} />{' '}
        </button>
        <div className='dropdown-panel'>
        <div id="dropdown-label">Search By</div>
        <Dropdown
          value={filter}
          onChange={handleFilter}
          id='searchFilter'
          selection
          options={searchFilterOptions}
        />
        </div>
        <div className='dropdown-panel'>
        <div id="dropdown-label">Sort By</div>
        <Dropdown
          value={sortParameter}
          onChange={handleSortParameter}
          id='sortParameter'
          selection
          options={sortParameterOptions}
        />
        <img className="sort-icon" src={sortAscendingOrder ? sortAscending : sortDescending} onClick={() => {setSortAscendingOrder(!sortAscendingOrder)}} />
        </div>


      </form>
    </Container>
  )
});

export default AdvancedSearch
