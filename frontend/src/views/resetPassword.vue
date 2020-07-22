<template>
    <div class="wrapper">
        <section>
            <el-row type="flex" justify="center" >
                <el-col :sm="10" :md="8" >
                    <el-card  class="card" :body-style="{padding: '0px'}">
                        <div class="header">
                            <el-row type="flex" justify="center">
                                <h3 class="header-text mb-3 pt-5 pb-5 font-weight-bold ">Reset Password</h3>
                            </el-row>
                        </div>
                        <div class="input-group">
                            <el-input class="password-input" placeholder="at least 8 characters" type="password" maxlength="30"
                                      prefix-icon="el-icon-lock" clearable v-model="password" show-password>
                            </el-input>
                            <el-input class="password-input" placeholder="Please enter it again" type="password" maxlength="30"
                                      prefix-icon="el-icon-lock" clearable v-model="passwordCheck" show-password>
                            </el-input>
                            <el-button class="submit-button" type="primary"
                                       v-on:click="reset(password, passwordCheck)">Submit</el-button>
                        </div>
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
            reset: async function (password, passwordCheck) {
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
                    this.$axios.patch(this.siteConfig.serve.resetPassword + this.$cookie.get('id'),
                        {
                            password: password,
                            reset_pin: false,
                        },
                        {
                            headers:{'Authorization':this.$cookie.get('authentication')}
                        }
                    ).then(
                        ( response => {
                            alert("Thank you, " + response.data.username + ", your password has been updated");
                            this.$router.push({path: '/'});
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
    .card{
        border: 0;
        min-width: 133px;
    }

    .card .header {
        padding: 0;
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        background: linear-gradient(40deg, rgba(255, 216, 111, 0.9), rgba(252, 98, 98, 0.9))
    }
    .card .header .header-text{
        color: white;
    }

    .card .password-input {
        margin: 20px 50px 20px 50px;
        /*outline: 2px solid #ff0000;*/
    }

    .submit-button{
        margin: 30px 20px 50px 50px;
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

    .input-group >>> .el-input__inner:focus{
        /*background-color: red;*/
        border-bottom: thin solid #007bff;
    }
</style>
