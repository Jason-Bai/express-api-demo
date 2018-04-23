import React from 'react';
import { Row, Col } from 'antd';
import './dashboard.css';
import InfoBoxes from './InfoBoxes';
import ImOnlineLine from './ImOnlineLine';
import NumberStack from './NumberStack';
import NumberPie from './NumberPie';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="wrapper-dashboard">
        <InfoBoxes />
        <ImOnlineLine />
        <Row gutter={16}>
          <Col span={12}>
            <NumberStack />
          </Col>
          <Col span={12}>
            <NumberPie />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
