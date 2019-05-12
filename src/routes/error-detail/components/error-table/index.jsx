import React from 'react';
import { Table } from 'antd';


import './index.less';

export default class ErrorTable extends React.Component {
  state = {
  }
  render() {
    const { errorDetailData = {} } = this.props;
    const { errorTypes = {}, errorDetailList = [] } = errorDetailData;

    const columns = [
      // {
      //   title: '错误类型',
      //   dataIndex: 'type_name',
      //   key: 'type_name',
      //   width: 70,
      //   textWrap: 'word-break',
      //   render: () => errorTypes.type_name,
      // },
      {
        title: errorTypes.param_one,
        dataIndex: 'param_one',
        key: 'param_one',
        fixed: true,
      },
      {
        title: errorTypes.param_two,
        dataIndex: 'param_two',
        key: 'param_two',
        render: text => <p dangerouslySetInnerHTML={{ __html: text.replace(/@/g, '<br />@').replace('<br />', '') }} />,
      },
      {
        title: errorTypes.param_three,
        dataIndex: 'param_three',
        key: 'param_three',
      },
      {
        title: errorTypes.param_four,
        dataIndex: 'param_four',
        key: 'param_four',
      },
      {
        title: errorTypes.param_five,
        dataIndex: 'param_five',
        key: 'param_five',
      },
      {
        title: '报错时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        width: 120,
      },
      {
        title: '浏览器版本',
        dataIndex: 'navigator_appVersion',
        key: 'navigator_appVersion',
        width: 200,
      },
      {
        title: '用户电脑',
        dataIndex: 'navigator_platform',
        key: 'navigator_platform',
        width: 100,
      },
      {
        title: '使用语言',
        dataIndex: 'navigator_language',
        key: 'navigator_language',
        width: 100,
      },
    ];

    return (
      <div className="error-table">
        <Table
          rowKey="Id"
          columns={columns}
          scroll={{ x: 1500 }}
          dataSource={errorDetailList}
          pagination={false}
        />
      </div>
    );
  }
}

