<script>
	import ChartTitle from './ChartTitle.svelte';
	import {
		_height_container_title,
		_width_container_title,
	} from '../stores';
</script>

<div
	bind:clientHeight={$_height_container_title}
	bind:clientWidth={$_width_container_title}
	class='container_title'
>
	<ChartTitle/>
</div>

<style>
	.container_title {
		background: #FFFFFF;
		color: #FFFFFF;
		font-family: 'AvertaLight', sans-serif;
		margin: 0px auto;
		max-width: 1380px;
		position: relative;
		width: 100%;
	}
</style>
