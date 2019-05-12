import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';

import ErrorChart from './components/error-chart/index';
import ErrorTable from './components/error-table/';

import './index.less';

@connect(({ errorMoniter }) => ({ errorMoniter }))
export default class ErrorDetail extends React.Component {
  componentDidMount() {
    // a = 1;
    const { match, dispatch } = this.props;
    const { mid } = match.params;
    dispatch({
      type: 'errorMoniter/getErrorMoniterDetailData',
      payload: mid,
    });
  }
  render() {
    const { match, errorMoniter } = this.props;
    const { mid } = match.params;
    const { errorStatData = [], errorDetailData = {} } = errorMoniter.bizData;

    const myErrorStatData = errorStatData.find(item => item.mid === Number(mid));

    return (
      <div className="error-moniter-detail">
        <Card title={'错误数据详情'}>
          <ErrorChart myErrorStatData={myErrorStatData} />

          <ErrorTable errorDetailData={errorDetailData} />
        </Card>
      </div>
    );
  }
}

