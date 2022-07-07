import dayjs from "dayjs"
export default function filterDuration(date,duration){
    if(!date){
        return ""
    }
    if(duration==undefined){
        return dayjs(date).format('MMM,dddd D')  
    }
    return "2:00-3:00"
}