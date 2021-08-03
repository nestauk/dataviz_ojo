<script>
	import nestaLogo
		from '../../../assets/img/Nesta_Horizontal_Logo_RGB_nobubbles.png';
</script>

<div class='Header'>
	<div class='logo'>
		<a href='https://www.nesta.org.uk/'>
			<img
				alt='Nesta'
				src={nestaLogo}
			/>
		</a>
	</div>
</div>

<style>
	.Header {
		margin: 0px auto;
		max-width: 1380px;
		width: 100%;
		height: 50px;
	}

	.logo {
		padding-top: 10px;
	}

	.logo img {
		height: 25px;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}

	/* Larger than 800px */
	@media only screen and (min-width: 800px) {
		.Header {
			height: 70px;
			padding-left: 60px;
		}
		.logo {
			padding-top: 20px;
		}
		.logo img {
			float: left;
		}
	}
</style>
