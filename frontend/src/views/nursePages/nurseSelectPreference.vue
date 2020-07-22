<template>
    <div class="preference-container">

        <el-row class="header" type="flex" justify="center">
            <el-col :span="24" style="text-align: center;">Shift Preferences</el-col>
        </el-row>

        <el-row type="flex" justify="center">
            <el-col class="shiftBanner">
                <p class="lineFormat">{{this.form.shiftTime}}</p>
                <p class="lineFormat">&nbsp; , &nbsp;</p>
                <p class="lineFormat">{{this.form.shiftType}}</p>
            </el-col>
        </el-row>

        <el-row class="main-content">
        <el-form ref="form" :model="form">

            <el-row class="feeling-content">
                <el-row type="flex" justify="center" :gutter="10">
                    <div class="feeling-header">
                        <p class="feeling-header-p1">Please choose your&nbsp;</p>
                        <p class="feeling-header-p2">feeling</p>:</div>
                </el-row>

                <el-row type="flex" justify="center" :gutter="10">
                    <el-col :span="7">
                        <input type="radio" name="pressure" id="pressure-1" value="1" v-model="form.pressure_ID" />
                        <label for="pressure-1">
                            <el-tooltip class="item" effect="light" placement="top" >
                                <div slot="content"><p class="popperTips">Challenge</p></div>
                                <el-image class="option" :src="src_f1"></el-image>
                            </el-tooltip>
                        </label>

                    </el-col>

                    <el-col :span="7">
                        <input type="radio" name="pressure" id="pressure-2" value="2" v-model="form.pressure_ID" />
                        <label for="pressure-2">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content"><p class="popperTips">Low day</p></div>
                                <el-image class="option" :src="src_f2"></el-image>
                            </el-tooltip>
                        </label>
                    </el-col>

                    <el-col :span="7">
                        <input type="radio" name="pressure" id="pressure-3" value="3" v-model="form.pressure_ID" />
                        <label for="pressure-3">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content"><p class="popperTips">Exhausted</p></div>
                                <el-image class="option" :src="src_f3"></el-image>
                            </el-tooltip>
                        </label>
                    </el-col>
                </el-row>

            </el-row >

            <el-row class="shift-content">
                <el-row type="flex" justify="center">
                    <div class="feeling-header">
                        <p class="feeling-header-p1">Please select the&nbsp;</p>
                        <p class="feeling-header-p2">shift you prefer</p>:</div>
                </el-row>

                <el-row type="flex" justify="center" >
                    <el-col :span="6">
                        <br>
                        <input type="radio" name="choice" id="choose-1" value="1" v-model="form.section_ID" />
                        <label for="choose-1">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content"><p class="popperTips">CTS</p></div>
                                <el-image class="option" :src="src_s1"></el-image>
                            </el-tooltip>
                        </label>
                    </el-col>

                    <!--<el-col :span="6">-->
                        <!--<input type="radio" name="choice" id="choose-2" value="2" v-model="form.section_ID"/>-->
                        <!--<label for="choose-2">-->
                            <!--<el-tooltip class="item" effect="light" placement="top">-->
                                <!--<div slot="content"><p class="popperTips">CRRT</p></div>-->
                                <!--<el-image class="option" :src="src_s2"></el-image>-->
                            <!--</el-tooltip>-->
                        <!--</label>-->
                    <!--</el-col>-->

                    <el-col :span="6">
                        <input type="radio" name="choice" id="choose-3" value="3" v-model="form.section_ID"/>
                        <label for="choose-3">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content"><p class="popperTips">Trauma</p></div>
                                <el-image class="option" :src="src_s3"></el-image>
                            </el-tooltip>
                        </label>
                    </el-col>

                    <el-col :span="6">
                        <br>
                        <input type="radio" name="choice" id="choose-4" value="4" v-model="form.section_ID"/>
                        <label for="choose-4">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content"><p class="popperTips">Neurosurgical</p></div>
                                <el-image class="option" :src="src_s4"></el-image>
                            </el-tooltip>
                        </label>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center" :gutter="1">

                    <el-col :span="6">
                        <br>
                        <input type="radio" name="choice" id="choose-5" value="5" v-model="form.section_ID"/>
                        <label for="choose-5">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content"><p class="popperTips">ECMO</p></div>
                                <el-image class="option" :src="src_s5"></el-image>
                            </el-tooltip>
                        </label>
                    </el-col>

                    <el-col :span="6">
                        <input type="radio" name="choice" id="choose-6" value="6" v-model="form.section_ID"/>
                        <label for="choose-6">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content"><p class="popperTips">EOLC/OD</p></div>
                                <el-image class="option" :src="src_s6"></el-image>
                            </el-tooltip>
                        </label>
                    </el-col>

                    <el-col :span="6">
                        <br>
                        <input type="radio" name="choice" id="choose-7" value="7" v-model="form.section_ID"/>
                        <label for="choose-7">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content"><p class="popperTips">Filtration</p></div>
                                <el-image class="option" :src="src_s7"></el-image>
                            </el-tooltip>
                        </label>
                    </el-col>
                </el-row>
            </el-row>

        </el-form>

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
                              placeholder="Please add any comments here" v-model="form.comment" >
                        </el-input>
                    </el-row>

                </div>
                <el-button slot="reference" class="comment-button"  @click="commentSwitch=!commentSwitch">
                    <span>Comment</span>
                    <i class="el-icon-circle-check" v-if="commentExist"></i></el-button>
            </el-popover>
        </el-row>

        <el-row type="flex" justify="center">
                <el-button class="submit-button"  @click="sendPreference()" :disabled="formControl()">Submit</el-button>
        </el-row>

        <el-row class="home-button"><i class="el-icon-s-home" @click="returnMain()"></i></el-row>


    </div>
