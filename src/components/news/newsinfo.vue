<template>
	<div id="tmpl">
		<div class="title">
			<h3>{{info.title}}</h3>
			<p>{{info.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}  　　{{info.click}}次浏览</p>
		</div>
		<div id="content" v-html="info.content"></div>
		<!-- 评论 -->
		<comment :id='id'></comment><!-- 给comment绑定一个ID属性值是data里面的数据 -->
	</div>
</template>
<script>
	import common from '../../kits/common.js';
	import comment from '../subcom/comment.vue';//子组件
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				id:0,
				info:{}
			}
		},
		created(){
			this.id = this.$route.params.id;
			this.getnewsinfo(this.id);
		},
		methods:{
			getnewsinfo(id){
				var url = common.apidomain+"/api/getnew/"+id;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.info = data.message[0];
				})
			}
		},
		components:{
			comment//把评论的子组件拿过来用，注册评论组件
		}
	}
</script>
<style scoped>
	.title h3 {
		color: #0094ff;
		font-size: 18px;
	}
	.title p{
		color: rgba(0, 0, 0, .5);
		font-size: 14px;
	}
	.title,#content{
		padding: 5px;
	}
</style>