import React, { useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import '../css/mainpagecss.css';
import data from '../data/finalData.json';
import OrganisationCard from './OrganisationCard';
import AdvancedSearch from './AdvancedSearch';
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import LaunchingComponent from './LaunchingComponent';

const descendingSortByYear = (resultList) =>{
  return resultList.sort( (a,b) => { 
      return (b.year.length - a.year.length)
    });
}

const Home = () => {
  const [validList, setValidList] = useState([]);
  const [displayLauncher, setDisplayLauncher] = useState(true);

  const RerenderLauncher = () => {
    setDisplayLauncher(true);
    setValidList([]);
    document.getElementById("inputBox").blur();
    document.getElementById("inputBox").value = '';
    return(
      <React.Fragment>
        <LaunchingComponent />
      </React.Fragment>
    );
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

  return (
    <React.Fragment>
      <Container id='mainContainer' fluid>
        <Header textAlign='center'>        
          <div id='mainHeaderDiv' onClick={RerenderLauncher}>
            <h1  id='mainHeader'> GSoC Analyser</h1>
          </div>
        </Header>

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
              <OrganisationCard key={index} orgData={org} />
            ))}
          </Container>
        )}
        <ScrollUpButton style={{ color: 'white' }} />
        <Container id='footer' fluid textAlign='center'>
          <h3>
            Made with <FontAwesomeIcon color='red' icon={faHeart} /> by Sparsh
            Agrawal and Rishabh Dugaye |{'  '}
            <a href='https://github.com/Sparsh1212' target='_blank'>
              <img
                alt="Sparsh's Github Link"
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEUAAAD////CwsKrq6vT09P6+vq2trbw8PB+fn6ioqJaWlrl5eXf39/q6urMzMz19fWWlpYxMTGHh4cfHx90dHROTk4lJSUNDQ1vb29lZWVGRkY/Pz8WFhYsLCyPj484ODgJ4kfeAAAPvUlEQVR4nOVd2aKyMA7+D7KDiAsoivr+bzmiAkqWpkCLM/NdnqO1adPsTf/9M49jeanCWx6tVqs8z3e7w6GKi/P9WtZHC79uFmUcrrI0+CPgBUnq+mFRLz3PcahuznpD0faNIF2F56Xnq4dqtZbR9gk3vy89bxmKKNWnrt1M/7Bdev4KVP6IzftGGv0uwxY+KVM0idz9opDdRpN37xPZYWmCBjhlc5L3xMYvlqaqQ5nPun09smpp0p4ofc8MfQ3ScGny/p19c+Q9EeTlkvTdHcP0Ndjki0nWemWQPz+xXohXc0v0NUgWkDnhTNpdCje2S1883vYcDcemyFmNmKDnBanrZo6TZWm6GcPhgbXjWOko+AddfrSrLkMv97iNw9x3pS7kC9nVBn17uQZcu9HprBD123jn0FEAsF478wSehBsYOLdiLx30WkWukG/di0nqHpBtYBrpW831Seh8Gd3Gi0CEeu5utJ9eRImARN9c5OqgFguTPfRYEOJJTXFqpNw+Zw7TYx8qOWVzmuF3AEqVkxtEs8ny2FHJnWiun/r4UQXzJPPGVq4qrzoTC2ohTvzvpeHsHs4+50VrMu9hDNkfM+TdlLx3FswZdczZXzKnoK5shMSbz93ghKi3Mmryn9kowlxeI2fHZMZDfqwjOs/xYFZxY8OfKbkVvs3wA4watOWTVowtN51EegcDe4H3PeNyT2UjeujMah6MMYmnWXCkFPXmOAA6YNyaKUrjRg26thz5akAKHG+86j9QY9rl0BY3Sv0HYw24iiLQXyjMTlr/yTihfqaWzIDnIsSeOozumNGO1Gi2Zcwn9pR2Xo0YjDjY3rIZvZrSz/rT2hEEGokf6IBaeV0DOSbG+YG8M2GEJHpO/xWXWpsfIJA0QxytQfAD/Qs72IAgMdcYAvfpf4VA8izKDa0zPsDiQqYHTmIq/r6Lfn/5wo8eR/wYSW0R3N7W4XLzOOK7ILPBL6i1tpyphuOI+v0yPkVXhxbF+zC/hbHJ5GyTLY52Q+O6QH1iiUmJGjMpndB6Lcgm9UMTJb7b0E89fAqob+epHaktxqOMA/a5IGk0b6T9uvvkJ3BOULWo9jJQOUzrieFxmLGcMPa/+XADnEBUoKriYwX2JZ/+PMzYuPPQGEMnAqirPSZtEsXA2LKsGZcec2ac6TGOK8ZKUNrF2JHi0yho4IIxhmrUQp8ciMMjMgH0HjDzcsMOjfn1nCYknKy/bIpcvRCOPOYCYqqNmzCWJky5sBOZVwy403g8cmOeyFQMYjdiwSSPOSUYz7G+M5NYHB6HY3O9y8/cNE2T9TpJUzfz80N8HxLLDIltDmZi0pIRG5y31ri0UP/NfbzzycquwI0+73ZxRYFouAnjU8o8rZFJJHxolM1fPpeyjnNHWevkrf1wqyQQ3xuMTykbE9twhf7kK1D87cER1zFusttdUbKToXPAFoWI2SBLjY8ppVAbilIhfDZ7ZN54+BSRi8oQ3fxXZTgQzIf4Ch66iYgJxJhrL9i4jdCDOl7IzDEBiZgznjLhYfo+yTeoBUfKmTBLE2E4tV+vLOabFeR8kLlD6+ACPxSoHXci9m8IpLmLGI/QT0R2Q5DPIXOoRkBH+xC1DyxjqLc2AuuZsrzNgLZ1kZUe7g8yVaUgfeCudZlgIrgYDBSn3uATiNiXxB6Phu5WogiY+m5EIAzMMfgBlTnzgk2VzwWZjtCw+SYA4WNZuMWmQmSPDZSU3teWw61QBXTeICtuDIANwCCR+k823cN/C6P4NoUpLxigwvg08iCTCmLHT1ztCdOAd1WhrPmUTPA0yeQMunSmoJjSFcqaj0A21CbiZKE9UaNK70GF14smaJMKTNI3+Cr+OaHKYUMPo5eWUCCKmZTKiM+PQOnKQTbt/GCoK+QZbWvCVJ38hAem0y/gP2rXtwVZ/TY71EVP8MC0+gJug7yowaILrLRBtuArbQoDhuPEVQlWvSelswP56a3VoUoTV8HZvZavSn7CrXrLE2CyKayHHux9qPmxVogHGEx7ucGQfaW6Aq9LMQhFXAWaNS+BAkWQ9BjajQc3UHjl4Ly9uBGKQ2EFnOLWpQkoKiyhRixQwjfCPLw9o3swYxKQHZ/CCYRahNrQbiTxDX4TofJq3FwoLoTFtgs0cPlTnCCYAW2EJhSxskoKu6HSDrzaB6ve8CPkXVmlrN2kTAek5ISb1PofJkpFFg1a/2YDrNsDQxkl4hpzgdceNoNsX2BL8+CROyNqey0hcAFt34ILP8BoRYVoNZGyQOI+tsAJwhp8OkTEjyQjs4wyfIG1moF0iBAKRbHgMd2+ZgIrJ0D4doVEEkXqcAmLrQWn9IGBtkL+JolC4VWXlsDlLwBHrpC0lEThW4shYuC8RMBbq381OJsS34m8ImwDnN0MlNjq3x4MIMn92ot0I+B0PrBfxlJoOUDzDU5hA8MUo1BSwLyQ2f0CFzgVUSjx8H+WQqCn/z8p/K/mUhGFEknzv0/hgmYpL0tFFEo0/mL+bwNOHyIUQptGUiq0qMbn3CeEQmiXSto//azVhlAIfQtJC72ftbwRjT/OPyyXC2LwE0Ts0pE+vqQbrilw7h3iPbFxmrK5Re07meOvovx2iC97ciR72HAxYcBbETLXRqFeq9x3cU5cp5nvizoaG0J6yn3HTYM+JNN0e3f8qNojZSUhFvh03feXvcT1oydWzZhpsg6WinRj8DbBC92kEshaFXXtJclWYQzqE+vrpYgPt5WTpQuS6qVOFFZxcdleywbNpKrQz1C+umB5i3UuaJGwmGXKNKoqzzDjV2LmCaYQj/UbbZnGYjrfa95XcBz/jUYEhtXlXaUBGHKNTvWrUOF8iB5H8HECW7wuuEaLxjEgHpy7KxCh0tiwTA643qmvf1rHulFdrfzzfechE9ZvEoIM0PK0Yak8/usdLi99iJx7Wb7YtNzez0V12D205ELJJ9wo3V9OESTv722+gKk2t72LVaMxEv9Aq9dFZA1b2ovcc3+6EVCY3m6NTEoj3lO0XhHVgDcpIV8989l4nxdH7QgvsIlrPj8NlEXw/PMVGSmSlNBu7Ysh3nfdgtzaW6RAbhMWQdu9X/mnrPSBiu/N1OPrSy3L00ARyoUS5b1VMHAm7b5i2RFW5f3ggr8ta9hXSNzStbIpT1WuOby91bWqAf/xxG/VWDyKynI7qBS6r8Ddlbdbt1as7ypLs6Ef2PkQcCM0eoFaItFVN2CF1+g6nYfce9JoZmWFxFStoGHJ8kd1F/SOdd4dseBICXaQvbs25f5hg4NpiZoJJB/SxOVDu8ANlt4hfQGJHswJUQSXv0Naw0Oq1650b7CNi/AdDf4eMMLDwrvcHYy9u5rJuAlph/i1MsjVCd32h2cjRupaqpmh6TkwW+AOaMmaJ+LZQ/2B+Kwc4TkbEIB4syPexZj3ifV1JNfKSFJ6sPvI3YIxzw0IXr2TIgV9dTmoe5sgHxnYNXnmZs4z+8Fjm8+QtfE0O70iWXewQYjt9a2G3gwY+OoATuxPItLLtN/5RPQxKAu6Q+76jtz1j2f46qxGXY0lMsh2+s2IEVWAuLiIzo6IT7CtO1sc4zzTDAEE2a0a9WIMIsSRUBMia4ad61bc91EUhygTvWccuH44+lEj5BSi5e4ILw8vJvSHVafJvqD4Zj3pzU1hzz0sMgxu+XckarzGgjdPV6ylDrCGjzizI/X3wLDpGHUj5SkYpp2ZRCzgR4yGcRMwCztxI2Ssu/TewigDowGWXCDkFdaaDNQB1p3cEhmuW7nSGPm8BNbTmwwzYRWH4MjeO6YQMFat4xqPa+aOmft0zB5bcGDC9NkBpe+t1/lEJ/zVQa8XNJpog/28e8ZXMBbxVgoJvfeMntDt5y3ryV4m9P+mEDjmrR7dnuzoBW34sPDHVnNnUd9ZVCRAIbBApscHx9G3EcDvftiwKaUXizGmt6ZWHPE2Av6+BTgfnyl8b4X4AnXMvjdNYqPlV+wxXau8xowm50E+8cubfPhz8WX7wP1ybirMcl/ep3wILb0/6o0SvE0gOIpYl/BZIO06Apa5hSD1iXoC66HHbCxvKN/EsW8FEXsPrDdTRcLiDk7x6PeesHjGH5Q2xhp/CHViiR51YeMZnAOHetRU2lBm2BD2oFQU4xw4ZABDfCprSolngsTuCXFfZBC50HCMtCAJkEx9/5DK6g6OyMUMiQI2JSrqdJ6TJd4hHZBYGmFUdfCAuBuok5knJBV8SzYykDVUNrkkZJyuTUv8+pDESzS/daM4iASBzAOGOCijBZh99Ym6XTMWvEQkWFTPZn+Cqo9FuX2/vRRF3INVll7qspY5a7hR0xrz0C0VY5FURnBhbqdZ7QMTRWUO1JGqiBj1TOqFmoTAOGYofPMgcyOFefOUWnVxMeU3UA+6QaZMEDEUth+hw3BkILagmDsdm/Ygm1uSoQsNCuk6eIpC8lE94NvJQXqBgeJgf1H4faWv/chXoPPrQBAsR0ovvfqtAeiiPP5of1DoX/bX3QeNyEeyorx/PFuJUnglI3cwFqgFWuy7XLyhn/5LuRT9/NuP9C76a7H6bAFmQNPPPk5+8Z0+LgFje3QUtnK3X6luzu0f2vqyc8uqkMKa6VIhL2emwNTkOaQI6yhsncreCmw/0qmLjt9b6QpK6mIm/aFlbhNgLv+QZYMdha0F1kdYAYXdGC0dwfdYR67NyDxP2nMmWIbrjY7CdoP6THD7kW5XO0GBU3hgvFCNXDsPrszZQ69I6VDYOUsdhR/htoJLfkyUop9go6MBEsEDXMpQ2HFBR2HnB13Z3MBGx6dXgW/dDaWqzh52BklLYfvE+J73r5N5X6tXXP9JBzROotB7/mWf815nOv3172+cFWGnbxppCrurSDSFzcmsc0Vyx9F16dWoVcXq66iPdNIUdoKyo7CzKjsKq6syNjKycEMBZXMoz2ktqE40td4sQyGQNH/K7hvBfEL0G5U6HpPml6/FEFAItIUSrEk8DVtBgNTLwn1vBwkoBBpfhSk1cGqIGrV5fecTQGFnVncUvq22YyxLHHvTTW0enBWMQEDhw3a+V1EmfKIuE78mNhpHrbSaW7z8jytNoevIm91wHtuM0KsjCZJsdTt0Ua2WwuuYPDntrs2NCdlRL3MzN9mMyXeogkOzolig15dvbQNfOFnu9pXN6UgIsbPYbiA1ZcQoEFl6hDSxI0ExXG00cME8bIu4m+5GG9wsCxgEBrLAHRbkzy/sDMlVd2o4e0aMLCflEESj70GZQb2b9U6+5g1LS7jM1PPTc39AulA451N30nO1L5DaxiUc34ow8U/m3b9ZcL+hLf5YBH44f4DQKK6HyJW1rN0kzq2Slgb/Gu5xc002IQjdJK5zO8Wjrv7+GOryXlThLV+98Gyqet6WVrjyPwCA28jHbXMSAAAAAElFTkSuQmCC'
                height='15'
                width='15'
              />{' '}
              Sparsh
            </a>
            {'  '}|{'  '}
            <a href='https://github.com/rishabhd786' target='_blank'>
              <img
                alt="Rishabh's Github Link"
                src='data:image/png;base64,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'
                height='15'
                width='15'
              />{' '}
              Rishabh
            </a>
          </h3>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Home;
