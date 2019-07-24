<script>
import moment from "moment";
let Atime = new moment()
export default {
    name: 'project',
    props: {

    },
    data () {
        return {
          time: Atime.format('YYYY年MM月DD日'),
          Atarget:'5',
          Btarget:'12',
          Ctarget:'8',
          Dtarget:'20',
          list:[
            {name:'K09项目'},
            {name:'K11项目'},
             {name:'K12项目'},
            {name:'K13项目'},
             {name:'K14项目'},
            {name:'K15项目'},
           
          ]
        }
      
    },
    computed: {

    },
    watch: {

    },
    // 生命周期
    created () {

    },
    methods: {

    }
}
</script>

<template>
  <div class="projctBox"> 
     <div class="proHead" >
       <div class="proleft">
         <div class="username"> 罗伯特 上午好！</div>
         <div class="dataTime">{{time}}</div>
       </div>
       <div class="line"></div>
       <div class="proright">
         <div class="rightfit">
           <p>我发出的目标</p>
           <p class="targetTxt">{{Atarget}}</p>
         </div>
         <div class="rightfit">
           <p>我收到的目标</p>
           <p class="targetTxt">{{Btarget}}</p>
         </div>
         <div class="rightfit">
           <p>我发起的问题</p>
           <p class="targetTxt">{{Ctarget}}</p>
         </div>
         <div class="rightfit">
           <p>指派给我的问题</p>
           <p class="targetTxt">{{Dtarget}}</p>
         </div>
       </div>
     </div>
     <div class="proContain">
       <div class="proText">项目列表</div>
       <div class="proMain">
         <ul class="ulist">
           <li v-for="(todo,index) in list" class="gether" v-bind:key="index">{{todo.name}}</li>
         </ul>
       </div>
     </div>
  </div>
</template>

<style lang="less">
  .projctBox{
    
  }
   .proHead{
     width: 760px;
     height: 140px;
     border-radius: 4px;
     margin: 0 auto;
    background-color: rgb(242, 242, 242);
    display: flex;
    .proleft{
      float: left;
       width:150px;
      .dataTime{
        padding-left:30px;
        padding-top: 20px;
        color:#999;
        font-size: 12px;
      }
      .username{
        padding-left:30px;
          padding-top:40px;
      }
    }
    .line{
      height: 74px;
      width: 1px;
      background: #999;
      float: left;
      margin-top:51px;
      margin-left:42px;
    }
    .proright{
      flex:1;
      // background: red;
      font-size: 14px;
       display: flex;
       justify-content:space-between;
       .rightfit{
         flex:1;
        text-align: center;
        padding-top:52px;
       
       }
       .targetTxt{
          padding-top: 10px;
          font-size:16px;
       }
    }
   }
   .proContain{
     width: 760px;
     height: 560px;
     margin: 10px auto 0;
     border-radius: 4px;
     display: flex;
     flex-direction:column;
     background-color: rgb(242, 242, 242);
     .proText{
       padding-left:30px;
       padding-top:15px;
       height: 90px;
       line-height: 90px;
      //  width:100%;
     }
     .proMain{
      flex:1;
     }
     .ulist{
       display: flex;
       width: 100%;
       height: 100%;
       justify-content:space-around;
       flex-wrap:wrap;
      .gether{
        // flex:1;
        width: 200px;
        height:200px;
       display: flex;
        // line-height: 200px;
        align-items: center;
            justify-content: center;
        background-color: rgb(228, 228, 228);
        border-radius: 4px;
       font-weight: bold;
      }
     }
   }
</style>
