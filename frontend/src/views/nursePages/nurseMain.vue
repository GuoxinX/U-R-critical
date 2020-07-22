<template>
    <div class="nursePage">
            <nurseNaBar v-if="this.$route.path==='/nurseMain'" style="height:100%;"/>
            <router-view></router-view>
            <!--<div v-if="this.$route.path==='/nurseMain'" id = "background" style="position:absolute;width:100%;">-->
                <!--<img src="../assets/images/nurse.png" alt="" width="100%" height="100%">-->
            <!--</div>-->
            <!--<div v-if="this.$route.path==='/nurseMain'" id="mask" style="position:fixed;background-color:rgba(4,4,4,0.4);height:100%;width:100%;">-->
                <!--<div style="margin-top:30vh;text-align:center">-->
                    <!--<b style="color:#fff;font-size:4vh">Disclaim(under development)</b>-->
                    <!--&lt;!&ndash;<hr/>&ndash;&gt;-->
                    <!--&lt;!&ndash;<button style="color:#fff;background-color:#778beb;font-size: 16px;border: none;padding: 10px 32px;border-radius: 5px;" size="large" @click="SignOut()">Logout</button>&ndash;&gt;-->
                <!--</div>-->
            <!--</div>-->

    </div>

</template>

<script>

    import nurseNaBar from '../../components/nurseNavbar'

    export default {
        name: "nurseMain",
        data() {
            return {
                shiftTime: '',
                rateTime: '',
                preferenceID: '',
                shiftType: '',
                rateID: ''
            }
        },
        components: {
            nurseNaBar
        },
    }

</script>

<style scoped>
    .nursePage{
        background-image: url('../../assets/images/nurse-background-triangles.png');
        height: 100vh;
        /*background-size: cover;*/
        /*position: relative;*/
        /*max-width: 100%;*/
        /*padding: 160px 35px 0;*/
        /*margin: 0 auto;*/
        /*overflow: hidden;*/
    }
</style>

<style>

</style>
