<template>
	<div>
		<span v-text="msg" class="red"></span>
		<button @click="abc(1,2)">点击</button>
	</div>
</template>
<script>
	// import {add,jian} from './cale.js';
	import cale from './cale.js';
	//负责导出，vue这个组件对象
	export default{
		data(){
			return{
				msg:'hello vuejs'
			}
		},
		methods:{
			abc:cale.add
		}
	}
</script>
<!-- 页面css的样式 -->
<style scoped>
	.red{
		color: red;
	}
</style>