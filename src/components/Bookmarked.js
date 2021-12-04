import React from 'react'
import { Container, Header } from 'semantic-ui-react';
import '../css/mainpagecss.css';
import Footer from './Footer';
import OrganisationCard from './OrganisationCard';
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button';
import { Link } from 'react-router-dom'

function Bookmarked({bookmarked, setBookmarked}) {

    const descendingSortByYear = (resultList) =>{
        return resultList.sort( (a,b) => { 
            return (b.year.length - a.year.length)
          });
      }

    return (
    <React.Fragment>
      <Container id='mainContainer' fluid>
        <Header id='mainHeader' as='h1' textAlign='center'>
          GSoC Analyzer
        </Header>
      <Link to="/gsocanalyzer" className="nav-button">Home</Link>

        <Container fluid style={{ paddingTop: 50 }}>
            <Header
              style={{ color: 'white', fontSize: 50 }}
              textAlign='center'
              as='h1'
            >
              Bookmarked Organizations: {bookmarked.length}
            </Header>
            <br />
            {bookmarked.length != 0 ? descendingSortByYear(bookmarked).map((org, index) => (
              <OrganisationCard key={index} orgData={org} bookmarked={bookmarked} setBookmarked={setBookmarked} />
            )) : 
            <div className="no-bookmarks-msg">
              No organizations bookmarked yet
            </div>}
          </Container>
        <ScrollUpButton style={{ color: 'white' }} />
        <Footer />
      </Container>
    </React.Fragment>
    )
}

export default Bookmarked
