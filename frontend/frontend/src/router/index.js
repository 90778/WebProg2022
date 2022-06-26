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
    component: () => import('../views/FightSimulator.vue')
  },
  {
    path: '/techSearchView',
    name: 'TECHSEARCHVIEW',
    component: () => import('../views/TechSearchView.vue')
  },
  {
    path: '/wikiView',
    name: 'WIKIVIEW',
    component: () => import('../views/WikiView.vue')
  },
  {
    path: '/buildingCostCalculatorView',
    name: 'BUILDINGCOSTCALCULATOR',
    component: () => import('../views/BuildingCostCalculatorView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
