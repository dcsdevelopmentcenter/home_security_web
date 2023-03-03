import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './voting.css';
import '../App.css'

const HomeScreen = () => {
  let navigation = useNavigate();
  const navigateTo = (loc) => {
    navigation(loc);
  }
  return (
    <div className='container'>
      <button
        className="button"
        value="Register New Candidate"
        onClick={() => navigateTo('/newcandidate')}
      >Register New Candidate</button>
      <br/>
      <button
        className='button'
        title="Register New Location"
        onClick={() => navigateTo('/location')}
      >Register New Location</button>
      <br/>
      <button
        className='button'
        title="View Live Voting count"
        onClick={() => navigateTo('/livevoting')}
      >View Live Voting count</button>
    </div>
  );
};

export default HomeScreen;