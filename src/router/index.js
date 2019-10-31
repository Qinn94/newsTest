import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '../page/home/home.vue'
import FinanceDetailContainer from '../page/financeDatail/financeDetail.vue'
import PersonPageContainer from '../page/personPage/personPage.vue'
// import personDetailContainer from '../page/personDetail/personDetal.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'Home',
      component: HomeContainer
    }, {
      path: '/fDetail/:id',
      name: "FDetail",
      component: FinanceDetailContainer
    }, {
      path: '/personPage',
      name: 'person',
      component: PersonPageContainer
    }
    // , {
    //   path: '/pDetail',
    //   name: 'pDetail',
    //   component: personDetailContainer
    // }
  ]
})
