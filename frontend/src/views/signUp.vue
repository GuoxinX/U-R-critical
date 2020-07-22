<template>
    <div>
        <div>
<!--            <p>This is a simple Sign up page, just for test, the registration action should be done by admin/AN</p>-->
            <Registration/>
        </div>
    </div>
</template>

<script>
    import Registration from '../components/Registration.vue'
    export default {
        name: "signUp",
        components:{
            Registration,
        }
    }
</script>

<style scoped>

</style>
