<!--suppress ALL -->
<template>
    <div class="container">
        <el-button @click="pushback()"><i class="el-icon-back"></i></el-button>
        <h3 style="margin-top: 20px">Rating History for "{{ this.$route.params.nurse}}"</h3>
        <el-row style="margin-bottom: 10px; margin-top: 20px">
            <el-col :span="14"><el-input v-model="filter" placeholder="Search" style="display: flex"></el-input></el-col>
        </el-row>
        <div>
            <el-row style="margin-bottom: 10px; margin-top: 20px">
                <el-col :span="4">
                    <div class="red_inst"></div>
                    <span style="font-size: 2vmin">Rate Score &ge; {{this.rateHighScore}}</span>
                </el-col>
                <el-col :span="5">
                    <div class="yellow_inst"></div>
                    <span style="font-size: 2vmin">Rate Score &ge; {{this.rateMidScore}} &lt; {{this.rateHighScore}}</span>
                </el-col>
                <el-col :span="4">
                    <div class="green_inst"></div>
                    <span style="font-size: 2vmin">Rate Score &lt; {{this.rateMidScore}}</span>
                </el-col>
            </el-row>
        </div>

<!--        <data-tables :data="rateData" :table-props="tableProps" :pagination-props="{ pageSizes: [5, 10, 15,20] }"  :filters="filters">-->
<!--            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">-->
<!--            </el-table-column>-->
<!--        </data-tables>-->


        <el-table ref="table"
                  border
                  :default-sort = "{prop:'shift_date', order:'descending'}"
                  :data="rateTable"
                  :row-class-name="reColorByScore"
                  :header-cell-style="{background: 'rgba(225,225,209,0.7)', color:'black'}"
                  @filter-change="filterChange"
        >

            <el-table-column prop="nurse_username"    label="User ID" min-width="55px"/>
            <el-table-column prop="firstname"        label="Alias" min-width="60px"/>
            <el-table-column prop="general_score"        label="Rate Score" sortable min-width="60px"/>
            <el-table-column prop="shift_date"        label="Shift date" sortable min-width="55px"/>
            <el-table-column prop="shift_type"       label="Shift Type" sortable min-width="55px"
                             :filters="[{ text: 'E12', value: 'E12' }, { text: 'E8' , value: 'E8' },
                             { text: 'L8' , value: 'L8' }, { text: 'N12' , value: 'N12' },
                             { text: 'N10' , value: 'N10'}]"
                             :filter-method="filterShiftType" filter-placement="bottom-end" column-key = "shiftType"/>
            <el-table-column prop="score" label="Stress Score" sortable :sort-method="sortByScore" min-width="65px"/>
            <!--            <el-table-column prop="emotion_icon_ID"  label="Emotion Icon" />-->
            <el-table-column prop="questions"        label="Questions" align="center" >
                <el-table-column prop="questions.q1" label="q1" min-width="35px"
                                 :filters="[{ text: 'yes', value: 'yes' }, { text: 'no' , value: 'no' }]"
                                 :filter-method="filterQ1" filter-placement="bottom-end" column-key = "q1"
                                 :filter-multiple= false />
                <el-table-column prop="questions.q2" label="q2" min-width="35px"
                                 :filters="[{ text: 'yes', value: 'yes' }, { text: 'no' , value: 'no' }]"
                                 :filter-method="filterQ2" filter-placement="bottom-end" column-key = "q2"
                                 :filter-multiple= false />
                <el-table-column prop="questions.q3" label="q3" min-width="35px"
                                 :filters="[{ text: 'yes', value: 'yes' }, { text: 'no' , value: 'no' }]"
                                 :filter-method="filterQ3" filter-placement="bottom-end" column-key = "q3"
                                 :filter-multiple= false />
                <el-table-column prop="questions.q3a" label="q3a" min-width="35px"
                                 :filters="[{ text: 'yes', value: 'yes' }, { text: 'no' , value: 'no' }]"
                                 :filter-method="filterQ3a" filter-placement="bottom-end" column-key = "q3a"
                                 :filter-multiple= false />
            </el-table-column>
            <el-table-column prop="comment"          label="Comment" min-width="120px"/>
            <!--            <el-table-column prop="is_Submitted"     label="Submitted" />-->
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "nurseRatingHistory",
        created(){
            //initialise the data instance. name each field and fill them with ''
            // this.rateData = this.dataModel.initRateData();
            this.questRatingStandard();
        },
        mounted(){
            this.renderTable();
        },
        computed:{
            rateTable:function(){
                var filter=this.filter;
                if(filter){
                    return  this.rateData.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(filter.toLowerCase()) > -1
                        })
                    })
                }
                return this.rateData
            }
        },
        methods: {
            // json_parse(){
            //     var json = '{"key":"value","jian":"zhi"}';
            //     var obj =JSON.parse(json);
            // },
            pushback(){
                this.$router.push({path: '/historyRating'});
            },
            // ascendingSortKey(array,key){
            //     return array.sort(function(a,b){
            //         var x = a[key];
            //         var y = b[key];
            //         return ((x<y)?-1:(x>y)?1:0)
            //     })
            // },
            questRatingStandard(){
                this.$axios.get(this.siteConfig.serve.requestConfig,
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                    }
                ).then((response)=>{
                    if(response.data !== null ) {
                        this.rateMidScore = response.data.data[0].thresholdRating[0];
                        this.rateHighScore = response.data.data[0].thresholdRating[1];
                    }
                }).catch(function(error){
                    alert(error)
                });
            },
            renderTable(){
                let timeLocal = new Date(Date.now())
                let startTimeUTC = timeLocal.valueOf()
                // console.log(this.siteConfig.baseApi
                //     +'/api/ratings?nurse_username='
                //     +this.$route.params.nurse
                //     +'&$sort[shift_date]=-1&shift_date[$lt]='+startTimeUTC);
                this.$axios.get(this.siteConfig.baseApi
                    +'/api/ratings?nurse_username='
                    +this.$route.params.nurse
                    +'&$sort[shift_date]=-1&shift_date[$lt]='+startTimeUTC,
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                    }
                ).then(
                    ( (response) => {
                            if(response.data!=null){
                                this.rateData=response.data.data;
                                this.siteUtils.rateBoolean2Text(this.rateData);
                                this.siteUtils.UTC2LocalTime(this.rateData);
                                this.siteUtils.rateData2Text(this.rateData)
                                // this.ascendingSortKey(this.rateData,'shift_date')
                                //console.log(this.shiftData[0].is_Submitted)
                                //countAdmin can not put in mounted, need to figure out
                            } else{
                                //redirect
                                alert("Error");
                                // this.$router.push({path:'/'});
                            }
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                    // console.log(error.response);
                })
                ;
            },
            filterChange(filters){
                console.log(filters)
            },
            filterShiftType(value, row) {
                return row.shift_type === value;
            },
            filterQ1(value, row) {
                return row.questions.q1 === value;
            },
            filterQ2(value, row) {
                return row.questions.q2 === value;
            },
            filterQ3(value, row) {
                return row.questions.q3 === value;
            },
            filterQ3a(value, row) {
                return row.questions.q3a === value;
            },
            //return differet CSS for differet pressure level
            reColorByScore({row}){
                if (row.is_Submitted === "no"){
                    return 'grey-row';
                }
                else if (parseInt(row.general_score) >= parseInt(this.rateHighScore)) {
                    return 'red-row';
                }
                else if (parseInt(row.general_score) >= parseInt(this.rateMidScore)) {
                    return 'yellow-row';
                }
                return 'green-row';
            },
            //the grater negativeFlag measn more pressure.
            sortByScore(a,b){
                return a.score - b.score;
            },
            //overwrite the call back function, that allows you to definen your own CSS for your table header
            tableHeader(){
                return 'table-header';
            }
        },
        data() {
            return {
                tableHeight: 800,
                rateMidScore: 0,
                rateHighScore: 0,
                rateData:[],
                filter:'',

            }
        }
    }

</script>

<style scoped>
    .el-table >>> .AS-col{
        background: #E1E1D1;
    }
    .el-table >>> .grey-row{
        background: rgba(166, 160, 164, 0.7);
    }
    .el-table >>> .red-row{
        background: rgba(246, 152, 128, 0.7);
    }
    .el-table >>> .yellow-row{
        background: rgba(246, 235, 116, 0.7);
    }
    .el-table >>> .green-row {
        background: rgba(110, 246, 109, 0.7);
    }
    .el-table >>> .table-header{
        background: #9e3b3b;
    }
    .red_inst{
        background: rgba(246, 152, 128, 0.7);
        width: 15px;
        height: 15px;
    }
    .yellow_inst{
        background: rgba(246, 235, 116, 0.7);
        width: 15px;
        height: 15px;
    }
    .green_inst{
        background: rgba(110, 246, 109, 0.7);
        width: 15px;
        height: 15px;
    }
</style>
