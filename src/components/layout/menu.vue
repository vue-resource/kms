<template>
    <div>
    <el-row class="tac">
    <!-- <el-col :data="dataArr">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">  
             <el-submenu index="1">
                <template slot="title" >
                    <span prop="name">188</span>
                </template>
                <el-menu-item-group  >
                   <el-menu-item index="1-1">市场定义产品</el-menu-item>
                </el-menu-item-group>               
                <el-submenu index="1-2">
                   <template slot="title">整车TVS</template>
                    <el-menu-item index="1-2">安全性</el-menu-item>
                    <el-menu-item index="1-3">NVH</el-menu-item>
                    <el-menu-item index="1-4">重量</el-menu-item>
                    <el-menu-item index="1-5">操稳</el-menu-item>
                    <el-menu-item index="1-6">CFD</el-menu-item>
                </el-submenu>
                 <el-menu-item-group  >
                   <el-menu-item index="1-7">动力</el-menu-item>
                   <el-menu-item index="1-8">底盘</el-menu-item>
                   <el-menu-item index="1-9">白车身</el-menu-item>
                 </el-menu-item-group>
                 <el-submenu index="1-3">
                   <template slot="title">开闭件</template>
                    <el-menu-item index="1-3-1">前舱盖</el-menu-item>
                    <el-submenu index="3-1">
                        <template slot="title">前车门</template>
                        <el-menu-item index="3-1-1">前车门骨架</el-menu-item>
                         <el-menu-item index="3-1-2">前车门护板</el-menu-item>
                          <el-menu-item index="3-1-3">前车门锁</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="1-3-3">后车门</el-menu-item>
                    <el-menu-item index="1-3-4">后尾门</el-menu-item>
                    <el-menu-item index="1-3-5">后行李箱</el-menu-item>
                </el-submenu>
                <el-submenu index="1-5">
                    <template slot="title">车身附件</template>
                    <el-menu-item index="1-5-1">前挡风玻璃</el-menu-item>
                </el-submenu>
      </el-submenu>
       </el-menu>
    </el-col> -->
   
    </el-row>
</div>

</template>

<script>
  export default {
    data(){
     const item = {
         name:'车型项目'
     }
     return {
         dataArr:item
     }
    //  console.log(item)
    },
    created(){ 
        console.log("11",this.dataArr)
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
      
    }
  }
</script>