<template xmlns="">
	<div id="tmpl">
		<slider :imgs="list"></slider>	
		<div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="news/newslist">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">新闻资讯</div>
                        </router-link></li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="photo/photolist">
                            <span class="mui-icon mui-icon-email"></span>
                            <div class="mui-media-body">图片分享</div>
                        </router-link></li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="goods/goodslist">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/feedback">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/vide">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		             <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                         <router-link to="/vide">
		                    <span class="mui-icon mui-icon-info"></span>
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		        </ul>
		</div>

	</div>
</template>

<script>
	import common from '../kits/common.js';
	import { Toast } from 'mint-ui';
	import slider from './subcom/slider.vue';
	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getimgs();
		},
		methods:{
			getimgs(){
				var url = common.apidomain+"/api/getlunbo";
				this.$http.get(url).then(function(response){
					if(response.body.status != 0){
						Toast(response.body.message);
						return;
					}
					this.list=response.body.message;
				})
			}
		},
		components:{
			slider
		}
	}
</script>

<style scoped>
    .mui-content,.mui-content ul{
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
	.mui-content .mui-icon-home:before,
	.mui-content .mui-icon-email:before,
	.mui-content .mui-icon-chatbubble:before,
	.mui-content .mui-icon-location:before,
	.mui-content .mui-icon-search:before,
	.mui-content .mui-icon-info:before{
		content: "";
		display: inline-block;
		width: 50px;
		height: 50px;
		background-repeat: round;
	}
	.mui-icon-home:before{
		background: url('../../statics/imgs/1.png');
	}
	.mui-icon-email:before{
		background: url(../../statics/imgs/2.png);
	}
	.mui-icon-chatbubble:before{
		background: url(../../statics/imgs/3.png);
	}
	.mui-icon-location:before{
		background: url(../../statics/imgs/4.png);
	}
	.mui-icon-search:before{
		background: url(../../statics/imgs/5.png);
	}
	.mui-icon-info:before{
		background: url(../../statics/imgs/6.png);
	}
</style>