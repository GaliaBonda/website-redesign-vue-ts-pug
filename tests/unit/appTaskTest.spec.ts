import {shallowMount} from '@vue/test-utils';
import AppTask from '@/components/AppTask.vue';
import Status from '@/interfaces/status.interface';

describe('AppTask.vue', () => {
  const wrapper = shallowMount(AppTask, {
    props: {
      status: Status.TODO,
    },
  });
  it('renders correct data', () => {
    expect(wrapper.vm.detailsModalIsOpen).toBe(false);
  });
  it('correct computed', () => {
    expect(wrapper.vm.taskClass).toBe('todo');
  });
  it('correct snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('correct method', () => {
    const expectedRes = true;
    wrapper.vm.showDetails();
    expect(wrapper.vm.detailsModalIsOpen).toBe(expectedRes);
  });
});
