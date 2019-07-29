<template>
    <div class="wrap">
        <h2>topology</h2>
        <div class="topology-box">
            <tree :data="tree" node-text="name" layoutType="euclidean" type="cluster" zoomable></tree>
        </div>
        <hr>
        <h2>table</h2>
        <el-table :data="tableData" max-height="300" border>
            <el-table-column label="日期" prop="date" width="200" fixed></el-table-column>
            <el-table-column label="姓名" prop="name" width="200" fixed></el-table-column>
            <el-table-column v-for="(col, idx) in heads" :key="idx" align="center">
                <template slot="header">
                    <ul class="mul-thead">
                        <li>{{ col.name }}</li>
                        <li>{{ col.position }}</li>
                        <li>{{ col.person }}</li>
                    </ul>
                </template>
                <template slot-scope="scope">{{ renderTd(scope.row, col) }}</template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { tree } from 'vued3tree';
export default {
    name: 'test',
    components: { tree },
    data () {
        return {
            tree: {
                name: "father",
                children:[{
                    name: "son1",
                    children:[ {name: "grandson"}, {name: "grandson2"}]
                },{
                    name: "son2",
                    children:[ {name: "grandson3"}, {name: "grandson4"}]
                }]
            },
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    person: '王小虎',
                    from: '上海'
                }, {
                    date: '2016-05-02',
                    name: '葛二蛋',
                    province: '北京',
                    person: '葛二蛋',
                    from: '北京'
                },{
                    date: '2016-05-03',
                    name: '薛仁贵',
                    province: '南京',
                    person: '薛仁贵',
                    from: '南京'
                }, {
                    date: '2016-05-02',
                    name: '秦琼',
                    province: '郑州',
                    person: '秦琼',
                    from: '郑州'
                },{
                    date: '2016-05-02',
                    name: '关羽',
                    province: '荆州',
                    person: '关羽',
                    from: '荆州'
                },{
                    date: '2016-05-03',
                    name: '刘备',
                    province: '西蜀',
                    person: '刘备',
                    from: '西蜀'
                }, {
                    date: '2016-05-02',
                    name: '张飞',
                    province: '南蛮子',
                    person: '张飞',
                    from: '南蛮子'
                },{
                    date: '2016-05-02',
                    name: '秦始皇',
                    province: '西安',
                    person: '秦始皇',
                    from: '西安'
                },{
                    date: '2016-05-03',
                    name: '老子',
                    province: '周口',
                    person: '老子',
                    from: '周口'
                }, {
                    date: '2016-05-02',
                    name: '曹操',
                    province: '许昌',
                    person: '曹操',
                    from: '许昌'
                },
            ]
        };
    },
    computed: {
        heads () {
            return this.tableData.map(item => {
                return {
                    name: item.province,
                    person: item.person,
                    position: '负责人'
                }
            });
        }
    },
    methods: {
        renderTd (column, item) {
            return column.from === item.name ? '☑️' : ''
        }
    }
}
</script>
<style lang="less">
.wrap {
    padding: 20px;
    margin: 50px auto;
    width: 1000px;
    border: 1px solid #ddd;
    h2 {
        line-height: 40px;
    }
    .topology-box {
        height: 400px;
    }
    .mul-thead {
        li {
            border-bottom: 1px solid #EBEEF5;
            line-height: 30px;
            margin-left: -10px;
            margin-right: -10px;
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>


