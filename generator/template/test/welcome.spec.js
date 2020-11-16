import { shallowMount } from '@vue/test-utils'
import Welcome from '@/components/welcome.vue'

describe('Welcome.vue', () => {
  it('render props.paramFromParent', () => {
    const paramFromParent = 'hello world'
    const wrapper = shallowMount(Welcome, {
      propsData: { paramFromParent },
    })

    expect(wrapper.text()).toMatch(paramFromParent)
  })
})
