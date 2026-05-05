import { createRouter, createWebHistory } from 'vue-router'
import BreedOverview from '../views/BreedOverview.vue'
import BreedDetail from '../views/BreedDetail.vue'
import BreedCategories from '../views/BreedCategories.vue'

const routes = [
  {
    path: '/',
    name: 'overview',
    component: BreedOverview
  },
  {
    path: '/categories',
    name: 'categories',
    component: BreedCategories
  },
  {
    path: '/breed/:name',
    name: 'breed-detail',
    component: BreedDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
