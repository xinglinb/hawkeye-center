import { get } from '../../../utils/request';

export default {
  namespace: 'performance',
  state: {
    bizData: {
      sevenAvgAllTime: [],
      statData: {},
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
    * getPerformanceData(_, { call, put }) {
      const { data, code } = yield call(get, '/api/getPerformanceData');
      if (code === 200) {
        yield put({
          type: 'updatePerformanceData',
          payload: data,
        });
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
    updatePerformanceData(state, { payload }) {
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

