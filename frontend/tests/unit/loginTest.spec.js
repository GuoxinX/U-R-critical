import {createLocalVue, shallowMount} from '@vue/test-utils'
//libraries
import ElementUI from 'element-ui';

//components
import login from '@/views/login.vue'
import loginBox from '@/components/loginBox.vue'
//configurations

const localVue = createLocalVue();
localVue.use(ElementUI)
// localVue.use(Router)
const $route = {
    path:'/'
}
const $router = {
    push : jest.fn()
}

//test suits
describe('login page', () => {
    // initialize
    let wrapper
    let vm

    beforeEach(() => {
        wrapper = shallowMount(login, {localVue, mocks:{$route,$router},
            stubs: ['router-link', 'router-view']
            })
        vm = wrapper.vm
    })

    // Snapshot check
    // test('has the expected html structure', () => {
    //     expect(wrapper.element).toMatchSnapshot()
    // })

    test('is a login component',()=>{
        expect(wrapper.is(login)).toBe(true)
        // expect(wrapper.is('div')).toBe(true)
    })

    test('login locates at / ',()=>{
        expect(vm.$route.path).toBe('/')
    })

    test('contains a loginBox',()=>{
        expect(wrapper.contains(loginBox)).toBe(true)
    })

    test('has reset pin',()=>{
        expect(wrapper.attributes('class')).toBe('wrapper')
    })

    test('reset pin is false by default', () => {
        expect(vm.resetPin).toBe(false)
    })
    test('contains router-view',()=>{
        wrapper.find(loginBox).vm.$emit('resetPassword',true);
        console.log(wrapper.html())
        expect(wrapper.contains('router-view-stub')).toBe(true)
    })
    test('resert pin is ture after loginBox emit signal',()=>{
        wrapper.find(loginBox).vm.$emit('resetPassword',true);
        expect(vm.resetPin).toBe(true)

    })
})
