import React from 'react';

import Typist from 'react-typist';
import '../css/mainpagecss.css';

const LaunchingComponent = () => {
  return (
    <React.Fragment>
      <Typist avgTypingDelay={20} cursor={{ show: false }}>
        <div id='animatedText'>
          <p>
            A blazingly fast tool to get the past 12 year analytics of
            organizations selected in GSoC.
          </p>
          <Typist.Delay ms={150} />
          <p>Search by tech-stack / organisation name / category or by topic.</p>
          <Typist.Delay ms={200} />
          <p>Start Searching now! Use comma to separate multiple tags in tech or topics.</p>
          <Typist.Delay ms={250} />
          <p>Also Bookmark your favorite organisation.</p>
        </div>
      </Typist>
    </React.Fragment>
  );
};

export default LaunchingComponent;
