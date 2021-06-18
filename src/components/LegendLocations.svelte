<script>
	import {
		color_nuts2_names_bground,
		color_nuts2_names,
		color_skills,
	} from '../shared/colours';
	import {
		chartsHeight, 
		legendsHeight, 
		yScaleLeg 
	} from '../shared/geometry';
	import {
		_margin,
		_width,
		_xScale,
	} from '../stores';

	/* consts */
	const small_width = 750

	/* vars */
	let no_broad_skills = color_skills.domain().length

	/* reactive vars */
	$: width = $_width + $_margin.left + $_margin.right;
	$: height = legendsHeight + $_margin.top + $_margin.bottom;
	$: isSmall = width < small_width;
	$: opacity = isSmall ? 1 : 0;
	$: thinStroke = $_xScale(0.2);
	$: thickStroke = $_xScale(0.7);

</script>

<div>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin.left},{$_margin.top})'>


				{#each color_skills.domain() as d,i}

					{#if !isSmall}
					<!-- wide screen -->
					<text
						class='location_legend_title'
						dy='0.3em'
						text-anchor='start'
						fill={color_nuts2_names}
						x={$_xScale(0)}
						y={yScaleLeg(75)}
					>
						MIX OF SKILLS FOUND IN THE REGION'S ADVERTS
					</text>

					<rect
						class='location_legend_rect'
						fill={color_skills(d)}
						stroke={color_skills(d)}
						stroke-width={thinStroke}
						x={$_xScale(i*100/no_broad_skills)}
						y={yScaleLeg(70)}
						width={$_xScale(100/no_broad_skills)}
						height={yScaleLeg(60)}
					/>

					<text
						class='location_legend_text_bground'
						dy='0.3em'
						text-anchor='middle'
						fill={color_nuts2_names}
						stroke-width={thickStroke}
						stroke={color_nuts2_names_bground}
						x={$_xScale((i+0.5)*100/no_broad_skills)}
						y={yScaleLeg(50)}
					>
						{d.toUpperCase()}
					</text>

					<text
						class='location_legend_text'
						text-anchor='middle'
						dy='0.3em'
						fill={color_nuts2_names}
						x={$_xScale((i+0.5)*100/no_broad_skills)}
						y={yScaleLeg(50)}
					>
						{d.toUpperCase()}
					</text>


					{:else}
					<!-- narrow screen -->
					<text
						class='location_legend_title'
						dy='0.3em'
						text-anchor='start'
						fill={color_nuts2_names}
						x={$_xScale(5)}
						y={yScaleLeg(90)}
					>
						MIX OF SKILLS FOUND IN THE REGION'S ADVERTS
					</text>

					<rect
						class='location_legend_rect'
						fill={color_skills(d)}
						stroke={color_skills(d)}
						stroke-width={thinStroke}
						x={$_xScale(5)}
						y={yScaleLeg(85-((80/no_broad_skills)*i))}
						width={$_xScale(10)}
						height={yScaleLeg(100-(80/no_broad_skills))}
					/>

					<text
						class='location_legend_text_bground'
						fill={color_nuts2_names}
						text-anchor='start'
						stroke-width={thickStroke}
						stroke={color_nuts2_names_bground}
						x={$_xScale(17)}
						y={yScaleLeg(85-((80/no_broad_skills)*(i+0.5)))}
						dy='0.3em'
					>
						{d.toUpperCase()}
					</text>

					<text
						class='location_legend_text'
						fill={color_nuts2_names}
						text-anchor='start'
						x={$_xScale(17)}
						y={yScaleLeg(85-((80/no_broad_skills)*(i+0.5)))}
						dy='0.3em'
					>
						{d.toUpperCase()}
					</text>

					{/if}
				{/each}	
			</g>
		</svg>
	{/if}
</div>

<style>
	.location_legend_title {
		font-size:  12px;
		font-weight:  bold;
	}

	.location_legend_text,
	.location_legend_text_bground {
		font-size: 10px;
		font-weight: bold;
	}
	.location_legend_rect {
		rx: 3px;
		ry: 3px;
	}

</style>
