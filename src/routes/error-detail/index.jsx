import React from 'react';
import { connect } from 'dva';
import { Card, Rate, Row, Col, Divider } from 'antd';

import './index.less';

@connect(({ errorMoniter }) => ({ errorMoniter }))
export default class ErrorDetail extends React.Component {
  state = {
    detailOne: [
      {
        title: '公司名称',
        content: '东方银谷（北京）投资管理有限公司',
      }, {
        title: '法人代表',
        content: '李希斋',
      }, {
        title: '公司类型',
        content: '有限责任公司(自然人投资或控股)',
      }, {
        title: '注册地址',
        content: '北京市朝阳区东大桥路8号1楼22层2609室',
      }, {
        title: '注册资本',
        content: '10000万元',
      }, {
        title: '实缴资本',
        content: '10000万元',
      }, {
        title: '开业日期',
        content: '2007-08-24',
      }, {
        title: '营业期限',
        content: '2007-08-24 至 2037-08-23',
      },
    ],
    detailTwo: [
      {
        title: '统一社会信用代码',
        content: '91110105666276126J',
      }, {
        title: '银行存管',
        content: '用户资金存管，存管机构为西安银行',
      }, {
        title: '监管协会',
        content: '2017年09月01日 加入中关村互联网金融行业协会任会员单位',
      }, {
        title: 'ICP经营许可证',
        content: '京ICP证150991号',
      }, {
        title: 'ICP备案号',
        content: '京ICP备14022292号',
      }, {
        title: '债务转让',
        content: '不可转让',
      }, {
        title: '备案时间',
        content: '2017年01月04日',
      }, {
        title: '备案单位名称',
        content: '东方银谷（北京）投资管理有限公司',
      }, {
        title: '备案单位性质',
        content: '企业',
      }, {
        title: '备案域名',
        content: 'yingujr.com',
      },
    ],
  }

  render() {
    const { detailOne, detailTwo } = this.state;
    const { one, two, three, four } = this.props.location.query || {};
    const detailTitleData = [
      {
        content: one,
        center: '',
        title: '成交量',
      }, {
        content: two,
        center: '%',
        title: '平均参考收益率',
      }, {
        content: three,
        center: '月',
        title: '平均借款期限',
      }, {
        content: four,
        center: '万元',
        title: '待还余额',
      },
    ];

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
                    <span style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    >{item.content}</span>
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
                  <Col
                    span={8}
                    key={item.title}
                    className="content-item"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span>{item.title}</span>：
                    <span title={item.content}>{item.content}</span>
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

