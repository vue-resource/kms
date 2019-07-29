<script>
import moment from "moment";
// import Alert from '../components/alert'
// console.log(Alert)
let Atime = new moment();
export default {
    name: "project",
    props: {},
    data() {
        return {
            time: Atime.format("YYYY年MM月DD日"),
            Atarget: "5",
            Btarget: "12",
            Ctarget: "8",
            Dtarget: "20",
            idx:false,
            username:'罗伯特',
            list: [
                { name: "K09项目" },
                { name: "K11项目" },
                { name: "K12项目" },
                { name: "K13项目" },
                { name: "K14项目" },
                { name: "K15项目" },
                { name: "K16项目" }
            ]
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {},
    methods: {
      changeMask(index){
        console.log(index)
        let vm = this;
        let mask = vm.$refs[index];
        if(mask==index){
          this.idx = true
        }
      },
      editHand(){
        console.log("editHand")
      },
      commenHand(){
        console.log("commenHand")
      }
    }
};
</script>

<template>
  <div class="projctBox">
    <div class="proheadWrap">
      <div class="proHead">
      <div class="proleft">
        <div class="username"> {{username}} 上午好！</div>
        <div class="dataTime">{{time}}</div>
      </div>
      <!-- <div class="line"></div> -->
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
    </div>
    
    <div class="proContain">
      <div class="proText">项目列表</div>
      <div class="proMain">
        <ul class="ulist">
          <li
            v-for="(todo,index) in list"
            class="gether"
            v-bind:key="index"
            :ref="index"
         
          >
            <!-- {{todo.name}} -->

            <div class="markShy" v-if="index===0">
              <div class="matip">
                  <span class="eyer" @click="commenHand"></span>
                  <span class="edition" @click="editHand"></span>
              </div>
              <span class="detail">查看项目目标</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.projctBox {
}
.proheadWrap{
  width: 100%;
  background-color: rgb(242, 242, 242);
}
.proHead {
    width: 760px;
    height: 140px;
    border-radius: 4px;
    margin: 0 auto;
    // background-color: rgb(242, 242, 242);
    // display: flex;
    .proleft {
        width: 150px;
        padding-top:10px;
        .dataTime {
            margin-top: 10px;
            color: #999;
            font-size: 12px;
        }
        .username {
        }
    }
   
    .proright {
        // flex: 1;
        // background: red;
        width: 760px;
        font-size: 14px;
        display: flex;
        padding-top:10px;
        // justify-content: space-between;
        .rightfit {
            flex: 1;
            // text-align: center;
            
        }
        .targetTxt {
            
            font-size: 36px;
            color:blue;
        }
    }
}
.proContain {
    width: 895px;
    height: 560px;
    margin: 10px auto 0;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    background-color: rgb(242, 242, 242);
    .proText {
        padding-left: 30px;
        padding-top: 15px;
        height: 90px;
        line-height: 90px;
        //  width:100%;
    }
    .proMain {
        flex: 1;
    }
    .ulist {
        display: flex;
        width: 100%;
        height: 100%;
        // display:inline-block;
        justify-content: space-between;
        // align-content:flex-start;

        flex-wrap: wrap;
        .gether {
            width: 200px;
            height: 200px;
            // display: flex;
            position: relative;
           // align-items: center;
            // justify-content: center;

            // background-color: rgb(228, 228, 228);
            border-radius: 6px;
            font-weight: bold;
            color: #fff;
            background: url("~@/assets/img/developImg.png") no-repeat;
             background-size: 100% 100%;
        }
        .markShy{
          width: 100%;
          height: 100%;
          position:absolute;
          top:0;
          left:0;
          background: rgba(0, 0, 0, 0.2);
          color: #ddd;
          .matip{
            padding-top: 20px;
           
            padding-right:20px;
           left: 25px;
            bottom: 15px;
            position: absolute;

           .eyer{
             width:20px;
             height: 20px;
             background: url("~@/assets/img/eye.png") no-repeat;
             background-size: 100% 100%;
             display: inline-block;
             color: #fff;
           }
           .edition{
              width:20px;
             height: 20px;
             background: url("~@/assets/img/edition.png") no-repeat;
             background-size: 100% 100%;
             display: inline-block;
           }
          }
          .detail{
            background: blue;
            position: absolute;
            left: 23%;
            bottom: 50px;
            color: #fff;
            padding: 5px 20px;
            border-radius: 4px;
            font-size: 14px;
          }
        }
    }
}
</style>
