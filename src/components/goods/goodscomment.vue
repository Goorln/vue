<template>
    <div id="tmpl">
        <comment :id="id"></comment>
    </div>
</template>
<script>
    import comment from '../subcom/comment.vue';
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';
    export default {
        components:{
            comment
        },
        data() {
            return {
                id:0
            }
        },
        created() {
            this.id = this.$route.params.id;
        },
        methods: {

        }
    }
</script>
<style scoped>

</style>