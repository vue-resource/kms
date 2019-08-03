<script>
export default {
    name: "target-edit",
    data() {
      return {
        targetId: this.$route.params.id,
        param: {
          name: '',
          nodeName: '',
          projectPeriod: '',
          time: ''
        },
        targetDetail: {},
        projectDetail: {},
        activeTab: '1',
        dataTab:[
          {name: '目标解决方案', value: '1'},
          {name: '目标验证', value: '2', disabled: true}
        ]
      }
    },
    computed: {
      tableData () {
        return [this.targetDetail]
      }
    },
    // 生命周期
    created() {
      this.getDetail();
      this.queryTarget();
    },
    methods: {
      // 项目详情
      getDetail () {
        this.$ajax({
          // url: '/project/getProjectInfo',
          url: '/project/getProjectInfo.json',
          method: 'get',
          params: {
            id: this.$route.query.projectId
          }
        }).then(res => {
          if(res.success){
            this.projectDetail = res.data;
          }
        })
      },
      // 目标详情
      queryTarget(){
        this.$ajax({
            // url: '/target/queryTarget',
            url: '/target/queryTarget.json',
            method: 'get',
            params: {
              targetId: this.targetId
            }
          }).then(res => {
            if(res.success){
              this.targetDetail = res.data;
            }
          })
      },
      updateTarget (role) {
        this.$ajax({
          // url: '/target/updateTarget',
          url: '/target/updateTarget.json',
          method: 'get',
          params: {
            ...this.param,
            cs:role,
            nodeId: this.targetId,
            adjunctList: this.targetDetail.adjunctList,
            targetNum: this.targetDetail.targetNum
          }
        }).then(res => {
          if(res.success){
            this.$router.push('/contract')
          }
        })
      }
    }
};
</script>
<template>
  <div class="project-edit">
    <!-- <div class="headtip">
      <div class="strip">
        <el-input placeholder="请输入内容" v-model="value1">
          <template slot="prepend">目标名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="value2" class="simble">
          <template slot="prepend">边界系统</template>
        </el-input>
      </div>
      <div class="stripTwoBox">
        <div class="stripTwo">
          <el-input placeholder="请输入内容">
            <template slot="append">
            </template>
            <template slot="prepend">项目阶段</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="value5" class="simble" >
            <template slot="prepend">时间计划</template>
          </el-input>
        </div>
        <div class="reletionship">
          <router-link to="/contract/topo">
            <el-button size="mini" @click="creathand" type="primary">需求关系图</el-button>
          </router-link>
          <el-button size="mini" class="reletionshipBtn1" @click="creathand" type="plain">目标拆解</el-button>
        </div>
      </div>
    </div> -->
    <!-- <div class="tip-contain">
      <div class="contain-left">
        <div class="contain-head">
          <el-tabs class="contain-lab" v-if="$route.query.tab == 0">
            <el-tab-pane label="目标定义" name="first"></el-tab-pane>
          </el-tabs>
          <el-tabs class="contain-lab" v-else>
            <el-tab-pane label="目标定义" name="first"></el-tab-pane>
          </el-tabs>
          <div class="contain-leftTime">2019-02-02</div>
        </div>
        <el-table :data="targetDetail" class="gridtableft">
          <el-table-column prop="targetId" label="序号" width="100" ></el-table-column>
          <el-table-column prop="targetName" label="目标名称"></el-table-column>
          <el-table-column prop="targetUnit" label="单位"></el-table-column>
          <el-table-column prop="targetNum" label="目标值"></el-table-column>
        </el-table>
        <div class="reviewTxt">
          <div class="laborTxt">相关附件</div>
          <ul v-if="targetDetail[0].adjunctList">
            <li v-for="(item,idx) in targetDetail[0].adjunctList" :key="idx">
              <div class="carborad">{{ item.fileName}}</div>
            </li>
          </ul>
          
        </div>
      </div>
      <div class="reviewFoot">
        <el-button @click="creathand" type="primary" round>发布</el-button>
        <el-button @click="creathand" type="plain" round>提交</el-button>
        <el-button @click="creathand" type="plain" round>保存</el-button>
        <el-button @click="creathand" type="plain" round>取消</el-button>
      </div>
    </div> -->
    <el-form inline label-width="120px">
      <el-form-item label="目标名称">
        <el-input placeholder="" v-model="param.name"></el-input>
      </el-form-item>
      <el-form-item label="边界系统">
        <el-input v-model="param.nodeName"></el-input>
      </el-form-item><br>
      <el-form-item label="边界系统">
        <el-select v-model="param.projectPeriod" placeholder="请选择">
          <el-option v-for="item in projectDetail.projectTime" :key="item.id"
            :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间计划">
        <el-date-picker v-model="param.time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="reletionship">
          <router-link to="/contract/topo">
            <el-button type="primary">需求关系图</el-button>
          </router-link>
          <el-button type="plain">目标拆解</el-button>
        </div>
    <el-card style="width:600px;">
      <div slot="header" class="clearfix">
        <span v-if="$route.query.tab == 0">目标定义</span>
        <el-tabs class="contain-lab" v-model="activeTab" v-else>
          <el-tab-pane v-for="(tab,idx) in dataTab" :key="idx" 
          :disabled="tab.disabled" :label="tab.name" :name="tab.value"></el-tab-pane>
        </el-tabs>
        <span class="tab-tip">2019-08-03</span>
      </div>
      <el-table :data="tableData" class="gridtableft">
        <el-table-column prop="targetId" label="序号" width="100" ></el-table-column>
        <el-table-column prop="targetName" label="目标名称"></el-table-column>
        <el-table-column prop="targetUnit" label="单位"></el-table-column>
        <el-table-column label="目标值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.targetNum"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <h2>相关附件</h2>
      <ul v-if="targetDetail.adjunctList">
        <li v-for="(item,idx) in targetDetail.adjunctList" :key="idx">
          <div class="carborad">{{ item.fileName}}</div>
        </li>
      </ul>
      <div class="reviewFoot">
        <el-button @click="updateTarget(2)" type="primary" round>发布</el-button>
        <el-button @click="updateTarget(1)" type="plain" round>提交</el-button>
        <el-button @click="updateTarget(0)" type="plain" round>保存</el-button>
        <el-button @click="$router.push('/contract')" type="plain" round>取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<style lang="less">
