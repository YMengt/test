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
          <collapse-item title="标题1" name="1" :border="false">
           
            <div class="list">
              <p> 代码是写出来给人看的，附带能在机器上运行。</p>
              <p><span>12.3215</span></p>
            </div>
          </collapse-item>
          <collapse-item title="标题2" name="2" >
            技术无非就是那些开发它的人的共同灵魂。
          </collapse-item>
         
        </collapse>
          </div>
        </div>
        
      </div>
      <div class="content-right">
        2356
      </div>
    </div>
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




    return { ...toRefs(Info) };
  }
 
}
</script>

<style scoped lang="scss">
.box{
  width: 100%;
  background-color: #282B32;
  .content-box{
  
    .content-left{
     overflow: auto;
     width:490px;
      height: 1500px;
      border:1px solid pink;
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
              border:1px solid #41454B;
              border-radius: 5px;
              p{
                span{

                }
              }
            }
        }
      }
    }
    .content-right{
      border:1px solid red;
      float: right;
      // overflow: auto;
    }
  }
} 

:root {
  --van-collapse-item-content-background-color: #1B1E28;
}

::v-deep .van-collapse-item__content {
    padding: 5px;
    color: white;
    font-size: 16px;
    // line-height: var(--van-collapse-item-content-line-height);
    background: #1B1E28;
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
