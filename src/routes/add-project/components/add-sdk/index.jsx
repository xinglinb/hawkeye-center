import React from 'react';
import { Button } from 'antd';

import './index.less';

export default class AddSdk extends React.Component {
  state = {

  }
  render() {
    // const { history } = this.props;
    return (
      <div className="add-sdk">
        <div className="add-sdk-box">
          <p>1. 植入sdk</p>
          <pre className="language-js">

            <code>
              {`
<script type="text/javascript">
  window.hawkEyeConfig = {
    pid: 'dddddd'
  }
</script>
<script type="text/javascript" src="loadxmldoc.js">
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
