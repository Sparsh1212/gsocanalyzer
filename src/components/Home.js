import React, { useRef, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import '../css/mainpagecss.css';
import data from '../data/finalData.json';
import OrganisationCard from './OrganisationCard';
import AdvancedSearch from './AdvancedSearch';
import Footer from './Footer';
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button';
import LaunchingComponent from './LaunchingComponent';
import { Link } from 'react-router-dom';
import shortdata from "../data/gsocData.json";
import GraphChart from './GraphChart';
import SelectionChart from './SelectionChart';
import CompanyChart from './CompanyChart';


const descendingSortByYear = (resultList) => {
  return resultList.sort((a, b) => {
    return (b.year.length - a.year.length)
  });
}

const Home = ({ bookmarked, setBookmarked }) => {

  const [validList, setValidList] = useState([]);
  const [displayLauncher, setDisplayLauncher] = useState(true);

  const reRenderLauncher = () => {
    AdvancedSearchRef.current.resetSearchState();
    setValidList([]);
    setDisplayLauncher(true);
  };

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

  const AdvancedSearchRef = useRef();

  const showHideSummary = () => {

    if (document.getElementById('gsocStat').style.display !== 'none') {
      document.getElementById('gsocStat').style.display = 'none';
      let elems = document.getElementsByClassName('gsocChart');
      for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.display = 'none';
      }
      document.getElementById('summaryBtn').innerText = "Show Summary";
      document.getElementById('summaryBtn').style.marginRight = "5px";
    }

    else {
      document.getElementById('gsocStat').style.display = 'block';
      let elems = document.getElementsByClassName('gsocChart');
      for (var j = 0; j < elems.length; j += 1) {
        elems[j].style.display = 'block';
      }
      document.getElementById('summaryBtn').innerText = "Hide Summary";
      document.getElementById('summaryBtn').style.marginRight = "0";
    }

  }

  return (
    <React.Fragment>
      <Container id='mainContainer' fluid>
        <Header textAlign='center'>
          <h1 id='mainHeader' onClick={reRenderLauncher}> GSoC Analyser </h1>
        </Header>
        <Link to="/bookmarks" className="nav-button">Bookmarks</Link>


        <AdvancedSearch ref={AdvancedSearchRef} buildSearchList={buildSearchList} />
        {displayLauncher && <LaunchingComponent />}

        <div style={{ float: 'right' }}>
          {/* GSOC summary pane added by aritroCoder */}
          <div id="gsocStat" style={{ overflow: 'auto', height: '432px' }}>
            <h5>Scroll here to find summarised GSoC data of several years</h5>
            {shortdata.map(item => {
              return (
                <>
                  <h4>{item.year}</h4>
                  <div>
                    {item.students}<br />
                    {item.successRate} Success Rate<br />
                    {item.no_of_orgs} Open Source Organisations
                  </div>
                </>
              )
            }
            )
            }
          </div>
          <button onClick={showHideSummary} id="summaryBtn">Hide Summary</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <GraphChart />
          <SelectionChart />
          <CompanyChart/>
        </div>

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
