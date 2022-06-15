import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index/index.vue'
import store from '../store/index'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      islogin: false
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 404,
    component: Index // 404默认跳转首页
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/game/index'), // 404默认跳转首页
    meta: {
      islogin: false
    }
  },
  {
    path: '/beauty',
    name: 'beauty',
    component: () => import('../views/beauty/index'),
    meta: {
      islogin: false
    }
  },
  {
    path: '/movie',
    name: 'movie',
    component: () => import('../views/movie/index'),
    meta: {
      islogin: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine/index'),
    meta: {
      islogin: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index')
  },
  {
    path: '/res',
    name: 'res',
    component: () => import('../views/register/index')
  },
  {
    path: '/agree',
    name: 'agree',
    component: () => import('../views/next/agree/index'),
    meta: {
      islogin: false
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/next/setting/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/moviedetail',
    name: 'moviedetail',
    component: () => import('../views/next/movieDetail/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/lottery',
    name: 'lottery',
    component: () => import('../views/next/lottery/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/next/message/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/jfdetail',
    name: 'jfdetail',
    component: () => import('../views/next/jfdetail/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/rwdetail',
    name: 'rwdetail',
    component: () => import('../views/next/rwdetail/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import('../views/next/recharge/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('../views/next/withdraw/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/bind',
    name: 'bind',
    component: () => import('../views/next/bind/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/next/info/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/rechargedetail',
    name: 'rechargedetail',
    component: () => import('../views/next/recharge-detail/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/changename',
    name: 'changename',
    component: () => import('../views/next/changename/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/changenumber',
    name: 'changenumber',
    component: () => import('../views/next/changenumber/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/changepas',
    name: 'changepas',
    component: () => import('../views/next/changePassword/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/fundpas',
    name: 'fundpas',
    component: () => import('../views/next/fundpassword/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/notion',
    name: 'notion',
    component: () => import('../views/next/notion/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/rwxq',
    name: 'rwxq',
    component: () => import('../views/next/rwxq/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/mymove',
    name: 'mymove',
    component: () => import('../views/next/mymove/index'),
    meta: {
      islogin: true
    }
  },
  {
    path: '/dl',
    name: 'dl',
    component: () => import('../views/next/agencyCenter/index'),
    meta: {
      islogin: true
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
    document.getElementById('app').scrollTop = 0
  }
})

router.beforeEach((to, from, next) => {
  if (store.state.token) {
    if (to.path !== '/login' && to.path !== '/register') {
      next()
    } else {
      router.go(-1)
    }
  } else {
    if (to.path === '/login' || to.path === '/register' || !to.meta.islogin) {
      next()
    } else {
      router.push('/login')
    }
  }
})
export default router
