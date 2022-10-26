import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (store.getters.token) {
    // 1. 用户已登录,则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 2. 用户未登录,只允许进入 whiteList
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})