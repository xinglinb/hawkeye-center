import { routerRedux } from 'dva/router';
import { post, get } from '../../../utils/request';

export default {
  namespace: 'addProject',
  state: {
    bizData: {
      users: [],
      newPid: '',
      newProject: {},
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
    * getUsers(_, { put, call }) {
      const { code, data } = yield call(get, '/api/getUsers');
      if (code === 200) {
        yield put({
          type: 'updateUsers',
          payload: data,
        });
      }
    },

    * createProject({ payload }, { put, call }) {
      yield put({
        type: 'updateNewProject',
        payload,
      });
      const { code, data } = yield call(post, '/api/addOrUpdateProject', {
        ...payload,
        members: JSON.stringify(payload.members),
      });
      if (code === 200) {
        yield put({
          type: 'updateNewPid',
          payload: data.pid,
        });
        yield put({
          type: 'login/getUserInfo',
        });
        yield put(routerRedux.push('/addProject/projectSetting'));
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
    updateUsers(state, { payload }) {
      return {
        ...state,
        bizData: {
          ...state.bizData,
          users: payload,
        },
      };
    },
    updateNewPid(state, { payload }) {
      return {
        ...state,
        bizData: {
          ...state.bizData,
          newPid: payload,
        },
      };
    },
    updateNewProject(state, { payload }) {
      return {
        ...state,
        bizData: {
          ...state.bizData,
          newProject: payload,
        },
      };
    },
  },
};

