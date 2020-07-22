import Vue from 'vue'
import Router from 'vue-router'

//Entrance
import signUp from './views/signUp'
import login from './views/login'
import resetPassword from './components/resetPassword'
import profile from './views/profile'
import successful from "./views/successful";

// Access Nurse pages
import shiftPreferenceToday from './views/accessNursePages/preferenceToday.vue'
import recent24Rating from './views/accessNursePages/recent24Rating.vue'
        // import yesterdayRating from './views/yesterdayRating.vue'
import historyRating from './views/accessNursePages/ratingHistory.vue'
import nurseRatingHistory from './views/accessNursePages/ratingHistoryOneNurse.vue'
import accessNurseMain from './views/accessNursePages/accessNurseMain'
import shiftPreferenceHistory from './views/accessNursePages/preferenceHistory'
import ongoingShift from './views/accessNursePages/preferenceOngoingShift'
import accessNurseUserPressure from "./views/accessNursePages/userPressure";

//Admin Pages
import accountManagement from './views/adminPages/accountManagement.vue'
import ratingManagement from './views/adminPages/ratingManagement.vue'
import preferenceManagement from './views/adminPages/preferenceManagement.vue'
import adminMain from './views/adminPages/adminMain.vue'
import statistics from './views/accessNursePages/statistics.vue'

//Nurse Pages
import nurseMain from './views/nursePages/nurseMain'
import nurseSelectPreference from './views/nursePages/nurseSelectPreference'
import nurseRateShift from './views/nursePages/nurseRateShift'
import nurseTypeAndTime from './views/nursePages/nurseRatingTypeAndTime.vue'
import nursePreferenceTypeAndTime from './views/nursePages/nursePreferenceTypeAndTime.vue'

Vue.use(Router);
export default new Router({
    routes: [
        {
        path: '/',
        name: 'login',
        component: login,
            children:[{
                path: '/resetPassword',
                component: resetPassword,
            }]
        },
        {
            path: '/nurseMain',
            name: 'nurseMain',
            component: nurseMain,
            children: [{
                path:'/nurseSelectPreference',
                name:'nurseSelectPreference',
                component:nurseSelectPreference,
                props:true
            }, {
                path: '/nurseRateShift',
                name: 'nurseRateShift',
                component: nurseRateShift,
                props: true
            },{
                path: '/nursePreferenceTypeAndTime',
                name: 'nursePreferenceTypeAndTime',
                component: nursePreferenceTypeAndTime,
                props: true
            },{
                path: '/nurseTypeAndTime',
                name: 'nurseTypeAndTime',
                component: nurseTypeAndTime
            },{
                path: '/successful',
                name: 'successful',
                component: successful
            }]
        },
        {
        path: '/accessNurseMain',
        name:'accessNurseMain',
        component: accessNurseMain,
        children: [
            {
                path: '/shiftPreferenceToday',
                component: shiftPreferenceToday,
                name: 'shiftPreferenceToday'
            },
            {
                path: '/recent24Rating',
                name:'recent24Rating',
                component: recent24Rating,
            },
            {
                path: '/historyRating',
                name:'historyRating',
                component: historyRating,
            },
            {
                path: '/nurseRatingHistory/:nurse',
                name:'nurseRatingHistory',
                component: nurseRatingHistory,
            },
            {
                path: '/ongoingShift',
                name:'ongoingShift',
                component: ongoingShift,
            },
            {
                path:'/shiftPreferenceHistory',
                name:'shiftPreferenceHistory',
                component: shiftPreferenceHistory
            },
            {
                path:'/UserScore',
                name:'accessNurseUserPressure',
                component: accessNurseUserPressure
            },{
                path: '/statistics',
                name:'statistics',
                component: statistics,
            }]
        },
        {
        path: '/adminMain',
        name:'adminMain',
        component: adminMain,
        children: [{
                path: '/accountManagement',
                name:'accountManagement',
                component: accountManagement,
        },{
                path: '/ratingManagement',
                name:'ratingManagement',
                component: ratingManagement,
        },{
                path: '/preferenceManagement',
                name:'preferenceManagement',
                component: preferenceManagement,
        },{
            path: '/adminStatistics',
            name:'adminStatistics',
            component: statistics,
        }]},
        {
            path: '/signUp',
            component: signUp,
        },{
            path: '/Profile',
            component: profile,
        },

    ],mode:'history'
})
