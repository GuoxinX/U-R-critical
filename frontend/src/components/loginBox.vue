<template>
    <el-row type="flex" justify="center" class="loginBox">
        <el-col :span="20">
            <el-card  class="card" :body-style="{padding: '0px'}">
                <div class="header">
                    <el-row type="flex" justify="center">
                        <h3 class="header-text mb-4 pt-4 pb-2 ">Welcome</h3>
                    </el-row>
                </div>

                <div class="input-group">
                    <el-input class="username-input" placeholder="Username" type="text" maxlength="20"
                              prefix-icon="el-icon-user-solid" clearable  v-model="rewUsername">
                    </el-input>
                    <el-input class="password-input" placeholder="Password" type="password" maxlength="30"
                              prefix-icon="el-icon-lock" clearable v-model="rewPassword" @keyup.enter.native="loginClick(username,password)">
                    </el-input>
                </div>
                <el-row type="flex" justify="center">
                    <a class="login-button" v-on:click="loginClick(username,password)">Login</a>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "loginBox",
        computed:{
            username:function(){
                return this.rewUsername.trim();
            },
            password:function(){
                return this.rewPassword.trim();
            }
        },
        data(){
            return {
                rewUsername:'',
                rewPassword:'',
            }
        },
        methods:{
            loginClick: async function (username,password) {
                if (username === "") {
                    alert("username cannot be empty");
                } else if (password === "") {
                    alert("password cannot be empty");
                } else {
                    // alert("username: " +  username + "\rpassword: " + password + "\rbaseAPI:" + this.siteConfig.serve.authentication);
                    // await axios.get({
                    //     method: 'post',
                    //     url: this.siteConfig.serve.authentication,
                    //     data: {
                    //         username: username,
                    //         password: password,
                    //         strategy: "local"
                    //     }
                    // }).

                    await this.$axios.post(this.siteConfig.serve.authentication,
                        {
                            // method: 'post',

                                username: username,
                                password: password,
                                strategy: "local"

                        }
                    ).then(
                        ((response) => {
                                this.$cookie.set('authentication', response.data.accessToken);
                                this.$cookie.set('username', response.data.username);
                                this.$cookie.set('id', response.data.id);
                                this.$cookie.set('isLogin', 'true');
                                this.$cookie.set('firstname', response.data.firstname);
                                // this.$cookie.set('email',response.data.email);
                                // const alert_text = "ID: " + response.data.id
                                //     + "\rjwt: " + response.data.accessToken
                                //     + "\rusername: " + response.data.username
                                //     + "\remail: " + response.data.email
                                //     + "\rPermission: " + response.data.permissions
                                //     + "\rYou are now jumping to Sign up page just for test, we will do the redirect later";
                                // alert(alert_text);
                                // user is an access nurse
                                if (response.data.permissions === 'access nurse') {
                                    if (response.data.reset_pin === true) {
                                        alert("the administrator has reset your password, please set your own password");
                                        this.$emit('resetPassword',true);
                                        this.$router.push({path: '/resetPassword'});
                                    }else this.$router.push({path: '/accessNurseMain'});
                                }
                                //user is a nurse
                                else if (response.data.permissions === 'nurse') {
                                    if (response.data.reset_pin === true) {
                                        alert("the administrator has reset your password, please set your own password");
                                        this.$emit('resetPassword',true);
                                        this.$router.push({path: '/resetPassword'});
                                    }
                                    else if (response.data.first_login === true) {
                                        this.$confirm(this.siteConfig.disclaimer, 'Disclaimer', {
                                                confirmButtonText: 'Yes, I agree',
                                                cancelButtonText: 'No',
                                                // type: 'warning'
                                                customClass: 'disclaimerBox',
                                            }
                                        ).then(() => {
                                            this.$message({
                                                    type: 'success',
                                                    message: 'Thank you, you are now redirected to the main page!'
                                                }
                                            );
                                            this.$axios.patch(this.siteConfig.serve.requestUser + this.$cookie.get('id'),
                                                {
                                                    first_login: false
                                                },
                                                {
                                                    headers: {"Authorization": this.$cookie.get("authentication")}
                                                }
                                            ).then(() => {
                                                    // console.log('2');
                                                    this.$router.push({path: '/nurseMain'});
                                                }
                                            ).catch(function (error) {
                                                    // console.log('4');
                                                    alert("bad request: "
                                                        + "\rerror code " + error.response.code
                                                        + "\rerror type " + error.response.name + ", " + error.response.message);
                                                }
                                            );
                                        }).catch(() => {
                                            this.$message({
                                                type: 'info',
                                                message: 'Sorry, you cannot use this service now.'
                                            });
                                            this.$cookie.delete("authentication");
                                            this.$cookie.delete("username");
                                            this.$cookie.delete('id');
                                            this.$cookie.set('isLogin', 'false');
                                        });
                                        // alert("this is the first time you use our app, // show disclaimer // to be replaced by other text");
                                    }
                                    else
                                    {
                                        this.$router.push({path: '/nurseMain'})
                                    }
                                    // this.$router.push({path:'/nurseRatePreference'})
                                    // alert("this page is under developing, you are now back to the login page");
                                }
                                //user is an administrator
                                else if (response.data.permissions === 'admin') {
                                    if (response.data.reset_pin === true) {
                                        alert("the administrator has reset your password, please set your own password");
                                        this.$emit('resetPassword',true);
                                        this.$router.push({path: '/resetPassword'});
                                    }else this.$router.push({path: '/adminMain'});
                                }
                            }
                        )
                    ).catch(error => {
                        this.siteUtils.errorCodeHandling(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>
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
        font-family: 'LatoWeb';
        font-style: normal;
        font-weight: normal;
        /*outline: 2px solid #ff0000;*/
        /*border-width: 1px;*/
    }

    .card .password-input {
        margin: 20px 50px 20px 50px;
        font-family: 'LatoWeb';
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

    .el-card, .el-message{
        border-radius:40px;
    }

    a:hover{
        color: white;
        border-color: transparent;
        background-color: #295c79;
        cursor: pointer;
    }

</style>

<style>
    .disclaimerBox{
        max-width: 90%;
    }
</style>
