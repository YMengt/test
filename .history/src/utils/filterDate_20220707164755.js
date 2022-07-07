import dayjs from "dayjs"
export default function filterDuration(date,duration){
    if(!date){
        return ""
    }
    if(duration==undefined){
        return dayjs(date).format('YYYY-MM-DD')  
    }
    return "2:00-3:00"
}