import { routerRedux } from 'dva/router';
import { post, get } from '../../../utils/request';

export default {
  namespace: 'login',
  state: {
    bizData: {
      userInfo: {},
      projects: [],
      pid: '',
    },
    uiData: {
      // 页面全局的loading
      isGlobalLoading: false,
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'distributeVmData',
        payload: window.vmData,
      });
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      const { code } = yield call(post, '/user/login', payload);
      if (code === 200) {
        yield put(routerRedux.push('/'));
      }
    },
    * register({ payload }, { call, put }) {
      const { code } = yield call(post, '/user/register', payload);
      if (code === 200) {
        yield put(routerRedux.push('/addProject/projectMessage'));
      }
    },
    * loginout(_, { call, put }) {
      const { code } = yield call(post, '/user/loginout');
      if (code === 200) {
        yield put(routerRedux.push('/login'));
      }
    },
    * getUserInfo(_, { call, put }) {
      const { code, data = {} } = yield call(get, '/api/getUserInfo');
      if (code === 200) {
        yield put({
          type: 'updateUserInfo',
          payload: data,
        });
        const { projects = [] } = data;
        if (!projects.length) {
          yield put(routerRedux.push('/addProject/projectMessage'));
        }
      }
    },

    * changeProject({ payload }, { call }) {
      const { code } = yield call(post, '/api/changeProject', {
        pid: payload,
      });
      if (code === 200) {
        window.location.reload();
      }
    },
  },
  reducers: {
    showGlobalLoading(state) {
      return { ...state, isGlobalLoading: true };
    },
    hideGlobalLoading(state) {
      return { ...state, isGlobalLoading: false };
    },
    updateUserInfo(state, { payload }) {
      return {
        ...state,
        bizData: {
          ...state.bizData,
          ...payload,
        },
      };
    },
  },
};

