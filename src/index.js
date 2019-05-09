import app from './app';
import router from './router';

import './index.less';

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);s

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
