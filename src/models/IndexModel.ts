import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface IndexModelState {
  name: string;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',

  state: {
    name: 'aaa',
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *testEffect({ payload }:any, { call, put, select }:any) {
      // 获取 state 中的值
      //console.log(payload)
      const { name } = payload
     
       // 接口入参
      //const params = { name, ...payload };
      // services.getInfo 是封装好的请求
      //const { data } = yield call(services.getInfo, params);
      // 请求成功之后，调用 reducer 同步方法更新 state
      
      yield put({
        // 调用当前 model 的 action 不需要添加 namespace
        type: 'changeName',
        payload: name,
      });
    },
  },
  reducers: {
    save(state:IndexModelState, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeName(state:IndexModelState, { payload }:any) {
      return {
        ...state,
        name: payload
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default IndexModel;