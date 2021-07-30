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
	const legendsHeight = 130
	const yScaleLeg =
		scaleLinear()
		.domain([0, 100])
		.range([legendsHeight, 0]);
	const small_width = 850
	const color_skills_domain = color_skills.domain()
	const no_broad_skills = color_skills_domain.length
	const thickStroke = '5px';
	const thinStroke = '1px';

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
				/>

				<!-- Title -->
				<text
					class='location_legend_title'
					dy='0.3em'
					text-anchor='start'
					fill={color_nuts2_names}
					x={(isSmall) ? $_xScale(5.5) : $_xScale(5.5)}
					y={(isSmall) ? yScaleLeg(90) : yScaleLeg(73)}
				>
					The skill mix within a region's job adverts
				</text>


				<!-- Blocks and labels -->
				{#each color_skills_domain as d,i}

					<!-- Blocks -->
					<rect
						class='location_legend_rect'
						fill={color_skills(d)}
						x={(isSmall) ? $_xScale(5) : $_xScale(5+(i*90/no_broad_skills))}
						y={(isSmall) ? yScaleLeg(80-((80/no_broad_skills)*i)) : yScaleLeg(60)}
						width={(isSmall) ? $_xScale(10) : $_xScale(90/(no_broad_skills))}
						height={(isSmall) ? yScaleLeg(100-(80/(no_broad_skills+0.5))) : yScaleLeg(60)}
						stroke={color_legend_bground}
						stroke-width={(isSmall) ? thinStroke : thickStroke}
					/>

					<!-- Background labels (not needed on small screens) -->
					<text
						class='location_legend_text_bground'
						dy='0.3em'
						text-anchor={(isSmall) ? 'start': 'middle'}
						fill={color_nuts2_names}
						stroke-width={thickStroke}
						stroke={color_nuts2_names_bground}
						x={(isSmall) ? $_xScale(17) : $_xScale(5+(i+0.5)*90/no_broad_skills)}
						y={(isSmall) ? yScaleLeg(80-((80/no_broad_skills)*(i+0.5))) : yScaleLeg(40)}
						opacity={(isSmall) ? 0 : 1}
					>
						{d}
					</text>

					<!-- Foreground labels -->
					<text
						class='location_legend_text'
						text-anchor={(isSmall) ? 'start': 'middle'}
						dy='0.3em'
						fill={color_nuts2_names}
						x={(isSmall) ? $_xScale(17) : $_xScale(5+(i+0.5)*90/no_broad_skills)}
						y={(isSmall) ? yScaleLeg(80-((80/no_broad_skills)*(i+0.5))) : yScaleLeg(40)}
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
		font-size: 14px;
		font-weight: bold;
	}

	.location_legend_text,
	.location_legend_text_bground {
		font-size: 10px;
		font-weight: bold;
		text-transform: uppercase;
	}

	.location_legend_rect {
		rx: 6px;
		ry: 6px;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

</style>
