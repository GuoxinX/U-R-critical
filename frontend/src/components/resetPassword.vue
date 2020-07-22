<template>
    <div class="reset-password-box">
        <section>
            <el-row type="flex" justify="center" >
                <el-col :span="20">
                    <el-card  class="card" :body-style="{padding: '0px'}">
                        <div class="header">
                            <el-row type="flex" justify="center">
                                <h3 class="header-text mb-4 pt-4 pb-2">Reset Password</h3>
                            </el-row>
                        </div>
                        <div class="input-group">
                            <el-input class="password-input" placeholder="at least 8 characters" type="password" maxlength="30"
                                      prefix-icon="el-icon-lock" clearable v-model="password" show-password>
                            </el-input>
                            <el-input class="password-input" placeholder="Please enter it again" type="password" maxlength="30"
                                      prefix-icon="el-icon-lock" clearable v-model="passwordCheck" show-password>
                            </el-input>
                        </div>
                        <el-row type="flex" justify="center">
                            <a class="submit-button" v-on:click="reset(password, passwordCheck)">Submit</a>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </section>
    </div>
<!--there should be a onClick function-->

</template>

<script>
    export default {
        name: "resetPassword",
        //todo hook
        data(){
            return {
                password:'',
                passwordCheck:''
            }
        },
        methods:{
            reset: function (password, passwordCheck) {
                if(password === ""){
                    alert("Password cannot be null!");
                }
                else if(password.length<8){
                    alert("Password require at least 8 characters");
                }
                else if(password!==passwordCheck){
                    alert("the two passwords your typed in are different, please check it again");
                }
                else {
                    this.$axios(
                        {
                            method: 'PATCH',
                            headers:{'Authorization':this.$cookie.get('authentication')},
                            url: this.siteConfig.serve.resetPassword + this.$cookie.get('id'),
                            data: {
                                password: password,
                                reset_pin: false
                            }
                        }
                    ).then(
                        ( response => {
                            alert("Thank you, " + response.data.username + ", your password has been updated");
                            this.$emit('resetPassword',false);
                            }
                        )
                    ).catch( error=>{
                        this.siteUtils.errorCodeHandling(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .el-card, .el-message{
        border-radius:40px;
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
    .card .password-input{
        margin: 40px 50px 20px 50px;
        font-family: 'LatoWeb';
        font-style: normal;
        font-weight: normal;
        /*outline: 2px solid #ff0000;*/
        /*border-width: 1px;*/
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

    .header{
        font-family:LatoWeb;
        font-style: normal;
        font-weight: normal;
    }

    .input-group >>> .el-input__inner:focus{
        border-bottom: thin solid #bf9336;
    }

    a:hover,a:active
    {
        background-color: #b2b1ae;
    }

    .loginBox{
        padding:10vmax 0 10vmax 0;
    }

    .submit-button{
        border-radius:20px;
        background:#347da0;
        width:20vmax;
        height:5vmax;
        font-size:2.5vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        text-align: center;
        line-height: 5vmax;
        margin-top: 2vmax;
        margin-bottom:3vmax;
        color:white !important;

    }

    .reset-password-box{
        padding:10vmax 0 10vmax 0;
    }

    a:hover{
        color: white;
        border-color: transparent;
        background-color: #295c79;
        cursor: pointer;
    }
</style>
