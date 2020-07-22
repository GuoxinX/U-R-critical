
export default {
    initRateData(){
        return[{
                nurse_username: '',
                shift_type: '',
                shift_date: '',
                score:'',
                emotion_icon_ID:'',
                comment:'',
                questions:{},
                general_score:'',
                is_Submitted: '',
            }];

    },
    initShiftData(){
        return [{
            nurse_username: '',
            shift_type: '',
            shift_date: '',
            section_icon_ID:'',
            pressure_icon_ID:'',
            comment:'',
            negativeFlag:0,
            is_Submitted: '',
        }]
    }
}