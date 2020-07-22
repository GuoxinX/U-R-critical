import {createLocalVue, shallowMount} from '@vue/test-utils'
//libraries
import ElementUI from 'element-ui';
import mockAxios from 'axios';
import VueCookie from 'vue-cookie';
import VueDataTables from 'vue-data-tables'
//components
import accountManagement from '@/views/adminPages/accountManagement.vue'
//configurations
import config from '@/assets/js/config.js'

const localVue = createLocalVue();
const $route = {
    path: '/',
}
const $router = {
    push: jest.fn()
}
global.alert = jest.fn();


localVue.use(ElementUI)
localVue.use(VueCookie)
localVue.use(VueDataTables)

localVue.prototype.siteConfig = config
localVue.prototype.$axios = mockAxios

describe('accountManagement', () => {
    let cmp
    let vm

    beforeEach(() => {
        cmp = shallowMount(accountManagement, {localVue, mocks: {$route, $router}})
        vm = cmp.vm
        jest.resetModules();
        jest.clearAllMocks();

    })

    test('has 2 submit btn,',()=>{
        expect(cmp.findAll('.btn-primary').length).toBe(2)
    })

    test('add new user',async ()=>{
        const addAccount = {
            "username": 'userName',
            "firstname": 'firstName',
            "password": '12345678',
            "permissions": 'nurse',
            "reset_pin":true
        }
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    something: 'something'
                }
            })
        );
        await vm.addNewAccount(addAccount)
        expect(global.alert).toHaveBeenCalledWith('Submit Successfully');
    })
    //contains $ -> jQuery???
    // test('eidt new user',async ()=>{
    //     const editForm = {
    //         "_id": '12345678',
    //         "permissions": 'nurse',
    //     }
    //     mockAxios.post.mockImplementationOnce(() =>
    //         Promise.resolve({
    //             data: {
    //                 something: 'something'
    //             }
    //         })
    //     );
    //     await vm.updateAccountInfo(editForm)
    //     expect(global.alert).toHaveBeenCalledWith('Edit successful');
    // })
})
