import dayjs from "dayjs"
export default function filterDuration(date,duration){
    if(!date){
        return ""
    }
    if(duration==undefined){
        return dayjs(date).format('dddd,MMM D')  
    }
    let d=(new Date(date)).getTime()
    let d2=(Number(d/1000)+Number(duration))*1000

    d=dayjs(d).format('hh:mm a')
    d2=dayjs(d2).format('hh:mm a')
    return d+" - "+d2
}