import React from 'react';
import { Table } from 'antd';
import './table.css';

const TableX = (props) => (
  <div className="wrapper-table">
    <Table {...props} />
  </div>
);

export default TableX;
