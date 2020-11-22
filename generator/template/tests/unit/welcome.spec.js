import { shallowMount } from '@vue/test-utils'
import Welcome from '@/components/welcome.vue' // NOTE: 无法识别 vue.config.js 配置的别名

describe('Welcome.vue', () => {
  it('render props.paramFromParent', () => {
    const paramFromParent = 'hello world'
    const wrapper = shallowMount(Welcome, {
      propsData: { paramFromParent },
    })

    expect(wrapper.text()).toMatch(paramFromParent)
  })
})
