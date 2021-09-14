<script>
	import {scaleLinear} from 'd3-scale';
	import {
		color_nuts2_names_bground,
		color_nuts2_names,
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
	const small_width = 850
	// Colour domain excluding transversal skills
	var color_skills_domain = color_skills.domain()

	const no_broad_skills = color_skills_domain.length
	const start_text = 17;

	/* reactive vars */
	$: width = $_width + $_margin.left + $_margin.right;
	$: height = legendsHeight + $_margin.top + $_margin.bottom;
	$: isSmall = width < small_width;
	$: opacity = isSmall ? 1 : 0;


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

				<!-- Title -->
				<text
					class='location_legend_title'
					dy='0.3em'
					text-anchor='start'
					fill={color_nuts2_names}
					x={(isSmall) ? $_xScale(2) : $_xScale(30)}
					y={yScaleLeg(86)}
				>
					Regional skill mixes
				</text>


				<!-- Blocks and labels -->
				{#each color_skills_domain as d,i}

					<!-- Blocks -->
					<rect
						class='location_legend_rect'
						fill={color_skills(d)}
						x={(isSmall) ? $_xScale(2) : $_xScale(30)}
						y={yScaleLeg(80-((75/no_broad_skills)*i))}
						width={(isSmall) ? $_xScale(10) : $_xScale(50/(no_broad_skills))}
						height={yScaleLeg(100-(75/(no_broad_skills+0.5)))}
					/>

					<!-- Foreground labels -->
					<text
						class='location_legend_text'
						text-anchor={'start'}
						dy='0.3em'
						fill={color_nuts2_names}
						x={(isSmall) ? $_xScale(14) : $_xScale(38)}
						y={yScaleLeg(80-((75/no_broad_skills)*(i+0.5)))}
					>
						{d}
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

	.location_legend_title {
		font-size: 16px;
		font-weight: bold;
	}

	.location_legend_text {
		font-size: 12px;
	}

	.location_legend_rect {
		rx: 6px;
		ry: 6px;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

</style>