.project-edit {
  .clearfix {
    clear: both;
    display: block;
    position: relative;
  }
  .tab-tip {
    position: absolute;
    right: 0;
    top:0;
  }
}
</style>

<style lang="less">
// .tipbox {
//     .headtip {
//         width: 100%;
//         .strip {
//             display: flex;
//             width: 600px;
//             .simble {
//                 margin-left: 20px;
//             }
//         }
//         .stripTwoBox {
//             display: flex;
//             margin-top: 20px;
//             width: 100%;
//             border-bottom: 1px solid #ddd;
//             padding-bottom: 15px;
            
//             .stripTwo {
//                 display: flex;
//                 width: 600px;
//                 .simble {
//                     margin-left: 20px;
//                 }
//                 .civilop{
//                   display: flex;
//                 }
//             }
//             .reletionship {
//                 flex: 1;
//                 .reletionshipBtn1 {
//                     float: right;
//                     margin-right:20px;
//                 }
//                  .reletionshipBtn2 {
//                     float: right;
//                 }
//             }
//         }
//     }
//     .tip-contain {
//         height: 480px;
//         margin-top: 20px;
//         display: flex;
//         .contain-left {
//             width: 510px;
//             height: 480px;
//             border: 1px solid #ccc;
//             box-shadow: inset #ddd;
//             margin-right: 20px;
//             border-radius: 4px;
//             font-size: 14px;
//             .contain-head {
//                 position: relative;
//                  width: 450px;
//                 margin: 10px auto;
//             }
//             .gridtableft{
//               width:450px;
//               margin:10px auto;
//             }
//             .contain-leftTime {
//                 position: absolute;
//                 top: 10px;
//                 right: 30px;
//                 border-radius: 4px;
//             }
//              .reviewFoot {
//                 width: 450px;
//                 margin: 20px auto;
//                 .btnBox{
//                   float: right;
//                 }
//             }
//         }
//         .reviewTxt {
//             width: 450px;
//             margin: 0 auto;
//             font-size: 12px;
//             .laborTxt {
//                 padding: 10px 0;
//                 border-bottom: 1px solid #ddd;
//             }
//             .carborad {
//                 padding: 10px 0;
//             }
//         }
//         .contain-right {
//             width: 510px;
//             height: 480px;
//             border: 1px solid #ccc;
//             box-shadow: inset #ddd;
//             border-radius: 4px;
//             .gridtabright{
//               width:450px;
//               margin:10px auto;
//             }
//             .contain-head {
//                 position: relative;
//                  width: 450px;
//                 margin: 10px auto;
//             }
//             .contain-rightTime {
//                 position: absolute;
//                 top: 10px;
//                 right: 0px;
//                 border-radius: 4px;
//             }
//             .reviewFoot {
//                 width: 450px;
//                 margin: 20px auto;
//                 .btnBox{
//                   float: right;
//                 }
//             }
//         }
//     }
// }
</style>
