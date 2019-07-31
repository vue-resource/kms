<script>
export default {
    name: "project",
    props: {},
    data() {
        return {
            data: [
                {
                    label: "车型项目",
                    children: [
                       {
                            label: "市场定义产品",
                            children: []
                        },
                        {
                            label: "整车TVS",
                            children: [
                                {
                                    label: "安全性"
                                },
                                {
                                    label: "NVH"
                                },
                                {
                                    label: "重量"
                                },
                                {
                                    label: "操稳"
                                },
                                {
                                    label: "CFD"
                                }
                            ]
                        },
                        {
                            label: "动力",
                            children: []
                        },
                        {
                            label: "底盘",
                            children: []
                        },
                        {
                            label: "自车身",
                            children: []
                        },
                        {
                            label: "开闭件",
                            children: [
                                {
                                    label: "前舱盖"
                                },
                                {
                                    label: "前车门",
                                    children:[
                                      {label: "前车门骨架"}, 
                                      {label: "前车门护板"}, 
                                      {label: "前车门锁"},   
                                    ]
                                },
                                {
                                    label: "后车门"
                                },
                                {
                                    label: "后尾门"
                                },
                                {
                                    label: "后行李箱"
                                }
                            ]
                        },
                         {
                            label: "车身附件",
                            children: [
                                {
                                    label: "前挡风玻璃"
                                },
                                
                            ]
                        },
                        {
                            label: "内饰",
                            children: [
                                {
                                    label: "仪表盘系统"
                                },
                                
                            ]
                        },
                        {
                            label: "外饰",
                            children: []
                        },
                        {
                            label: "电器",
                            children: []
                        },
                        {
                            label: "三电",
                            children: [{label: "电池"}]
                        },
                        {
                            label: "造型",
                            children: []
                        },
                        {
                            label: "采购",
                            children: []
                        },
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {},
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleNodeClick(data) {
            console.log(data);
        }
    }
};
</script>
<template>
  <div>
    <el-tree
      :data="data" default-expand-all
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>   
  </div>

</template>

