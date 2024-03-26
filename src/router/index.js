import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ()=> import('@/views/Layout/index.vue'),
      children:[
        {
          path:'',
          component: () => import('@/views/homepage/index.vue')
        },
        {
          path:'/project',
          component: () => import('@/views/githubproject/index.vue')
        },
        {
          path:'/projectDetails',
          component: () => import('@/views/githubproject/details.vue')
        },
        {
          path:'/article',
          component: () => import('@/views/Article/index.vue')
        },
        {
          path:'/article/details',
          component:() => import('@/views/Article/details.vue')
        },
        {
          path:'/course',
          component: ()=> import('@/views/course/index.vue')
        }, 
        {
          path:'/course/details',
          component: ()=> import('@/views/course/details.vue')
        },
        {
          path:'/message',
          component: () => import('@/views/message/index.vue')
        },
        {
          path:'/user/center',
          component:()=> import('@/views/user/center.vue'),
          children:[
            {
              path:'',
              component:()=> import('@/views/user/userdata.vue')
            },
            {
              path:'/user/collect',
              component:()=> import('@/views/user/collect.vue')
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component: () => import('@/views/Login/index.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

export default router
