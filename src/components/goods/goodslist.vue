<template>
	<div id="tmpl">
		<div class="mui-content" style="background-color:#fff">
		    <!-- <h5 style="background-color:#efeff4">慢生活</h5> -->
		    <ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in list">
		        	<router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="mui-media-body">{{item.title}}</div>
		                <div class="desc">
		                	<p>
		                		<span>￥{{item.sell_price}}</span>
		                		<s>￥{{item.market_price}}</s>
		                	</p>
		                	<p>
		                		<h6 class="left">热卖中</h6>
		                		<h6 class="right">剩余{{item.stock_quantity}}件</h6>
		                	</p>
		                </div>
	            	</router-link>		            		
		        </li>
		    </ul>    
		</div>
		<!-- 加载更多 -->
		<mt-button type="danger" size="large" @click=getmore plain>加载更多</mt-button>
	</div>
</template>
<script>
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				id:0,
				pageindex:1,
				list:[]
			}
		},
		created(){
			// this.id = this.$route.params.id;
			this.getlist(this.pageindex);
		},
		methods:{
			getlist(pageindex){
				pageindex = pageindex || 1;
				var url = common.apidomain+"/api/getgoods?pageindex="+pageindex;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.list =this.list.concat(data.message);				
				})
			},
			getmore(){
				this.pageindex++;
				this.getlist(this.pageindex);
			}
		}
	}
</script>
<style scoped>
	.mui-content li {
		border: 1px solid rgba(0, 0, 0, .5);
		padding-right: 8px;
		margin-left: 4px;
		box-shadow: 0 0 4px #000;
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell {
		padding: 10px 8px 0 11px;
	}
	.mui-content .mui-table-view .mui-table-view-cell .mui-media-body{
		color: #0094ff;
	}
	.mui-content .desc {
		width: 165px;
		height: 60px;
		background-color: rgba(0, 0, 0, .1);
		margin: 10px 0;
		position: relative;
	}
	.desc span {
		color: red;
		margin: 0 40px 0 0;
	}
	.mui-content .desc .left {
		position: absolute;
		left: 10px;
		bottom: 0;
	}
	.mui-content .desc .right {
		position: absolute;
		right: 10px;
		bottom: 0;
	}
</style>