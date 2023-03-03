import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { fetcheAllLocations } from './GlobalContext';


const LiveVoting = ({navigation, route}) => {
  
  const [selectedCityItem, setSelectedCityItem] = useState();
  const [selectedState, setSelectedState] = useState();
  const [states, setStates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [messages, setMessages] = useState(new Map(new Map()));

  const getLocations = async () => {
    fetcheAllLocations()
    .then(locationData => {
      setStates(Object.keys(locationData));
      setCities(Object.values(locationData)[0].map(loc => loc.cityName));
      setLocations(locationData);
    });
    
   
  };

  const fetchCities = (selectedItem, index) => {
    let cityList = Object.values(locations)[index].map(loc => loc.cityName);
    setCities(cityList);
    setSelectedState(selectedItem);
    console.log(cities);
  };

  const updateCity = (field, value) => {
    setSelectedCityItem(value);
  };

  useEffect(() => {
    getLocations();
    
    const fetchMessage = async () => {
      if (
        selectedState !== undefined && selectedState !== '' &&
        selectedCityItem !== undefined && selectedCityItem !== ''

      ) {
        try {
          let url = '/voting/results/' +selectedState;
          if(selectedCityItem !== 'All'){
            url = url + '/' + selectedCityItem;
          } 
          const response = await axios.get(url);
          let data = response.data;
          setMessages(data);
          //console.log(messages);
        } catch (error) {
          console.error(error);
        }
      }
    };
    //fetchMessage();
    const intervalId = setInterval(() => {
      fetchMessage();
    }, 50);

    return () => clearInterval(intervalId);
  }, [selectedState, selectedCityItem,messages]);

  const lotteryStyle={
    border: '2px solid grey',
    borderRadius: '10px',
    width:'150px',
    textAlign:'center',
    margin: '20px 10px auto',
    padding: '1px 0 2em 0',
    backgroundColor: 'lightgrey',
    float: 'left',

  }
  const cityDivStyle = {
    float: 'left'
  }
  const title = {
    fontSize: 40,
    color: '#f10d0d',
    marginBottom: 20,
    fontWeight: 'bold'
  }
  const ballStyle = {
    backgroundColor: 'tomato',
    borderRadius: '50%',
    width:'3em',
    height:'2.25em',
    textAlign:'center',
    paddingTop: '0.75em',
    display:'inline-block',
    marginRight: '0.5em',
    marginTop: '1em',
    color:'white',
    fontWeight: 'bold',
    fontSize: '1.5em'
  }
  return (
    <div>
      <div>
        <select name='states' onChange={(element) => {fetchCities(element.target.value, element.target.selectedIndex)}}>
          {states.map((element, index) => (
            <option keys={index} name={index} value={element}>{element}</option>
          ))}
        </select>
        <select name='cities' onChange={(element) => {updateCity('cityName', element.target.value)}}>
        <option value='All'>All Cities</option>
          {cities.map((element, index) => (
            <option key={index} value={element}>{element}</option>
          ))}
        </select>
       
      </div>
      <div>
          {Object.keys(messages).map((stsKey,stsInd) => (
            <div>
              <label style={title}>Voting Results for {stsKey}</label>
              <div>{Object.values(messages).map((cityKey,cityNdx) => (
                <div>
                  <div>
                  {Object.keys(cityKey).map((candidate,i) => (
                  <div style={cityDivStyle}>
                    <label>city name : {candidate}</label>
                    <div>
                      <div >
                        {Object.values(cityKey)[0].sort((a,b) => a.totalCast < b.totalCast ? 1 : -1).map((can,ind) => (
                            <div style={{ border: '2px solid grey', borderRadius: '10px',
                            width:'150px',
                            textAlign:'center',
                            margin: '20px 10px auto',
                            padding: '1px 0 2em 0',
                            backgroundColor: 'rgb(149, '+(80+(ind*35))+', 142)',
                            float: 'left',}}>
                              <label>{can.candidateRecord.name}-{ind}</label><br/>
                              <label>{can.candidateRecord.party}</label><br/>
                              <label>{can.totalCast}</label>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  ))}
                  </div>
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
    </div>
     
  );
};
export default LiveVoting;
