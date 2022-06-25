import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/TechSearchView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/fightSimulator',
    name: 'FIGHTSIMULATOR',
    component: () => import(/* webpackChunkName: "about" */ '../views/FightSimulator.vue')
  },
  {
    path: '/techSearchView',
    name: 'TECHSEARCHVIEW',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TechSearchView.vue')
  },
  {
    path: '/wikiView',
    name: 'WIKIVIEW',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WikiView.vue')
  },
  {
    path: '/buildingCostCalculatorView',
    name: 'BUILDINGCOSTCALCULATOR',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BuildingCostCalculatorView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
