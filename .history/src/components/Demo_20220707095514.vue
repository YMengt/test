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
import { reactive, toRefs } from 'vue';
export default {
  name: 'Demo',
  components:{Collapse, CollapseItem },
  setup(){
     
     const Info=reactive({
      activeNames:1
     })
    return { ...toRefs(Info) };
  }
 
}
</script>

<style scoped lang="scss">

</style>
