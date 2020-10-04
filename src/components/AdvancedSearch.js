import React, { useState } from 'react';
import { Container, Dropdown } from 'semantic-ui-react';
import '../css/mainpagecss.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const AdvancedSearch = (props) => {
  const { buildSearchList } = props;
  const searchFilterOptions = [
    {
      key: 0,
      text: 'Tech Stack',
      value: 0,
    },
    {
      key: 1,
      text: 'Organisation Name',
      value: 1,
    },
    {
      key: 2,
      text: 'Category',
      value: 2,
    },
    {
      key: 3,
      text: 'Topic',
      value: 3,
    },
  ];

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(0);

  const handleFilter = (unNeccesaryThing, e) => {
    setFilter(e.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    document.activeElement.blur();

    buildSearchList(search, filter);
  };

  return (
    <Container textAlign='center'>
      <form className="search-form">
        <input
          id='searchBox'
          value={search}
          onChange={(e) => {
            if (e.keyCode === 13) {
              handleSearch();
              return;
            }

            setSearch(e.target.value);
          }}
          type='text'
          name='search'
          placeholder='Search..'
        />
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
  );
};

export default AdvancedSearch;
