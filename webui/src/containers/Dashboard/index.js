import React from 'react';
import './dashboard.css';
import InfoBoxes from './InfoBoxes';
import ImOnlineLine from './ImOnlineLine';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="wrapper-dashboard">
        <InfoBoxes />
        <ImOnlineLine />
      </div>
    );
  }
}

export default Dashboard;
