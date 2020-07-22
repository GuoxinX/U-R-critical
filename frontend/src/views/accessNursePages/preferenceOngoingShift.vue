<!--suppress ALL -->
<template>
    <div class="container">
        <h3 style="margin-top: 20px">Ongoing Shift</h3>
        <el-row style="margin-bottom: 10px; margin-top: 20px">
            <el-col :span="14"><el-input v-model="filter" placeholder="Search" style="display: flex"></el-input></el-col>
        </el-row>
        <div>
            <el-row style="margin-bottom: 10px; margin-top: 20px">
                <el-col :span="4">
                    <div class="red_inst"></div>
                    <span style="font-size: 2vmin">Pressure is 'Exhausted'</span>
                </el-col>
                <el-col :span="4">
                    <div class="yellow_inst"></div>
                    <span style="font-size: 2vmin">Pressure is 'Low day'</span>
                </el-col>
                <el-col :span="4">
                    <div class="green_inst"></div>
                    <span style="font-size: 2vmin">Pressure is 'Challenge'</span>
                </el-col>
            </el-row>
        </div>

        <el-table ref="table"
                  border
                  :default-sort = "{prop:'shift_date', order:'descending'}"
                  :data="shiftTable"
                  :row-class-name="recolorRowByPressure"
                  :header-cell-style="{background: 'rgba(225,225,209,0.7)', color:'black'}"
                  @filter-change="filterChange"
        >

            <el-table-column prop="nurse_username"    label="User ID" />
            <el-table-column prop="firstname"        label="Alias"/>
            <el-table-column prop="shift_date"        label="Shift date" sortable/>
            <el-table-column prop="shift_type"       label="Shift Type" sortable min-width="55px"
                             :filters="[{ text: 'E12', value: 'E12' }, { text: 'E8' , value: 'E8' },
                             { text: 'L8' , value: 'L8' }, { text: 'N12' , value: 'N12' },
                             { text: 'N10' , value: 'N10'}]"
                             :filter-method="filterShiftType" filter-placement="bottom-end" column-key = "shiftType"/>
            <el-table-column prop="pressure_icon_ID" label="Pressure Icon" sortable :sort-method="sortByPressure"
                             :filters="[{ text: 'Challenge', value: 'Challenge' }, { text: 'Low day' , value: 'Low day' },
                             { text: 'Exhausted' , value: 'Exhausted' }]"
                             :filter-method="filterPressure" filter-placement="bottom-end" column-key = "Pressure" />
            <el-table-column prop="section_icon_ID"  label="Section Icon" sortable
                             :filters="[{ text: 'CTS', value: 'CTS' }, { text: 'CRRT' , value: 'CRRT' },
                             { text: 'Trauma' , value: 'Trauma' }, { text: 'Neurosurgical' , value: 'Neurosurgical' },
                             { text: 'ECMO' , value: 'ECMO'},{ text: 'EOLC/OD' , value: 'EOLC/OD'},
                             { text: 'Filtration' , value: 'Filtration'}]"
                             :filter-method="filterSection" filter-placement="bottom-end" column-key = "Section" />
            <el-table-column prop="comment"          label="Comment" />
<!--            <el-table-column prop="is_Submitted"     label="Submitted" />-->

        </el-table>


    </div>
</template>

<script>
    export default {
        name:'ongoingShift',
        mounted(){
            this.renderTable();
        },
        computed:{
            shiftTable:function(){
                var filter=this.filter;
                if(filter){
                    return  this.shiftData.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(filter.toLowerCase()) > -1
                        })
                    })
                }
                return this.shiftData
            }
        },
        methods: {
            async renderTable(){
                //record the time
                let timeLocal = new Date(Date.now())
                let startTimeUTC = timeLocal.valueOf()
                //send requestion to server
                //this part request all preferences from now
                this.$axios.get(this.siteConfig.serve.futurePreference +startTimeUTC,
                    {
                        headers:{'Authorization':this.$cookie.get('authentication')},
                    }
                ).then(
                    ( (response) => {
                            if(response.data.total!==0){
                                //transfrom the data into text for humen to read
                                this.shiftData=response.data.data;
                                this.siteUtils.preferenceBoolean2Text(this.shiftData);
                                this.siteUtils.UTC2LocalTime(this.shiftData);
                                this.siteUtils.preferenceData2Text(this.shiftData);
                            } else{
                                this.shiftData=response.data.data;
                            }
                        }
                    )
                ).catch(function (error) {
                    alert("bad request: " + error);
                })
                ;
            },
            filterChange(filters){
                console.log(filters)
            },
            filterShiftType(value, row) {
                return row.shift_type === value;
            },
            filterPressure(value, row) {
                return row.pressure_icon_ID === value;
            },
            filterSection(value, row) {
                return row.section_icon_ID === value;
            },
            //return differet CSS for differet pressure level
            recolorRowByPressure({row}){
                if (row.pressure_icon_ID === 'Exhausted') {
                    return 'red-row';
                } else if (row.pressure_icon_ID === 'Low day') {
                    return 'yellow-row';
                }
                return 'green-row';
            },
            //the grater negativeFlag measn more pressure.
            sortByPressure(a,b){
                return a.negativeFlag - b.negativeFlag;
            },
            //overwrite the call back function, that allows you to definen your own CSS for your table header
            tableHeader(){
                return 'table-header';
            },
        },
        data() {
            return {
                tableHeight: 800,
                //the structure of shiftData could be found in data model,
                //it should have the same field as it in the back-end,
                //one for store raw data, one for store human readable information.
                shiftData:[],
                filter: ''

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
