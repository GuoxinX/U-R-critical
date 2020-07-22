<template>
    <div class="container">
        <h3 style="margin-top: 20px">Nurse Pressure Within 5 shifts</h3>
        <el-row style="margin-bottom: 10px; margin-top: 20px">
            <el-col :span="14"><el-input v-model="filter" placeholder="Search" style="display: flex"></el-input></el-col>
        </el-row>
        <div>
            <el-row style="margin-bottom: 10px; margin-top: 20px">
                <el-col :span="4">
                    <div class="red_inst"></div>
                    <span style="font-size: 2vmin"> Pressure Score &ge; {{this.siteConfig.user_high_score}}</span>
                </el-col>
                <el-col :span="5">
                    <div class="yellow_inst"></div>
                    <span style="font-size: 2vmin"> Pressure Score &ge; {{this.siteConfig.user_mid_score}} &lt; {{this.siteConfig.user_high_score}}</span>
                </el-col>
                <el-col :span="4">
                    <div class="green_inst"></div>
                    <span style="font-size: 2vmin"> Pressure Score &lt; {{this.siteConfig.user_mid_score}}</span>
                </el-col>
            </el-row>
        </div>

        <el-table ref="table"
                  border
                  :default-sort = "{prop:'emotion_score', order:'descending'}"
                  :data="userTable"
                  :row-class-name="reColorByScore"
                  :header-cell-style="{background: 'rgba(225,225,209,0.7)', color:'black'}"
                  :height="tableHeight"
                  :max-height="tableHeight"
                  @filter-change="filterChange"
        >
            <el-table-column prop="username"    label="User ID" min-width="55px" sortable/>
            <el-table-column prop="firstname"        label="Alias" min-width="60px" sortable/>
            <el-table-column prop="emotion_score"        label="Pressure Score" sortable min-width="60px"
                             :filters="[{ text: 'green level', value:'g'},
                             { text: 'yellow level' , value: 'y'},
                             { text: 'red level', value: 'r'} ]"
                             :filter-method="scoreFilter" filter-placement="bottom-end" column-key = "es"
            />
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "accessNurseUserPressure",
        created(){
            this.questUserScoreStandard();
        },
        mounted(){
            this.renderTable();
        },
        computed:{
            userTable:function(){
                var filter=this.filter;
                if(filter){
                    return  this.userData.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(filter.toLowerCase()) > -1
                        })
                    })
                }
                return this.userData
            }
        },
        methods: {
            questUserScoreStandard(){
                this.$axios(
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                        method: 'GET',
                        url: this.siteConfig.serve.requestConfig
                    }
                ).then((response)=>{
                    if(response.data !== null ) {
                        this.userMidScore = response.data.data[0].thresholdUser[0];
                        this.userHighScore = response.data.data[0].thresholdUser[1];
                    }
                }).catch(function(error){
                    alert(error)
                });
            },
            renderTable(){
                this.$axios({
                    headers:{'Authorization':this.$cookie.get('authentication')},
                    method: 'GET',
                    url: this.siteConfig.baseApi + '/users',
                    params:{
                        permissions: 'nurse',
                    }
                }).then(
                    (
                        (response) =>{
                            if(response.data!=null){
                                this.userData=response.data.data;
                            } else{
                                alert("failed to load data");
                            }
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                    // console.log(error.response);
                });

            },
            filterChange(filters){
                console.log(filters)
            },
            scoreFilter(value, row) {
                switch (value) {
                    case 'g': return row.emotion_score < this.userMidScore;
                    case 'y': return (row.emotion_score >= this.userMidScore && row.emotion_score < this.userHighScore);
                    case 'r': return row.emotion_score >= this.userHighScore;
                }
            },
            reColorByScore({row}) {
                if (row.emotion_score >= this.userHighScore) {
                    return 'red-row';
                }
                else if (row.emotion_score >= this.userMidScore) {
                    return 'yellow-row';
                }
                return 'green-row';
                // if (parseInt(row.emotion_score) >= parseInt(this.siteConfig.user_high_score)) {
                //     return 'red-row';
                // }
                // else if (parseInt(row.emotion_score) >= parseInt(this.siteConfig.user_mid_score)) {
                //     return 'yellow-row';
                // }
                // return 'green-row';
            },
        },
        data(){
            return{
                tableHeight:800,
                userMidScore:0,
                userHighScore:0,
                userData:[],
                filter:''
            }
        }

    }
</script>

<style scoped>
    .el-table >>> .red-row{
        background: rgba(246, 152, 128, 0.7);
    }
    .el-table >>> .yellow-row{
        background: rgba(246, 235, 116, 0.7);
    }
    .el-table >>> .green-row {
        background: rgba(110, 246, 109, 0.7);
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
