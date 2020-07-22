<!--suppress ALL -->
<template>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <h3 style="margin-top: 20px">Statistics</h3>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" :gutter="10">
            <el-col :span="6">
                <label>Week <input type="radio" v-model="interval" value="7"/></label>
            </el-col>
            <el-col :span="7">
                <label>Month <input type="radio" v-model="interval" value="30"/></label>
            </el-col>
            <el-col :span="8">
                <label>3 Months <input type="radio" v-model="interval" value="90"/></label>
            </el-col>
        </el-row>

        <br>
        <template>
            <el-select v-model="value" filterable placeholder="Username">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </template>
        <br>
        <br>
        <el-row>
            <el-col :span="24">
                <h4 style="margin-top: 20px">Rating</h4>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <p style="margin-top: 20px">Average : {{average}}</p>
            </el-col>
        </el-row>
        <ve-line :data="lineChartData" :extend="chartExtend" ></ve-line>
        <br>
        <el-row>
            <el-col :span="24">
                <h4 style="margin-top: 20px">Distribution</h4>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center" :gutter="10">
            <el-col :span="7">
                <p>Low: 0—{{siteConfig.mediumRatingScore-1}}</p>
            </el-col>
            <el-col :span="9">
                <p> Medium: {{siteConfig.mediumRatingScore}}—{{siteConfig.highRatingScore-1}}</p>
            </el-col>
            <el-col :span="8">
                <p> High: {{siteConfig.highRatingScore}}—29</p>
            </el-col>
        </el-row>
        <p style="margin-top: 20px">

       </p>
        <template><ve-pie :data="pieChartData"></ve-pie></template>
    </div>
</template>

<script>
    export default {
        name:'ratingManagement',
        mounted(){
            this.getNurse();
        },
        methods: {
            /*
            manipulateBooleanToString(data){
                for(let i = 0; i < data.length; i++){
                    if(data[i].is_Submitted===true){
                        data[i].is_Submitted='yes';
                    }else if(data[i].is_Submitted===false){
                        data[i].is_Submitted='no'
                    }

                    if(data[i].q1===true){
                        data[i].q1='yes';
                    }else if(data[i].q1===false){
                        data[i].q1='no'
                    }

                    if(data[i].q2===true){
                        data[i].q2='yes';
                    }else if(data[i].q2===false){
                        data[i].q2='no'
                    }

                    if(data[i].q3===true){
                        data[i].q3='yes';
                    }else if(data[i].q3===false){
                        data[i].q3='no'
                    }
                }
            },
            */
            processData(){
                this.nurse = [];
                var len = this.rateData.length;
                for(let i = 0; i < len; i++){
                    if(this.rateData[i].general_score == null){
                        continue;
                    }
                    if(this.nurse.indexOf(this.rateData[i].nurse_username)<0){
                        this.nurse.push(this.rateData[i].nurse_username);
                    }
                }
                this.nurse.sort();
                if(len===0){
                    this.average = 0;
                    this.lineChartData.columns = ['No Data','No Data'];
                    this.lineChartData.rows = [{'No Data': 'No Data' }];
                    this.pieChartData.columns = ['No Data','No Data'];
                    this.pieChartData.rows = [{'No Data': 'No Data' }];
                }else{
                    this.lineChartData.columns = ['Shift Date'].concat(this.nurse);
                    this.lineChartData.rows = [];
                    var current_date = '';
                    var temp = {};
                    var low = 0;
                    var medium = 0;
                    var high = 0;
                    var total = 0;
                    for(let i = 0; i < len; i++){
                        if(this.rateData[i].general_score == null){
                            continue;
                        }
                        if(this.rateData[i].shift_date!==current_date){
                            if(current_date!==''){
                                this.lineChartData.rows.push(temp);
                                temp = {};
                            }
                            current_date = this.rateData[i].shift_date;
                            temp['Shift Date'] = current_date;
                        }
                        temp[this.rateData[i].nurse_username] = this.rateData[i].general_score;
                        if(this.rateData[i].general_score < this.siteConfig.mediumRatingScore){
                            low++;
                        }else if(this.rateData[i].general_score >= this.siteConfig.highRatingScore){
                            high++;
                        }else{
                            medium++;
                        }
                        total += this.rateData[i].general_score;
                    }
                    this.lineChartData.rows.push(temp);
                    this.pieChartData.columns = ['Rating','Amount'];
                    this.pieChartData.rows = [
                        {'Rating': 'Low', 'Amount':low},
                        {'Rating': 'Medium', 'Amount':medium},
                        {'Rating': 'High', 'Amount':high}
                    ];
                    this.average = total / (low + medium + high);
                    this.average = this.average.toFixed(2);
                }
            },
            renderChart(){
                const INTERVAL_MS = 24 * 60 * 60 * 1000 * this.interval;
                var startFrom = new Date().getTime() - INTERVAL_MS;
                var site;
                if(this.value === 'ALL_DATA'){
                    site = this.siteConfig.serve.requestRate+'?shift_date[$gt]='+startFrom+'&$sort[shift_date]=1'
                }else{
                    site = this.siteConfig.serve.requestRate+'?nurse_username='+this.value+'&shift_date[$gt]='+startFrom+'&$sort[shift_date]=1'
                }
                this.$axios(
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                        method: 'GET',
                        url: site
                    }
                ).then(
                    ( (response) => {
                            if(response.data!=null){
                                this.rateData=response.data.data;
                                //this.manipulateBooleanToString(this.rateData);
                                this.siteUtils.UTC2LocalTime(this.rateData);
                                this.processData();
                            }
                            else{
                                alert("Error");
                            }
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                })
                ;
            },
            getNurse(){
                this.$axios(
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                        method: 'GET',
                        url: this.siteConfig.serve.requestUser+'?permissions=nurse&$sort[username]=1'
                    }
                ).then(
                    ( (response) => {
                            if(response.data!=null){
                                if(response.data.data.length===0){
                                    this.options = [];
                                }else{
                                    this.options = [{value: 'ALL_DATA', label: 'All'}];
                                    for(let i = 0; i < response.data.data.length; i++){
                                        var name = response.data.data[i].username;
                                        this.options.push({value:name,label:name});
                                    }
                                }
                            }
                            else{
                                alert("Error");
                            }
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                })
                ;
            },
        },
        data() {
            this.chartExtend = {
                series:{
                    type: 'line',
                    connectNulls: true
                }
            }
            return {
                interval:30,
                average:0,
                nurse:[],
                lineChartData: {
                    columns: [],
                    rows: []
                },
                pieChartData: {
                    columns: [],
                    rows: []
                },
                rateData:[{
                    nurse_username: '',
                    shift_date: '',
                    general_score: ''
                }],
                options: [],
                value: ''
            }
        },
        watch : {
            interval:function() {
                this.renderChart();
            },
            value:function() {
                this.renderChart();
            }
        }
    }
</script>
