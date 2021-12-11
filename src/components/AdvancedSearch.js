import React, { forwardRef, useEffect, useState,useRef } from 'react'
import { Container, Dropdown } from 'semantic-ui-react'
import '../css/mainpagecss.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import data from '../data/finalData.json'
import AutoComplete from '../utils/AutoComplete'

const { useImperativeHandle } = React;

const AdvancedSearch = forwardRef((props, ref) => {
  const { buildSearchList } = props
  let inputElement;

  const _searchBox=useRef(null)
  const _inputHandle=useRef(null)

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
  const [new_array,setNew_array]=useState([])
  let [counter,setCounter]=useState(0)

  useImperativeHandle(ref, () => ({
    resetSearchState () {
      setSearch('');
      setFilter(0);
      setAutoComplete(null);
      setSuggestions([]);
    }
  }));

  const handleFilter = (unNeccesaryThing, e) => {
    setFilter(e.value)
  }

  const handleSearch = e => {
    e && e.preventDefault()
    document.activeElement.blur()
    buildSearchList(_inputHandle.current.value, filter)
  }
  const focusHandler = e => {
    setCounter(0)
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

const func=(e)=>{
  if(e.code=='Enter'){
    setSearch(new_array[counter]||_inputHandle.current.value)
  }
      if(new_array.length==0 && counter==0){
      setCounter(0)
    }else{
      if(e.code=='ArrowDown'){
        if(counter>new_array.length-1){
          setCounter(counter--)
        }else{
          if(new_array[counter]==_inputHandle.current.value){
          _inputHandle.current.value=new_array[counter+1]!=undefined?new_array[counter+1]:new_array[counter]
          }else{
            _inputHandle.current.value=new_array[counter]
          }
          setCounter(counter++)
        }
      }
      if(e.code=='ArrowUp'){
        counter==0?setCounter(0):setCounter(counter--)
        if(new_array[counter]==_inputHandle.current.value){
          _inputHandle.current.value=new_array[counter-1]!=undefined?new_array[counter-1]:new_array[counter]
        }else{
          _inputHandle.current.value=new_array[counter]
        }
      }
  }
}

useEffect(()=>{
_searchBox.current.addEventListener('keydown',func)
return ()=>{
  _searchBox.current.removeEventListener('keydown',func)
}
},[new_array])

useEffect(()=>{
  setCounter(0)
  setNew_array(suggestions.map(el=>el))
},[suggestions])

  return (
    <Container textAlign='center'>
      <form className="search-form" autocomplete="off">
        <div ref={_searchBox} id='searchBox'>
          <input ref={_inputHandle} 
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
                    /**buildSearchList is not needed because it is handled in handleSearch(),
                     * buildSearchList should be called clickable route functionality needed, 
                     * since search by keyboard is enabled buildSearchList need not be called
                     */
                    // buildSearchList(content, filter)
                  }}>{content}</p>
              ))}
            </div>)
          }
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
});

export default AdvancedSearch
