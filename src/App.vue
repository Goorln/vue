<!-- 以后项目的根组件 -->
<template>
	<div>
		<!-- 1.0 利用mint-ui中的header组件实现整个系统的头部 -->
		<mt-header fixed title="Vue商城系统"></mt-header>
		<div id="back" v-if="isshow">
				<a href="javascript:void(0)" @click="backto">返回</a>
		</div>
		<!-- 2.0 利用vue-router的 <router-view>进行占位 -->
		<router-view></router-view>

		<!-- 3.0 利用mui中的tabbar组件实现系统的底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email">
				</span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar/car">
				<span class="mui-icon mui-icon-contact">
					<span class="mui-badge" id="badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
    import {vm,COUNTSTR} from './kits/vm.js';
    vm.$on(COUNTSTR,function (count) {
        var badge = document.getElementById('badge');
        badge.innerText = parseInt(badge.innerText)+count;
    });
	export default{
		data(){
			return {
				isshow:false
			}
		},
		watch:{
			'$route':function(newroute,oldroute){
				if(newroute.path.toLowerCase() == '/home'){
					this.isshow = false;
				}else{
					this.isshow = true;
				}
			}
		},
		methods:{
			backto(){
			    //利用路由中的go方法返回上一个页面，这个是vue-router的方法
				this.$router.go(-1);
			}
		},
		created(){

		}
	}
</script>

<style scoped>
	#back {
		width: 60px;
		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 9999;
	}
	#back a{
        color:white;
        font-size: 16px;
        font-weight: bold;
	}
</style>