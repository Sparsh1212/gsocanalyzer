import React from 'react';

import Typist from 'react-typist';
import '../css/mainpagecss.css';

const LaunchingComponent = () => {
  return (
    <React.Fragment>
      <Typist avgTypingDelay={20} cursor={{ show: false }}>
        <div id='animatedText'>
          <p>
          A blazingly-fast tool to analyze all the organizations selected in Google Summer of Code.
          </p>
          <Typist.Delay ms={200} />
          <p>Start Analyzing now!</p>
        </div>
      </Typist>
    </React.Fragment>
  );
};

export default LaunchingComponent;
