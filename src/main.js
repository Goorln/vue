//导入vue核心包
import Vue from 'vue';

import App from './App.vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

import mintui from 'mint-ui';
Vue.use(mintui);

import login from './login.vue';
import reg from './register.vue';

var router1 = new vueRouter({
	routes:[
		{
			path:'/login',
			component:login
		},
		{
			path:'/register',
			component:reg
		}
	]
})

import 'mint-ui/lib/style.min.css';
import mintui from 'mint-ui';
Vue.use(mintui);

import '../statics/mui/css/mui.css';


new Vue({
	el:'#app',
	router:router1,
	// render:function(create){create(App)};
	render:c=>c(App)//es6的函数写法  goes to写法
})