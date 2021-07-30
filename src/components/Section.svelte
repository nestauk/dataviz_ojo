
<script>
	export let title = 'Heading goes here';
	export let paragraphs = [];
</script>

<div class='text_content'>
	<h2>{title}</h2>

	{#each paragraphs as text}
		<p>{text}</p>
	{/each}
</div>

<style>
	.text_content {
		font-size: 18px;
		line-height: 32.4px;
		margin: 0px auto;
		padding: 20px 28px;
		position: relative;
	}

	.text_content p {
		margin-bottom: 28px
	}

	h2 {
		font-family: 'AvertaBold', sans-serif;
		font-size: 23.111px;
		font-weight: 700;
		line-height: 32.3555px;
		margin-bottom: 28px;
	}
</style>
