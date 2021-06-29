<script>
	import data from '../../data/data.json';
	import {
		color_nuts2_names_bground,
		color_nuts2_names,
		color_skills,
	} from '../shared/colours';
	import {chartsHeight, yScale} from '../shared/geometry';
	import {
		_height,
		_margin,
		_width,
		_xScale,
	} from '../stores';

	/* consts */
	const small_width = 850

	// Proportion of each area (in each direction) that will be taken up by
	// stacked bar chart
	const prop_space_x = 0.95;
	const prop_space_y = 0.9;

	// Height adjustment for NUTS2 area names
	const height_adj_nuts_text = ['0.5em', '0em', '-0.5em','-1em']

	/* vars */

	// Number of x and y positions in the map
	let all_x_pos = data.locations.map(d => d.x_pos);
	let no_x_pos = all_x_pos.filter((item, i, ar) => ar.indexOf(item) === i).length;

	let all_x_pos_small = data.locations.map(d => d.x_pos_small);
	let no_x_pos_small = all_x_pos_small.filter((item, i, ar) => ar.indexOf(item) === i).length;

	let all_y_pos = data.locations.map(d => d.y_pos);
	let no_y_pos = all_y_pos.filter((item, i, ar) => ar.indexOf(item) === i).length;

	let all_y_pos_small = data.locations.map(d => d.y_pos_small);
	let no_y_pos_small = all_y_pos_small.filter((item, i, ar) => ar.indexOf(item) === i).length;

	/* reactive vars */
	$: width = $_width + $_margin.left + $_margin.right;
	$: height = chartsHeight + $_margin.top + $_margin.bottom;
	$: isSmall = width < small_width;
	$: noXpos = isSmall ? no_x_pos_small : no_x_pos;
	$: noYpos = isSmall ? no_y_pos_small : no_y_pos;
	$: opacity = isSmall ? 1 : 0;
	$: thinStroke = $_xScale(0.2);
	$: thickStroke = $_xScale(0.7);

</script>

<div  class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin.left},{$_margin.top})'>
				{#each data.locations as location}

					<!-- Group for each NUTS2 area -->
					<g
						class='nuts2_group'
						transform='translate(
							{$_xScale(isSmall ? location.x_pos_small : location.x_pos)},
							{yScale(isSmall ? location.y_pos_small : location.y_pos)}
						)'
					>
						<!-- NUTS 2 areas rectangles -->
						{#each location.skills as d}
							<rect
								class='nuts2_skills'
								fill={color_skills(d.broad_skill_group)}
								height={yScale(100 - prop_space_y * 100 / noYpos)}
								rx='3px'
								ry='3px'
								stroke={color_skills(d.broad_skill_group)}
								stroke-width={thinStroke}
								x={$_xScale(
									prop_space_x * d.percent_cumulative / noXpos -
									prop_space_x * 50 / noXpos
								)}
								y={yScale(100 + prop_space_y * 50 / noYpos)}
								width={$_xScale(prop_space_x * d.percent / noXpos)}
							/>
						{/each}

						<!-- NUTS 2 area names - wide screen -->
						{#each location.names_long as d, i}

							<!-- background -->
							<text
								class='nuts2_names_long_bground'
								dy='{i}em'
								fill={color_nuts2_names}
								stroke-width={thickStroke}
								stroke={color_nuts2_names_bground}
								y={height_adj_nuts_text[d[1] - 1]}
								opacity={(isSmall) ? 0 : 1}
							>
								{d[0]}
							</text>

							<!-- foreground -->
							<text
								class='nuts2_names_long'
								dy='{i}em'
								fill={color_nuts2_names}
								y={height_adj_nuts_text[d[1] - 1]}
								opacity={(isSmall) ? 0 : 1}
							>
								{d[0]}
							</text>
						{/each}

						<!-- NUTS 2 area names - narrow screen -->
						{#each location.names_short as d, i}

							<!-- background -->
							<text
								class='nuts2_names_short_bground'
								dy='{i}em'
								fill={color_nuts2_names}
								stroke-width={thickStroke}
								stroke={color_nuts2_names_bground}
								y={height_adj_nuts_text[d[1] - 1]}
								opacity={(isSmall) ? 1 : 0}
							>
								{d[0]}
							</text>

							<!-- foreground -->
							<text
								class='nuts2_names_short'
								dy='{i}em'
								fill={color_nuts2_names}
								y={height_adj_nuts_text[d[1] - 1]}
								opacity={(isSmall) ? 1 : 0}
							>
								{d[0]}
							</text>
						{/each}

					</g>
				{/each}
			</g>
		</svg>
	{/if}
</div>

<style>
	.div_background {
		line-height:  0px;
	}
	
	.nuts2_names_long,
	.nuts2_names_long_bground,
	.nuts2_names_short,
	.nuts2_names_short_bground {
		text-anchor: middle;
		font-size: 10px;
		font-weight: bold;
		text-transform: uppercase;
	}

	.nuts2_skills {
		mix-blend-mode: multiply;
	}
</style>
