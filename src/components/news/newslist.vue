<template>
	<div id="tmpl">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for='item in list'>
				<router-link v-bind="{to:'/news/newsinfo/'+item.id}">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						{{item.title}}
						<p class='mui-ellipsis' v-text="item.zhaiyao"></p>
						<div class="ft">
							<span>{{item.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
							<span class="click">点击数：{{item.click}}</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';

	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getnewslist();//页面加载时调用这个方法
		},
		methods:{
			getnewslist(){
				var url = common.apidomain+'/api/getnewslist';
				this.$http.get(url).then(function(response){
					var data = response.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.list = data.message;
				})
			}
		}
	}
</script>
<style scoped>
	.mui-table-view img {
		height: 80px;
		width: 80px;
	}
	.mui-table-view .mui-media-object {
		max-width: 80px;
		line-height: 80px;
	}
	.ft{
		margin-top: 1.5em;
		font-size: 14px;
		color: #0094ff;
	}
	.ft .click {
		margin-left: 20px;
	}
	.mui-table-view-cell > a:not(.mui-btn) {
		
	}
	.mui-table-view-cell p{

	}
</style>