</template>

<script>
    export default {
        name: "nurseSelectPreference",
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(typeof(vm.shiftType)==='undefined' || typeof(vm.shiftTime)==='undefined'|| vm.shiftTime==='' || vm.shiftType===''){
                    vm.$router.push("/nursePreferenceTypeAndTime")
                }
            })
        },
        props: ['shiftType','shiftTime'],
        watch:{
            'form.comment':function(){
                this.commentExist = this.form.comment !== '';
            },

            'form.pressure_ID':function(){
                // console.log(o+' '+n);
                switch(this.form.pressure_ID){
                    case '1':
                        this.showPressure='I am feeling a challenge';
                        // console.log(this.showPressure);
                        break;
                    case '2':
                        this.showPressure='I am having a low day';
                        // console.log(this.showPressure);
                        break;
                    case '3':
                        this.showPressure='I am feeling exhausted today';
                        // console.log(this.showPressure);
                        break;
                }
            },
            'form.section_ID':function(){
                switch(this.form.section_ID){
                    case '1':
                        this.showSection='CTS';
                        break;
                    case '2':
                        this.showSection='CRRT';
                        break;
                    case '3':
                        this.showSection='Trauma';
                        break;
                    case '4':
                        this.showSection='Neurosurgical';
                        break;
                    case '5':
                        this.showSection='ECMO';
                        break;
                    case '6':
                        this.showSection='EOLC/OD';
                        break;
                    case '7':
                        this.showSection='Filtration';
                        break;
                }
            }
        },
        data() {
            return {
                disableDateBox: [],
                nurseName: this.$cookie.get("username"),
                showPressure: '',
                commentExist:false,
                showSection: '',
                rateTime: '',
                shiftID: '',
                temp: '',
                commentSwitch: false,
                src_s1: require('../../assets/images/shift1.png'),
                src_s2: require('../../assets/images/shift2.png'),
                src_s3: require('../../assets/images/shift3.png'),
                src_s4: require('../../assets/images/shift4.png'),
                src_s5: require('../../assets/images/shift5.png'),
                src_s6: require('../../assets/images/shift6.png'),
                src_s7: require('../../assets/images/shift7.png'),
                src_f1: require('../../assets/images/feeling1.png'),
                src_f2: require('../../assets/images/feeling2.png'),
                src_f3: require('../../assets/images/feeling3.png'),

                shiftTypeList: ['E12', 'E8', 'L8', 'N12', 'N10'],

                form: {
                    comment: '',
                    pressure_ID: '',
                    section_ID: '',
                    shiftType: this.shiftType,
                    shiftTime: this.shiftTime,
                },
            }
        },

        methods: {
            returnMain(){
                if(confirm("You have not submitted the shift rate, return to home page?")){
                    this.$router.push("/nurseMain")
                }

            },
            formControl(){
                return !(this.form.section_ID !== '' && this.form.pressure_ID !== '');
            },
            modifyDate(date, diffDate) {
                let dat = new Date(date);
                let datemm = dat.setDate(dat.getDate() + diffDate);
                let datOriginal = new Date(datemm);
                return datOriginal.getFullYear() + '-' + (datOriginal.getMonth() + 1) + '-' + datOriginal.getDate();

            },

            createPreference(){
                // console.log(shiftArrangement.users[userIndex])
                this.$axios(
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                        method: 'POST',
                        url: this.siteConfig.serve.requestPreference,
                        data:{
                            nurse_username: this.nurseName,
                            firstname:this.$cookie.get("firstname"),
                            shift_type: this.form.shiftType,
                            shift_date: this.form.shiftTime,
                            comment: this.form.comment,
                            pressure_icon_ID: this.form.pressure_ID,
                            section_icon_ID: this.form.section_ID
                        }
                    }
                ).then(
                    (() => {
                            this.$router.push("/successful")
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                });
            },
            //axios to post rate data

            sendPreference: function () {
                if (confirm("Confirm to submit this preference?")) {
                    if (this.form.pressure_ID !== '' && this.form.section_ID !== ''
                        && this.form.shiftTime!== '' && this.form.shiftType!=='') {
                        this.createPreference();

                    } else {
                        alert("You need to complete all options for your preference selecting before submitting! That's include shift date, shift type, sections and pressure level");
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .feeling-header {

        color: white;
        text-align: center;
        font-family: 'LatoWebLight', sans-serif;
        font-size: 2.5vmax;
        font-style: normal;
        font-weight: normal;
    }

    .feeling-header .feeling-header-p1{
        display: inline-block;
    }

    .feeling-header .feeling-header-p2{
        display: inline-block;
    }

    .popperTips {
        color: #707070;
        text-align: center;
        font-family: 'Lato', sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: normal;
        margin: 0px;
    }

    .submit-button {
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

    input[type=radio] {
        display: none;
    }

    .option:hover {
        opacity:0.8;
        cursor: pointer;
        overflow:inherit;
    }

    .option:active {
        opacity:0.8;
        cursor: pointer;
        overflow:inherit;
    }
    .option{
        background-color: white;
        border-radius:50%;
        overflow:inherit;
    }

    input[type=radio]:checked + label {
        opacity:0.8;
        border: 5px solid #3fc995;
        border-radius:50%;
    }

    input[type=radio][name=pressure]:checked + label{
        opacity:0.8;
        border: 5px solid #3fc995;
        border-radius:50%;
    }

    .preference-container{
        height:100%;
        overflow:scroll;
    }

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

    >>>.el-image__inner{
        border-radius: 50%;
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

    .main-content{
        padding-top:2vmax;
        padding-bottom:2vmax;
    }

    .home-button{
        position:fixed;
        bottom:0;
        font-size:5vmax;
        color:#c98b7a;
        left:2vmin
    }

    .shift-content{
        padding-top:2vmax;
    }



</style>

<style>
    .el-popover{
        padding:0 !important;
        border:0 !important;
        border-radius:15px !important;
    }
</style>
