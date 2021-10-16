import router from 'umi/router';
import * as EngineLayoutService from '../services/EngineLayoutApi';

export default {
  namespace: 'engineLayout',
  state: {
    flvSed:0,//一级选中
    sedSed:0,//二级选中
    tlvSed:0,//三级选中
    flvList: [],//一级菜单数组
    sedList: [],//二级菜单数组
    tlvList: [],//三级菜单数组
    flvNum:0, // 显示菜单数量
    flvStartNum:0,// 开始才是index
    flvEndNum:0,//  结束菜单index
  },
  //用来保存更新state值 上面的put方法调用这里的方法
  reducers: {
    init(state:any, { payload: { flvSed, sedSed,tlvSed,flvList,sedList,tlvList,flvNum,flvStartNum,flvEndNum } }:any) { //初始化
      return { ...state, flvSed, sedSed,tlvSed,flvList,sedList,tlvList,flvNum,flvStartNum,flvEndNum };
    },
    upateFlvNum(state:any, { payload: { flvNum,flvStartNum,flvEndNum } }:any){ //改变窗口大小调整显示菜单数量
      return { ...state, flvNum,flvStartNum,flvEndNum };
    },
    updateSedList(state:any, { payload: { flvSed, sedSed,tlvSed,sedList,tlvList } }:any){ //点击的一级菜单 更新二级和三级菜单
      return { ...state, flvSed, sedSed,tlvSed,sedList,tlvList};
    },
    updateTlvList(state:any, { payload: { sedSed,tlvSed,tlvList } }:any){ //点击的二级菜单 更新三级菜单
      return { ...state, sedSed,tlvSed,tlvList};
    },
    updateTlvSelected(state:any, { payload: { tlvSed } }:any){ //点击的三级菜单 不更新菜单数组
      return { ...state, tlvSed};
    }
  },
  effects: {
    *initModel({ payload }:any, { call, put }:any){ //初始化
      const {flv,sed,tlv,lv,pathname,flvNum,flvStartNum,flvEndNum} = payload;
      //console.log("initModel----------->",flv,sed,tlv,lv,pathname,flvNum,flvStartNum,flvEndNum)
      const { flvSed, sedSed,tlvSed,flvList,sedList,tlvList,lvNum } = yield call(EngineLayoutService.fetch, { flv,sed,tlv,lv });
      yield put({
        type: 'init',
        payload: {flvSed, sedSed,tlvSed,flvList,sedList,tlvList,flvNum,flvStartNum,flvEndNum},
      });
      router.push({
        pathname:pathname,
        query:{flv:flvSed,sed:sedSed,tlv:tlvSed,lv:lvNum}
      })
    },
    *upateFlvNumEffects({ payload }:any, { call, put }:any){
      const {flvNum,flvStartNum,flvEndNum} = payload;
      yield put({
        type: 'upateFlvNum',
        payload: {flvNum,flvStartNum,flvEndNum},
      });
    },
    *updateSedListEffects({ payload }:any, { call, put }:any){
      const {flv,sed,tlv,lv,pathname} = payload;
      const { flvSed, sedSed,tlvSed,sedList,tlvList,lvNum } = yield call(EngineLayoutService.fetchSedAndTlvList, { flv,lv });
      //console.log("updateSedListEffects---->>>",flvSed, sedSed,tlvSed,sedList,tlvList,lvNum)
      yield put({
        type: 'updateSedList',
        payload: {flvSed, sedSed,tlvSed,sedList,tlvList},
      });
      router.push({
        pathname:pathname,
        query:{flv:flv,sed:sedSed,tlv:tlvSed}
      })
    },
    *updateTlvListEffects({ payload }:any, { call, put }:any){
      const {flv,sed,tlv,lv,pathname} = payload;
      //console.log("updateTlvListEffects--->",flv,sed,tlv,lv,pathname)
      const { sedSed,tlvSed,tlvList,lvNum } = yield call(EngineLayoutService.fetchTlvList, { sed,lv });
      //console.log("updateTlvListEffects---->>>",flvSed, sedSed,tlvSed,sedList,tlvList,lvNum)
      yield put({
        type: 'updateTlvList',
        payload: {sedSed,tlvSed,tlvList},
      });
      router.push({
        pathname:pathname,
        query:{flv:flv,sed:sedSed,tlv:tlvSed}
      })
    },
    *updateTlvSelectedEffects({ payload }:any, { call, put }:any){
      const {flv,sed,tlv,lv,pathname} = payload;
      yield put({
        type: 'updateTlvSelected',
        payload: {tlvSed:tlv},
      });
      router.push({
        pathname:pathname,
        query:{flv:flv,sed:sed,tlv:tlv}
      })
    },
    *fetch({ payload }:any, { call, put }:any) {
      //console.log("--init-->>>",payload);
      const {flv,sed,tlv,lv,pathname} = payload;
      const { flvSed, sedSed,tlvSed,flvList,sedList,tlvList } = yield call(EngineLayoutService.fetch, { flv,lv });
      //console.log("---->>>",flvSed, sedSed,tlvSed,flvList,sedList,tlvList)
      yield put({
        type: 'save',
        payload: {flvSed, sedSed,tlvSed,flvList,sedList,tlvList},
      });
    },
    *changeMenu({ payload }:any, { call, put, select }:any) {
      const {flv,sed,tlv,lv,pathname} = payload;
      //console.log("changeMenu--init-->>>",payload);
      const { flvSed, sedSed,tlvSed,flvList,sedList,tlvList } = yield call(EngineLayoutService.fetch, { flv,sed,tlv,lv });
      //console.log("changeMenu---->>>",flvSed, sedSed,tlvSed,flvList,sedList,tlvList)
      yield put({
        type: 'save',
        payload: {flvSed, sedSed,tlvSed,flvList,sedList,tlvList},
      });
      router.push({
        pathname:pathname,
        query:{flv:flv,sed:sedSed,tlv:tlvSed}
      })
    },
    // *patch({ payload: { id, values } }, { call, put, select }) {
    //   yield call(EngineLayoutService.patch, id, values);
    //   const page = yield select(state => state.users.page);
    //   yield put({ type: 'fetch', payload: { page } });
    // },
    // *create({ payload: values }, { call, put, select }) {
    //   yield call(EngineLayoutService.create, values);
    //   const page = yield select(state => state.users.page);
    //   yield put({ type: 'fetch', payload: { page } });
    // },
  },
  subscriptions: {
    // setup({ dispatch, history }:any) {
    //   return history.listen(({ pathname, query }:any) => {
    //     if (pathname === '/engine') {
    //       dispatch({ 
    //         type: 'fetch', 
    //         payload: query 
    //       });
    //     }
    //   });
    // },
  },
};
