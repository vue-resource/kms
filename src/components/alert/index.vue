<script>
export default {
    name: "login",
    props: {},
    data() {
        return {
            checked: false,
            labelPosition: "right",
            dynamicValidateForm: {
                user: "",
                password: ""
            }
        };
    },
    computed: {},
    watch: {},
    // 生命周期
    created() {},
    methods: {
        submit(form) {
           
        }
    }
};
</script>

<template>
    <div class="alertWarp">
       <div class="head">
         创建目标
       </div> 
    </div>
</template>
<style lang="less">

</style>
