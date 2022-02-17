// import {shallowMount} from '@vue/test-utils';
// import AppMessage from '@/components/AppMessage.vue';

// describe('AppMessage.vue', () => {
//   it('renders correct data', () => {
//     const wrapper = shallowMount(AppMessage);
//     expect(wrapper.vm.$data.count).toBe(1);
//   });
// });

import {shallowMount} from '@vue/test-utils';
import AppTask from '@/components/AppTask.vue';

describe('AppTask.vue', () => {
  it('renders correct data', () => {
    const wrapper = shallowMount(AppTask);
    expect(wrapper.vm.$data.count).toBe(1);
  });
});
