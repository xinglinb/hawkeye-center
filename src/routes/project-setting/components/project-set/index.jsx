import React from 'react';
import { Card, Icon, Row, Col } from 'antd';

import './index.less';

const { Meta } = Card;

export default class ProjectSet extends React.Component {
  state={
    data: [
      {
        title: '银谷在线',
        content: '2007-08-24上线',
      }, {
        title: '多赢普惠',
        content: '2015-02-08上线',
      }, {
        title: '金元宝理财',
        content: '2009-08-13上线',
      }, {
        title: '首金网',
        content: '2002-02-28上线',
      }, {
        title: '普惠家',
        content: '2015-01-19上线',
      },
    ],
  }

  render() {
    const { data } = this.state;
    return (
      <div className="project-set">
        <Row gutter={16}>
          {
            data.map((item, index) => (
              <Col span={8} key={item.title} style={index > 2 ? { marginTop: 20 } : {}}>
                <Card
                  actions={[<Icon type="edit" />, <Icon type="delete" />]}
                >
                  <Meta
                    title={item.title}
                    description={item.content}
                  />
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}
