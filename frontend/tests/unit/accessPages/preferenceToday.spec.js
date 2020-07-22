import {createLocalVue, shallowMount} from '@vue/test-utils'
//libraries
import ElementUI from 'element-ui';
import mockAxios from 'axios';
import VueCookie from 'vue-cookie';
//components
import shiftPreferenceView from '@/views/accessNursePages/preferenceToday.vue'
//configurations
import config from '@/assets/js/config.js'

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

describe('preferenceToday',()=> {
    let cmp
    let vm

    beforeEach(() => {
        cmp = shallowMount(shiftPreferenceView, {localVue, mocks: {$route, $router}})
        vm = cmp.vm
        // jest.resetModules();
        // jest.clearAllMocks();
    })

    test('has a table',()=>{
        expect(cmp.contains('el-table-stub')).toBe(true)
    })
    test('copy data to local store',async ()=>{
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({data:{
                    "total":3,
                    "limit":10000,
                    "skip":0,
                    "data":
                        [
                            {"_id":"-","is_Submitted":false,"nurse_username":"nurse","firstname":"nurse1","shift_type":"E8","shift_date":"2019-10-16T00:00:00.000Z","comment":"","pressure_icon_ID":3,"section_icon_ID":3,"createdAt":"2019-10-16T03:52:43.153Z","updatedAt":"2019-10-16T03:52:43.153Z","__v":0},
                            {"_id":"-","is_Submitted":false,"nurse_username":"nurse","firstname":"nurse1","shift_type":"N10","shift_date":"2019-10-15T00:00:00.000Z","comment":"","pressure_icon_ID":2,"section_icon_ID":3,"createdAt":"2019-10-14T02:33:55.284Z","updatedAt":"2019-10-14T02:33:55.284Z","__v":0},
                            {"_id":"-","is_Submitted":false,"nurse_username":"test","firstname":"test","shift_type":"E12","shift_date":"2019-10-15T00:00:00.000Z","comment":"","pressure_icon_ID":1,"section_icon_ID":2,"createdAt":"2019-10-15T02:48:46.578Z","updatedAt":"2019-10-15T02:48:46.578Z","__v":0},
                        ]
                }})
        );
        await vm.renderTable()

        expect(vm.shiftData).toEqual([
            {"_id":"-","is_Submitted":false,"nurse_username":"nurse","firstname":"nurse1","shift_type":"E8","shift_date":"2019-10-16T00:00:00.000Z","comment":"","pressure_icon_ID":3,"section_icon_ID":3,"createdAt":"2019-10-16T03:52:43.153Z","updatedAt":"2019-10-16T03:52:43.153Z","__v":0},
            {"_id":"-","is_Submitted":false,"nurse_username":"nurse","firstname":"nurse1","shift_type":"N10","shift_date":"2019-10-15T00:00:00.000Z","comment":"","pressure_icon_ID":2,"section_icon_ID":3,"createdAt":"2019-10-14T02:33:55.284Z","updatedAt":"2019-10-14T02:33:55.284Z","__v":0},
            {"_id":"-","is_Submitted":false,"nurse_username":"test","firstname":"test","shift_type":"E12","shift_date":"2019-10-15T00:00:00.000Z","comment":"","pressure_icon_ID":1,"section_icon_ID":2,"createdAt":"2019-10-15T02:48:46.578Z","updatedAt":"2019-10-15T02:48:46.578Z","__v":0},
        ])
    })
    test('render red row correctly',()=>{
        let row = {pressure_icon_ID:'Exhausted'}
        expect(vm.recolorRowByPressure({row})).toBe('red-row')
    })
    test('render yellow row correctly',()=>{
        let row = {pressure_icon_ID:'Low day'}
        expect(vm.recolorRowByPressure({row})).toBe('yellow-row')
    })
    test('render green row correctly',()=>{
        let row = {pressure_icon_ID:'Challenge'}
        expect(vm.recolorRowByPressure({row})).toBe('green-row')
    })
})

// mockAxios.get.mockImplementationOnce(() =>
//     Promise.resolve({data:{
//             "total":3,
//             "limit":10000,
//             "skip":0,
//             "data":
//                 [
//                     {"_id":"-","is_Submitted":false,"nurse_username":"nurse","firstname":"nurse1","shift_type":"E8","shift_date":"2019-10-16T00:00:00.000Z","comment":"","pressure_icon_ID":3,"section_icon_ID":3,"createdAt":"2019-10-16T03:52:43.153Z","updatedAt":"2019-10-16T03:52:43.153Z","__v":0},
//                     {"_id":"-","is_Submitted":false,"nurse_username":"nurse","firstname":"nurse1","shift_type":"N10","shift_date":"2019-10-15T00:00:00.000Z","comment":"","pressure_icon_ID":2,"section_icon_ID":3,"createdAt":"2019-10-14T02:33:55.284Z","updatedAt":"2019-10-14T02:33:55.284Z","__v":0},
//                     {"_id":"-","is_Submitted":false,"nurse_username":"test","firstname":"test","shift_type":"E12","shift_date":"2019-10-15T00:00:00.000Z","comment":"","pressure_icon_ID":1,"section_icon_ID":2,"createdAt":"2019-10-15T02:48:46.578Z","updatedAt":"2019-10-15T02:48:46.578Z","__v":0},
//                 ]
//         }})
// );
