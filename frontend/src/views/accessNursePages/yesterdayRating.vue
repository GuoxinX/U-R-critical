
<!--Not be used now-->

<template>
    <div class="container">
        <h3 style="margin-top: 20px">Rate Yesterday</h3>
        <el-row style="margin-bottom: 10px; margin-top: 20px">
            <el-col :span="14"><el-input v-model="filters[0].value" placeholder="Search" style="display: flex"></el-input></el-col>
        </el-row>

        <data-tables v-if="rateData[0].nurse_username!=''" :data="rateData" :table-props="tableProps" :pagination-props="{ pageSizes: [5, 10, 15,20] }"  :filters="filters">
            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">
            </el-table-column>
        </data-tables>


    </div>
</template>

<script>
    export default {
        name:'yesterdayRating',
        mounted(){
            this.renderTable();
        },
        methods: {
            // convertIDToText(data){
            //     for(let i =0;i<data.length;i++){
            //         switch (data[i].emotion_icon_ID) {
            //             case 1:
            //                 data[i].emotion_icon_ID = 'Satisfied';
            //                 break;
            //             case 2:
            //                 data[i].emotion_icon_ID = 'Delighted';
            //                 break;
            //             case 3:
            //                 data[i].emotion_icon_id = 'Engaged';
            //                 break;
            //             case 4:
            //                 data[i].emotion_icon_ID = 'Dissatisfied';
            //                 break;
            //             case 5:
            //                 data[i].emotion_icon_ID = 'Anxious';
            //                 break;
            //             case 6:
            //                 data[i].emotion_icon_ID = 'Frustrated';
            //                 break;
            //         }
            //
            //     }
            //
            // },
            // manipulateUTCToLocalTime(data){
            //     for(let i =0;i<data.length;i++){
            //         let time = new Date(data[i].shift_date);
            //         let year = time.getFullYear();
            //         let month = time.getMonth()+1;
            //         let day = time.getDate();
            //         // let hour = time.getHours();
            //         // let min = time.getMinutes();
            //         if(day<10){
            //             data[i].shift_date= year +'-'+month+'-'+'0'+day;
            //         }else{
            //             data[i].shift_date= year +'-'+month+'-'+day;
            //         }
            //     }
            // },
            // manipulateBooleanToString(data){
            //     for(let i = 0;i<data.length;i++){
            //         if(data[i].is_Submitted===true){
            //             data[i].is_Submitted='yes';
            //         }else if(data[i].is_Submitted===false){
            //             data[i].is_Submitted='no'
            //         }
            //
            //         if(data[i].q1===true){
            //             data[i].q1='yes';
            //         }else if(data[i].q1===false){
            //             data[i].q1='no'
            //         }
            //
            //         if(data[i].q2===true){
            //             data[i].q2='yes';
            //         }else if(data[i].q2===false){
            //             data[i].q2='no'
            //         }
            //
            //         if(data[i].q3===true){
            //             data[i].q3='yes';
            //         }else if(data[i].q3===false){
            //             data[i].q3='no'
            //         }
            //     }
            // },
            ascendingSortKey(array,key){
                return array.sort(function(a,b){
                    var x = a[key];
                    var y = b[key];
                    return ((x<y)?-1:(x>y)?1:0)
                })
            },
            geturl(str1,str2){
                return ('http://13.58.33.121:3030/api/preferences?$sort[username]=1&shift_date[$gt]='+str1+'&shift_date[$lt]='+str2);
            },
            renderTable(){
                let timeLocal = new Date(Date.now())
                timeLocal.setHours(0)
                timeLocal.setMinutes(0)
                timeLocal.setSeconds(0)
                timeLocal.setMilliseconds(0)
                let endTimeUTC = timeLocal.valueOf()
                let startTimeUTC = endTimeUTC - 86390000
                let finalurl = this.geturl(startTimeUTC,endTimeUTC)
                this.$axios(
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                        method: 'GET',
                        url: finalurl
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
                            }
                            else{
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
        },
        data() {
            return {
                //testData, switch to url future
                rateData:[{
                    nurse_username: '',
                    shift_type: '',
                    shift_date: '',
                    is_Submitted: '',
                }],
                //table title
                titles: [
                    {
                        prop: "nurse_username",
                        label: "Username",
                    },
                    {
                        prop: "nurse_full_name",
                        label: "Full Name",
                    },
                    {
                        prop: "shift_type",
                        label: "Shift Type",
                    },
                    {
                        prop: "shift_date",
                        label: "Shift date",
                    },
                    {
                        prop: "score",
                        label: "Rate Score",
                    },
                    {
                        prop: "emotion_icon_ID",
                        label: "Emotion Icon",
                    },
                    {
                        prop: "comment",
                        label: "Comment",
                    },
                    {
                        prop: "q1",
                        label: "Q1",
                    },
                    {
                        prop: "q2",
                        label: "Q2",
                    },
                    {
                        prop: "q3",
                        label: "Q3",
                    }],
                tableProps: {
                    border: true,
                    stripe: true,
                },
                //search bar
                filters: [
                    {
                        value: ''
                    }
                ]

            }
        }
    }

</script>
