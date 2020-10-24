import React from 'react';
import { Button, Card, Label } from 'semantic-ui-react';
import '../css/mainpagecss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import TopTechTag from './TopTechTag';

const OrganisationCard = (props) => {
  const { orgData } = props;
  const isMobile = window.innerWidth <= 750;
  const graphData = {
    labels: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
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
            <Line
              data={graphData}
              height={isMobile ? 300 : 250}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        precision: 0,
                      },
                    },
                  ],
                },
              }}
            />
          </div>
          <br />
          <br />
          <form target="_blank" action={orgData.url}>
              <input className="visitUrl" type="submit" value="Visit official page" />
          </form>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OrganisationCard;
