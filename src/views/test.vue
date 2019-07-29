<template>
    <div class="wrap">
        <h2>topology</h2>
        <div class="topology-box">
            <tree :data="tree" node-text="name" layoutType="euclidean" type="cluster" zoomable></tree>
        </div>
        <hr>
        <h2>table</h2>
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
            }
        };
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
}
</style>


