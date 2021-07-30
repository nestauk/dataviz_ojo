<script>
	import data from '../../data/data.json';
	import {
		color_skills,
		color_salary_rings,
		color_salary_axis_bground,
		color_salary_axis,
		color_salary_names_bground,
		color_salary_names,
	} from '../shared/colours';
	import {
		_margin,
		_width,
		_xScaleS,
	} from '../stores';
	import {scaleLinear} from 'd3-scale';
	import {writable} from 'svelte/store';

	// Number of salaries (add 5 to leave space for salary_rings_text
	let no_salaries = data.salaries.length+5

	// Rotate the chart to ensure the min and max salaries straddle the top of the chart
	let rotate_adj = 0.225*no_salaries

	// Salaries for rings
	let salary_rings = [10,20,30,40,50];

	// Calculate domain for salary scale (yScale_s)
	// -5 and +3 to give extra space
	let lowest_salary = Math.min.apply(Math, data.salaries.map(function(d,i) { return d.salaries.lower_bound.lower_q }))
	let lowest_salary_shown = Math.min(salary_rings[0],lowest_salary)-5
	let highest_salary = Math.max.apply(Math, data.salaries.map(function(d,i) { return d.salaries.upper_bound.upper_q }))
	let highest_salary_shown = Math.max(highest_salary,salary_rings[salary_rings.length-1])+3

	// For really small screens
	// (stop showing mouseovers)
	const very_small_width = 450

	// Stroke widths
	const thinStroke = '1px';
	const thickStroke = '5px';

	/* reactive vars */
	$: width = $_width + $_margin.left + $_margin.right;
	$: height = $_width + $_margin.top + $_margin.bottom;
	$: isVerySmall = width < very_small_width;
	$: yScale_s = scaleLinear()
	.domain([lowest_salary_shown,highest_salary_shown])
	.range([0, 0.5*(width - $_margin.left - $_margin.right)])


	/* mouseovers */

	// Format text for mouseovers
	$: format_text = (text,d) => {
		return text+': £'+Math.round(d)+'k pa'
	}

	const _tooltip = writable({isVisible: false});
	const onMouseout = () => {
	 	_tooltip.set({isVisible: false})
	}
	const showTooltip = (d, event) => {

		const data_1_input = d.salaries.lower_bound.median
		const data_2_input = d.salaries.upper_bound.median

		const left = $_xScaleS(50)+yScale_s(d.salaries.lower_bound.median)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))
		const top = event.pageY-400

		const text_color = (d.broad_skill_group==color_skills.domain()[2] || d.broad_skill_group==color_skills.domain()[4] || d.broad_skill_group==color_skills.domain()[3]) ? '#000000' : '#FFFFFF'

		_tooltip.set({
			isVisible: true,

			left_margin: left+'px',
			top_margin: top+'px',

			background_color: color_skills(d.broad_skill_group),
			text_color: text_color,

			data_1: format_text('Median of MIN salaries', data_1_input),
			data_2: format_text('Median of MAX salaries', data_2_input),

			name: d.skill_name
		})
	}


</script>

<div class="tooltip"
	class:hidden={!$_tooltip.isVisible}
	style="
		left:{$_tooltip.left_margin};
		top: {$_tooltip.top_margin};
		background-color: {$_tooltip.background_color};
		color: {$_tooltip.text_color};
	"
>
	<p><span class="line1_text">{$_tooltip.name}</span></p>
	<p><span class="line2_text">Annualised salary ranges (MIN - MAX):</span></p>
	<p><span class="line3_text">{$_tooltip.data_1}</span></p>
	<p><span class="line4_text">{$_tooltip.data_2}</span></p>
</div>

