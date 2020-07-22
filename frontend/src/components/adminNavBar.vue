<template>
    <div><nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">Welcome {{adminName}}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="#">Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/accountManagement">Account Management</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/preferenceManagement">Preference Management</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/ratingManagement">Rating Management</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/adminStatistics">Statistics</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" v-on:click="SignOut()" href="">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
    </div>
</template>

<script>
    export default {
        name: "adminNavBar",
        methods:{
            SignOut: function() {
                if(confirm("Confirm to log out?")){
                    // this.$cookie.delete("authentication");
                    // this.$cookie.delete("username");
                    // this.$cookie.delete('id');
                    // this.$cookie.delete('isLogin');
                    this.siteUtils.deleteCookies(this);
                    this.$router.push({path:"/"});
                }
            }
        },
        data(){
            return{
                adminName:this.$cookie.get('username')
            }
        }
    }
</script>

<style scoped>

</style>
