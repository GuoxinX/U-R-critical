<template>
    <div>
        <navBar></navBar>
        <router-view></router-view>
    </div>
</template>

<script>
    import navBar from '../../components/adminNavBar'

    export default {
        name: "adminMain",
        components:{
            navBar
        }
    }

</script>

<style scoped>

</style>
