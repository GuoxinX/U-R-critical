import {createLocalVue, shallowMount} from '@vue/test-utils'
//libraries
import ElementUI from 'element-ui';
import mockAxios from 'axios';
import VueCookie from 'vue-cookie';
//components
import recent24Rating from '@/views/accessNursePages/recent24Rating.vue'
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

localVue.prototype.siteConfig = config
localVue.prototype.$axios = mockAxios

describe('recent24Rating', () => {
    let cmp
    let vm

    beforeEach(() => {
        cmp = shallowMount(recent24Rating, {localVue, mocks: {$route, $router}})
        vm = cmp.vm
        // jest.resetModules();
        // jest.clearAllMocks();

    })

    test('has a table', () => {
        expect(cmp.contains('el-table-stub')).toBe(true)
    })

    test('copy data to local store', async () => {
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    "total": 17,
                    "limit": 10000,
                    "skip": 0,
                    "data": [{
                        "_id": "5da946fa1da927fb531cf898",
                        "is_Submitted": true,
                        "general_score": 21,
                        "nurse_username": "nurse",
                        "firstname": "nurse1",
                        "shift_type": "E8",
                        "shift_date": "2019-10-17T00:00:00.000Z",
                        "comment": "",
                        "score": 3,
                        "questions": {"q1": false, "q2": true, "q3": true, "q3a": false},
                        "createdAt": "2019-10-18T05:00:42.321Z",
                        "updatedAt": "2019-10-18T05:00:42.321Z",
                        "__v": 0
                    }, {
                        "_id": "5da947071da927fb531cf899",
                        "is_Submitted": true,
                        "general_score": 38.5,
                        "nurse_username": "nurse",
                        "firstname": "nurse1",
                        "shift_type": "N12",
                        "shift_date": "2019-10-17T00:00:00.000Z",
                        "comment": "",
                        "score": 8,
                        "questions": {"q1": true, "q2": false, "q3": true, "q3a": true},
                        "createdAt": "2019-10-18T05:00:55.755Z",
                        "updatedAt": "2019-10-18T05:00:55.755Z",
                        "__v": 0
                    }, {
                        "_id": "5da9471a1da927fb531cf89a",
                        "is_Submitted": true,
                        "general_score": 26,
                        "nurse_username": "nurse",
                        "firstname": "nurse1",
                        "shift_type": "N10",
                        "shift_date": "2019-10-17T00:00:00.000Z",
                        "score": 3,
                        "questions": {"q1": true, "q2": true, "q3": false},
                        "createdAt": "2019-10-18T05:01:14.318Z",
                        "updatedAt": "2019-10-18T05:01:14.318Z",
                        "__v": 0
                    }]
                }
            })
        );
        await vm.renderTable()

        expect(vm.rateData).toEqual([{
                "_id": "5da946fa1da927fb531cf898",
                "is_Submitted": true,
                "general_score": 21,
                "nurse_username": "nurse",
                "firstname": "nurse1",
                "shift_type": "E8",
                "shift_date": "2019-10-17T00:00:00.000Z",
                "comment": "",
                "score": 3,
                "questions": {"q1": false, "q2": true, "q3": true, "q3a": false},
                "createdAt": "2019-10-18T05:00:42.321Z",
                "updatedAt": "2019-10-18T05:00:42.321Z",
                "__v": 0
            }, {
                "_id": "5da947071da927fb531cf899",
                "is_Submitted": true,
                "general_score": 38.5,
                "nurse_username": "nurse",
                "firstname": "nurse1",
                "shift_type": "N12",
                "shift_date": "2019-10-17T00:00:00.000Z",
                "comment": "",
                "score": 8,
                "questions": {"q1": true, "q2": false, "q3": true, "q3a": true},
                "createdAt": "2019-10-18T05:00:55.755Z",
                "updatedAt": "2019-10-18T05:00:55.755Z",
                "__v": 0
            }, {
                "_id": "5da9471a1da927fb531cf89a",
                "is_Submitted": true,
                "general_score": 26,
                "nurse_username": "nurse",
                "firstname": "nurse1",
                "shift_type": "N10",
                "shift_date": "2019-10-17T00:00:00.000Z",
                "score": 3,
                "questions": {"q1": true, "q2": true, "q3": false},
                "createdAt": "2019-10-18T05:01:14.318Z",
                "updatedAt": "2019-10-18T05:01:14.318Z",
                "__v": 0
            }]
        )
    })
    test('render red row correctly', async () => {
        vm.rateMidScore=22
        vm.rateHighScore=35
        let row = {general_score: 35 }
        expect(vm.reColorByScore({row})).toBe('red-row')
    })
    test('render yellow row correctly', () => {
        vm.rateMidScore=22
        vm.rateHighScore=35
        let row = {general_score: 22}
        expect(vm.reColorByScore({row})).toBe('yellow-row')
    })
    test('render green row correctly', () => {
        vm.rateMidScore=22
        vm.rateHighScore=35
        let row = {general_score: 21}
        expect(vm.reColorByScore({row})).toBe('green-row')
    })
})

