<!--suppress ALL -->
<template>
    <div class="container">
        <h3 style="margin-top: 20px">Rate Management</h3>
        <el-row style="margin-bottom: 10px; margin-top: 20px">
            <el-col :span="14"><el-input v-model="filters[0].value" placeholder="Search" style="display: flex"></el-input></el-col>
        </el-row>

        <data-tables :data="rateData" :table-props="tableProps" :action-col="actionCol" :pagination-props="{ pageSizes: [5, 10, 15,20] }"  :filters="filters">
            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">
            </el-table-column>
        </data-tables>
    </div>
</template>

<script>
    export default {
        name:'ratingManagement',
        mounted(){
            this.renderTable();
        },
        methods: {
            ascendingSortKey(array,key){
                return array.sort(function(a,b){
                    var x = a[key];
                    var y = b[key];
                    return ((x<y)?-1:(x>y)?1:0)
                })
            },
            renderTable(){
                this.$axios(
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                        method: 'GET',
                        url: this.siteConfig.serve.requestRate+'?$sort[shift_date]=1'
                    }
                ).then(
                    ( (response) => {
                        let temp = response.data.data;
                        this.siteUtils.rateBoolean2Text(temp);
                        this.siteUtils.UTC2LocalTime(temp);
                        this.formatQuestions(temp);
                        this.rateData=temp;
                        //todo table element change
                        // console.log(this.rateData)
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                })
                ;
            },
            formatQuestions(data){
                for(let i =0;i<data.length;i++) {
                    for (let keyValue in data[i].questions) {
                        data[i][keyValue] = data[i].questions[keyValue].toString();

                    }
                }
            }
        },
        data() {
            return {
                //testData, switch to url future
                rateData:[{
                    nurse_username: '',
                    shift_type: '',
                    shift_date: '',
                    is_Submitted: '',
                    firstname:''
                }],
                //table title
                titles: [
                    {
                        prop: "nurse_username",
                        label: "User ID",
                    },
                    {
                        prop:"firstname",
                        label:"Alias",
                    },
                    {
                        prop: "shift_type",
                        label: "Shift Type",
                    },
                    {
                        prop: "shift_date",
                        label: "Shift Date",
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
                    },
                    {
                        prop:"q3a",
                        label:"Q3a"
                    }
                ],
                tableProps: {
                    border: true,
                    stripe: true,
                },
                actionCol: {
                    label: ' ',
                    props: {
                        align: 'center',
                        width: '50'
                    },
                    buttons: [{
                        props: {
                            style:'color:#F56C6C',
                            icon: 'el-icon-delete',
                            size:'mini'
                        },
                        handler: row => {
                            if(confirm("Confirm to delete "+ row.shift_date +" rating data") ){
                                // console.log(this.siteConfig.serve.requestPreference+row._id);
                                this.$axios(
                                    {
                                        headers:{'Authorization':this.$cookie.get('authentication')},
                                        method: 'DELETE',
                                        url: this.siteConfig.serve.requestRate+'/'+row._id
                                    }
                                ).then(
                                    ( () => {
                                            alert("delete successfully");
                                            this.rateData.splice(this.rateData.indexOf(row), 1);
                                        }
                                    )
                                ).catch(function (error) {
                                    alert("bad request: " + error);
                                    // console.log(error.response);
                                });

                            }
                        },
                    }]
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
