import React, {useState, useEffect} from 'react';
import { fetcheAllLocations } from './GlobalContext';
import styles from './voting.css'


let locations;
const NewCandidate = ({navigation, route}) => {
  
  const candidate = {
    name: null,
    party: null,
    cityName: null,
    stateName: null
  }
  const candidateItem = {
    id: null,
    name: null,
    party: null,
    locationRecord: {
      id: null,
      cityName: null,
      stateName: null,
    }

  }
  
  const [values, setValues] = useState(candidate);
  const [candidateList, setCandidateList] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const getLocations = async () => {
        fetcheAllLocations()
        .then(location => {
          setStates(Object.keys(location));
          setCities(Object.values(location)[0].map(loc => loc.cityName));
          setValues({
            ...values,
            'stateName' : states[0],
            'cityName' : cities[0],
          });
        });
       
    };

    const fetchCities = (selectedItem, index) => {
      let cityList = Object.values(locations)[index].map(loc => loc.cityName);
      setValues({
        ...values,
        stateName: selectedItem,
        cityName: cityList[0]
      });
      setCities(cityList);
      console.log(values);
    };

  useEffect(() => {
    getLocations();
    //console.log(values);
  },[]);

  

  const handleInputChanges = (field, value) => {
    console.log(values);
    setValues({
      ...values,
      [field]: value,
    });
    console.log(values);
  };

  const handleSubmit = async () => {
    const findLocationId = (element) => element === values.stateName;
    const findCityIndex = (element) => element.cityName === values.cityName;
    let indx = states.findIndex(findLocationId);
    let loc = Object.values(locations)[indx].find(findCityIndex);

    const bodyData = {
      name: values.name,
      party: values.party,
      locationRecord: {
        id: loc.id,
        cityName: values.cityName,
        stateName: values.stateName,
      }
    }
    try {
      let response = await fetch(
        '/voting/candidate/register',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(bodyData),
        },
      );
      let responseJson = await response.json();
      setCandidateList({
      candidateItem: [...candidateItem,responseJson],
      }); 
      console.log(responseJson);
      console.log(candidateItem);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container2}>
      <label className={styles.container2_title}>Candidate Details</label>
      <input type='text'
        title="Name"
        onChange={text => handleInputChanges('name', text.target.value)}
        placeholder="Candidate's name"
        className='container2_input'
        name="name"
      />
      <input type='text'
        title="Party"
        onChange={text => handleInputChanges('party', text.target.value)}
        placeholder="Candidate's Party name"
        className='container2_input'
      />
      <div>
      <select name='states' onChange={(element) => {fetchCities(element.target.value, element.target.selectedIndex)}}>
        {states.map((element, index) => (
          <option keys={index} name={index} value={element}>{element}</option>
        ))}
      </select>
      <select name='cities'>
        {cities.map((element, index) => (
          <option key={index} value={element}>{element}</option>
        ))}
      </select>
      </div>
      <button
        title="Submit"
        onClick={() => {
          handleSubmit();
        }}
        className='container2_button'
      >Submit</button>
      
    </div>
  );
};

export default NewCandidate;
