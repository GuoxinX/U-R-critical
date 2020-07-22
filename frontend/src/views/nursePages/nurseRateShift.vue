<template>
    <div class="ratingContainer">

        <el-row class="header" type="flex" justify="center">
            <el-col :span="24" style="text-align: center;">Shift Feedback</el-col>
        </el-row>

        <el-row type="flex" justify="center">
            <el-col class="shiftBanner">
                    <p class="lineFormat">{{rateData[0].shift_date}}</p>
                    <p class="lineFormat">&nbsp; , &nbsp;</p>
                    <p class="lineFormat">{{rateData[0].shift_type}}</p>
                </el-col>
        </el-row>

        <el-row type="flex" justify="center">
            <el-col class="privacyPolicy">
                <el-popover
                        placement="bottom"
                        trigger="click">
                    <p class="policyText" >{{this.siteConfig.privacyPolicy}}</p>
                <a slot="reference" class="privacyPolicyButton" style="color:white">Privacy Policy</a>
                </el-popover>
            </el-col>
        </el-row>


        <el-row>
        <el-form ref="form" :model="rateForm">
            <el-row type="flex" justify="center">
                <el-col :span="20" class="headerQuestion">How are your feeling after your shift?</el-col>
            </el-row>

            <el-row></el-row>

            <el-row ml="10" mr="10" class="rating-slider">
                <!--<el-row><span class="scoreSpan">{{rateForm.score}}</span></el-row>-->
                <el-row type="flex" justify="space-between">
                    <el-col :span="8" class="sliderLeftLabel" ><span class="left-bottom">Stressed</span></el-col>
                    <el-col><span class="scoreSpan">{{rateForm.score}}</span></el-col>
                    <el-col :span="8" class="sliderRightLabel"><span class="right-bottom">Happy</span></el-col>
                </el-row>
                <el-row>
                    <el-slider
                            style="margin:0 10px 0 10px"
                            v-model="rateForm.score"
                            :step="1"
                            :min="0"
                            :max="10"
                            :show-tooltip="false"
                            show-stops>
                    </el-slider>
                    <!--:show-tooltip="false"-->
                </el-row>

            </el-row>


            <el-row >
                <el-row style="display: flex;justify-content: center;">
                    <el-col :span="20" class="question">
                        <span >{{this.questions[0]}}</span>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col class="answerContainerTrue">
                        <input type="radio" name="question1" id="question1True" value="true" v-model="rateForm.answer1" />
                        <label for="question1True">
                            <div class="answerButton">Yes</div>
                        </label>
                    </el-col>
                    <el-col :span="2"></el-col>

                    <el-col class="answerContainerFalse">
                        <input type="radio" name="question1" id="question1False" value="false" v-model="rateForm.answer1" />
                        <label for="question1False">
                            <div class="answerButton" style="background-color: #c94b28">No</div>
                        </label>
                    </el-col>
                </el-row>
            </el-row>

            <el-row>
                <el-row style="display: flex;justify-content: center">
                    <el-col :span="20" class="question">
                        <span >{{this.questions[1]}}</span>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col class="answerContainerTrue">
                        <input type="radio" name="question2" id="question2True" value="true" v-model="rateForm.answer2" />
                        <label for="question2True">
                            <div class="answerButton">Yes</div>
                        </label>
                    </el-col>

                    <el-col :span="2"></el-col>

                    <el-col class="answerContainerFalse">
                        <input type="radio" name="question2" id="question2False" value="false" v-model="rateForm.answer2" />
                        <label for="question2False">
                            <div class="answerButton" style="background-color: #c94b28">No</div>
                        </label>
                    </el-col>
                </el-row>
            </el-row>

            <el-row>
                <el-row style="display: flex;justify-content: center;">
                    <el-col :span="20" class="question">
                        <span >{{this.questions[2]}}</span>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col class="answerContainerTrue">
                        <input type="radio" name="question3" id="question3True" value="true" v-model="rateForm.answer3" />
                        <label for="question3True">
                            <div class="answerButton">Yes</div>
                        </label>
                    </el-col>

                    <el-col :span="2"></el-col>

                    <el-col class="answerContainerFalse">
                        <input type="radio" name="question3" id="question3False" value="false" v-model="rateForm.answer3" />
                        <label for="question3False">
                            <div class="answerButton" style="background-color: #c94b28" v-on:click="rateForm.answer3a=''">No</div>
                        </label>
                    </el-col>
                </el-row>
            </el-row>

            <el-row v-if="rateForm.answer3==='true'">
                <el-row style="display: flex;justify-content: center;">
                    <el-col :span="20" class="question">
                        <span >{{this.questions[3]}}</span>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col class="answerContainerTrue">
                        <input type="radio" name="question3a" id="question3aTrue" value="true" v-model="rateForm.answer3a" />
                        <label for="question3aTrue">
                            <div class="answerButton">Yes</div>
                        </label>
                    </el-col>

                    <el-col :span="2"></el-col>

                    <el-col class="answerContainerFalse">
                        <input type="radio" name="question3a" id="question3aFalse" value="false" v-model="rateForm.answer3a" />
                        <label for="question3aFalse">
                            <div class="answerButton" style="background-color: #c94b28" >No</div>
                        </label>
                    </el-col>
                </el-row>
            </el-row>

            <el-row type="flex" justify="center">

                <el-popover
                        placement="top"
                        trigger="manual"
                        v-model="commentSwitch">
                    <div class="comment-component">
                        <el-row type="flex" justify="center" class="comment-header" >
                            <span class="comment-header-text" >Comments</span>
                        </el-row>
                        <el-row>
                            <el-input class="comment-input" type="textarea"
                                      :autosize="{minRows:10,maxRows:15}"
                                      placeholder="Please add any comments here" v-model="rateForm.comment" >
                            </el-input>
                        </el-row>

                    </div>
                    <el-button slot="reference" class="comment-button"  @click="commentSwitch=!commentSwitch">
                        <span>Comment</span>
                        <i class="el-icon-circle-check" v-if="commentExist"></i></el-button>
                </el-popover>
            </el-row>
            </el-form>
        </el-row>

        <el-row type="flex" justify="center">
                <el-button class="submitButton" :disabled="formControl()" @click="createRate()">Submit</el-button>
        </el-row>

        <el-row class="home-button"><i class="el-icon-s-home" @click="returnMain()"></i></el-row>
        </div>


