import { get, post } from '../../../utils/request';


export default {
  namespace: 'errorMoniter',
  state: {
    bizData: {
      errorStatData: [],
      errorDetailData: {
        errorTypes: {},
        errorDetailList: [],
      },
    },
    uiData: {
      // 页面全局的loading
      isAddTypeModelVisible: false,
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
    * getErrorMoniterData(_, { call, put }) {
      const { data, code } = yield call(get, '/api/getErrorMoniterData');
      if (code === 200) {
        yield put({
          type: 'updateErrorMoniterData',
          payload: data,
        });
      }
    },
    * getErrorMoniterDetailData({ payload }, { call, put }) {
      const { data, code } = yield call(get, '/api/getDetailErrorMoniterData', {
        mid: payload,
      });
      if (code === 200) {
        yield put({
          type: 'updateErrorDetailData',
          payload: data,
        });
      }
    },
    * addErrorType({ payload }, { call, put }) {
      const { code } = yield call(post, '/api/addOrUpdateErrorType', payload);
      if (code === 200) {
        yield put({
          type: 'hideVisible',
          payload: 'isAddTypeModelVisible',
        });
        yield put({
          type: 'getErrorMoniterData',
        });
      }
    },
  },
  reducers: {
    showVisible(state, { payload }) {
      return {
        ...state,
        uiData: {
          ...state.uiData,
          [payload]: true,
        },
      };
    },
    hideVisible(state, { payload }) {
      return {
        ...state,
        uiData: {
          ...state.uiData,
          [payload]: false,
        },
      };
    },
    updateErrorMoniterData(state, { payload }) {
      return {
        ...state,
        bizData: {
          ...state.bizData,
          errorStatData: payload,
        },
      };
    },
    updateErrorDetailData(state, { payload }) {
      return {
        ...state,
        bizData: {
          ...state.bizData,
          errorDetailData: payload,
        },
      };
    },
  },
};

