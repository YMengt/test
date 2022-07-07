<template>
  <div class="hello">
        <collapse v-model="activeNames">
      <collapse-item title="标题1" name="1">
        代码是写出来给人看的，附带能在机器上运行。
      </collapse-item>
      <collapse-item title="标题2" name="2">
        技术无非就是那些开发它的人的共同灵魂。
      </collapse-item>
      <collapse-item title="标题3" name="3">
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </collapse-item>
    </collapse>
    
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant';
import { onMounted, reactive, toRefs } from 'vue';
import axios from 'axios' 
import CryptoJS from '../utils/CryptoJS'
export default {
  name: 'Demo',
  components:{Collapse, CollapseItem },
  setup(){
     
     const Info=reactive({
      activeNames:["1"],
      list:[],
      sortList:{}
      
     })

function getMessageA(page_now=1,page_size=3000) {
  return axios.get('https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/mock/meeting-a/list',{
     params:{
            page_now:page_now,
            page_size:page_size
          }
  });
}
 
function getMessageB(page_now=1,page_size=3000) {
  return axios.get('https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/mock/meeting-b/list',{
     params:{
            page_now:page_now,
            page_size:page_size
          }
  });
}


function getDate(){
  let mesB,mesA;
  if(!(sessionStorage.getItem("dataA")&&sessionStorage.getItem("dataB"))){

    axios.all([getMessageA(), getMessageB()])
    .then(axios.spread(function (dataA, dataB) {
      // 两个请求现在都执行完成
         mesA=CryptoJS.decrypt(dataA.data)
       mesB=CryptoJS.decrypt(dataB.data)
        sessionStorage.setItem("dataA",mesA) 
         sessionStorage.setItem("dataB",mesB) 
        mesA=JSON.parse(mesA)
        mesB=JSON.parse(mesB) 
        console.log(mesA,mesB)



    }));


    }else{
      mesA=JSON.parse(sessionStorage.getItem("dataA"))
      mesB=JSON.parse(sessionStorage.getItem("dataB"))
      //  console.log(mesA,mesB) 


      Info.list=mesA.data.list
      Info.list.push(...(mesB.data.list))
      console.log(Info.list)
      // let data=[];
      // let allMes={}
      Info.list.map((item,index)=>{
       if(item){//不为null,         
          let data_now=(new Date(item.create_time.split(" ")[0]))  
          data_now=item.create_time.split(" ")[0]         
           let temp=Info.sortList[data_now];
          if(!temp){
            Info.sortList[data_now]=[].concat(item)
          }else{
            Info.sortList[data_now]=Info.sortList[data_now].concat(item)
          }
       }                      
      })
      // console.log(Info.sortList,96) 
     Object.entries(Info.sortList).map((item)=>{ 
          item[1].sort((a,b)=>{
            let data_a=(new Date(a.create_time)).getTime()
            let data_b=(new Date(b.create_time)).getTime()
            return data_a-data_b
          })
      })

      console.log(Info.sortList)
    }
   
}
getDate()







    return { ...toRefs(Info) };
  }
 
}
</script>

<style scoped lang="scss">

</style>
