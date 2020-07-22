import {createLocalVue, shallowMount} from '@vue/test-utils'
//libraries
import ElementUI from 'element-ui';
import mockAxios from 'axios';
import VueCookie from 'vue-cookie';
//components
import resetPassword from '@/views/resetPassword.vue'
//configurations
import config from '../../src/assets/js/config.js'

const localVue = createLocalVue();
const $route = {
    path:'/restPassword'
}
const $router = {
    push : jest.fn()
}
global.alert = jest.fn();


localVue.use(ElementUI)
localVue.use(VueCookie)

localVue.prototype.siteConfig = config
localVue.prototype.$axios = mockAxios

describe('resetPassword',()=>{
    let cmp
    let vm
    beforeEach(()=>{
        cmp = shallowMount(resetPassword, {localVue, mocks:{$route,$router}})
        vm = cmp.vm
        jest.resetModules();
        jest.clearAllMocks();
    })

    test('has 2 passwore inputs',()=>{
        expect(cmp.findAll('.password-input').length).toBe(2)
    })
    test('has a submit btn',()=>{
        expect(cmp.contains('.submit-button')).toBe(true)
    })

    describe('test reset function', ()=>{
        test('psw is empty',()=>{
            const password = ''
            const passwordCheck = ''
            vm.reset(password,passwordCheck);
            expect(global.alert).toHaveBeenCalledWith("Password cannot be null!")
        })
        test('psw less than 7',()=>{
            const password = '1234567'
            const passwordCheck = '1234567'
            vm.reset(password,passwordCheck);
            expect(global.alert).toHaveBeenCalledWith("Password require at least 8 characters")
        })
        test('psw pswc are different',()=>{
            const password = '12345678'
            const passwordCheck = '123456789'
            vm.reset(password,passwordCheck);
            expect(global.alert).toHaveBeenCalledWith("the two passwords your typed in are different, please check it again")
        })
        test('valid inputs',async ()=>{
            const password = '12345678'
            const passwordCheck = '12345678'
            mockAxios.patch.mockImplementationOnce(() =>
                Promise.resolve({
                    data:{
                        username: 'nurse'
                    }
                })
            );
            await vm.reset(password,passwordCheck);
            expect(global.alert).toHaveBeenCalledWith("Thank you, " + 'nurse' + ", your password has been updated")
            expect(vm.$router.push).toHaveBeenCalledWith({path:'/'})
        })
    })
})
