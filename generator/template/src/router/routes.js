import Hello from '@views/hello.vue'
import World from '@views/world.vue'

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
