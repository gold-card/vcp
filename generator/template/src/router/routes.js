import Hello from '@views/hello.vue'

const World = () => import('@views/world.vue') // 懒加载

export default [
  {
    path: '/',
    redirect: '/hello',
  },
  {
    path: '/hello',
    name: 'hello',
    component: Hello,
  },
  {
    path: '/world',
    name: 'world',
    component: World,
  },
]
