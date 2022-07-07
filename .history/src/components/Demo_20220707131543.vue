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
       console.log(mesA,mesB)
      Info.list=mesA.data.list
      Info.list.push(...(mesB.data.list))
      console.log(Info.list)
      let data=[];
      let allMes={}
      Info.list.map((item,index)=>{
       if(item){
        item.create_time.split(" ")[0]
        console.log(item.create_time) 

        let temp=allMes[item.create_time.split(" ")[0]];
        if(!temp){
           allMes[item.create_time.split(" ")[0]]=[].concat(item.create_time)
        }else{
           allMes[item.create_time.split(" ")[0]]=allMes[item.create_time.split(" ")[0]].concat(item.create_time)
        }
       

       }
       
       
        
      })
      console.log(allMes)
    }
   
}
getDate()







    return { ...toRefs(Info) };
  }
 
}
</script>

<style scoped lang="scss">

</style>
