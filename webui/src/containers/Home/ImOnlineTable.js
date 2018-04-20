import React from 'react';
import moment from 'moment';
import Table from 'components/Table';
import Number from 'components/Number';

const renderNumber = (number) => {
  const render = (index, record) => {
    const included = record.result.includes(number);
    if (included) {
      const props = {
        height: '25px',
        width: '25px',
        lineHeight: '25px',
        backgroundColor: '#FF0000',
        number,
      };
      return (
        <Number {...props} />
      );
    }
    return (
      <span>{number}</span>
    );
  };

  const numberColumn = {
    title: <Number number={number} />,
    dataIndex: `index${number}`,
    className: 'text-center column-number',
    width: '7%',
    render,
  };

  return numberColumn;
};

class ImOnlineTable extends React.Component {
  constructor(props) {
    super(props);
    const numberColumns = [
      '0', '1', '2', '3', '4',
      '5', '6', '7', '8','9',
    ].map((number) => renderNumber(number));

    const beforeColumns =[{
      title: '开奖时间',
      dataIndex: 'id',
      key: 'id',
      width: '12%',
      render: (id, record) => <span>{moment(record.date).format('YYYYMMDDHHmmss')}</span>,
    }, {
      title: '开奖期数',
      dataIndex: 'date',
      key: 'date',
      className: 'text-center',
      width: '8%',
      render: (id, record) => {
        const { date } = record;
        const n = new Date(date);
        const number = n.getHours() * 60 + n.getMinutes();
        return (
          <span>
          {number.toString().padStart(4, '0')}
          </span>
        );
      },
    }, {
      title: '开奖结果',
      dataIndex: 'result',
      key: 'result',
      width: '10%',
      render: (result) => result.split('').join('-'),
    }];

    const columns = beforeColumns.concat(numberColumns);

    this.state = {
      error: null,
      dataSource: [],
      columns,
    };
  }

  onTableChanged = (pagination) => {
    const { current, pageSize } = pagination;
    this.props.onChange(current, pageSize);
  }

  render() {
    const { columns } = this.state;
    const { page, pageSize, total, dataSource } = this.props;
    const pagination = {
      current: page,
      pageSize,
      total,
    };
    return (
      <div className="imonline-table">
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={dataSource}
          onChange={this.onTableChanged}
          pagination={pagination}
        />
      </div>
    );
  }
}

export default ImOnlineTable;
