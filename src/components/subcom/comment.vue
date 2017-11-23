<template>
	<div id="tmpl">
		<!-- 实现提交评论数据到服务器的静态结构 -->
		<div id="postcomment">
			<h3>提交评论</h3>
			<p class="p"></p>
			<textarea placeholder="请输入要评论的内容" v-model='postcontent'></textarea>
			<mt-button type="primary" size="large" @click='postcomment'>发表</mt-button>
			<!-- 获取评论数据列表 -->
			<h3>评论列表</h3>
			<p class="p"></p>
			<div v-for="(item,index) in list">
				<div class="title">
					<span>第{{index+1}}楼</span>
					<span>用户：{{item.user_name}}</span>
					<span>　　发表时间:{{item.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
				</div>
				<ul class="mui-table-view">
				 	<li class="mui-table-view-cell">{{item.content}}</li>
				</ul>
			</div>
			<!-- 加载更多 -->
			<mt-button type="danger" size="large" @click=getmore plain>加载更多</mt-button>
		</div>
	</div>
</template>
<script>
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	export default{
		props:['id'],//接收父组件传递过来的id值
		data(){
			return{
				postcontent:'',  //用来自动获取用户评论内容
				list:[],
				pageindex:1
			}
		},
		created(){
			this.getcomments(this.pageindex);
		},
		methods:{
			//评论数据提交
			postcomment(){
				//1.确定提交地址
				if(this.postcontent.length <= 0){
					Toast('你要评论的内容不能为空！');
					return;
				}
				//2.获取到用户天蝎的内容
				var url = common.apidomain+'/api/postcomment/'+this.id;
				this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
						Toast(res.body.message);

						//将最新的评论数据追加到评论列表的最顶部
					this.list = [{
						"user_name":"匿名用户",
						"add_time":new Date(),
						"content":this.postcontent
					}].concat(this.list);

					this.postcontent = '';
				})
			},
			//评论列表
			getcomments(pageindex){
				pageindex = pageindex || 1;
				var url = common.apidomain+'/api/getcomments/'+this.id+'?pageindex='+pageindex;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.list = this.list.concat(data.message);
				})
			},
			getmore(){
				this.pageindex++;
				this.getcomments(this.pageindex);
			}
		}
	}
</script>
<style scoped>
	/* 实现提交评论的样式 */
	#postcomment{
		padding: 5px;
	}
	.p {
		height: 1px;
		width: 100%;
		border-bottom: 1px solid rgba(0, 0, 0, .3);
	}
	.list {
		padding: 5px;
	}
	.title{
		padding: 5px;
		font-size: 12px;
		color: #6d6d72;
		background-color: rgba(0, 0, 0, .1);
	}
</style>