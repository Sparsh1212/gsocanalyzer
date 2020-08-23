import React from 'react';

import Typist from 'react-typist';
import '../css/mainpagecss.css';

const LaunchingComponent = () => {
  return (
    <React.Fragment>
      <Typist avgTypingDelay={30} cursor={{ show: false }}>
        <div id='animatedText'>
          <p>
            A blazingly fast tool to get the past 11 year analytics of any
            organisation selected in GSoc
          </p>
          <Typist.Delay ms={200} />
          <p>Search by tech-stack / organisation name or by category</p>
          <Typist.Delay ms={200} />
          <p>
            Get information of no. of times an organisation was accepted in
            GSoC, graphical analytics of its projects each year, its tech-stack
            and many more information
          </p>
          <Typist.Delay ms={200} />
          <p>Start Searching now!</p>
        </div>
      </Typist>
    </React.Fragment>
  );
};

export default LaunchingComponent;
