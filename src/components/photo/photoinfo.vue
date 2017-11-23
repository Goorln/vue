<template>
	<div id="tmpl">
		<!-- 1、图片详情和缩略图 -->
		<div id="desc">
			<div class="title">
				<h4>{{photoinfo.title}}</h4>
				<p>{{photoinfo.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}　{{photoinfo.click}}次浏览</p>
				<p class="line"></p>
			</div>
			<div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li v-for="(item, index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)">
		            </li>
		        </ul>
		</div>
		<!-- 摘要部分 -->
		<p v-html="photoinfo.content"></p>
	</div>
		<!-- 1、评论组件 -->
		<div id="comment">
			<comment :id='id'></comment>
		</div>
	</div>
</template>
<script>
	// 导入评论组件
	import comment from '../subcom/comment.vue';
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	export default{
		components:{
			comment
		},
		data(){
			return{
				id:0,//图片的id
				photoinfo:{},
				list:[]//存储缩略图数据
			}
		},
		created(){
			this.id = this.$route.params.id;
			this.getimginfo();
			this.getthumimgs();//获取缩略图数据
		},
		methods:{
			getthumimgs(){
				var url = common.apidomain+"/api/getthumimages/"+this.id;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					//由于vue-preview要求返回的数据是{src,w,h}
					data.message.forEach(function(item){
						//为了当前所有图片不管有多大，设置为400，会导致图片失帧
						var img = document.createElement('img');
						img.src = item.src;
						item.h = img.height;
						item.w = img.width;
						/*item.h = 400;
						item.w = 200;*/
					});
					this.list = data.message;
				})
			},
			getimginfo(){
				var url = common.apidomain+"/api/getimageInfo/"+this.id;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.photoinfo = data.message[0];
				})
			}
		}
	}
</script>
<style scoped>
	/*图片详情样式*/
	#desc {
		padding: 10px;
	}
	#desc h4 {
		color: #0094ff;
	}
	#desc .title p {
		color: rgba(0, 0, 0, .4);
		margin-top: 10px;
	}
	#desc .title .line {
		width: 100%;
		height: 1px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.5);
	}
	.mui-content,.mui-content ul {
		background-color: #fff;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border-right:0px;
		border-bottom:0px; 
	}
	.mui-grid-view.mui-grid-9{
		border-top:0px;
		border-left:0px; 
	}
	.mui-content img{
		width: 100px;
	}
</style>