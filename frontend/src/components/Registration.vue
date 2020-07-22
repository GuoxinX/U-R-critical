<template>
    <div class="wrapper">
        <section >
            <el-row type="flex" justify="center" >
                <el-col :sm="10" :md="8" >
                    <el-card  class="card" :body-style="{padding: '0px'}">
                        <div class="header">
                            <el-row type="flex" justify="center">
                                <h3 class="header-text mb-3 pt-5 pb-5 font-weight-bold ">Registration</h3>
                            </el-row>
                        </div>

                        <div class="input-group">
                            <el-input class="username-input" placeholder="Your Username" type="text" maxlength="20"
                                      prefix-icon="el-icon-user-solid" clearable v-model="username">
                            </el-input>
                            <!--                            <label for="Username">Your Username</label>-->
                            <!--                            <div class="ub-line"></div>-->

                            <el-input class="password-input" placeholder="Your Password" type="password" maxlength="30"
                                      prefix-icon="el-icon-lock" clearable v-model="password"
                                      @keyup.enter.native="signUp(username,password)">
                            </el-input>
                            <!--                                <label for="Password">Your Password</label>-->
                            <!--                                <div class="pb-line"></div>-->
                            <el-button class="signUp-button" type="primary" v-on:click="signUp(username,password)">Sign Up</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Registration",
        data(){
            return {
                username:'',
                password:'',
            }
        },
        methods : {
            signUp : function (username,password) {
                if (username === "") {
                    alert("username cannot be empty");
                } else if (password === "") {
                    alert("password cannot be empty");
                } else {
                    // alert('your are creating an account:'
                    //     + '\rusername: ' + username
                    //     + "\rpassword: " + password );
                    this.$axios(
                        {
                            method: 'post',
                            header: {"Content-type": "application/json"},
                            url: this.siteConfig.serve.requestUser,
                            data: {
                                username: username,
                                password: password,
                                permissions: "nurse",
                            }
                        }
                    ).then(
                        ((response) => {
                                const alert_text = "Congratulation! you have created an account." + "\rID: " + response.data._id
                                    + "\rusername: " + response.data.username
                                    + "\rpermission: " + response.data.permissions;
                                alert(alert_text);
                            }
                        )
                    ).catch(function (error) {
                        this.siteUtils.errorCodeHandling(error);
                    });
                }
            }
        }
    }

</script>

<style scoped>
    .wrapper{
        background-image: url('../assets/images/melbuni.jpg');
        height: 100vh;
        background-size: cover;
        position: relative;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
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

    .card .username-input{
        margin: 40px 50px 20px 50px;
        /*outline: 2px solid #ff0000;*/
        /*border-width: 1px;*/
    }
    .card .password-input {
        margin: 20px 50px 20px 50px;
        /*outline: 2px solid #ff0000;*/
    }

    .signUp-button{
        margin: 30px 20px 50px 50px;
        outline: none;
    }
    /*.login-button:hover {*/
    /*    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    /*}*/

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