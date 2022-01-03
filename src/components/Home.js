import React, { useRef, useState, useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';
import '../css/mainpagecss.css';
import data from '../data/finalData.json';
import OrganisationCard from './OrganisationCard';
import AdvancedSearch from './AdvancedSearch';
import Footer from './Footer';
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button';
import LaunchingComponent from './LaunchingComponent';
import { Link } from 'react-router-dom'
import { sortAppearances, sortTotalProjects, sortAverageProjects } from './SortFunctions';

const descendingSortByYear = (resultList) =>{
  return resultList.sort( (a,b) => { 
      return (b.year.length - a.year.length)
    });
}

const Home = ({bookmarked, setBookmarked}) => {
  const [validList, setValidList] = useState([]);
  const [results, setResults] = useState(validList);
  const [sortParameter, setSortParameter] = useState(0)
  const [sortAscendingOrder, setSortAscendingOrder] = useState(false)
  const [displayLauncher, setDisplayLauncher] = useState(true);

  const reRenderLauncher = () => {
    AdvancedSearchRef.current.resetSearchState();
    setValidList([]);
    setDisplayLauncher(true);
  };

  useEffect(() => {
    // setSortAscendingOrder(false);
    var res = [];
    switch(sortParameter) {
      case 0: 
        res = validList.sort(sortAppearances);
        break;
      case 1: 
        res = validList.sort(sortTotalProjects);
        break;
      case 2: 
        res = validList.sort(sortAverageProjects);
        break;
    }
    if(!sortAscendingOrder) {
      setResults([...res])
    }
    else {
      setResults([...res.reverse()])
    }
  }, [sortParameter, validList, sortAscendingOrder])


  const buildSearchList = (search, filter) => {
    setDisplayLauncher(false);
    let sanitisedSearch = search.toLowerCase();
    let searches = sanitisedSearch.split(",");
    searches = searches.map(Function.prototype.call, String.prototype.trim);
    if (filter === 0) {
      setValidList(
        data.filter((org) => {
          for (let i = 0; i < org.tech.length; i++) {
            for (let j = 0; j < searches.length; j++) {
              if (org.tech[i].toLowerCase() === searches[j]) {
                return true;
              }
            }
          }
          return false;
        })
      );
      
    } else if (filter === 1) {
      setValidList(
        data.filter((org) => org.name.toLowerCase().includes(sanitisedSearch))
      );
    } else if (filter === 2) {
      setValidList(
        data.filter((org) => org.cat.toLowerCase().includes(sanitisedSearch))
      );
    } else {
      setValidList(
        data.filter((org) => {
          for (let i = 0; i < org.top.length; i++) {
            for (let j = 0; j < searches.length; j++) {
              if (org.top[i].toLowerCase() === searches[j]) {
                return true;
              }
            }
          }
          return false;
        })
      );
    }
  };

  const AdvancedSearchRef = useRef();

  return (
    <React.Fragment>
      <Container id='mainContainer' fluid>
        <Container id="content-container" fluid>
        <Header textAlign='center'>
          <h1 id = 'mainHeader' onClick={reRenderLauncher}> GSoC Analyser </h1>
        </Header>
        <Link to="/bookmarks" className="nav-button">Bookmarks</Link>
        
        <AdvancedSearch ref={AdvancedSearchRef} buildSearchList={buildSearchList} sortParameter={sortParameter} setSortParameter={setSortParameter} sortAscendingOrder={sortAscendingOrder} setSortAscendingOrder={setSortAscendingOrder}/>
        {displayLauncher && <LaunchingComponent />}
        {!displayLauncher && (
          <Container fluid style={{ paddingTop: 50 }}>
            <Header
              style={{ color: 'white', fontSize: 50 }}
              textAlign='center'
              as='h1'
            >
              Search Results: {validList.length}
            </Header>
            <br />
            <br />
            {results.map((org, index) => (
              <OrganisationCard key={index} orgData={org} bookmarked={bookmarked} setBookmarked={setBookmarked} />
            ))}
          </Container>
        )}
        <ScrollUpButton style={{ color: 'white' }} />
        <Footer />
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Home;
