import dayjs from "dayjs"
export default function filterDuration(date,duration){
    if(!date){
        return ""
    }
    if(duration==undefined){
        return dayjs(date).format('dddd,MMM D')  
    }
    return "2:00-3:00"
}