// mockAxios.get.mockImplementationOnce(() => {
//     Promise.resolve({
//             data: {
//                 "total": 1,
//                 "limit": 10000,
//                 "skip": 0,
//                 "data": [{
//                     "_id": "-",
//                     "pressure": [-5, 5, 10],
//                     "scoreWeight": 0.5,
//                     "emotionScoreWeight": 10,
//                     "questionWeights": [25, 5, 10, 10],
//                     "averageTotal": 5,
//                     "thresholdUser": [5, 10],
//                     "thresholdRating": [22, 35],
//                     "createdAt": "2019-10-17T03:46:50.633Z",
//                     "updatedAt": "2019-10-17T03:46:50.633Z",
//                     "__v": 0
//                 }]
//             }
//         }
//     )
// });
// mockAxios.get.mockImplementationOnce(() => {
//     Promise.resolve({
//             data: {
//                 "total": 17,
//                 "limit": 10000,
//                 "skip": 0,
//                 "data": [{
//                     "_id": "5da946fa1da927fb531cf898",
//                     "is_Submitted": true,
//                     "general_score": 21,
//                     "nurse_username": "nurse",
//                     "firstname": "nurse1",
//                     "shift_type": "E8",
//                     "shift_date": "2019-10-17T00:00:00.000Z",
//                     "comment": "",
//                     "score": 3,
//                     "questions": {"q1": false, "q2": true, "q3": true, "q3a": false},
//                     "createdAt": "2019-10-18T05:00:42.321Z",
//                     "updatedAt": "2019-10-18T05:00:42.321Z",
//                     "__v": 0
//                 }, {
//                     "_id": "5da947071da927fb531cf899",
//                     "is_Submitted": true,
//                     "general_score": 38.5,
//                     "nurse_username": "nurse",
//                     "firstname": "nurse1",
//                     "shift_type": "N12",
//                     "shift_date": "2019-10-17T00:00:00.000Z",
//                     "comment": "",
//                     "score": 8,
//                     "questions": {"q1": true, "q2": false, "q3": true, "q3a": true},
//                     "createdAt": "2019-10-18T05:00:55.755Z",
//                     "updatedAt": "2019-10-18T05:00:55.755Z",
//                     "__v": 0
//                 }, {
//                     "_id": "5da9471a1da927fb531cf89a",
//                     "is_Submitted": true,
//                     "general_score": 26,
//                     "nurse_username": "nurse",
//                     "firstname": "nurse1",
//                     "shift_type": "N10",
//                     "shift_date": "2019-10-17T00:00:00.000Z",
//                     "score": 3,
//                     "questions": {"q1": true, "q2": true, "q3": false},
//                     "createdAt": "2019-10-18T05:01:14.318Z",
//                     "updatedAt": "2019-10-18T05:01:14.318Z",
//                     "__v": 0
//                 }]
//             }
//         }
//     )
// });
