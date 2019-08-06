<script>
// import moment from "moment";
// // import Alert from '../components/alert'
// // console.log(Alert)
// let Atime = new moment();
import projectDetail from './detail';
export default {
  name: "project-list",
  data() {
      return {
          info: {
            projectDataCount: [],
            projectInfoList: [],
            currentDate: '',
            userName: ''
          },
          dialogTableVisible: false,
          detail: {}
      };
  },
  components: { projectDetail },
  created() {
      this.getList();
  },
  methods: {
    // 项目列表
    getList(){
      this.$ajax({
        url: '/project/getProjectList',
        // url: '/project/getProjectList.json',
        method: 'post',
        data: {}
      }).then(res => {
        if(res.success){
          this.info = res.data;
        }
      })
    },
    // 项目详情
    handleView (id) {
      this.$ajax({
        url: '/project/getProjectInfo',
        // url: '/project/getProjectInfo.json',
        method: 'post',
        data: {
          id: id
        }
      }).then(res => {
        if(res.success){
          this.detail = res.data;
          this.dialogTableVisible = true;
        }
      })
    }    
  }
};
</script>

<template>
  <div class="projctBox">
    <div class="proheadWrap">
      <div class="proHead">
        <div class="proleft">
          <div class="username"> {{info.username}} 上午好！</div>
          <div class="dataTime">{{info.currentDate}}</div>
        </div>
        <div class="proright">
          <div class="rightfit">
            <p>我发出的目标</p>
            <p class="targetTxt">{{info.projectDataCount.createTargetAmount}}</p>
          </div>
          <div class="rightfit">
            <p>我收到的目标</p>
            <p class="targetTxt">{{info.projectDataCount.receiveTargetAmount}}</p>
          </div>
          <div class="rightfit">
            <p>我发起的问题</p>
            <p class="targetTxt">{{info.projectDataCount.receiveIssueAmount}}</p>
          </div>
          <div class="rightfit">
            <p>指派给我的问题</p>
            <p class="targetTxt">{{info.projectDataCount.createIssueAmount}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 项目列表 -->
    <div class="proContain">
      <div class="proText">项目列表</div>
      <div class="proMain">
        <ul class="ulist">
          <li v-for="(todo,index) in info.projectInfoList" class="gether" :key="index">
            <img :src="todo.imgsrc"/>
            <div class="markShy">
              <div class="matip">              
                <router-link :to="`/project/add?id=${todo.id}`">
                   <span class="icon-edit el-icon-edit"></span>
                </router-link>
                <span class="icon-eyer el-icon-view" @click="handleView(todo.id)"></span>
              </div>
              <router-link :to="`/contract/list?id=${todo.id}`">
                <el-button class="detail" type="primary">查看项目目标</el-button> 
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog title="K11项目" :visible.sync="dialogTableVisible">
      <h2 slot="title" class="detail-head">
        <span>{{ detail.projectName }}</span>
        <router-link :to="`/project/add?id=${detail.id}`">
          <el-button class="detail" type="primary">编辑</el-button>
        </router-link>
      </h2>
      <project-detail :source="detail"></project-detail>
    </el-dialog>
  </div>
</template>

<style lang="less">
.kms-content {
    .proheadWrap {
        background: #e3e3e3;
        .proHead {
          width: 760px;
          height: 140px;
          border-radius: 4px;
          margin: 0 auto;
          .proleft {
              width: 150px;
              padding-top: 10px;
              .dataTime {
                  margin-top: 10px;
                
                  font-size: 12px;
              }
          }
          .proright {
              width: 760px;
              font-size: 14px;
              display: flex;
              padding-top: 20px;
              .rightfit {
                  flex: 1;
              }
              .targetTxt {
                  font-size: 36px;
                  color: #409EFF;
              }
          }
        }
    
    }
    .proContain {
      width: 760px;
      height: 860px;
      margin: 10px auto 0;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .proText {    
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #ddd;
          margin-bottom: 15px;
      }
      .proMain {
          flex: 1;
      }
      .ulist {
          display: flex;
          width: 100%;
          height: 100%;
          flex-wrap: wrap;
          .gether {
              width: 200px;
              height: 200px;
              margin-right: 50px;
              position: relative;
              border-radius: 6px;
              img {
                width: 100%;
                height: 100%;
                display: block;
                font-size: 0;
              }
              &:hover .markShy {
                display: block;
              }
              .markShy {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: rgba(0, 0, 0, 0.2);
                  display: none;
                    .matip {
                      left: 15px;
                      bottom: 15px;
                      position: absolute;
                      .icon-eyer,.icon-edit {
                          font-size: 20px;
                          margin-left:5px;
                          color: #fff;
                          cursor: pointer;
                      }
                  }
                  .detail {
                      position: absolute;
                      left: 50%;
                      bottom: 50px;
                      transform: translate3d(-50%, 0,0);
                }
              }
          }
          
      }
    }
}

</style>
