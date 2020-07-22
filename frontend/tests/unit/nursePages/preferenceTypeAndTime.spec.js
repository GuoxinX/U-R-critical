import {createLocalVue, shallowMount} from '@vue/test-utils'
//libraries
import ElementUI from 'element-ui';
import mockAxios from 'axios';
import VueCookie from 'vue-cookie';
//components
import nursePreferenceTypeAndTime from '@/views/nursePages/nursePreferenceTypeAndTime.vue'
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
global.confirm = jest.fn(()=>{
    return true
});


localVue.use(ElementUI)
localVue.use(VueCookie)

localVue.prototype.siteConfig = config
localVue.prototype.$axios = mockAxios

describe('nursePreferenceTypeAndTime', () => {
    let cmp
    let vm
    beforeEach(() => {
        cmp = shallowMount(nursePreferenceTypeAndTime, {localVue, mocks: {$route, $router}})
        vm = cmp.vm
        // jest.resetModules();
        // jest.clearAllMocks();

    })

    test('returnMain',async ()=>{
        await vm.returnMain()
        // expect(global.confirm).toHaveBeenCalledTimes(1)
        expect(vm.$router.push).toHaveBeenCalledWith('/nurseMain')
    })

    test('redirectNextPage',async ()=>{
        vm.shiftType = 'E8'
        vm.shiftTime = "2019-09-19"
        vm.redirectNextPage()
        // expect(global.confirm).toHaveBeenCalledTimes(1)
        expect(vm.$router.push).toHaveBeenCalledWith({
            name: 'nurseSelectPreference',
            params: {shiftType: 'E8', shiftTime: "2019-09-19"}
        })
    })
})
