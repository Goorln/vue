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
        data() {
            return {
                count:1
            }
        },
        created() {

        },
        methods: {
            substrict(){
                this.count--;
                if(this.count<1){
                    this.count=1;
                }
                this.sendmessage();
            },
            add(){
                this.count++;
                this.sendmessage();
            },
            sendmessage(){
                this.$emit('abc',this.count);
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