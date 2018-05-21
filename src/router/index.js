import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import List from '@/page/List'

import Player from '@/page/Player'

import Work from '@/page/Work'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/player',
      name: 'Player',
      component: Player
    },
    {
      path: '/work',
      name: 'Work',
      component: Work
    }
  ]
})
