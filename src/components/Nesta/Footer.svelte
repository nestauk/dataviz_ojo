<script>
	export let year = 2022;
</script>

<div class='app-footer'>
	<div class='app-footer__container'>
		<div class='app-footer__icons'>

			<div class='footer-links'>
				<div class='footer-links__container'>
					<div class='footer-link-item'>
						<a
							class='footer-link-item__link'
							href='https://www.nesta.org.uk/press/'
							target='_parent'
						>Press</a>
						<a
							class='footer-link-item__link'
							href='https://www.nesta.org.uk/jobs/'
							target='_parent'
						>Jobs</a>
						<a
							class='footer-link-item__link'
							href='https://www.nesta.org.uk/privacy/'
							target='_parent'
						>Privacy</a>
						<a
							class='footer-link-item__link'
							href='https://www.nesta.org.uk/cookies/'
							target='_parent'
						>Cookies</a>
						<a
							class='footer-link-item__link'
							href='https://www.nesta.org.uk/terms-use/'
							target='_parent'
						>Terms of use</a>
						<a
							class='footer-link-item__link'
							href='https://www.nesta.org.uk/contact-us/'
							target='_parent'
						>Contact us</a>
					</div>
				</div>
			</div>

		</div>

		<div class='footer-link-item'>
				© {year} Nesta Nesta is a registered charity in England and Wales 1144091 and Scotland SC042833. Our main address is 58 Victoria Embankment, London, EC4Y 0DS. You can reach us by phone on 020 7438 2500 or drop us a line at information@nesta.org.uk.
		</div>

		<div class='footer-link-item'>
				All our work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License, unless it says otherwise. We hope you find it useful.
		</div>

	</div>
</div>

<style>
	.app-footer {
		background-color: #fff;
		border-top: 3px solid rgba(160, 143, 125, 0.2);
		margin: 80px auto 0px auto;
		max-width: 1380px;
		text-align: left;
	}

	.app-footer__container {
		margin: 0 auto;
		padding: 26.25px 17.5px 26.25px 17.5px;
	}

	.app-footer__icons {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		flex-direction: row;
		overflow-x: hidden;
		padding: 0px 0px 17.5px 0px;
		position: relative;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
	}

	.footer-link-item {
		color: #6a5847;
		font-size: 15px;
		font-size: .83333rem;
		margin-right: 14px;
		text-align: left;
	}

	.footer-link-item__link {
		color: #231f20;
		padding-right: 15px;
		text-decoration: none;
	}

	.footer-link-item__link:hover {
		color: #e61f47
	}

	.footer-links {
		align-items: center;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
	}

	.footer-links__container {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		flex-direction: row;
		-ms-flex-direction: row;
		padding: 0px 0px 0px 17.5px;
		position: relative;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
	}
</style>
