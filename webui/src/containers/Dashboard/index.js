import React from 'react';
import { Row, Col } from 'antd';
import './dashboard.css';
import InfoBoxes from './InfoBoxes';
import ImOnlineLine from './ImOnlineLine';
import ImOnlineStack from './ImOnlineStack';
import ImOnlinePie from './ImOnlinePie';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="wrapper-dashboard">
        <InfoBoxes />
        <ImOnlineLine />
        <Row gutter={16}>
          <Col span={12}>
            <ImOnlineStack />
          </Col>
          <Col span={12}>
            <ImOnlinePie />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
