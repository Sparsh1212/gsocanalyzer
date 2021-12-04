import React, { useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import '../css/mainpagecss.css';
import data from '../data/finalData.json';
import OrganisationCard from './OrganisationCard';
import AdvancedSearch from './AdvancedSearch';
import Footer from './Footer';
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button';
import LaunchingComponent from './LaunchingComponent';
import { Link } from 'react-router-dom'

const descendingSortByYear = (resultList) =>{
  return resultList.sort( (a,b) => { 
      return (b.year.length - a.year.length)
    });
}

const Home = ({bookmarked, setBookmarked}) => {
  const [validList, setValidList] = useState([]);
  const [displayLauncher, setDisplayLauncher] = useState(true);
  const buildSearchList = (search, filter) => {
    setDisplayLauncher(false);
    let sanitisedSearch = search.toLowerCase();
    if (filter === 0) {
      setValidList(
        data.filter((org) => {
          for (let i = 0; i < org.tech.length; i++) {
            if (org.tech[i].toLowerCase() === sanitisedSearch) {
              return true;
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
            if (org.top[i].toLowerCase() === sanitisedSearch) {
              return true;
            }
          }
          return false;
        })
      );
    }
  };

  return (
    <React.Fragment>
      <Container id='mainContainer' fluid>
        <Header id='mainHeader' as='h1' textAlign='center'>
          GSoC Analyzer
        </Header>
      <Link to="/bookmarks" className="nav-button">Bookmarks</Link>

        <AdvancedSearch buildSearchList={buildSearchList} />
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
            {descendingSortByYear(validList).map((org, index) => (
              <OrganisationCard key={index} orgData={org} bookmarked={bookmarked} setBookmarked={setBookmarked} />
            ))}
          </Container>
        )}
        <ScrollUpButton style={{ color: 'white' }} />
        <Footer />
      </Container>
    </React.Fragment>
  );
};

export default Home;
