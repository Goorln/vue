<template>
    <div id="tmpl">
        <h4 v-text="desc.title"></h4>
        <div class="line"></div>
        <p v-html="desc.content"></p>
    </div>
</template>
<script>
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                id:0,
                desc:{}
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getdesc();
        },
        methods: {
            getdesc(){
                var url = common.apidomain+'/api/goods/getdesc/'+this.id;
                this.$http.get(url).then(function(res){
                    var data = res.body;
                    if(data.status != 0){
                        Toast(data.message);
                        return;
                    }
                    this.desc = data.message[0];
                })
            }
        }
    }
</script>
<style scoped>
    #tmpl {
        padding: 5px;
    }
    #tmpl h4 {
        color: #0094ff;
    }
    #tmpl .line {
        height: 1px;
        border: 1px solid rgba(0, 0, 0, .2);
    }
</style>