<script>
export default {
    name: "issue-detail",
    data() {
      return {
        issueId: this.$route.query.id,
        detail: {}
      }   
    },
    // 生命周期
    created() {
      this.getDetail();
    },
    methods: {
        //问题详情
        getDetail(){
          this.$ajax({
            url: '/issue/detail',
            // url: '/issue/detail.json',
            method: 'post',
            data: {
              issueId: this.issueId
            }
          }).then(res => {                         
            if(res.success){
              this.detail = res.data;
            }
          })
        }
    }
};
</script>
<template>
  <div class="issue-destail">
    <el-card>
      <h2 slot="header">问题详情</h2>
      <div class="addMain">
        <el-form label-width="100px" >
          <el-form-item label="问题描述:" >{{detail.issueName}}</el-form-item>
          <el-form-item label="问题影响:" >{{detail.issueScope}}</el-form-item>
          <el-form-item label="问题原因:" >{{detail.issueCause}}</el-form-item>
          <el-form-item label="纠正措施:" >{{detail.remedialAction}}</el-form-item>
          <el-form-item label="问题负责人:" >{{detail.leaderName}}</el-form-item>
          <el-form-item label="问题级别:" >{{detail.issueRank}}</el-form-item>
          <el-form-item label="完成时间:" >{{detail.finishTime}}</el-form-item>
          <el-form-item label="对应目标:" >{{detail.targetName}}</el-form-item>
          <el-form-item label="相关附件:" >
            <ul>
              <li v-for="(item,idx) in detail.adjunctList" :key="idx">{{ item.fileName }}</li>
            </ul>
          </el-form-item>
          <el-form-item label=" " >
            <el-button type="primary" @click="$router.back()">返回</el-button> 
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<style lang="less">
.issue-destail {
  padding: 20px;
}
</style>
