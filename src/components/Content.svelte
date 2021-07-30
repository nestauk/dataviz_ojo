<script>
	import ChartOccupations from './ChartOccupations.svelte'
	import ChartSalaries from './ChartSalaries.svelte'
	import ChartLocations from './ChartLocations.svelte'
	import LegendLocations from './LegendLocations.svelte'
	import LegendSalaries from './LegendSalaries.svelte'
	import LegendOccupations from './LegendOccupations.svelte'
	import Intro from './Intro.svelte'
	import Margin from './Margin.svelte'
	import Section from './Section.svelte'
	import Notes from './Notes.svelte';

	import {
		_height_container_parent,
		_width_container_parent,
		_width_margin,
		_height_container_text
	} from '../stores';

	const introParagraphs = [
		`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
		ea commodo consequat.`
	];
	const locationParagraphs = [
		`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
		ea commodo consequat.`
	];
	const notesParagraphs = [
		`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
		ea commodo consequat.`
	];
	const occupationsParagraphs = [
		`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
		ea commodo consequat.`
	];
	const occupationsNotesParagraphs = [
		`This is a short note that goes beneath each chart, giving more detail.
		Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
		ea commodo consequat.`
	];
	const salariesParagraphs = [
		`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
		ea commodo consequat.`
	];
	const salariesNotesParagraphs = [
		`This is a short note that goes beneath each chart, giving more detail.
		Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
		ea commodo consequat.`
	];
	const finalSectionParagraphs = [
		`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
		ea commodo consequat.`
	];
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
		<Intro paragraphs={introParagraphs} />

		<!-- locations -->
		<Section
			title='Heading goes here'
			paragraphs={locationParagraphs}
		/>
		<h2>How do skill demands vary across the UK?</h2>
		<LegendLocations />
		<ChartLocations />
		<Notes paragraphs={notesParagraphs}/>

		<!-- occupations -->
		<Section
			title='Heading goes here'
			paragraphs={occupationsParagraphs}
		/>
		<h2>Which skills are required in the most advertised occupations?</h2>
		<LegendOccupations />
		<ChartOccupations />
		<Notes paragraphs={occupationsNotesParagraphs}/>

		<!-- salaries -->
		<Section
			title='Heading goes here'
			paragraphs={salariesParagraphs}
		/>
		<h2>What salaries are associated with the most in-demand skills?</h2>
		<LegendSalaries />
		<ChartSalaries />
		<Notes paragraphs={salariesNotesParagraphs} />

		<!-- section -->
		<Section
			title='Heading goes here'
			paragraphs={finalSectionParagraphs}
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

	h2 {
		font-family: 'AvertaBold', sans-serif;
		font-size: 23.111px;
		font-weight: 700;
		line-height: 32.3555px;
		text-align: center;
		padding: 0px 28px;
	}

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
