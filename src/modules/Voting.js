import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalContext } from '../config';
import HomeScreen from './Home';
import NewCandidate from './NewCandidate';
import VotingLocation from './VotingLocation'
import LiveVoting from './LiveVoting';
import './voting.css';

const Voting = () => {
  return (
    //<GlobalContext.Provider value={this.state}>
      <Router>
        <Routes>
        <Route exact path="/" element={<HomeScreen/>} />
        <Route exact path="/newcandidate" element={<NewCandidate/>} />
        <Route exact path="/location" element={<VotingLocation/>} />
        <Route exact path="/livevoting" element={<LiveVoting/>} />
        </Routes>
      </Router>
    //</GlobalContext.Provider>
  );
}

export default Voting;
