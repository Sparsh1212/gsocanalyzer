import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/mainpagecss.css';
import Home from './components/Home';
import Bookmarked from './components/Bookmarked';

function App() {
  const [bookmarked, setBookmarked] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('Bookmarked');
    if(data) {
      setBookmarked(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Bookmarked', JSON.stringify(bookmarked));
  }, [bookmarked]);

  return (
    <React.Fragment>
        <Router>
        <Routes>
          <Route path='/' element={<Home bookmarked={bookmarked} setBookmarked={setBookmarked} />} />
          <Route path='/bookmarks' element={<Bookmarked bookmarked={bookmarked} setBookmarked={setBookmarked} />} />
        </Routes>
        </Router>
    </React.Fragment>
  );
}

export default App;
