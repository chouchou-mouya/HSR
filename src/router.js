import Vue from 'vue'
import Router from 'vue-router'
import search from './views/search.vue'
import result from './components/result.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: search,
      // children:[
      //   {
      //     path:"/result/:star",
      //     name:"result",
      //     component:result,
      //     props:true
      //   }
      // ]
    },
    {
      path: '/result/:star',
      name: 'result',
      component: result
    }
  ]
})
