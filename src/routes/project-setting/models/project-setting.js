
import { message } from 'antd';
import { post, get } from '../../../utils/request';

export default {
  namespace: 'projectSetting',
  state: {
    bizData: {
      projectInfo: {},
    },
    uiData: {
      // 页面全局的loading
      isGlobalLoading: false,
    },
  },
  subscriptions: {},
  effects: {
    * updateMySetting({ payload }, { call, put }) {
      const { code } = yield call(post, 'api/updateUserSetting', payload);
      if (code === 200) {
        yield put({
          type: 'login/getUserInfo',
        });

        message.success('修改成功');
      }
    },

    * getOldProjectSetting(_, { call, put }) {
      const { code, data } = yield call(get, 'api/getProjectInfo');
      if (code === 200) {
        yield put({
          type: 'updateProjectSettingdata',
          payload: data,
        });
      }
    },

    * updateprojectSetting({ payload }, { call, put }) {
      const { code } = yield call(post, 'api/addOrUpdateProject', {
        ...payload,
        members: JSON.stringify(payload.members),
      });
      if (code === 200) {
        yield put({
          type: 'login/getUserInfo',
        });

        message.success('修改成功');
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
    updateProjectSettingdata(state, { payload }) {
      return {
        ...state,
        bizData: {
          ...state.bizData,
          projectInfo: payload,
        },
      };
    },
  },
};

