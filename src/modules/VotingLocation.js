import * as React from 'react';

const VotingLocation = ({navigation, route}) => {
  return <input type="text">This is {route.params.name}'s profile</input>;
};

export default VotingLocation;
