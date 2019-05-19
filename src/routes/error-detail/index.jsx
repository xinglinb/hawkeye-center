import React from 'react';
import { connect } from 'dva';
import { Card, Rate, Row, Col, Divider } from 'antd';

import './index.less';

@connect(({ errorMoniter }) => ({ errorMoniter }))
export default class ErrorDetail extends React.Component {
  state = {
    detailTitleData: [
      {
        content: 9.80,
        center: '%',
        title: '参考收益',
      }, {
        content: 34.46,
        center: '月',
        title: '投资期限',
      }, {
        content: 4.14,
        center: '万',
        title: '昨日成交量',
      }, {
        content: 941620.17,
        center: '万',
        title: '昨日待还余额',
      },
    ],
    detailOne: [
      {
        title: '平台名称',
        content: '东方银谷（北京）投资管理有限公司',
      }, {
        title: '统一社会信用代码',
        content: '91110105666276126J',
      }, {
        title: '法人代表',
        content: '李希斋',
      }, {
        title: '注册资本',
        content: '10000万元',
      }, {
        title: '公司类型',
        content: '有限责任公司(自然人投资或控股)',
      }, {
        title: '实缴资本',
        content: '10000万元',
      }, {
        title: '注册地址',
        content: '北京市朝阳区东大桥路8号1楼22层2609室',
      }, {
        title: '开业日期',
        content: '2007-08-24',
      }, {
        title: '核准日期',
        content: '东方银谷（北京）投资管理有限公司',
      }, {
        title: '备案单位性质',
        content: '企业',
      }, {
        title: 'ICP备案号',
        content: '京ICP备14022292号',
      }, {
        title: 'ICP经营许可证',
        content: '京ICP证150991号',
      },
    ],
    detailTwo: [
      {
        title: '平台名称',
        content: '银谷在线',
      }, {
        title: '是否有银行存管',
        content: '无存管',
      }, {
        title: '监管协会',
        content: '中关村互联网金融行业协会任会员单位',
      }, {
        title: 'ICP经营许可证',
        content: '京ICP证150991号',
      }, {
        title: '是否可以债务转让',
        content: '不可转让',
      }, {
        title: '登记机关',
        content: '朝阳分局',
      }, {
        title: '登记状态',
        content: '在业',
      }, {
        title: '是否有风险储备金',
        content: '是',
      },
    ],
  }

  render() {
    const { detailTitleData, detailOne, detailTwo } = this.state;

    return (
      <div className="error-moniter-detail">
        <Card className="detial-header">
          <div className="detail-title">
            <p>银谷在线</p>
            <Rate allowHalf defaultValue={2.5} />
          </div>
          <div className="detail-content">
            {
              detailTitleData.map(item => (
                <div className="content-note" key={item.title}>
                  <p className="content">
                    {item.content} <span>{item.center}</span>
                  </p>
                  <div className="title">{item.title}</div>
                </div>
              ))
            }
          </div>
        </Card>

        <Card className="detial-content">
          <div className="content-box">
            <p className="box-title">平台基本信息</p>
            <Row>
              {
                detailOne.map(item => (
                  <Col span={8} key={item.title} className="content-item">
                    <span>{item.title}</span>：
                    <span>{item.content}</span>
                  </Col>
                ))
              }
            </Row>
          </div>
          <Divider />
          <div className="content-box">
            <p className="box-title">平台风险信息</p>
            <Row>
              {
                detailTwo.map(item => (
                  <Col span={8} key={item.title} className="content-item">
                    <span>{item.title}</span>：
                    <span>{item.content}</span>
                  </Col>
                ))
              }
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

