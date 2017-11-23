// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

import home from './components/Home.vue';
// import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';


// 3.0.2 定义路由规则
var router = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		//设置跳转，服务器启动自动跳到/home 中
		{path:'',redirect:'/home'},
		{path:'/home',component:home},
		// {path:'/shopcar',component:shopcar},
		{path:'/news/newslist',component:newslist},
		{path:'/news/newsinfo/:id',component:newsinfo},
		{path:'/photo/photolist',component:photolist},
		{path:'/photo/photoinfo/:id',component:photoinfo},
		{path:'/goods/goodslist',component:goodslist}
	]
	});

import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
Vue.use(mintui);

import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);

import '../statics/mui/css/mui.css';

import '../statics/css/site.css';

import vueResource from 'vue-resource';
Vue.use(vueResource);

//过滤器格式化日期
import moment from 'moment';
Vue.filter('datefmt',function(input,fmtstring){
	return moment(input).format(fmtstring);
});

//使用图片预览组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});