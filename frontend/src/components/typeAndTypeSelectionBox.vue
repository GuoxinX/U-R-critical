<template>
    <div>
        <el-row>

            <el-card  class="card" :body-style="{padding: '0px'}">

                <div class="header">
                    <el-row type="flex" justify="center">
                        <h3 style="color: white" class="header-text mb-1 pt-3 pb-3 font-weight-bold ">Select Shift</h3>
                    </el-row>
                </div>

                <div style="text-align: center; margin-top: 30px">
                    <el-date-picker
                            v-model="shiftTime"
                            align="right"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="Choose Date"
                            :picker-options="pickerOptionsPreference"
                            style="margin: 1px 0 5px 0">
                    </el-date-picker>
                </div>

                <div style="text-align: center; margin-top: 30px">

                    <el-row>


                        <input type="radio" name="shiftType" id="shift-1" value="E12" v-model="shiftType" />
                        <label for="shift-1">
                            <img style="margin-left: 1px; border-radius: 50%;" src="../assets/images/E12.png" />

                        </label>

                        <input type="radio" name="shiftType" id="shift-2" value="E8" v-model="shiftType"/>
                        <label id="label2" for="shift-2">
                            <img style="margin-left: 1px; border-radius: 50%;" src="../assets/images/E8.png" />


                        </label>

                        <input type="radio" name="shiftType" id="shift-3" value="L8" v-model="shiftType"/>
                        <label for="shift-3">
                            <img style="margin-left: 1px; border-radius: 50%;" src="../assets/images/L8.png"/>
                        </label>

                    </el-row>

                </div>

                <div style="text-align: center">

                    <el-row>

                        <input type="radio" name="shiftType" id="shift-4" value="N12" v-model="shiftType" />
                        <label for="shift-4">
                            <img style="margin-left: 1px; border-radius: 50%;" src="../assets/images/N12.png" />

                        </label>

                        <input type="radio" name="shiftType" id="shift-5" value="N10" v-model="shiftType"/>
                        <label for="shift-5">
                            <img style="margin-left: 1px; border-radius: 50%;" src="../assets/images/N10.png" />


                        </label>

                    </el-row>

                </div>


                <div style="text-align: center; margin-top: 30px; margin-bottom: 40px">
                    <el-button style="background: #bf9336" type="primary" :disabled="shiftType==='' || shiftTime===''" @click="redirectNextRatingPage()">Next</el-button>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "typeAndTypeSelectionBox",
        data() {
            return {
                shiftTypeList: this.siteConfig.shiftTypes,
                disableDate: [],
                shiftType: '',
                nurseName:this.$cookie.get("username"),
                shiftTime: '',
                pickerOptionsPreference: {
                    disabledDate: (time) => {
                        // console.log(time.getTime());
                        //todo disable the same date preference submitted
                        // return this.disableDateBox.indexOf(time.getTime()) !== -1 || time.getTime() < Date.now() - 3600 * 1000 * 24;
                        return this.disableDate.indexOf(time.getTime()) !== -1;
                    },
                },
            }
        },
        methods: {
            redirectNextRatingPage() {
                this.$router.push({
                    name: 'nurseSelectPreference',
                    params: {shiftType: this.shiftType, shiftTime: this.shiftTime}
                });
            },
            requestDisableDate() {
                this.$axios(
                    {
                        headers: {'Authorization': this.$cookie.get('authentication')},
                        method: 'GET',
                        url: this.siteConfig.serve.requestPreference + '?nurse_username=' + this.nurseName
                            + '&shift_date[$gt]=' + (Date.now() - 3600 * 1000 * 24),
                    }).then(((response) => {
                        let preferenceData = response.data.data;
                        this.siteUtils.UTC2LocalTime(preferenceData);
                        for (let i = 0; i < preferenceData.length; i++) {
                            // console.log(response.data.data[i].shift_date);
                            let tempDate = new Date(preferenceData[i].shift_date);
                            this.disableDate.push(tempDate.getTime())
                        }
                        // console.log(this.disableDate)
                    })
                ).catch(function (error) {
                    alert("bad request: " + error);
                });
            },
        }
    }
</script>

<style scoped>

</style>