</template>

<script>
    export default {
        watch: {
            'rateForm.comment': function () {
                this.commentExist = this.rateForm.comment !== '';
            },
        },
        name: "nurseRatePreference",
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(typeof(vm.shiftType)==='undefined' || typeof(vm.shiftTime)==='undefined'|| vm.shiftTime==='' || vm.shiftType===''){
                    vm.$router.push("/nurseTypeAndTime")
                }
            })
        },
        props: ['shiftType','shiftTime'],
        data() {
            return {
                nurseName: this.$cookie.get("username"),
                commentExist:false,
                sliderStart: require('../../assets/images/ratingPageSliderStart.png'),
                sliderEnd: require('../../assets/images/ratingPageSliderEnd.png'),
                commentSwitch:false,
                questions:this.siteConfig.questions,
                rateData:[{
                    shift_date:this.shiftTime,
                    shift_type:this.shiftType,
                    rateID:'',
                }],
                rateForm:{
                    score:5,
                    comment:'',
                    answer1:'',
                    answer2:'',
                    answer3:'',
                    answer3a:'',
                },
                activeName: 1,

            }
        },
        methods:{
            axiosWith3a(){
                this.$axios(
                    {
                        headers: {'Authorization': this.$cookie.get('authentication')},
                        method: 'POST',
                        url: this.siteConfig.serve.requestRate,
                        data: {
                            nurse_username: this.nurseName,
                            firstname: this.$cookie.get("firstname"),
                            shift_type: this.rateData[0].shift_type,
                            shift_date: this.rateData[0].shift_date,
                            is_Submitted: true,
                            comment: this.rateForm.comment,
                            score: this.rateForm.score,
                            questions:{"q1":this.rateForm.answer1==="true","q2":this.rateForm.answer2==="true",
                                "q3":this.rateForm.answer3==="true","q3a":this.rateForm.answer3a==="true"},
                        }
                    }
                ).then(
                    ((response) => {
                            if (!response.errors) {
                                alert("Submit successful");
                                this.$router.push("/nurseMain")
                            }
                            else {
                                alert("Error");
                                return 0;
                            }
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                });
            },
            axiosWithout3a(){
                this.$axios(
                    {
                        headers: {'Authorization': this.$cookie.get('authentication')},
                        method: 'POST',
                        url: this.siteConfig.serve.requestRate,
                        data: {
                            nurse_username: this.nurseName,
                            firstname: this.$cookie.get("firstname"),
                            shift_type: this.rateData[0].shift_type,
                            shift_date: this.rateData[0].shift_date,
                            is_Submitted: true,
                            score: this.rateForm.score,
                            questions:{"q1":this.rateForm.answer1==="true","q2":this.rateForm.answer2==="true",
                                "q3":this.rateForm.answer3==="true"},
                        }
                    }
                ).then(
                    ((response) => {
                            if (!response.errors) {
                                this.$router.push("/successful")
                            }
                            else {
                                alert("Error");
                                return 0;
                            }
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                });
            },
            createRate(){
                if(confirm("Confirm to submit this rate?")) {
                    // console.log(this.rateData[0].shift_date),
                    if(this.rateForm.answer3a===''){
                        this.axiosWithout3a();
                    }else{
                        this.axiosWith3a();
                    }

                }
            },

            privacyDisclaimer(){
                this.$notify.info({
                    title: 'Privacy Police',
                    message: this.siteConfig.privacyPolicy,
                    duration: 0
                });
            },

            buttonStatusControl(){
                document.getElementsByClassName("example")
            },

            returnMain(){
                if(confirm("You have not submitted the shift rate, return to home page?")){
                    this.$router.push("/nurseMain")
                }

            },

            formControl(){
                if(this.rateForm.score!==''&& this.rateForm.answer1!==''&&this.rateForm.answer2!==''){
                    if(this.rateForm.answer3==='true' && this.rateForm.answer3a!==''){
                            return false;
                    }else return this.rateForm.answer3 !== 'false';
                }
                return true;

            }
        },
    }
</script>

<style scoped>

    .header{
        color: #ffffff;
        font-size: 4vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
    }

    .shiftBanner{
        font-family: 'LatoWebLight';
        font-style: italic;
        font-weight: normal;
        color:#babdbf;
        font-size: 3vmax;
        display: flex;
        justify-content: center
    }

    .shiftBanner .lineFormat{
        display: inline-block;

    }

    .ratingContainer{
        padding:1px;
        height:100%;
        overflow: scroll;
    }

    .privacyPolicy{
        display:flex;
        justify-content: center;
    }

    .privacyPolicy .privacyPolicyButton{
        display:flex;
        border-radius:20px;
        background:#bf9336;
        width:20vmax;
        height:5vmax;
        font-size:2.5vmax;
        justify-content: center;
        align-items: center;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        color: #ffffff;
    }

    .privacyPolicyButton:hover,.privacyPolicyButton:active
    {
        background-color: #987626;
    }

    a:hover{
        text-decoration:none;
    }

    .policyText{
        font-family: 'LatoWeb';
        font-style: italic;
        font-weight: normal;
        word-break: normal;
        font-size: 2vmax;
        width:90vmin;
        padding:2vmax;
    }

    .headerQuestion{
        font-family: 'LatoWeb';
        font-style: italic;
        font-weight: normal;
        color:#ffffff;
        text-align:center;
        font-size: 2.5vmax;

    }

    .answerContainerTrue{
        display:flex;
        justify-content: flex-end;
    }

    .answerContainerFalse{
        display:flex;
        justify-content: flex-start;
    }

    .answerButton{
        display:flex;
        border-radius:20px;
        background: #7dc94e;
        width:15vmax;
        height:5vmax;
        font-size:2.5vmax;
        justify-content: center;
        align-items: center;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        color:white;
    }

    input[type=radio] {
        display: none;
    }

    .answerButton:hover {
        opacity:0.8;
        cursor: pointer;
    }

    .answerButton:active {
        opacity:0.8;
        cursor: pointer;
    }

    .question{
        font-family: 'LatoWeb';
        font-style: italic;
        font-weight: normal;
        color:#ffffff;
        text-align:center;
        font-size: 2.5vmax;
    }

    input[type=radio]:checked + label {
        opacity:0.8;
        border: 3px solid;
        border-color:white;
        border-radius:20px;
    }

    .scoreSpan{
        font-size: 3vmax;
        font-family: 'LatoWebHairline';
        font-style: italic;
        font-weight: normal;
        color:#707070;
        display: flex;
        justify-content: center;
    }
    >>>.el-slider__bar{
        background-color:#71a4bc ;
        /*height:2vmax;*/
    }

    >>>.el-slider__runway{
        /*height:2vmax;*/
    }

    >>>.el-slider__stop{
        /*height:2vmax;*/
        /*width:2vmax;*/
    }

    >>>.el-slider__button-wrapper{
        /*height:5.5vmax;*/
        /*width:5.5vmax;*/
    }

    >>>.el-slider__button{
        border:2px solid #71a4bc;
        background-color: #71a4bc;
        /*height:2vmax;*/
        /*width:2vmax;*/
    }

    >>>.el-slider__marks-text{
        font-size: 2vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
    }

    .sliderLeftLabel{
        position:relative;
        font-size: 2vmax;
        font-family: 'LatoWebHairline';
        font-style: italic;
        font-weight: normal;
        color:#707070;
        margin-left:1vmax;
    }

    .sliderRightLabel{
        position:relative;
        font-size: 2vmax;
        font-family: 'LatoWebHairline';
        font-style: italic;
        font-weight: normal;
        color:#707070;
        margin-right:1vmax;
    }

    .submitButton{
        background:#bf9336;
        border-radius:20px;
        width:15vmax;
        height:5vmax;
        font-size:2.5vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        line-height: 1vmax;
        margin-top: 2vmax;
        margin-bottom:3vmax;
        color:white;
    }

    .submitButtonPosition{
        display: flex;
        justify-content: center;
    }

    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
        display:flex;
        justify-content: center;
        align-items: center;
        border-radius:20px;
        background:#bf9336;
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
        background-color:#987626;
    }

    [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled){
        border-color: transparent;
    }

    .comment-button {
        background:#bf9336;
        border-radius:20px;
        width:20vmax;
        height:5vmax;
        font-size:2.5vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
        line-height: 1vmax;
        margin-top: 2vmax;
        margin-bottom:3vmax;
        color:white;
    }

    .rating-slider{
        background-color: white;
        border-radius: 5px;
        margin: 0 2vmax 2vmax 2vmax;
    }

    .left-bottom{
        position: absolute;
        bottom:0;
        left:0
    }

    .right-bottom{
        position: absolute;
        bottom:0;
        right:0
    }

    .home-button{
        position:fixed;
        bottom:0;
        font-size:5vmax;
        color:#c98b7a;
        left:2vmin
    }

    .comment-input{
        font-size:2.5vmax;
        font-family:'Lato' ;
        font-style:normal ;
        font-weight: normal ;
        word-break: break-word;
    }

    .comment-header{
        background-color: #bf9336;
        color:white;
        height:7vmax;
    }

    .comment-header-text{
        line-height: 7vmax;
        font-size:2.5vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
    }

    .comment-component{
        border-radius: 15px 15px 15px 15px;
        overflow: hidden;
        width:80vmin;
    }

    .comment-component >>>.el-textarea__inner{
        border-radius: 0 !important;
        border-color:transparent;
    }

    .comment-header-text{
        line-height: 7vmax;
        font-size:2.5vmax;
        font-family: 'LatoWebLight';
        font-style: normal;
        font-weight: normal;
    }


</style>



