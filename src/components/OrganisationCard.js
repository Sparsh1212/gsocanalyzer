import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import '../css/mainpagecss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import TopTechTag from './TopTechTag';

const OrganisationCard = (props) => {
  const { orgData } = props;
  const graphData = {
    labels: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
    datasets: [
      {
        label: 'No. of Projects',
        data: orgData.project,
        borderColor: '#99A3A4',
        backgroundColor: '#F2F4F4',
        pointBorderColor: '#17202A',
        pointBackgroundColor: '#17202A',
      },
    ],
  };

  return (
    <Card id='card'>
      <Card.Content>
        <Card.Description>
          <Card.Header as='h1' id='orgName'>
            {orgData.name}
          </Card.Header>
          <h1 className='family'>
            No. of times in GSoC:{' '}
            <span id='selectedTimes'>{orgData.year.length}</span>{' '}
          </h1>

          <h3 className='family'>
            Category: {orgData.cat != '' ? orgData.cat : 'Others'}
          </h3>

          <h3 className='family'>
            Tech Stack <br />
            <div>
              {orgData.tech.map((tech) => (
                <TopTechTag info={tech} />
              ))}
            </div>
          </h3>
          <h3 className='family'>
            Topics
            <br />
            <div>
              {orgData.top.map((top) => (
                <TopTechTag info={top} />
              ))}
            </div>
          </h3>
          <div className='graph'>
            <Line data={graphData} />
          </div>
          <br />
          <br />
          <Label color='grey' size='medium' attached='bottom right'>
            <a id='urlLocator' target='_blank' href={orgData.url}>
              Visit Official Page
            </a>{' '}
            <FontAwesomeIcon icon={faBolt} />
          </Label>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OrganisationCard;
