<div class='container_title'>
	<div class='container_title_text'>Title goes here</div>
	<div class='container_subtitle_text'>Subtitle goes here</div>
	<div class='container_date'>weekday, day month year</div>
	<div class='container_author'>
		<a href='https://www.nesta.org.uk/team/karlis-kanders/' target='_blank'>
			Author One
		</a> and
		<a href='http://www.nesta.org.uk/users/cath-sleeman'>
			Author Two
		</a>
	</div>
</div>

<style>
	.container_title {
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
		background: linear-gradient( rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) ), url();
		color: #FFFFFF;
		font-family: 'AvertaLight', sans-serif;
		margin: 0px auto;
		max-width: 1380px;
		position: relative;
		width: 100%;
	}

	.container_title_text {
		font-size: 46.2222px;
		line-height: 54.4667px;
		max-width: 800px;
		padding: 60px 28px 14px 28px;
	}

	.container_subtitle_text {
		font-size: 23.111px;
		line-height: 32.3555px;
		max-width: 800px;
		padding: 0px 28px 21px 28px;
	}

	.container_date {
		font-size: 18px;
		line-height: 32.4px;
		max-width: 800px;
		padding: 0px 28px 0px 28px;
	}

	.container_author {
		font-family: 'AvertaRegular', sans-serif;
		font-size: 14.2222px;
		line-height: 19.9111px;
		max-width: 800px;
		padding: 30px 28px 50px 28px;
	}

	.container_author a {
		color: #FFFFFF;
		text-decoration: none;
	}

	.container_author a:hover {
		color: #FF0041;
	}

	/* Larger than 800px */
	@media only screen and (min-width: 800px) {
		.container_title_text {
			font-size: 72.889px;
			line-height: 87.4668px;
		}
		.container_subtitle_text {
			font-size: 33.7778px;
			line-height: 47.2889px;
		}
	}

	/* Larger than 1100px */
	@media only screen and (min-width: 1100px) {
		.container_title_text {
			padding: 60px 35px 14px 35px;
		}
		.container_subtitle_text {
			padding: 0px 35px 21px 35px;
		}
		.container_date {
			padding: 0px 35px 0px 35px;
		}
		.container_author {
			padding: 30px 35px 70px 35px;
		}
	}
</style>
