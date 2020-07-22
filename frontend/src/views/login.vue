<template>
    <div class="wrapper">

        <el-row class="main-content">
            <el-row class="headerComtainer">
                <el-row><p class="loginLogo">UR CRITICAL</p></el-row>

                <el-row><span class="subHeader">Royal Melbourne Hospital</span></el-row>

                    <!--<el-row><el-image-->
                            <!--:src="logoSrc"-->
                            <!--:fit="fit"></el-image></el-row>-->
            </el-row>
            <login-box v-if="!resetPin" v-on:resetPassword="resetPin=$event"></login-box>
            <!--<reset-password v-if="resetPin" v-on:resetPassword="resetPin=$event"></reset-password>-->
            <router-view v-if="resetPin" v-on:resetPassword="resetPin=$event"></router-view>
        </el-row>
        <div class="login-footer">Footer Remaining</div>
    </div>
</template>

<script>
    import loginBox from '../components/loginBox'


    export default {
        watch:{
            $route (to){
                if(to.name==='login'){
                    this.resetPin = false;
                }
            }
        },

        data(){
            return {
                // username:'',
                // password:'',
                resetPin:false,
                logoSrc: require('../assets/images/RMH logo.png'),
            }
        },
        name: "login",
        components: {loginBox},
    }
</script>

<style scoped>
    .wrapper{
    background-image: url('../assets/images/nurse-background-triangles.png');
    min-height: 100vh;
        display: flex;
        flex-direction: column;
        position: relative;
        max-width: 100%;
        margin: 0 auto;
        overflow: scroll;
        margin-bottom: -5vmax;
    }

    .main-content{
        flex:1;
    }
    .card{
        border: 0;
        min-width: 133px;
    }
    .card .header {
        padding: 0;
        background: #bf9336;
    }
    .card .header .header-text{
        font-family:LatoWeb;
        font-style: normal;
        font-weight: normal;
        color: white;

    }
    .card .username-input{
        margin: 40px 50px 20px 50px;
        font-family: 'LatoWebHairline';
        font-style: normal;
        font-weight: normal;
        /*outline: 2px solid #ff0000;*/
        /*border-width: 1px;*/
    }

    .card .password-input {
        margin: 20px 50px 20px 50px;
        font-family: 'LatoWebHairline';
        font-style: normal;
        font-weight: normal;
        /*outline: 2px solid #ff0000;*/
    }

    .input-group >>> .el-input__inner {
        /*background-color: red;*/
        outline: none;
        border-radius: 0;
        border-left: 0;
        border-right: 0;
        border-top: 0;
        border-bottom: thin solid #c3c3c3;
    }

    .el-message-box__wrapper >>> .el-message-box {
        width: 300px;
    }

    .loginLogo{
        display:flex;
        justify-content: center;
        color: #ffffff;
        font-size: 4vmax;
    }

    .subHeader{
        display:flex;
        justify-content: center;
        color: #ffffff;
        font-size: 3vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
    }

    .header{
        font-family:LatoWeb;
        font-style: normal;
        font-weight: normal;
    }

    .input-group >>> .el-input__inner:focus{
        border-bottom: thin solid #bf9336;
    }

    .el-card, .el-message{
        border-radius:40px;
    }

    a:hover,a:active
    {
        background-color: #b2b1ae;
    }

    .loginBox{
        padding:10vmax 0 10vmax 0;
    }

    .headerComtainer{
        margin-top:5vmax;
        margin-bottom:3vmax;
    }

     .login-button{
        border-radius:20px;
        background:#347da0;
        width:20vmax;
        height:5vmax;
        font-size:2.5vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
         font-weight: normal;
         text-align: center;
         align-items: center;
         line-height: 5vmax;
         margin-top: 2vmax;
         margin-bottom:3vmax;
         color:white !important;

    }

    .login-footer{
        text-align:center;
        height:10vmax;
        width:100%;
        background-color: black;
        color:white;
        line-height:10vmax;
        opacity:0.4;

    }




</style>

<style>
</style>
