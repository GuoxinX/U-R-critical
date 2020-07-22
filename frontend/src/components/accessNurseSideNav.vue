<template>
    <div class="container-fluid">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Welcome {{accessNurseName}}</h3>
            </div>

            <ul class="list-unstyled components">
                <li>
                    <a href="#referenceSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Shift Preference</a>
                    <ul class="collapse list-unstyled" id="referenceSubmenu">
                        <li>
                            <router-link to="/shiftPreferenceToday">
                                <div>Shift Preference Today</div>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/shiftPreferenceHistory">
                                <div>Shift Preference History</div>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/ongoingShift">Ongoing Shift</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Rating</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <router-link to="/recent24Rating">Recent 24 Hours Rating</router-link>
                        </li>
                        <!--<li>-->
                            <!--<router-link to="/yesterdayRating">Yesterday's Rating</router-link>-->
                        <!--</li>-->
                        <li>
                            <router-link to="/historyRating">History</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link to="/UserScore">User Pressure Score</router-link>
                </li>
                <li>
                    <router-link to="/statistics">Statistic</router-link>
                </li>
            </ul>

            <ul class="list-unstyled CTAs">
                <li>
                    <a href="" class="signOut" @click="SignOut()">Log out</a>
                </li>
            </ul>
        </nav>

        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "accessNurseSideNav",
        data:function() {
            return ({accessNurseName:this.$cookie.get("username")});
        },
        // mounted(){
        //     this.redirectMain();
        // },
        methods:{
            // redirectMain(){
            //     this.$router.push({path: "/shiftPreferenceToday"});
            // },
            SignOut: function() {
                if(confirm("Confirm to logout?")) {
                    this.siteUtils.deleteCookies(this);
                    this.$router.push({path: "/"});
                    // alert("your are logged out" + "\rjwt: " + this.$cookie.get("username") + "\rjwt: " + this.cookie.get("authentication"));
                }
            }
        }
    }
</script>

<style scoped>

    body {
        font-family: 'Poppins', sans-serif;
        background: #fafafa;
    }

    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }

    a,
    a:hover,
    a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    #sidebar {
        width: 250px;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        z-index: 999;
        background: #7386D5;
        color: #fff;
        transition: all 0.3s;
    }

    #sidebar .sidebar-header {
        padding: 20px;
        background: #6d7fcc;
    }

    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }

    #sidebar ul p {
        color: #fff;
        padding: 10px;
    }

    #sidebar ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }

    #sidebar ul li a:hover {
        color: #7386D5;
        background: #fff;
    }

    #sidebar ul li.active>a,
    a[aria-expanded="true"] {
        color: #fff;
        background: #6d7fcc;
    }

    a[data-toggle="collapse"] {
        position: relative;
    }

    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }

    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
        background: #6d7fcc;
    }

    ul.CTAs {
        padding: 20px;
    }

    ul.CTAs a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    a.signOut {
        background: #fff;
        color: #7386D5;
    }


    /* ---------------------------------------------------
        CONTENT STYLE
    ----------------------------------------------------- */

    #content {
        width: calc(100% - 250px);
        padding: 40px;
        min-height: 100vh;
        transition: all 0.3s;
        position: absolute;
        top: 0;
        right: 0;
    }


    /* ---------------------------------------------------
        MEDIAQUERIES
    ----------------------------------------------------- */

    @media (max-width: 768px) {
        #sidebar {
            margin-left: -250px;
        }

        #content {
            width: 100%;
        }

        #sidebarCollapse span {
            display: none;
        }
    }

</style>
