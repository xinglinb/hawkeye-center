import request from 'ROOT/utils/request';

export default {
  demo: () => request('/api/users'),
};

