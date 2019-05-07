export default {
  namespace: 'login',
  state: {
    bizData: {

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
    * distributeVmData({ payload }, { put }) {
      yield put({ type: 'content/init', payload });
    },
  },
  reducers: {
    showGlobalLoading(state) {
      return { ...state, isGlobalLoading: true };
    },
    hideGlobalLoading(state) {
      return { ...state, isGlobalLoading: false };
    },
  },
};

