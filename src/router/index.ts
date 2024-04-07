import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { routes } from './routes'

const getRoutes = (): RouteRecordRaw[] => {
  const result: RouteRecordRaw[] = []

  routes.forEach((route) => {
    if (route.children.length === 0) {
      result.push({
        path: route.path,
        name: route.name,
        meta: { layout: MainLayout },
        component: route.component
      })
    } else {
      route.children.forEach((child) => {
        result.push({
          path: route.path + child.path,
          name: child.name,
          meta: { layout: MainLayout },
          component: child.component
        })
      })
    }
  })

  return result
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getRoutes()
})

export default router
