<script>
	import {scaleLinear} from 'd3-scale';
	import {
		color_salary_names,
		color_skills,
		color_legend_bground
	} from '../shared/colours';
	import {
		_margin,
		_width,
		_xScale,
	} from '../stores';

	/* consts */

	const legendsHeight = 220
	const yScaleLeg =
		scaleLinear()
		.domain([0, 100])
		.range([legendsHeight, 0]);
	const small_width = 500
	const y_positions = [59,48,13,3]
	const legend_text = [
		'Upper quartile of MAX salaries',
		'Median of MAX salaries',
		'Median of MIN salaries',
		'Lower quartile of MIN salaries'
	]
	const color_skills_range = color_skills.range()
	const no_broad_skills = color_skills_range.length
	const titleLines = [
		'Salary ranges in adverts',
		'that mention the skill group',
		'(MIN offer - MAX offer)'
	]

	/* reactive vars */

	$: width = $_width + $_margin.left + $_margin.right;
	$: height = legendsHeight + $_margin.top + $_margin.bottom;
	$: isSmall = width < small_width;
	$: x_text_start = isSmall ? 10 : 35
	$: thinStroke = $_xScale(0.1);
</script>

<div class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin.left},{$_margin.top})'>

				<!-- Background colour -->
				<rect
					x={$_xScale(0)}
					y={yScaleLeg(100)}
					width={$_xScale(100)}
					height={yScaleLeg(0)}
					fill={color_legend_bground}
					rx='4px'
					ry='4px'
				/>

				<!-- Title of chart -->
				{#each titleLines as d, i}

					<text
						class='salary_legend_title'
						fill={color_salary_names}
						x={$_xScale(x_text_start-6)}
						y={yScaleLeg(y_positions[0]+27)}
						dy={(i==2) ? i*1.7+'em' : i*1.3+'em'}
						font-size={(i==2) ? '14px' : '16px'}
						font-weight={(i==2) ? 'normal' : 'bold'}
						text-transform={(i==2) ? 'uppercase' : 'none'};
					>
						{d}
					</text>

				{/each}

				<rect
					class='salary_legend_long_rect'
					fill={color_skills_range[3]}
					stroke={color_skills_range[3]}
					x={$_xScale(x_text_start-6)}
					y={yScaleLeg(y_positions[0])}
					width={$_xScale(5)}
					height={yScaleLeg(100-(y_positions[0]-y_positions[3]))}
					stroke-width={thinStroke}
					opacity=0.4
				/>

				<rect
					class='salary_legend_short_rect'
					fill={color_skills_range[3]}
					stroke={color_skills_range[3]}
					x={$_xScale(x_text_start-6)}
					y={yScaleLeg(y_positions[1])}
					width={$_xScale(5)}
					height={yScaleLeg(100-(y_positions[1]-y_positions[2]))}
					stroke-width={thinStroke}
				/>

				{#each y_positions as d,i}

					<path
						class='salary_legend_lines'
						stroke={color_salary_names}
						stroke-width={thinStroke}
						d='M {$_xScale(x_text_start-1)},{yScaleLeg(d)} L
						{$_xScale(x_text_start+2.5)},{yScaleLeg(d)}'
					/>

					<text
						class='salary_legend_text'
						fill={color_salary_names}
						x={$_xScale(x_text_start+3)}
						y={yScaleLeg(d)}
						dy={(i==0) ? '0.6em' : (i==3) ? '0em' : '0.3em'}
					>
						{legend_text[i]}
					</text>

				{/each}

			</g>
		</svg>
	{/if}
</div>

<style>
	.div_background {
		line-height: 0px;
	}

	.salary_legend_long_rect, .salary_legend_short_rect {
		rx: 3px;
		ry: 3px;
	}

	.salary_legend_lines {
		stroke-dasharray: 5;
	}

	.salary_legend_text {
		font-size: 11px;
		text-anchor: start;
		font-style: italic;
	}

</style>
