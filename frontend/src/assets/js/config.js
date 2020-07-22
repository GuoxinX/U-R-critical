let isProduction = process.env.NODE_ENV === 'production';
const Dev_API = 'http://localhost:3030';
const Serv_API = 'https://www.urcritical.space';
const BASE_URL = '/';
const disclaimer = 'the data collected on this application will be viewed by the Senior management team, ' +
    'and is solely going to be used with the intention of better management of your workloads, ' +
    'and exposure to stress. Your answers may prompt a senior member of management to initiate a conversation with you, ' +
    'and in doing so, our primary objective is to care for you, so that in turn, ' +
    'you will be in a better place to care for our patients. ' +
    'In no way will it be permissible to use this data for any other objective than quantifying, ' +
    'and better managing your stress.';
const privacyPolicy = 'Please note: Your answers to these questions will be viewed by the Senior management team, ' +
    'and are solely going to be used with the intention of better management of your workloads, ' +
    'and exposure to stress. Your answers may prompt a senior member of management to initiate a conversation with you, ' +
    'and in doing so, our primary objective is to care for you, so that in turn, ' +
    'you will be in a better place to care for our patients. ' +
    'In no way will it be permissible to use this data for any other objective than quantifying, ' +
    'and better managing your stress.';
const questions = ['Q1. Were you on the receiving end of any form of patient amd/or family to nurse assault on your shift today?',
'Q2. Did you get you entitled breaks?','Q3. Did you experience a workload that you felt was beyond your physical or mental capacity?',
'Q3a. Whilst feeling this way, did you feel that you could approach a senior staff member and ask for help?'];
const BASE_API = isProduction ? Serv_API : Dev_API;


export default {
    baseUrl: BASE_URL,
    baseApi: BASE_API,
    negativeThreshHold:14,
    mediumRatingScore:15,
    highRatingScore:23,
    rating_mid_score: 22,
    rating_high_score: 35,
    user_mid_score:5,
    user_high_score: 10,
    serve: {authentication:  BASE_API + '/authentication/',
		requestPreference:BASE_API + '/api/preferences',
		requestRate:BASE_API +'/api/ratings',
        queryRate:BASE_API +'/api/ratings?',
        queryUser:BASE_API +'/users?' ,
        futurePreference: BASE_API+'/api/preferences?$sort[shift_date]=1&shift_date[$gt]=',
        requestUser:BASE_API+'/users/',
        users: BASE_API + '/users/',
        resetPassword:  BASE_API+ '/reset-password/',
        requestConfig:BASE_API+'/api/config',
    },
    disclaimer : disclaimer,
    questions : questions,
    privacyPolicy: privacyPolicy,
    defaultPassword:'12345678',
    shiftTypes: ['E12', 'E8', 'L8', 'N12', 'N10']
}
