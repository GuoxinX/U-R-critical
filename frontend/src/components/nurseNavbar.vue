<template>
    <el-container style="height:100%;overflow: scroll">


        <el-row type="flex" justify="center" style="padding-top: 10%">
            <el-col :span="20" style="text-align: center;"><div class="header"> <p class="welcome">Welcome, </p><p class="username">{{nurseName}}</p></div></el-col>
        </el-row>

        <el-row type="flex" justify="center" >
            <a class="round-button" v-on:click="preferenceJump()"><a class="inner-text" style="text-align: center">Submit<br>Shift<br>Preferences</a></a>
        </el-row>

        <el-row type="flex" justify="center">
            <a class="round-button" v-on:click="rateJump()"><a class="inner-text" style="text-align: center">Submit<br>Shift<br>Feedback</a></a>
        </el-row>

        <el-footer style="bottom:1vmax;position:fixed">
            <el-row type="flex" justify="start">
                <el-col :offset="4">
                    <a class="logout-button" v-on:click="SignOut()">Log out</a>
                </el-col>
            </el-row>
        </el-footer>
        <!--<div style="background-color: #babcc5">-->
          <!--<ul>-->
            <!--<li><a class="nav-link" v-on:click="preferenceJump()">Preference</a></li>-->
            <!--<li><a class="nav-link" v-on:click="rateJump()">Rate</a></li>-->
            <!--<li style="float:right"><a class="nav-link" v-on:click="SignOut">Log out</a></li>-->
          <!--</ul>-->
        <!--</div>-->
    </el-container>
</template>

<script>
    export default {
        name: "Navber",
        data:function() {
            return ({nurseName:this.$cookie.get("username")});
        },
        methods:{
            preferenceJump(){
                this.$router.push({name:"nursePreferenceTypeAndTime"});
            },
            rateJump(){
                this.$router.push({name:"nurseTypeAndTime"});
            },
            SignOut: function() {
                if(confirm("Confirm to log out?")){
                  this.siteUtils.deleteCookies(this);
                  this.$router.push({path:"/"});
                }
            },
        }
    }
</script>

<style scoped>
  ul
  {
    list-style-type:none;
    margin:0;
    padding:0;
    overflow:hidden;
  }
  li
  {
    float:left;
  }

  .header{
      color: #ffffff;
      font-size: 5vmax;
  }

  .header .welcome{
      display: inline-block;
      font-family:LatoWeb;
      font-style: italic;
      font-weight: normal;
  }

  .header .username{
      display: inline-block;
      font-family: 'LatoWebHairline';
      font-style: italic;
      font-weight: normal;
  }

  a:hover,a:active
  {
    background-color: #b2b1ae;
  }

  .round-button {
      display: flex;
      height:30vmax;
      width:30vmax;
      /*padding-top: 100%;*/
      /*height: 0;*/
      /*line-height:60vw;*/
      /*border: 2px solid #f5f5f5;*/
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

  .round-button:hover {
    background: #a87466;
  }

  .inner-text:hover {
      background: #a87466;
  }

  a:not([href]):not([tabindex]) {
    color: #ffffff;
  }

  .logout-button{
      display:flex;
      border-radius:20px;
      background:#c98b7a;
      width:15vmax;
      height:5vmax;
      font-size:2.5vmax;
      justify-content: center;
      align-items: center;
      font-family: 'LatoWebLight';
      font-style: normal;
      font-weight: normal;
  }
</style>
