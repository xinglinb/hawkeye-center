import React from 'react';
import moment from 'moment';
import { Link } from 'dva/router';
import { Statistic, Card, Row, Col, Icon, Table, Button } from 'antd';

import './index.less';

export default class Performance extends React.Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'performance/getPerformanceData',
    // });
  }
  render() {
    const dataSource = [
      '银谷在线',
      '多赢普惠', '金元宝理财', '首金网', '普惠家', '互惠金服', '鹏金所', '达人贷', '168金服', '钱香', '融资易', '鲁金所', '紫金所', '山东高速金服', '苏诚金融', '旺财谷', '威阳普惠', '小鸡理财', '石投金融', '智富贷', '广信贷', '普惠理财', '相融网', '融金宝', '白菜金融', '地标金融', '聚车金融', '黄河金融', '德鸿普惠', '壹心贷', '首E家', '陇e贷', '喜投网', '恒信易贷', '嘉石榴',
    ].map(item => ({
      name: item,
      one: Number(Math.random() * 1000000).toFixed(2),
      two: Number(Math.random() * 10).toFixed(1),
      three: Number(Math.random() * 100).toFixed(2),
      four: Number(Math.random() * 1000000).toFixed(2),
    }));

    const columns = [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        render: (text, item, index) => index + 1,
      },
      {
        title: '平台',
        dataIndex: 'name',
        key: 'name',
        render: (text, { one, two, three, four }) => (<Link to={{
          pathname: '/errorDetail',
          query: {
            one, two, three, four,
          },
        }}
        >{text}</Link>),
      },
      {
        title: '成交量',
        dataIndex: 'one',
        key: 'one',
        sorter: (a, b) => a.one - b.one,
      },
      {
        title: '平均参考收益率(%)',
        dataIndex: 'two',
        key: 'two',
        render: text => `${text}%`,
        sorter: (a, b) => a.two - b.two,
      },
      {
        title: '平均借款期限(月)',
        dataIndex: 'three',
        key: 'three',
        sorter: (a, b) => a.three - b.three,
      },
      {
        title: '待还余额(万元)',
        dataIndex: 'four',
        key: 'four',
        sorter: (a, b) => a.four - b.four,
      },
      {
        title: '关注',
        dataIndex: 'action',
        key: 'action',
        render: () => (
          <Button size="small" type={Math.random() * 10 < 8 ? 'dashed' : 'primary'} icon="heart">关注</Button>
        ),
      },
    ];
    return (
      <div className="performance">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="统计时间" value={moment().format('YYYY年MM月')} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="运营平台数量"
                value={964}
                valueStyle={{ color: '#2687fb' }}
                prefix={<Icon type="like" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="问题平台数量"
                value={41}
                valueStyle={{ color: '#cf1322' }}
                prefix={<Icon type="arrow-down" />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="当月新增平台"
                value={4}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="arrow-up" />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} className="performance-row">
          <Col span={24}>
            <div style={{ backgroundColor: '#fff' }}>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                rowKey="one"
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

