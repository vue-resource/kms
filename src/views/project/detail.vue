
<script>
export default {
  name: 'project-detail',
  computed: {
    members () {
      return this.source.projectResponsibleList.map(item => item.username)
        .join('、');
    }
  },
  props: {
    source: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<template>

  <div class="project-detail">
   
    <div class="tabhead">
        <div>
          <span>项目简介：</span>
          <span>{{ source.projectRecommend }}</span>
        </div>
        <div>
          <span>创建日期：</span>
          <span>{{ source.createTime }}</span>
        </div>
        <div>
          <span>创建人：</span>
          <span>{{ source.createName }}</span>
        </div>
        <div>
          <span>项目负责人：</span>
          <span>{{ source.projectResponsible }}</span>
        </div>
      </div>
      <div class="recent">项目周期</div>
      <el-table :data="source.projectPeriodList" class="tabList">
        <el-table-column property="id" label="序号"></el-table-column>
        <el-table-column property="periodName" label="项目名称" width="100"></el-table-column>
        <el-table-column property="createTime" label="开始时间"></el-table-column>
         <el-table-column property="endDate" label="结束时间"></el-table-column>
      </el-table>
      <div class="tabfoot">项目成员</div>
      <div>
        <el-input v-model="members" disabled class="projectDes"></el-input>
      </div>
  </div>
</template>

<style lang="less">
.tabhead {
    display: flex;
    justify-content:space-between;
}
.recent {
    color: #000;
    font-size: 14px;
    padding-top:10px;
    padding-bottom: 10px;
}
.tabList{
  background: #e3e3e3;
}
.tabfoot {
    color: #000;
    font-size: 14px;
    padding-top:10px;
    padding-bottom: 10px;
}
.tabfootText {
    background: #f6f6f6;
    height: 40px;
    border-radius: 4px;
    line-height: 40px;
    padding-left: 20px;
    .flot{
      float: left;
    }
}
.el-message-box {
    // width: 900px;
    // height: 500px;
}
</style>


