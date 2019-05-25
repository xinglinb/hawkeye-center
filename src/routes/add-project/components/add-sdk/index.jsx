import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import './index.less';

@connect(({ addProject }) => ({ addProject }))
export default class AddSdk extends React.Component {
  state = {

  }
  render() {
    const { addProject } = this.props;
    const { newPid } = addProject.bizData;
    return (
      <div className="add-sdk">
        <div className="add-sdk-box">
          <p>1. 植入sdk</p>
          <pre className="language-js">

            <code>
              {`
<script type="text/javascript">
  window.hawkEyeConfig = {
    pid: ${newPid}
  }
</script>
<script type="text/javascript" src="http://127.0.0.1:3000/sdk.js"></script>
              `}
            </code>
          </pre>
        </div>

        <div className="add-sdk-box">
          <p>1. 性能监控会自动开启，错误上报：</p>
          <pre className="language-js">

            <code>
              {`
window.sendError({
  mid: 11,
  message: '',
  actionType: '',
  req: '',
  res: '',
})
              `}
            </code>
          </pre>
        </div>
        <Button
          type="primary"
          onClick={() => {
            this.props.history.push('/addProject/addFinished');
          }}
        >下一步</Button>
      </div>
    );
  }
}
