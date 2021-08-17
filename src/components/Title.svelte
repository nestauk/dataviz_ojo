<script>
	import ChartTitle from './ChartTitle.svelte';
	import SocialMedia from './SocialMedia.svelte';
	import {
		_heightContainerTitle,
		_widthContainerTitle,
	} from '../stores';
</script>

<div
	bind:clientHeight={$_heightContainerTitle}
	bind:clientWidth={$_widthContainerTitle}
	class='container_title'
>
	<ChartTitle/>
	<SocialMedia/>
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
