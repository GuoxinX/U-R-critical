<!--suppress ALL -->
<template>
    <div class="container">
        <h3 style="margin-top: 20px">Shift Preference Management</h3>
        <el-row style="margin-bottom: 10px; margin-top: 20px">
            <el-col :span="14"><el-input v-model="filters[0].value" placeholder="Search" style="display: flex"></el-input></el-col>
        </el-row>

        <data-tables :data="shiftData" :table-props="tableProps" :action-col="actionCol" :pagination-props="{ pageSizes: [5, 10, 15,20] }"  :filters="filters">
            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">
            </el-table-column>
        </data-tables>


    </div>
</template>

<script>
    export default {
        name:'shiftManagement',
        mounted(){
            this.renderTable();
        },
        methods: {
            renderTable(){
                // alert(this.$cookie.get('authentication'))
                this.$axios(
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                        method: 'GET',
                        url: this.siteConfig.baseApi+'/api/preferences?$sort[shift_date]=1'
                    }
                ).then(
                    ( (response) => {
                            if(response.data!=null){

                                this.shiftData=response.data.data;
                                this.siteUtils.preferenceBoolean2Text(this.shiftData);
                                this.siteUtils.UTC2LocalTime(this.shiftData);
                                // this.ascendingSortKey(this.shiftData,'shift_date')
                                // console.log(this.shiftData[0].is_Submitted)
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
                shiftData:[{
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
                        label: "Shift date",
                    },
                    {
                        prop: "pressure_icon_ID",
                        label: "Pressure Icon",
                    },
                    {
                        prop: "section_icon_ID",
                        label: "Section Icon",
                    },
                    {
                        prop: "comment",
                        label: "Comment",
                    },
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
                            if(confirm("Confirm to delete "+ row._id) ){
                                console.log(this.siteConfig.serve.requestPreference+'/'+row._id);
                                this.$axios(
                                    {
                                        headers:{'Authorization':this.$cookie.get('authentication')},
                                        method: 'DELETE',
                                        url: this.siteConfig.serve.requestPreference+'/'+row._id
                                    }
                                ).then(
                                    ( () => {
                                            alert("delete successfully");
                                            this.shiftData.splice(this.shiftData.indexOf(row), 1);
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
