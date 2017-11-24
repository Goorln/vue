<template xmlns="">
	<div id="tmpl">
		<div class="slider">
			<slider :imgs="imgs"></slider>	
		</div>
		<div id="buy">
			<h4>{{info.title}}</h4>
			<p class="line"></p>
			<ul>
				<li class="price">
					市场价：<s>￥{{info.market_price}}</s>　　销售价：<span>￥{{info.sell_price}}</span>
				</li>
				<li class="inputli">
					购买数量：<inputnumber class="inputnumber" v-on:abc="getcount"></inputnumber>
                </li>
				<li>
					<mt-button type="primary" size="small" >立即购买</mt-button>	
					<mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>
				</li>
			</ul>
		</div>
		<div id="params">
			<h6>商品参数</h6>
			<p class="line"></p>
			<ul>
				<li>商品货号：{{info.goods_no}}</li>
				<li>库存情况：{{info.stock_quantity}}</li>
				<li>上架时间：{{info.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</li>
			</ul>
		</div>
        <div id="other">
            <router-link v-bind="{to:'/goods/goodsdesc/'+id}">
                <mt-button class="imgdesc" type="primary" size="large" >图文详情</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodscomment/'+id}">
                <mt-button type="danger" size="large" >商品评论</mt-button>
            </router-link>

        </div>
	</div>
</template>
<script>
    import inputnumber from '../subcom/inputNumber.vue';
	import slider from '../subcom/slider.vue';
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	import {vm,COUNTSTR} from '../../kits/vm.js';
	export default{
		data(){
			return{
				id:0,
                inputNumberCount:1,
				imgs:[],
				info:{}
			}
		},
		created(){
			this.id = this.$route.params.id;
			this.getimgs();
			this.getinfo();
		},
		methods:{
			getimgs(){
                var url = common.apidomain+'/api/getthumimages/'+this.id;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.imgs = data.message;
				})
			},
            getinfo(){
                var url = common.apidomain+'/api/goods/getinfo/'+this.id;
                this.$http.get(url).then(function(res){
                    var data = res.body;
                    if(data.status != 0){
                        Toast(data.message);
                        return;
                    }
                    this.info = data.message[0];
                })
            },
            getcount(count){
                this.inputNumberCount = count;
//                console.log(count);
            },
            //加入购物车方法
            toshopcar(){
                //触发事件
                vm.$emit(COUNTSTR,this.inputNumberCount);
            }
		},
		components:{
			slider,
            inputnumber
		}
	}
</script>
<style scoped>
	.slider{
		/* width: 363px;
		height: 395px; */
		border: 1px solid rgba(0, 0, 0, .4);
		border-radius: 5px;
		margin: 5px;
	}
	#buy,#params {
		margin: 5px;
		padding: 5px;
		border: 1px solid rgba(0, 0, 0, .4);
		border-radius: 5px;
	}
	.line {
		height: 1px;
		border: 1px solid rgba(0, 0, 0, .2);
	}
	#buy ul,#params ul {
		padding-left: 0;
	}
	#buy h4 {
		color: #0094ff;
		padding: 5px;
	}
	#buy li,#params li {
		list-style: none;
		padding: 8px;
	}
    #buy .price span{
        color:red;
    }
    #other {
        padding: 10px;
    }
    #other .imgdesc{
        margin-bottom: 20px;
    }
    .inputli {
        position: relative;
    }
    .inputnumber {
        position: absolute;
        left: 100px;
        top: 8px;
    }
</style>