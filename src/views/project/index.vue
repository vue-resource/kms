<script>
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
          projectImg: require('@/assets/img/person.jpg'),
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
        method: 'get'
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
        method: 'get',
        params: {
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
            <img :src="projectImg"/>
            <div class="markShy">
              <div class="matip">              
                <router-link :to="`/project/action?id=${todo.id}`">
                   <span class="icon-map el-icon-edit"></span>
                </router-link>
                <span class="icon-map el-icon-view" @click="handleView(todo.id)"></span>
              </div>
              <router-link :to="`/contract/list?projectId=${todo.id}`">
                <el-button class="detail" type="primary">查看项目目标</el-button> 
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="dialogTableVisible">
      <h2 slot="title" class="detail-head">
        <span>{{ detail.name }}</span>
        <router-link :to="`/project/action?id=${detail.id}`">
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
        background: #f8f8f8;
        .proHead {
          width: 47.5rem;
          height: 140px;
          border-radius: 4px;
          margin: 0 auto;
           color: #797979;
          .proleft {
              width: 150px;
              padding-top:15px;
              .dataTime {          
                  font-size: 14px;
              }
          }
          .proright {
              width: 760px;
              font-size: 20px;
              display: flex;          
              padding-top: 16px;
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
      width: 80%;
      margin: 10px auto 0;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .proText {    
          height: 40px;
          line-height: 40px;
          color: #545454;
          font-weight: bold;
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
              margin-bottom:25px;
              position: relative;
              border-radius: 6px;
              border: 1px solid #ccc;
              img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
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
                      .icon-map {
                          font-size: 20px;
                          margin-left:5px;
                          color: #fff;
                          cursor: pointer;
                          &:hover { color:#409EFF }
                      }
                  }
                  .detail {
                      position: absolute;
                      left: 50%;
                      bottom: 50px;
                      padding-left:25px;
                      padding-right:25px;
                      transform: translate3d(-50%, 0,0);
                }
              }
          }
          
      }
    }
}

</style>
