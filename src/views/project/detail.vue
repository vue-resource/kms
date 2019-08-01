
<script>
export default {
  name: 'project-detail',
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
          <span>{{ source.createBy }}</span>
        </div>
        <div>
          <span>项目负责人：</span>
          <span>{{ source.projectResponsible }}</span>
        </div>
      </div>
      <div class="recent">项目周期</div>
      <el-table :data="source.projectTime">
        <el-table-column label="日期">
          <template slot-scope="scope">
            {{scope.row.dateStart}} - {{scope.row.dateEnd}}
          </template>
        </el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div class="tabfoot">项目成员</div>
      <div class="tabfootText">{{ source.members }}</div>
  </div>
</template>

<style lang="less">
.tabhead {
    display: flex;
    justify-content: space-around;
}
.recent {
    color: #000;
    font-size: 14px;
    padding-top:10px;
    padding-bottom: 10px;
}
.tabfoot {
    color: #000;
    font-size: 14px;
    padding-top:10px;
    padding-bottom: 10px;
}
.tabfootText {
    background: #ddd;
    height: 40px;
    border-radius: 4px;
    line-height: 40px;
    padding-left: 20px;
}
.el-message-box {
    width: 900px;
    height: 500px;
}
</style>


