// import { mount } from '@vue/test-utils';
// import App from '../../App.vue';

// describe('App.vue', () => {
//   let wrapper: any;

//   beforeEach(() => {
//     wrapper = mount(App);
//   });

//   it('should clear all inputs when AC is pressed', async () => {
//     wrapper.vm.display = '123';
//     wrapper.vm.smallDisplay = '123';
//     await wrapper.find('button.button_clear').trigger('click');
//     expect(wrapper.vm.display).toBe('');
//     expect(wrapper.vm.smallDisplay).toBe('');
//   });

//   it('should handle number button click', async () => {
//     await wrapper.find('button:contains("1")').trigger('click');
//     expect(wrapper.vm.display).toBe('1');
//     await wrapper.find('button:contains("2")').trigger('click');
//     expect(wrapper.vm.display).toBe('12');
//   });

//   it('should handle operator button click', async () => {
//     wrapper.vm.display = '123';
//     await wrapper.find('button:contains("+")').trigger('click');
//     expect(wrapper.vm.operator).toBe('+');
//     expect(wrapper.vm.needNewNumber).toBe(true);
//   });

//   it('should calculate result correctly', async () => {
//     wrapper.vm.prevNumber = '123';
//     wrapper.vm.display = '456';
//     wrapper.vm.operator = '+';
//     await wrapper.find('button:contains("=")').trigger('click');
//     expect(wrapper.vm.display).toBe('579');
//   });

//   it('should calculate percentage correctly', async () => {
//     wrapper.vm.display = '50';
//     wrapper.vm.prevNumber = '200';
//     wrapper.vm.operator = '+';
//     await wrapper.find('button:contains("%")').trigger('click');
//     expect(wrapper.vm.display).toBe('100');
//   });

//   it('should calculate square root correctly', async () => {
//     wrapper.vm.display = '16';
//     await wrapper.find('button:contains("√")').trigger('click');
//     expect(wrapper.vm.display).toBe('4');
//   });
// });
