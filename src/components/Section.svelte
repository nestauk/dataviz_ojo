
<script>
	export let title = 'Heading goes here';
	export let paragraphs = [];
	export let question = null;
</script>

<div class='text_content'>
	<h2>{title}</h2>

	{#each paragraphs as text}
		<p>{text}</p>
	{/each}

	{#if question}
		<h3>{question}</h3>
	{/if}
</div>

<style>
	.text_content {
		font-size: 18px;
		line-height: 32.4px;
		margin: 0px auto;
		padding: 20px 28px 20px 28px;
		position: relative;
	}

	.text_content p {
		margin-bottom: 28px
	}

	/* .text_content a:link {
		text-decoration: none;
	}

	.text_content a {
		color: #FF0041;
		cursor: pointer;
		transition: 0.3s;
	}

	.text_content a:hover {
		color: #231F20;
	} */

	h2 {
		font-family: 'AvertaBold', sans-serif;
		font-size: 23.111px;
		font-weight: 700;
		line-height: 32.3555px;
		margin-bottom: 28px;
	}

	h3 {
		font-family: 'AvertaBold', sans-serif;
		font-size: 18.6667px;
		font-weight: 700;
		line-height: 26.1334px;
		margin-bottom: 0px;
		text-align: center;
	}
</style>
