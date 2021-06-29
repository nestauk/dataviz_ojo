<script>
	import ChartOccupations from './ChartOccupations.svelte'
	import ChartSalaries from './ChartSalaries.svelte'
	import ChartLocations from './ChartLocations.svelte'
	import LegendLocations from './LegendLocations.svelte'
	import LegendSalaries from './LegendSalaries.svelte'
	import Intro from './Intro.svelte'
	import Margin from './Margin.svelte'
	import Section from './Section.svelte';

	import {
		_height_container_parent,
		_width_container_parent,
		_width_margin,
		_height_container_text
	} from '../stores';
</script>

<div
	bind:clientHeight={$_height_container_parent}
	bind:clientWidth={$_width_container_parent}
	class='container_parent'
>

	<div
		class='container_left_col'
		bind:clientWidth={$_width_margin}
	>
		<Margin />
	</div>

	<div 
		bind:clientHeight={$_height_container_text}
		class='container_text'
	>
		<Intro
			paragraphs={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
			]}
		/>

		<!-- locations -->
		<Section
			title='Heading goes here'
			paragraphs={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			]}
			question='How do skill demands vary across the UK?'
		/>
		<LegendLocations />
		<ChartLocations />

		<!-- occupations -->
		<Section
			title='Heading goes here'
			paragraphs={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			]}
			question='Which skills are required in the most advertised occupations?'
		/>
		<ChartOccupations />

		<!-- salaries -->
		<Section
			title='Heading goes here'
			paragraphs={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			]}
			question='What salaries are associated with the most in-demand skills?'
		/>
		<LegendSalaries />
		<ChartSalaries />

		<!-- section -->
		<Section
			title='Heading goes here'
			paragraphs={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			]}
		/>

	</div>

</div>

<!-- TBD: use grid -->
<style>
	.container_parent {
		margin: 0px auto;
		max-width: 1380px;
		overflow: hidden;
		width: 95%;
	}

	.container_left_col {
		float:left;
		flex-basis: 0;
		margin: 0px auto;
		min-width: 0;
		max-width: 0;
		height: 100%;
	}

	.container_text {
		float:right;
		flex-basis: 100%;
		margin: 0px auto;
		max-width: 100%;
		min-width: 100%;
	}

	/* .container_text a {
		color: #e61f47;
	}

	.container_text a:hover {
		color: #231f20;
	} */

	/* Larger than 1250px */
	@media only screen and (min-width: 1250px) {
		.container_parent {
			max-width: 1380px;
			width: 83.5%;
		}
		.container_text {
			flex-basis: 85%;
			min-width: 85%;
			max-width: 85%;
		}
		.container_left_col {
			flex-basis: 15%;
			min-width: 15%;
			max-width: 15%;
		}
	}
</style>