<div class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin.left},{$_margin.top})'>

				{#each salary_rings as d}
					<!-- Rings to indicate salaries -->
					<circle
						class='salary_rings'
						fill='transparent'
						stroke={color_salary_rings}
						stroke-dasharray='5,5'
						cx={$_xScaleS(50)}
						cy={$_xScaleS(50)}
						r={yScale_s(d)}
						stroke-width={thinStroke}
					/>
				{/each}

				<!-- Need a separate loop from above to prevent rings overlapping text -->
				{#each salary_rings as d,i}
					<!-- Salary associated with each ring - background -->
					<text
						class='salary_rings_text_bground'
						fill={color_salary_axis_bground}
						stroke-width={thickStroke}
						stroke={color_salary_axis_bground}
						x={($_xScaleS(50)+yScale_s(d)*Math.cos((1.5*Math.PI)))}
						y={($_xScaleS(50)+yScale_s(d)*Math.sin((1.5*Math.PI)))}
					>
						{(i==salary_rings.length-1 || i==0) ? '£'+d+'k per annum'.toUpperCase() : '£'+d+'k'.toUpperCase()}
					</text>

					<!-- Salary associated with each ring -->
					<text
						class='salary_rings_text'
						fill={color_salary_axis}
						x={($_xScaleS(50)+yScale_s(d)*Math.cos((1.5*Math.PI)))}
						y={($_xScaleS(50)+yScale_s(d)*Math.sin((1.5*Math.PI)))}
					>
						{(i==salary_rings.length-1 || i==0) ? '£'+d+'k per annum'.toUpperCase() : '£'+d+'k'.toUpperCase()}
					</text>

				{/each}


				<!-- Main rectangles -->
				{#each data.salaries as d,i}
					<rect
						class='lower_bounds'
						fill={color_skills(d.broad_skill_group)}
						rx='2px'
						ry='2px'
						width={yScale_s(lowest_salary_shown+d.salaries.lower_bound.median-d.salaries.lower_bound.lower_q)}
						height={$_xScaleS(1.5)}
						transform = translate({$_xScaleS(50)+yScale_s(d.salaries.lower_bound.lower_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScaleS(50)+yScale_s(d.salaries.lower_bound.lower_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))})
						on:mouseover ={(!isVerySmall) ? isevent => showTooltip(d, event) : ''}
						on:mouseout = {onMouseout}
					/>

					<rect
						class='medians'
						fill={color_skills(d.broad_skill_group)}
						rx='2px'
						ry='2px'
						width={yScale_s(lowest_salary_shown+d.salaries.upper_bound.median-d.salaries.lower_bound.median)}
						height={$_xScaleS(1.5)}
						transform = translate({$_xScaleS(50)+yScale_s(d.salaries.lower_bound.median)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScaleS(50)+yScale_s(d.salaries.lower_bound.median)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))})
						on:mouseover ={(!isVerySmall) ? isevent => showTooltip(d, event) : ''}
						on:mouseout = {onMouseout}
					/>

 					<rect
						class='upper_bounds'
						fill={color_skills(d.broad_skill_group)}
						rx='2px'
						ry='2px'
						width={yScale_s(lowest_salary_shown+d.salaries.upper_bound.upper_q-d.salaries.upper_bound.median)}
						height={$_xScaleS(1.5)}
						transform = translate({$_xScaleS(50)+yScale_s(d.salaries.upper_bound.median)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScaleS(50)+yScale_s(d.salaries.upper_bound.median)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))})
						on:mouseover ={(!isVerySmall) ? isevent => showTooltip(d, event) : ''}
						on:mouseout = {onMouseout}
					/>

				{/each}


				<!-- Names of skills -->
				{#each data.salaries as d,i}

					<!-- One half of the circle -->
					{#if (360*((d.index-rotate_adj)/no_salaries)>90)}

						<!-- Names of skills - background -->
						<text
							class='salary_skills_name_bground'
							fill={color_salary_names_bground}
							stroke={color_salary_names_bground}
							stroke-width={thickStroke}
							transform = translate({$_xScaleS(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScaleS(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries)-180)})
							dy='0.2em'
							text-anchor='start'
							opacity={(width<550) ? 0 : (i%5==0) ? 1 : 0}
	 					>
							{d.skill_name.toUpperCase()}
						</text>

						<!-- Names of skills -->
						<text
							class='salary_skills_name'
							fill={color_salary_names}
							transform = translate({$_xScaleS(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScaleS(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries)-180)})
							dy='0.2em'
							text-anchor='start'
							opacity={(width<550) ? 0 : (i%5==0) ? 1 : 0}
	 					>
							{d.skill_name.toUpperCase()}
						</text>

					<!-- Other half of the circle -->
					{:else}

						<!-- Names of skills - background -->
						<text
							class='salary_skills_name_bground'
							fill={color_salary_names_bground}
							stroke={color_salary_names_bground}
							stroke-width={thickStroke}
							transform = translate({$_xScaleS(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScaleS(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))})
							dy='1.5em'
							text-anchor='end'
							opacity={(width<550) ? 0 : (i%5==0) ? 1 : 0}
	 					>
							{d.skill_name.toUpperCase()}
						</text>

						<!-- Names of skills -->
						<text
							class='salary_skills_name'
							fill={color_salary_names}
							transform = translate({$_xScaleS(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScaleS(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))})
							dy='1.5em'
							text-anchor='end'
							opacity={(width<550) ? 0 : (i%5==0) ? 1 : 0}
	 					>
							{d.skill_name.toUpperCase()}
						</text>

					{/if}

				{/each}

			</g>
		</svg>
	{/if}
</div>

<style>
	.div_background {
		line-height: 0px;
	}

	.salary_rings_text,
	.salary_rings_text_bground {
		text-anchor: end;
		font-size: 11px;
		font-weight: bold;
		pointer-events: none;
	}

	.salary_skills_name,
	.salary_skills_name_bground {
		font-size: 10px;
		font-weight: bold;
		pointer-events: none;
	}

	.lower_bounds, .medians, .upper_bounds {
		mix-blend-mode: multiply;
	}

	.lower_bounds, .upper_bounds {
		opacity: 0.25;
	}

	.tooltip {
		position: absolute;
		padding: 5px;
		pointer-events: none;
		font-family: "AvertaRegular", Helvetica, sans-serif;
		border-radius: 3px;
		z-index: 6;
		border: 3px solid #FFF
	}

	.tooltip.hidden {
		display: none;
	}

	.tooltip p {
		margin: 0px;
		font-size: 12px;
		text-align: left;
		line-height: 1.8;
		padding-left: 5px;
		padding-right: 5px;
	}

	.line1_text {
		font-size: 14px;
		line-height: 2;
		font-weight: bold;
	}

	.line2_text {
		font-style: italic;
	}

</style>
