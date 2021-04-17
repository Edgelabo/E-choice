import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateRoom from '../views/CreateRoom.vue'
import AfterRoom from '../views/AfterRoom.vue'
import Result from '../views/Result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CreateRoom',
    name: 'CreateRoom',
    component: CreateRoom
  },
  {
    path: '/AfterRoom/:id',
    name: 'AfterRoom',
    component: AfterRoom
  },
  {
    path: '/Result/:id',
    name: 'Result',
    component: Result
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
