<script>
	export let paragraphs = [];
</script>

{#each paragraphs as text}
	<p>{text}</p>
{/each}

<style>
	p {
		color: rgb(106,88,71);
		font-family: 'AvertaRegular', sans-serif;
		font-size: 18.667px;
		font-weight: 500;
		line-height: 33.6001px;
		margin: 45px auto 30px auto;
		padding: 0px 28px;
	}

	/* Larger than 800px */
	@media only screen and (min-width: 800px) {
		p {
			font-size: 23.1111px;
			line-height: 41.5999px;
		}
	}
</style>
