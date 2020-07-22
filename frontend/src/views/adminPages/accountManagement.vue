<!--suppress ALL -->
<template>
    <div class="container">
        <h3 style="margin-top: 20px">Account Management</h3>
        <el-row style="margin-bottom: 10px; margin-top: 20px">
            <el-col :span="10"><el-button type="primary" icon="el-icon-plus" style="display: flex" data-toggle="modal" data-target="#addNewAccount" v-on:click="reset()">Add New Account</el-button></el-col>
            <el-col :span="14"><el-input v-model="filters[0].value" placeholder="Search" style="display: flex"></el-input></el-col>
        </el-row>

        <data-tables :data="testData" :table-props="tableProps" :pagination-props="{ pageSizes: [5, 10, 15,20] }" :action-col="actionCol" :filters="filters">
            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">
            </el-table-column>
        </data-tables>

        <!--Add new account-->
        <div class="modal fade" id="addNewAccount" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">
                            Add new account
                        </h4>
                    </div>
                    <div class="modal-body">
                        <form name="myModalLabel">
                            <div class="form-group">
                                <label for="userName">User ID</label>
                                <input class="form-control" id="userName" v-model="addForm.userName" placeholder="Required">
                            </div>
                            <div class="form-group">
                                <label for="firstname">Alias</label>
                                <input class="form-control" id="firstname" placeholder="Required" v-model="addForm.firstName">
                            </div>
                            <!--<div class="form-group">-->
                                <!--<label for="email">Email</label>-->
                                <!--<input class="form-control" id="email" placeholder="Required" v-model="addForm.email">-->
                            <!--</div>-->
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input class="form-control" id="password" placeholder="12345678" v-model="addForm.password" disabled="false">
                            </div>


                            <div class="form-group">
                                <label for="permission">Permission</label>
                                <div id="permission">
                                    <select class="custom-select" v-model="addForm.permissions">
                                        <option v-for="choose in permissionType" v-bind:key="choose.value">
                                            {{choose.value}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <!--<p>{{addForm}}</p>-->
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button class="btn btn-primary"
                                    :disabled="addForm.permissions==null|| addForm.userName==null|| addForm.firstName==null"
                                    @click="addNewAccount(addForm)">Submit</button>
                        </div>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!--Edit information-->
        <div class="modal fade" id="editAccount" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            Edit account information
                        </h4>
                    </div>
                    <div class="modal-body">
                        <form name="myModalLabel">
                            <div class="form-group">
                                <label for="userNameEdit">User ID</label>
                                <input class="form-control" id="userNameEdit" v-model="editForm.username" disabled="false">
                            </div>
                            <div class="form-group">
                                <label for="aliasEdit">Alias</label>
                                <input class="form-control" id="aliasEdit" placeholder="Required" v-model="editForm.firstname">
                            </div>

                            <!--<div class="form-group">-->
                                <!--<label for="email">Email</label>-->
                                <!--<input class="form-control" id="passwordEdit" placeholder="Required and no less than 8 characters" v-model="editForm.email">-->
                            <!--</div>-->
                            <!--<div class="form-group">-->
                                <!--<label for="passwordEdit">Password</label>-->
                                <!--<input class="form-control" id="passwordEdit" placeholder="Required and no less than 8 characters" v-model="editForm.password">-->
                            <!--</div>-->
                            <div class="form-group">
                                <label for="permissionEdit">Permission</label>
                                <div id="permissionEdit">
                                    <select class="custom-select" v-model="editForm.permissions">
                                        <option v-for="choose in permissionType" v-bind:key="choose.value">
                                            {{choose.value}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetEdit()">Close</button>
                            <button class="btn btn-primary"
                                    :disabled="
                                    editForm.permissions==defaultEditForm.permissions && editForm.firstname==defaultEditForm.firstname"
                                    @click="updateAccountInfo(editForm)">Sumbit</button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <!--Reset Password-->
        <!--<div class="modal fade" id="resetPassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">-->
            <!--<div class="modal-dialog">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<h4 class="modal-title">-->
                            <!--Edit account information-->
                        <!--</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body">-->
                        <!--<form name="myModalLabel">-->
                            <!--<div class="form-group">-->
                                <!--<label for="userNameEdit">Newpassword</label>-->
                                <!--<input class="form-control" id="newPassword" v-model="newPassword" >-->
                            <!--</div>-->
                        <!--</form>-->
                        <!--<div class="modal-footer">-->
                            <!--<button type="button" class="btn btn-default" data-dismiss="modal" @click="resetResetPassword()">Close</button>-->
                            <!--<button class="btn btn-primary"-->
                                    <!--:disabled="newPassword===''"-->
                                    <!--@click="resetPassword(newPassword)">Sumbit</button>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>&lt;!&ndash; /.modal-content &ndash;&gt;-->
            <!--</div>&lt;!&ndash; /.modal &ndash;&gt;-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name:'accountManagement',
        mounted(){
            this.renderTable();
        },
        methods: {
            // resetResetPassword(){
            //     alert("lt works")
            //     this.newPassword=''
            // },
            //function for submit button
            addNewAccount:function(addAccount) {
                    this.$axios.post(this.siteConfig.serve.requestUser,
                        {
                            "username": addAccount.userName,
                            "firstname": addAccount.firstName,
                            "password": this.defaultPassword,
                            "permissions": addAccount.permissions,
                            "reset_pin":true
                        },
                        {
                            headers:{'Authorization':this.$cookie.get('authentication')}
                        }
                    ).then(
                        ( (response) => {
                                if(response.data!=null){
                                    alert("Submit Successfully");
                                    $('#addNewAccount').modal('hide');
                                    this.renderTable();
                                }
                                else{
                                    //redirect
                                    alert("Error");
                                    // this.$router.push({path:'/'});
                                }
                            }
                        )
                    ).catch(function (error) {
                        alert("bad request: " + error);
                        // console.log(error.response);
                    });

            },
            //function for submit update
            updateAccountInfo:function(editForm){
                //dosomethingCool
                // alert(row._id);
                const finalurl = this.geturl(this.siteConfig.serve.requestUser, editForm._id)
                // alert(finalurl);
                this.$axios.patch(finalurl, {
                        // "username": editForm.userName,
                        // "email": editForm.email,
                        // "password": editForm.password,
                        "permissions": editForm.permissions,
                        // "full_name": editForm.full_name
                    },
                    {
                        headers: {'Authorization': this.$cookie.get('authentication')},
                    }
                ).then(
                    ((response) => {
                            // const alert_text = "ID: " + response.data.id + "\rjwt: " + response.data.accessToken
                            //     + "\rusername: " + response.data.username + "\rPermission: " + response.data.permissions
                            //     + "\rYou are now jumping to Sign up page just for test, we will do the redirect later";

                            if(response.data!=null){
                                alert("Edit successful");
                            }
                            else{
                                //redirect
                                this.resetEdit();
                                alert("Error");
                                // this.$router.push({path:'/'});
                            }
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                    // console.log(error.response);
                });
                $('#editAccount').modal('hide');
            },
            //function for reset add new account button
            reset(){
                this.addForm={};
            },
            countAdmin(){
                for(let i = 0;i<this.testData.length;i++){
                    // console.log(this.testData)
                    if (this.testData[i].permissions==='admin'){
                        this.adminCount+=1;
                    }
                }
            },
            //function for close button in edit modal to reset the info
            resetEdit(){
                this.editForm.password=this.defaultEditForm.password;
                this.editForm.userName=this.defaultEditForm.userName;
                this.editForm.firstname=this.defaultEditForm.firstname;
                // this.editForm.email=this.defaultEditForm.email;
                this.editForm.permissions=this.defaultEditForm.permissions;
            },
            renderTable(){
                // alert(this.$cookie.get('authentication'))
                this.$axios.get(this.siteConfig.serve.requestUser+'?$sort[username]=1',
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                    }
                ).then(
                    ( (response) => {
                            this.testData=response.data.data;
                            this.countAdmin();
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                    // console.log(error.response);
                })
                ;
            },
            geturl(original,str){
                return (original + str);
            },

        },
        data() {
            return {
                adminCount:0,
                defaultPassword:this.siteConfig.defaultPassword,
                //form for new account
                addForm:{},
                //compared group for edit
                defaultEditForm:{
                    username:'',
                    firstname:'',
                    // email:'',
                    permissions:''

                },
                newPassword:'',
                //for for edit
                editForm:{
                    username:'',
                    firstname:'',
                    // email:'',
                    permissions:''

                },
                //permission type
                permissionType: [
                    { text: 'Nurse', value: 'nurse' },
                    { text: 'Access Nurse', value: 'access nurse' },
                    { text: 'Admin', value: 'admin' }
                ],
                //testData have to initialize like this, or the filter will not work properly
                testData:[{
                    _id:'',
                    firstname:'',
                    username: '',
                    full_name: '',
                    email: '',
                    password:'',
                    permissions: '',
                    negative_count:''
                }
                    ],
                titles: [
                    {
                        prop: "username",
                        label: "User ID",
                    },
                    {
                        prop:"firstname",
                        label:"Alias",
                    },
                    {
                        prop: "permissions",
                        label: "Permissions",
                    },
                    {
                        prop: "emotion_score",
                        label: "Stress Score",
                    }],
                tableProps: {
                    border: true,
                    stripe: true,
                    },
                //action column
                actionCol: {
                    label: 'Action',
                    props: {
                        align: 'center',
                        width: '280'
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit',
                            size:'mini'

                        },
                        handler: row => {
                            //reference row to editForm in modal
                            this.editForm=row;
                            //deep copy original data to defaultEditForm
                            this.defaultEditForm = JSON.parse(JSON.stringify(row));
                            console.log(this.editForm);
                            //hide modal
                            $('#editAccount').modal('show');
                            // this.$message('Edit clicked');
                        },
                        label: 'Edit'
                    }, {
                        props: {
                            type: 'danger',
                            icon: 'el-icon-delete',
                            size:'mini'
                        },
                        handler: row => {
                            console.log(row.username)
                            console.log(this.adminCount)
                            if(this.$cookie.get('username')===row.username){
                                alert("Admin cannot be deleted")
                                return;
                            }else if(row.permissions==='admin' && this.adminCount===1){
                                alert("This is the only admin so that it cannot be deleted")
                                return;
                            } else if(confirm("Confirm to delete "+row.username) ){
                                // alert(row._id);
                                let finalurl = this.geturl(this.siteConfig.serve.requestUser,row._id)
                                this.$axios.delete(finalurl,
                                    {
                                        headers:{'Authorization':this.$cookie.get('authentication')},
                                    }
                                ).then(
                                    ( (response) => {
                                            if(response.data!=null){
                                                alert("successful");
                                                this.testData.splice(this.testData.indexOf(row), 1);
                                                this.countAdmin();
                                            }
                                            else{
                                                //redirect
                                                alert("Error");
                                                // this.$router.push({path:'/'});
                                            }
                                        }
                                    )
                                ).catch(function (error) {
                                    alert("bad request: " + error);
                                    // console.log(error.response);
                                })
                                ;

                            }
                            },
                        label: 'Del'
                    },{
                        props: {
                            type: 'warning',
                            icon: 'el-icon-unlock',
                            size:'mini'
                        },
                        handler: row => {
                            // $('#resetPassword').modal('show')
                            if(confirm("Confirm to reset password for "+row.username+"?") ){
                                // alert(row._id);
                                const finalurl = this.geturl(this.siteConfig.serve.requestUser,row._id)
                                this.$axios.patch(finalurl,
                                    {
                                        'password':'12345678',
                                        'reset_pin': true,
                                    },
                                    {
                                        headers:{'Authorization':this.$cookie.get('authentication')},
                                    }
                                ).then(
                                    ((response) => {
                                            if(response.data!=null){
                                                alert("Reset successful");
                                            }
                                            else{
                                                //redirect
                                                alert("Error");
                                                // this.$router.push({path:'/'});
                                            }
                                        }
                                    )
                                ).catch(function (error) {
                                    alert("bad request: " + error);
                                    // console.log(error.response);
                                })
                                ;

                            }
                        },
                        label: 'Reset'
                    },]
                },
                //search bar
                filters: [
                    {
                        value: ''
                    }
                ]

            }
        }
    }

</script>
