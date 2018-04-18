import React from 'react';
import Helmet from '../../components/Helmet';
import Table from '../../components/Table';
import fetch from '../../utils/fetch';

const metas = [{
  name: 'tencent im online',
  content: 'tencent im online',
}];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      columns: [{
        title: '开奖期数',
        dataIndex: 'id',
        key: 'id',
        render: (id, record) => {
          const { date } = record;
          const n = new Date(date);
          const number = n.getHours() * 60 + n.getMinutes();
          return (
            <span>
              {number}
            </span>
          );
        },
      }, {
        title: '开奖号码',
        dataIndex: 'current',
        key: 'current',
      }, {
        title: '开奖结果',
        dataIndex: 'result',
        key: 'result',
      }],
      dataSource: [],
    };
  }

  componentWillMount() {
    fetch.get('/imonlines?sort=-id').then(({ data }) => {
      this.setState({
        dataSource: data,
      });
    }).catch((error) => {
      this.setState({
        error,
      });
    });
  }

  render() {
    const { columns, dataSource } = this.state;
    return (
      <div className="wrapper-content">
        <Helmet title="首页" metas={metas} />
        <div className="imonline-table">
          <Table
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      </div>
    );
  }
}

export default Home;
