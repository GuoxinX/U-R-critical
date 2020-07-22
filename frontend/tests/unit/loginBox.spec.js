import {createLocalVue, shallowMount} from '@vue/test-utils'
//libraries
import ElementUI from 'element-ui';
import mockAxios from 'axios';
import VueCookie from 'vue-cookie';
//components
import loginBox from '@/components/loginBox.vue'
//configurations
import config from '../../src/assets/js/config.js'


const localVue = createLocalVue();
const $route = {
    path:'/'
}
const $router = {
    push : jest.fn()
}
global.alert = jest.fn();


localVue.use(ElementUI)
localVue.use(VueCookie)

localVue.prototype.siteConfig = config
localVue.prototype.$axios = mockAxios


describe('loginBox', () => {
    let login_Box
    let vm
    beforeEach(()=>{
        login_Box = shallowMount(loginBox, {localVue, mocks:{$route,$router}})
        vm = login_Box.vm
        jest.resetModules();
        jest.clearAllMocks();
    })

    test('loginBox locates at / ',()=>{
        expect(vm.$route.path).toBe('/')
    })
    test('is a loginBox',()=>{
        expect(login_Box.is(loginBox)).toBe(true)
    })
    test('has username input',()=>{
        expect(login_Box.contains('.username-input')).toBe(true)
    })
    test('has password input',()=>{
        expect(login_Box.contains('.password-input')).toBe(true)
    })
    test('has a submit btn',()=>{
        expect(login_Box.contains('.login-button')).toBe(true)
    })
    test('username test',()=>{
        expect(vm.username).toBe('')
    })
    test('password test',()=>{
        expect(vm.password).toBe('')
    })
    test('trim username & password',()=>{
        //set fake login data
        login_Box.setData({rewUsername:' nurse ', rewPassword:' 12345678 '})
        //test computed attributes
        expect(vm.username).toBe('nurse')
        expect(vm.password).toBe('12345678')
    })
    test('click login btn calls loginClick function',()=>{
        //set fake login data
        login_Box.setData({rewUsername:'nurse', rewPassword:'12345678'})
        //test computed attributes
        expect(vm.username).toBe('nurse')
        expect(vm.password).toBe('12345678')

        //mock & inject onClick methond
        const stub = jest.fn()
        login_Box.setMethods({ loginClick: stub })
        const btn = login_Box.find('.login-button')
        // console.log(btn.vm)
        btn.trigger('click')
        expect(vm.loginClick).toBeCalled()
        // expect(stub).toBeCalled()
    })
    test('loginClick function with empty username calls alert', async ()=>{
        login_Box.setData({rewUsername:'', rewPassword:''})
        global.alert = jest.fn();
        const usersname = ''
        const password = ''
        // console.log(login_Box.vm.loginClick)
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith("username cannot be empty")
    })
    test('loginClick function with empty password calls alert', async ()=>{
        login_Box.setData({rewUsername:'', rewPassword:''})
        const usersname = 'aaaaaa'
        const password = ''
        // console.log(login_Box.vm.loginClick)
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith("password cannot be empty")
    })
    test('cookies were setted',async ()=>{
        // setup
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "fake token",
                    first_login: false,
                    firstname: "nurse1",
                    id: "fake id",
                    permissions: "nurse",
                    reset_pin: false,
                    username: "nurse"}
            })
        );
        const usersname = 'nurse'
        const password = '12345678'
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect(vm.$cookie.get('authentication')).toBe('fake token')
        expect(vm.$cookie.get('username')).toBe('nurse')
        expect(vm.$cookie.get('id')).toBe('fake id')
        expect(vm.$cookie.get('isLogin')).toBe('true')
        expect(vm.$cookie.get('firstname')).toBe('nurse1')
    })
    test('access nurse login with resetpin=true', async ()=>{
        // setup
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "fake token",
                    first_login: false,
                    firstname: "acnurse1",
                    id: "fake id",
                    permissions: "access nurse",
                    reset_pin: true,
                    username: "acnurse"}
            })
        );
        const usersname = 'acnurse'
        const password = '12345678'
        // console.log(login_Box.vm.loginClick)
        // const spy = jest.spyOn(vm.$router, 'push' )
        jest.spyOn(vm, '$emit' )
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith("the administrator has reset your password, please set your own password")
        expect(vm.$emit).toHaveBeenCalledTimes(1);
        expect(vm.$emit).toHaveBeenCalledWith('resetPassword',true);
        expect($router.push).toHaveBeenCalledWith({path: '/resetPassword'})
        expect($router.push).toHaveBeenCalledTimes(1)
    })
    test('normal access nurse login', async ()=>{
        // setup
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "fake token",
                    first_login: false,
                    firstname: "acnurse1",
                    id: "fake id",
                    permissions: "access nurse",
                    reset_pin: false,
                    username: "acnurse"}
            })
        );

        const usersname = 'acnurse'
        const password = '12345678'
        // console.log(login_Box.vm.loginClick)
        // const spy = jest.spyOn(vm.$router, 'push' )
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect($router.push).toHaveBeenCalledWith({path: '/accessNurseMain'})
        expect($router.push).toHaveBeenCalledTimes(1)
    })
    test('nurse login with resetpin=true', async ()=>{
        // setup
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "fake token",
                    first_login: false,
                    firstname: "nurse1",
                    id: "fake id",
                    permissions: "access nurse",
                    reset_pin: true,
                    username: "nurse"}
            })
        );
        const usersname = 'nurse'
        const password = '12345678'
        // console.log(login_Box.vm.loginClick)
        // const spy = jest.spyOn(vm.$router, 'push' )
        jest.spyOn(vm, '$emit')
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith("the administrator has reset your password, please set your own password")
        expect(vm.$emit).toHaveBeenCalledTimes(1);
        expect(vm.$emit).toHaveBeenCalledWith('resetPassword',true);
        expect($router.push).toHaveBeenCalledWith({path: '/resetPassword'})
        expect($router.push).toHaveBeenCalledTimes(1)
    })
    test('nurse login with first_login = true', async ()=>{
        // setup
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "fake token",
                    first_login: true,
                    firstname: "nurse1",
                    id: "fake id",
                    permissions: "nurse",
                    reset_pin: false,
                    username: "nurse"}
            })
        );
        mockAxios.patch.mockImplementationOnce(() =>
            Promise.resolve({
                data: {}
            })
        );

        const usersname = 'nurse'
        const password = '12345678'
        // console.log(login_Box.vm.loginClick)
        const spy = jest.spyOn(vm, '$confirm')
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect(vm.$confirm).toHaveBeenCalledWith(vm.siteConfig.disclaimer, 'Disclaimer', {
            confirmButtonText: 'Yes, I agree',
            cancelButtonText: 'No',
            // type: 'warning'
            customClass: 'disclaimerBox',
        })
        expect(vm.$confirm).toHaveBeenCalledTimes(1)
    })
    test('normal nurse login', async ()=>{
        // setup
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "fake token",
                    first_login: false,
                    firstname: "nurse1",
                    id: "fake id",
                    permissions: "nurse",
                    reset_pin: false,
                    username: "nurse"}
            })
        );

        const usersname = 'nurse'
        const password = '12345678'
        // console.log(login_Box.vm.loginClick)
        // const spy = jest.spyOn(vm.$router, 'push' )
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect($router.push).toHaveBeenCalledWith({path: '/nurseMain'})
        expect($router.push).toHaveBeenCalledTimes(1)
    })
    test('admin login with resetpin=true', async ()=>{
        // setup
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "fake token",
                    first_login: false,
                    firstname: "admin",
                    id: "fake id",
                    permissions: "admin",
                    reset_pin: true,
                    username: "admin"}
            })
        );
        const usersname = 'admin'
        const password = '12345678'
        // console.log(login_Box.vm.loginClick)
        // const spy = jest.spyOn(vm.$router, 'push' )
        jest.spyOn(vm, '$emit' )
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith("the administrator has reset your password, please set your own password")
        expect(vm.$emit).toHaveBeenCalledTimes(1);
        expect(vm.$emit).toHaveBeenCalledWith('resetPassword',true);
        expect($router.push).toHaveBeenCalledWith({path: '/resetPassword'})
        expect($router.push).toHaveBeenCalledTimes(1)
    })
    test('normal admin nurse login', async ()=>{
        // setup
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "fake token",
                    first_login: false,
                    firstname: "admin",
                    id: "fake id",
                    permissions: "admin",
                    reset_pin: false,
                    username: "admin"}
            })
        );

        const usersname = 'admin'
        const password = '12345678'
        // console.log(login_Box.vm.loginClick)
        // const spy = jest.spyOn(vm.$router, 'push' )
        await vm.loginClick(usersname,password)
        // console.log(spy.mock.calls)
        expect($router.push).toHaveBeenCalledWith({path: '/adminMain'})
        expect($router.push).toHaveBeenCalledTimes(1)
    })
})
