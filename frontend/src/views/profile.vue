<template>
    <div>
        <el-row type="flex" justify="center" align="middle">
            <el-col :span="16">
                    <el-card class="box-card"
                             v-loading="loading"
                             element-loading-text="Please wait, your data is loading"
                             element-loading-spinner="el-icon-loading"
                             element-loading-background="rgba(0, 0, 0, 0.8)">
                        <div style="background-color: #FF9900">
                        <div slot="header" class="p_header">
                            <h2 class="p_title"><b>Profile</b></h2>
                        </div>
                        </div>
                        <div>
                            <label>Username: {{username}}</label><br>
                        </div>
                    </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "profile",
        data(){
            return {
                username: this.$cookie.get("username"),
                loading: false,
            }
        },
    }
</script>

<style scoped>
    .box-card{
        margin: 0;
    }
    .p_title{

    }
    .p_header{

    }
    .p_footer{

    }
</style>