import dva from 'dva';
import { createBrowserHistory } from 'history';

import './index.scss';

import router from './router';

const history = createBrowserHistory();

// 1. Initialize

const app = dva({
  history,
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');

