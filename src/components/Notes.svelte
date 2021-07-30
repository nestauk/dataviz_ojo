<script>
	export let paragraphs = [];
</script>

<div class='text_content'>
	{#each paragraphs as text}
		<p class='notes'>{text}</p>
	{/each}
</div>

<style>
	.text_content {
		margin: 0px auto;
		padding: 20px 28px;
		position: relative;
	}

	.text_content p {
		color: #706467;
		line-height: 1.5;
		font-size: 14px;
	}
</style>
