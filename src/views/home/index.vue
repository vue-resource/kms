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
            this.$refs[form].validate(valid => {
                console.log(valid);
            });
        }
    }
};
</script>

<template>
    <div>
        home11
    </div>
</template>
<style lang="less">

</style>
