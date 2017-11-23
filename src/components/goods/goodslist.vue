<template>
	<div id="tmpl">
		<div class="mui-content" style="background-color:#fff">
		    <!-- <h5 style="background-color:#efeff4">慢生活</h5> -->
		    <ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6">
		            <a href="#">
		                <img class="mui-media-object" src="http://vue.studyit.io/upload/201504/20/thumb_201504200046589514.jpg">
		                <div class="mui-media-body">幸福就是可以一起睡觉</div>
		            </a>		
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

			}
		},
		created(){
			this.getlist();
		},
		methods:{
			getlist(){
				var url = var url = common.apidomain+"/api/getgoods?pageindex="+1;
			}
		}
	}
</script>
<style scoped>
	.mui-content li {

	}
</style>