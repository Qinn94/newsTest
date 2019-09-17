import Vue from 'vue'
import Router from 'vue-router'
import NewsList from '@/components/NewsList'

Vue.use(Router)

export default new Router({
  mode:'history',
  base:'/dist/',
  routes: [
    {
      path: '/',
      component: NewsList
    }
  ]
})
