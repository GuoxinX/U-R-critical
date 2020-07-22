<template>
    <div style="height:100%;overflow: scroll">
        <el-row class="nurse-header-span">Shift Feedback</el-row>

        <el-row type="flex" justify="center" class="main-content">
            <el-col :span="20">
                <el-card  class="card" :body-style="{padding: '0px'}">
                    <div class="header">
                        <el-row type="flex" justify="center">
                            <h3 class="header-text mb-4 pt-4 pb-2 ">Select Shift</h3>
                        </el-row>
                    </div>

                    <el-row class="time-picker" type="flex" justify="center">
                        <el-col :span="20" style="display:flex;justify-content: center">
                            <el-date-picker
                                    v-model="shiftTime"
                                    align="right"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="Choose Date"
                                    :picker-options="pickerOptionsRating">
                            </el-date-picker>
                        </el-col>
                    </el-row>

                    <el-row type="flex" justify="center" class="button-upper">
                        <el-col class="button-position-L" :span="8">
                            <input type="radio" name="shiftType" id="shift-1" value="E12" v-model="shiftType" />
                            <label for="shift-1" class="type-button-E">
                                <span class="type-button-text">E12</span>
                            </label>
                        </el-col>

                        <el-col class="button-position-M" :span="8">
                            <input type="radio" name="shiftType" id="shift-2" value="E8" v-model="shiftType"/>
                            <label  for="shift-2" class="type-button-E">
                                <span class="type-button-text">E8</span>
                            </label>
                        </el-col>

                        <el-col class="button-position-R" :span="8">
                            <input type="radio" name="shiftType" id="shift-3" value="L8" v-model="shiftType"/>
                            <label  for="shift-3" class="type-button-L">
                                <span class="type-button-text">L8</span>
                            </label>
                        </el-col>
                    </el-row>

                    <el-row type="flex" justify="center">

                        <el-col class="button-position-L" :span="12">
                            <input type="radio" name="shiftType" id="shift-4" value="N12" v-model="shiftType" />
                            <label for="shift-4" class="type-button-N">
                                <span class="type-button-text">N12</span>
                            </label>
                        </el-col>
                        <el-col class="button-position-R" :span="12">
                            <input type="radio" name="shiftType" id="shift-5" value="N10" v-model="shiftType"/>
                            <label for="shift-5" class="type-button-N">
                                <span class="type-button-text">N10</span>
                            </label>
                        </el-col>
                    </el-row>

                    <el-row type="flex" justify="center">
                        <el-button class="next-button" :disabled="shiftType==='' || shiftTime===''" @click="redirectNextPage()">Next</el-button>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>

        <el-row style="position:fixed;bottom:0;font-size:5vmax; color:#c98b7a;left:2vmin"><i class="el-icon-s-home" @click="returnMain()"></i></el-row>


    </div>
</template>

<script>
    export default {
        name: "nurseRatingTypeAndTime",
        beforeMount(){
            this.requestDisableDate()
        },
        methods:{
            redirectNextPage(){
                this.$router.push({ name: 'nurseRateShift', params: { shiftType: this.shiftType,shiftTime:this.shiftTime }});
            },

            returnMain(){
                if(confirm("You have not submitted the shift rate, return to home page?")){
                    this.$router.push("/nurseMain")
                }

            },
            requestDisableDate(){
                this.$axios(
                    {
                        headers: {'Authorization': this.$cookie.get('authentication')},
                        method: 'GET',
                        url: this.siteConfig.serve.queryRate,
                    }).then(((response) => {
                        let ratingData=response.data.data;
                        this.siteUtils.UTC2LocalTime(ratingData);
                        for(let i = 0; i<ratingData.length;i++){
                            let tempDate = new Date(ratingData[i].shift_date);
                            this.disableDate.push(tempDate.getTime())
                        }
                    })
                ).catch(function (error) {
                    alert("bad request: " + error);
                });
            },
        },
        data(){
            return{
                disableDate:[],
                shiftType:'',
                shiftTime:'',
                pickerOptionsRating: {
                    disabledDate:(time)=> {
                        return this.disableDate.indexOf(time.getTime()) !== -1 ;
                    }
                }
            }
        },

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

    .header-text{
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        color:white;
    }

    .next-button{
        border-radius:20px;
        background:#347da0;
        width:15vmax;
        height:5vmax;
        font-size:2.5vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        /*text-align: center;*/
        line-height: 1vmax;
        margin-top: 2vmax;
        margin-bottom:3vmax;
        color:white;
    }

    .nurse-header-span{
        color: #ffffff;
        font-size: 4vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        text-align: center;
        padding-top: 5vmax;
    }

    .el-card, .el-message{
        border-radius:30px;
    }

    .type-button-E{
        border-radius: 50%;
        background-color: #e9d281;
        color:white;
        width:10vmax;
        height:10vmax;
        font-size:4vmax;
        line-height: 10vmax;
        text-align: center;
    }

    .type-button-L{
        border-radius: 50%;
        background-color: #e5ab71;
        color:white;
        width:10vmax;
        height:10vmax;
        font-size:4vmax;
        line-height: 10vmax;
        text-align: center;
    }

    .type-button-N{
        border-radius: 50%;
        background-color: #a0adcc;
        color:white;
        width:10vmax;
        height:10vmax;
        font-size:4vmax;
        line-height: 10vmax;
        text-align: center;
    }

    .type-button-text{
        font-family: 'LatoWebLight';
        font-style: italic;
        font-weight: normal;
    }

    input[type=radio] {
        /*visibility:hidden;*/
        display: none;
    }

    >>>.el-input__inner{
        /*width:100%;*/
        border-radius: 30px;
        text-align:center;
        height:6vmax;
        font-size:2vmax;
        font-family: 'LatoWebLight';
        font-style: italic;
        font-weight: normal;
    }

    .button-position{
        display:flex;
        justify-content: center;
        margin-top: 1vmax;
    }

    .button-position-L{
        display:flex;
        justify-content: flex-end;
        padding-right: 1vmax;
    }

    .button-position-R{
        display:flex;
        justify-content: flex-start;
        padding-left: 1vmax;
    }

    .button-position-M{
        display:flex;
        justify-content: center;
    }

    .button-upper{
        padding-top:2vmax;
    }

    input[type=radio]:checked + label{
        border-radius:50%;
        background-color: #347da0;
    }

    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
        line-height: 1vmax;
        border-radius:20px;
        background:#347da0;
        width:15vmax;
        height:5vmax;
        font-size:2.5vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        border-color:transparent;
        border:transparent;
    }

    .el-button:focus, .el-button:hover{
        color: white;
        border-color: transparent;
        background-color: #295c79;
    }

    [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled){
        border-color: transparent;
    }

    .main-content{
        padding: 10vmax 0 10vmax 0;
    }

    .time-picker{
        padding: 2vmax 0 1vmax 0;
    }
</style>
