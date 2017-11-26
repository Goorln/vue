<template>
    <div id="tmpl">
        <div v-for="(item,index) in datalist" class="row">
            <mt-switch v-model="value[index]" class="switch"></mt-switch>
            <img class="img" :src="item.thumb_path" alt="商品图片">
            <div class="inforight">
                <h4 v-text="item.title"></h4>
                <div class="bottom">
                    <ul>
                        <li>￥{{item.sell_price}}</li>
                        <li><carinputnumber :initCount="item.cou" :goodsid="item.id" v-on:cardataobj="getInputNumber" class="inputnumber"></carinputnumber></li>
                        <li><a href="javascript:void(0)" @click="delrow(index,item.id)">删除</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!--{{value}}-->
        <div id="total">
            <div class="desc">
                <ul>
                    <li>总计（不含运费）</li>
                    <li>已勾选商品{{totalcount}}件数，总价￥{{totalAmount}}元</li>
                </ul>
            </div>
            <div id="button">
                <mt-button type="danger" size="small">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
//    import {vm,COUNTSTR} from '../../kits/vm.js';
    import carinputnumber from '../subcom/carInputNumber.vue';
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';
    import {getgoodsObject,updateData,removeItem} from '../../kits/localSg.js';
    export default{
        data(){
            return{
                value: [],
                datalist:[],
                props:['initCount','goodsid'],
                totalAmount:0
            }
        },
        created(){
            this.getlist();
            //初始化values数组

        },
        methods:{
            //从localStorage中获取商品的id值
            //将id值按照api的阐述格式提交给api
            //ajax请求URL取到完整的数据信息
            getlist(){
                var obj = getgoodsObject();
                var idstring = '';
                for(var key in obj){
                    idstring += key+',';
                }
                idstring = idstring.substring(0,idstring.length-1);

                var url = common.apidomain+'/api/goods/getshopcarlist/'+idstring;
                this.$http.get(url).then(function(res){
                    if(res.body.status != 0){
                        Toast(res.body.message);
                        return;
                    }
                    //将localStorage中所有的商品随影的值赋值给message中的cou
                    res.body.message.forEach((item)=>{
                        item.cou = obj[item.id];
                        this.value.push(false);
                    });
                    this.datalist = res.body.message;
                });
            },
            getcount(count){
                this.inputNumberCount = count;
            },
            getInputNumber(resObj){
//                console.log(resObj);
                updateData(resObj);
                for(var i=0;i<this.datalist.length;i++){
                    if(this.datalist[i].id == resObj.goodsid){
                        if(resObj.type == 'add'){
                            this.datalist[i].cou = this.datalist[i].cou + 1;
                        }else{
                            this.datalist[i].cou = this.datalist[i].cou - 1;
                        }
                        break;
                    }
                }
            },
            delrow(index,goodsid){
                //删除datalist，value数组，localStorage中的数据
                this.value.splice(index,1);
                this.datalist.splice(index,1);
                removeItem(goodsid);
            }
        },
        components:{
            carinputnumber
        },
        //定义计算总件数的属性
        computed:{
            totalcount(){
                var count = 0;
                var amount = 0;
                for(var i=0;i<this.value.length;i++){
                    if(this.value[i] == true){
                        count=count+1;
                        amount =amount+this.datalist[i].sell_price * this.datalist[i].cou
                    }
                }
                this.totalAmount=amount;
                return count;
            }
        }
    }
</script>
<style scoped>
    .row {
        height: 102px;
        border-bottom: 1px solid rgba(0,0,0,.2);
        display: flex;
        padding-top: 5px;
    }
    .switch{
        flex: 0 0 52px;
    }
    .img {
        height: 75px;
        width: 75px;
        flex: 0 0 75px;
    }
    .inforight {
        flex: 1;
        margin-left: 5px;
    }
    .inforight ul {
        padding-left: 0;
    }
    .inforight li {
        list-style: none;
        display: inline-block;
    }
    .inforight h4 {
        color: #0094ff;
        font-size: 14px;
    }
    .bottom li:first-child {
        color: red;
        margin-right: 10px;
    }
    .bottom li:last-child {
        margin-left: 10px;
    }
    #total{
        height: 100px;
        background-color: rgba(0,0,0,.1);
        display: flex;
        padding: 5px;
    }
    #total ul {
        padding-left: 0;
    }
    #total li {
        list-style: none;
        font-size: 14px;
    }
    .desc {
        flex: 1;
    }
    #button {
        flex:  0 0 80px;
        margin: 30px 0 0;
    }
</style>