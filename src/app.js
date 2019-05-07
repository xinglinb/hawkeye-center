import dva from 'dva';
import {
  createBrowserHistory,
} from 'history';

const history = createBrowserHistory();

// 1. Initialize

export default dva({
  history,
});
