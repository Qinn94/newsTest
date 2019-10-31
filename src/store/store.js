import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  'status': '',
  'period': '',
  'income': '',
  'risk': '',
  'key': '',
  'page_num': 1,
  'page_size': 10,
  //金融列表是否清空
  'itemListNo': false
}
const getters = {
  getParams(state) {
    return {
      status: state.status,
      period: state.period,
      income: state.income,
      risk: state.risk,
      key: state.key,
      page_size: state.page_size
    }
  },
  //金融列表是否清空
  getListNo(state) {
    return state.itemListNo
  },
  //页码
  getPageNum(state) {
    return state.page_num;
  },
  //获取搜索条件
  getSearchKey(state) {
    return state.key
  }
}
const actions = {
  setParams({
    commit,
    state
  }, value) {
    commit('setParamsValue', value);
  },
  setSearchKey({
    commit,
    state
  }, value) {
    commit('serSearchKeyValue', value);
  },
  setPageNum({
    commit,
    state
  }, value) {
    commit("setPageNum", value);
  },
  setListNo({
    commit,
    state
  }, value) {
    commit('setListNo', value);
  }

}
const mutations = {
  setParamsValue(state, value) {
    state.status = value.status;
    state.period = value.period;
    state.income = value.income;
    state.risk = value.risk
  },
  //搜索条件
  serSearchKeyValue(state, value) {
    state.key = value;
  },
  //更新页数
  setPageNum(state, value) {
    state.page_num = value;
  },
  //金融列表页是否清空列表
  setListNo(state, value) {
    state.itemListNo = value;
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
