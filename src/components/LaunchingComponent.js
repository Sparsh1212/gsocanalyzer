import React from 'react';

import Typist from 'react-typist';
import '../css/mainpagecss.css';

//Importing the charts files
import ParticipantChart from './Launcher/ParticipantChart';
import SelectionChart from './Launcher/SelectionChart';
import OrganizationChart from './Launcher/OrganizationChart';

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
      {/* show the charts here  */}
        <div style={{ display: 'flex', flexDirection: 'coloumn', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ParticipantChart font={window.innerWidth > 500 ? 25 : 15}/>
          <SelectionChart font={window.innerWidth > 500 ? 25 : 15} />
          <OrganizationChart font={window.innerWidth > 500 ? 25 : 15} />
        </div>

    </React.Fragment>
  );
};

export default LaunchingComponent;
