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
    <div>{{data}}</div>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant';
import { onMounted, reactive, toRefs } from 'vue';
import axios from 'axios' 
import {decrypt} from '../utils/CryptoJS'
export default {
  name: 'Demo',
  components:{Collapse, CollapseItem },
  setup(){
     
     const Info=reactive({
      activeNames:["1"],
      data:''
     })
      const axiosInstance=axios.create({
        baseURL:'https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/mock',
      })

      const getMessage=async(page_now=1,page_size=3000)=>{
        let resultA=await axiosInstance.get('/meeting-a/list',{
          params:{
            page_now:page_now,
            page_size:page_size
          }
        })

        // let resultB=await axiosInstance.get('/meeting-b/list',{
        //   params:{
        //     page_now:page_now,
        //     page_size:page_size
        //   }
        // })

        console.log(resultA)
        // console.log(resultB)
        Info.data=resultA.data 
        // 解码

  //  Info.data= decodeURIComponent(escape(window.atob(resultA.data)));

  let s=decrypt(resultA.data)
  console.log(s)

        //  let a = CryptoJS.decrypt(Info.data)
        //  console.log(a)
      }

      getMessage()
      


    return { ...toRefs(Info) };
  }
 
}
</script>

<style scoped lang="scss">

</style>
