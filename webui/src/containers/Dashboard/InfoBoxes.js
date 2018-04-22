import React from 'react';
import { Row, Col } from 'antd';
import InfoBox from 'components/InfoBox';
import './infoboxes.css';

class InfoBoxes extends React.Component {
  render() {
    return (
      <div className="wrapper-info-boxes">
        <Row gutter={24}>
          <Col span={6}>
            <InfoBox
              iconType="user"
              text="频次最高数字"
              number={8}
            />
          </Col>
          <Col span={6}>
            <InfoBox
              iconType="user"
              text="间隔最小数字"
              number={0}
            />
          </Col>
          <Col span={6}>
            <InfoBox
              iconType="user"
              text="间隔最大期数"
              number={12}
            />
          </Col>
          <Col span={6}>
            <InfoBox
              iconType="user"
              text="间隔最大期数"
              number={12}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default InfoBoxes;
