<template>
	<div id="tmpl">
		<div id="cate">
			<ul v-bind='{style:"width:"+ulWidth+"px"}'>
				<li @click="getimgs(0)">全部</li>
				<li v-for="item in cates" @click="getimgs(item.id)">{{item.title}}</li>
			</ul>
		</div>
		<div id="imglist">
			<ul>
  				<li v-for="item in list">
  					<router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
	    				<img v-lazy="item.img_url">
	    				<div id="desc">
	    					<h5 v-text="item.title"></h5>
	    					<p v-text='item.zhaiyao'></p>
	    				</div>
    				</router-link>
  				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				ulWidth:320,
				cates:[],
				list:[]
			}
		},
		created(){
			this.getcates();
			//加载图片数据
			var all = 0;  //获取所有数据
			this.getimgs(all);
		},
		methods:{
			getimgs(cateid){
				cateid = cateid || 0;
				var url = common.apidomain+"/api/getimages/"+cateid;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.list = data.message;
				})
			},
			getcates(){
				var url = common.apidomain+"/api/getimgcategory";
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.cates = data.message;

					//实现ul当前分类数据所在的总宽度=分类个数*每个分类的宽度
					var w = 62;
					var count = data.message.length + 1;
					this.ulWidth = w * count;
				})
			}
		}
	}
</script>
<style scoped>
	#cate{
		width: 375px;
		max-width: 375px;
		overflow-x: auto;
	}
	#cate ul{
		margin: 0px;
		padding-left: 10px;
	}
	#cate li{
		cursor: pointer;
		list-style: none;
		display: inline-block;
		color:#0094ff;
		font-size: 14px;
		padding-left: 6px;
	}
	#imglist ul{
		padding-left: 0;
	}
	#imglist li {
		list-style: none;
		position: relative;		
	}
	#imglist img {
		width: 100%;
		height: 300px;
	}
	#desc {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		bottom: 2px;
		left: 0;
	}
	#desc h5 {
		color: #fff;
		font-weight: 700;
	}
	#desc p {
		color: #fff;
	}
	image[lazy=loading] {
		width: 40px;
		height: 300px;
		margin: auto;
	}
</style>