import {shallowMount} from '@vue/test-utils';
import AppContentKanban from '@/views/AppContentKanban.vue';
import store from '@/store';

describe('AppContentKanban.vue', () => {
  const wrapper = shallowMount(AppContentKanban, {
    global: {
      plugins: [store],
    },
  });
  //!!!! This fails because of the difference in current Date: !!!!!
  it('renders correct data', () => {
    expect(wrapper.vm.range).toStrictEqual({
      start: new Date(),
      end: new Date(),
    });
  });
  it('correct computed', () => {
    expect(wrapper.vm.calendarSearchIsOn).toBe(false);
  });
  it('correct snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('correct method', () => {
    const expectedRes = true;
    wrapper.vm.runCalendarSearch();
    expect(wrapper.vm.calendarSearchIsOn).toBe(expectedRes);
  });
});
