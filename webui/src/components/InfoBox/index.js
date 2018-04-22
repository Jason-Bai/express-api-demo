import React from 'react';
import { Icon } from 'antd';
import './infobox.css';

const InfoBox = ({ iconType = 'user', text = '文本信息', number = 0 }) => (
  <div className="info-box">
    <Icon type={iconType} className="info-box-icon" />
    <div className="info-box-content">
      <span className="info-box-text">{text}</span>
      <span className="info-box-number">{number}</span>
    </div>
  </div>
);

export default InfoBox;
