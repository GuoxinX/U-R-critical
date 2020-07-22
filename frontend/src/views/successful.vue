<template>
    <el-container style="height:100%;overflow: scroll;">
        <el-row type="flex" justify="center" style="padding-top: 10%">
            <el-col :span="20" style="text-align: center;">
                <div class="header">
                    <p class="banner-1">Submission successful<p>
                    <p class="banner-2"> Thank you!</p>
                </div>
            </el-col>
        </el-row>

        <el-row class="success-button">
            <i class="el-icon-success"></i>
        </el-row>

        <el-footer class="home-button">
            <el-row ><i class="el-icon-s-home" @click="returnMain()"></i></el-row>
        </el-footer>

    </el-container>
</template>

<script>
    export default {
        name: "successful",
        methods: {
            returnMain() {
                this.$router.push({name: "nurseMain"});
            },
        }
    }
</script>

<style scoped>

    .header{
        color: #ffffff;
    }

    .header .banner-1{
        display: inline-block;
        font-family: 'LatoWebLight';
        font-style: italic;
        font-weight: normal;
        font-size: 4vmax;

    }

    .header .banner-2{
        display: inline-block;
        font-family: 'LatoWebLight';
        font-style: italic;
        font-weight: normal;
        font-size: 5vmax;
    }

    a:hover,a:active
    {
        background-color: #b2b1ae;
    }

    .round-button {
        display: flex;
        height:30vmax;
        width:30vmax;
        border-radius: 50%;
        color:#f5f5f5;
        justify-content: center;
        align-items: center;
        text-decoration:none;
        background: #bf9336;
        /*box-shadow: 0 0 3px gray;*/
        font-size:3.5vmax;
        /*font-weight:bold;*/
        position:relative;
        overflow-wrap: normal;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        margin:5%

    }

    .home-button{
        position:fixed;
        bottom:0;
        font-size:5vmax;
        color:#c98b7a;
        left:2vmin;

    }

    .success-button{
        color:#7dc94e;
        display: flex;
        justify-content: center;
        font-size:50vmin;
        padding-top:8vmax;
    }
</style>
