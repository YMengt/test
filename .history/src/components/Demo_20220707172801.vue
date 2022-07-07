<template>
  <div class="box">
    <div class="content-box">
      <div class="content-left">
        <div class="slide-1">
          <div class="slide-top">
            <div class="square active"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
          </div>
          <div class="slide-bottom">
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
          </div>
        </div>
        <div class="slide-2">
          <div class="slide-title">
            <p>Meeting Notes</p>
          </div>
          <div class="slide-content">
              <collapse v-model="activeNames">

          <collapse-item v-for="(item,index) in sortList" :title="filterDuration(item[0])" :name="item[0]" :key="index">
           <template #default	>
            <div v-for="(item2) in item[1]" :key="item2.id"  class="list">
              <p> {{item2.title}}</p>
              <p><span>{{filterDuration(item2.create_time,item2.duration)}}</span></p>
            </div>
            </template>
          </collapse-item>
         
        </collapse>
          </div>
        </div>
        
      </div>
      <div class="content-right">
       
      </div>
    </div>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant';
import { onMounted, reactive, toRefs } from 'vue';
import axios from 'axios' 
import CryptoJS from '../utils/CryptoJS'
import filterDuration from '../utils/filterDate'
export default {
  name: 'Demo',
  components:{Collapse, CollapseItem },
  setup(){
     
     const Info=reactive({
      activeNames:[],
      list:[],
      sortList:[]
      
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
        // console.log(mesA,mesB)
        sortList(mesA,mesB)


    }));


    }else{
      mesA=JSON.parse(sessionStorage.getItem("dataA"))
      mesB=JSON.parse(sessionStorage.getItem("dataB"))
      //  console.log(mesA,mesB) 
      sortList(mesA,mesB)   
}
}

getDate()
function sortList(mesA,mesB){
      Info.list=mesA.data.list
      Info.list.push(...(mesB.data.list))
      Info.list.map((item)=>{
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
  
 Info.sortList=Object.entries(Info.sortList)
 Info.sortList.sort((a,b)=>{          
            let data_a=(new Date(a[0])).getTime()
            let data_b=(new Date(b[0])).getTime() 
          return data_a-data_b
      })
Info.sortList.map((item)=>{ 
  Info.activeNames.push(item[0])
          item[1].sort((a,b)=>{
            let data_a=(new Date(a.create_time)).getTime()
            let data_b=(new Date(b.create_time)).getTime()
            return data_a-data_b
          })
}) 


console.log(Info.sortList)

}




    return {
       ...toRefs(Info),
       filterDuration,
        };
  }
 
}
</script>

<style scoped lang="scss">
.box{
  width: 100%;
  background-color: #282B32;
  .content-box{
  display: flex;
    .content-left{
     width:490px;   
      display: flex;
      .slide-1{
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .slide-top{
            width: 40px;
            align-self: center;
            margin-top:60px;
        }
        .slide-bottom{
            width: 40px;
            align-self: center;

        }
        .square{
          // margin: auto;
          width: 35px;
          height: 35px;
          border-radius: 10px;
          margin:15px auto;
          background-color: #575D64;
          &.active{
            width: 40px;
            height: 40px;
            background-color: #9F2AEC;
          }
        }
        
      }
      .slide-2{
        width: 100%;
       background-color: #1B1E28;
       box-sizing: border-box;
       padding: 30px 20px 0px;
        .slide-title{
          p{
            color: white;
            font-size: 27px;
            margin: 15px 0px;
          }
        }
        .slide-content{
          margin-top: 20px;
            .list{
              cursor: pointer;
               border:1px solid #41454B;
              border-radius: 10px;
                  padding:8px 5px;
                  margin: 10px 0px; 
                  &:hover{

                  }

              p{
                font-size: 19px;
                span{
                   font-size: 16px;
                   color:#41454B ;
                }
              }
            }
        }
      }
    }
    .content-right{
     
    }
  }
} 

:root {
  --van-collapse-item-content-background-color: #1B1E28;
}

::v-deep .van-collapse-item__content {
    color: white;
    font-size: 16px;
    background: #1B1E28;
    padding: 0px;
}

::v-deep .van-cell{
 background: #1B1E28;
    color: white;

}
::v-deep .van-cell__title span{
font-size: 17px;
}
::v-deep .van-collapse-item--border:after,::v-deep .van-cell:after ,::v-deep .van-hairline--top-bottom:after{
  border:none
}
</style>
