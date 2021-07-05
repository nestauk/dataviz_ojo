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

</style>
