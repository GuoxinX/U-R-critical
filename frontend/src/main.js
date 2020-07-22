import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import 'mdbvue/build/css/mdb.css'
import config from './assets/js/config'
import utils from './assets/js/utils'
import dataModel from './assets/js/dataModels'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueDataTables from 'vue-data-tables'
import VCharts from 'v-charts'
import "../src/assets/css/latofonts.css";

Vue.use(VCharts);
Vue.use(VueDataTables);
Vue.use(ElementUI,{locale});

// Vue.use(BootstrapVue);
Vue.config.productionTip = false;
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

// VueCookie.set('isLogin','false');

//in case of unauthorization redirect, it works, but need to figure out the guard
router.beforeEach((to, from, next) => {
    //according to string
    if (VueCookie.get('isLogin')==='true' ) {
        next()
    } else {
        //in case of infinite loop
        if (to.name === 'login') {
            next();
            return
        }
        next({
            path: '/',
        });
    }
    // } else {
    //     next()//if is not a page with authorization, to that page
    // }
});


Vue.prototype.siteConfig = config;
Vue.prototype.siteUtils = utils;
Vue.prototype.dataModel = dataModel;

Vue.prototype.setTitle = function(title){
    document.title = title
};

Vue.prototype.goBack = function(){
    window.history.length > 1 ? router.go(-1) : router.push('/')
};

Vue.prototype.$axios = axios;

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
app.$mount('#app');
