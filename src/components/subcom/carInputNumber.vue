<!--购买数量的子组件-->
<template>
    <div id="subtmpl">
        <div class="inleft div" @click="substrict">-</div>
        <div class="incenter div" v-text="count"></div>
        <div class="inright div" @click="add">+</div>
    </div>
</template>
<script>
    export default {
        props:['initCount','goodsid'],
        data() {
            return {
                count:1,
                resObj:{goodsid:0,type:'add'}
            }
        },
        created() {
            this.count = this.initCount;
        },
        methods: {
            substrict(){
                this.count--;
                if(this.count<1){
                    this.count=1;
                }
                this.sendmessage('substrict');
            },
            add(){
                this.count++;
                this.sendmessage('add');
            },
            sendmessage(type){
                this.resObj.goodsid = this.goodsid;
                this.resObj.type = type;
                this.$emit('cardataobj',this.resObj);
            }
        }
    }
</script>
<style scoped>
    #subtmpl .div {
        width: 36px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #000;
        text-align: center;
        display: inline-block;
    }
</style>