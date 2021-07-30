<script>
	import data from '../../data/data.json';
	import {
		color_nuts2_names_bground,
		color_nuts2_names,
		color_skills,
		color_tooltip_bground
	} from '../shared/colours';
	import {chartsHeight, yScale} from '../shared/geometry';
	import {
		_height,
		_margin,
		_width,
		_xScale,
	} from '../stores';
	import {writable} from 'svelte/store';

	/* consts */

	// For smaller screens
	// (change layout of blocks)
	const small_width = 850

	// For really small screens
	// (stop showing mouseovers)
	const very_small_width = 450

	// Proportion of each area (in each direction) that will be taken up by
	// stacked bar chart (gives white space)
	const prop_space_x = 0.95;
	const prop_space_y = 0.9;

	// Height adjustment for NUTS2 area names
	const height_adj_nuts_text = ['0.5em', '0em', '-0.5em','-1em']

	// Stroke width for text
	const strokeWidth = '5px'


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
	$: isVerySmall = width < very_small_width;

	$: noXpos = isSmall ? no_x_pos_small : no_x_pos;
	$: noYpos = isSmall ? no_y_pos_small : no_y_pos;

	/* mouseovers */

	// Format text for mouseovers
	$: format_text = (broad_skill_group, percent) => {
		// If demand for skill is >1%
		if (percent>1) {
			// Round to nearest integer
			return broad_skill_group+': '+Math.round(percent)+'%'
		} else {
			return broad_skill_group+': <1%'
		}
	}

	const _tooltip = writable({isVisible: false});
	const onMouseout = () => {
	 	_tooltip.set({isVisible: false})
	}
	const showTooltip = (d, event) => {

		const left = (isSmall)
			? $_xScale(Math.min(d.x_pos_small,70))
			: $_xScale(Math.min(d.x_pos,80));
		const top = event.pageY-400

		_tooltip.set({
			isVisible: true,

			left_margin: left+'px',
			top_margin: top+'px',
			background_color: color_tooltip_bground,

			data_1: format_text(d.skills[0].broad_skill_group,d.skills[0].percent),
			background_1: color_skills.range()[0],

			data_2: format_text(d.skills[1].broad_skill_group,d.skills[1].percent),
			background_2: color_skills.range()[1],

			data_3: format_text(d.skills[2].broad_skill_group,d.skills[2].percent),
			background_3: color_skills.range()[2],

			data_4: format_text(d.skills[3].broad_skill_group,d.skills[3].percent),
			background_4: color_skills.range()[3],

			data_5: format_text(d.skills[4].broad_skill_group,d.skills[4].percent),
			background_5: color_skills.range()[4],

			name: d.nuts218nm
		})
	}


</script>

<div
	class='tooltip'
	class:hidden={!$_tooltip.isVisible}
	style='
		left:{$_tooltip.left_margin};
		top: {$_tooltip.top_margin};
		background-color: {$_tooltip.background_color};
	'
>
	<p class='line1_bground'>
		<span class='line1_text'>{$_tooltip.name}</span>
	</p>
	<p class='line2_bground'>
		<span class='line2_text'>Mix of all skills mentioned:</span>
	</p>
	<p
		class='line3_bground'
		style='background-color:{$_tooltip.background_1}'
	>
		<span class='line3_text'>{$_tooltip.data_1}</span>
	</p>
	<p
		class='line4_bground'
		style='background-color:{$_tooltip.background_2}'
	>
		<span class='line4_text'>{$_tooltip.data_2}</span>
	</p>
	<p
		class='line5_bground'
		style='background-color:{$_tooltip.background_3}'
	>
		<span class='line5_text'>{$_tooltip.data_3}</span>
	</p>
	<p
		class='line6_bground'
		style='background-color:{$_tooltip.background_4}'
	>
		<span class='line6_text'>{$_tooltip.data_4}</span>
	</p>
	<p
		class='line7_bground'
		style='background-color:{$_tooltip.background_5}'
	>
		<span class='line7_text'>{$_tooltip.data_5}</span>
	</p>
</div>

<div class='div_background'>
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
								stroke-width={strokeWidth}
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
								stroke-width={strokeWidth}
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

					<!-- Mouseovers -->
					<rect
						class='mouseover'
						x={isSmall
							? $_xScale(location.x_pos_small-prop_space_x*50/noXpos)
							: $_xScale(location.x_pos-prop_space_x*50/noXpos)
						}
						y={isSmall
							? yScale(location.y_pos_small+(prop_space_y*50/noYpos))
							: yScale(location.y_pos+(prop_space_y*50/noYpos))
						}
						width={$_xScale(prop_space_x * 100 / noXpos)}
						height={yScale(100 - prop_space_y * 100 / noYpos)}
						on:mouseover={!isVerySmall
							? isevent => showTooltip(location, event)
							: null}
						on:mouseout={onMouseout}
						fill='transparent'
					/>

				{/each}
			</g>
		</svg>
	{/if}
</div>

<style>
	.div_background {
		line-height: 0px;
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

	.tooltip {
		position: absolute;
		padding: 5px;
		pointer-events: none;
		font-family: 'AvertaRegular', Helvetica, sans-serif;
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
		color: #FFFFFF;
		text-align: left;
		line-height: 1.8;
		padding-left: 5px;
		padding-right: 5px;
	}

	.line1_text {
		color: #000000;
		font-size: 14px;
		line-height: 2;
		font-weight: bold;
	}

	.line2_text {
		color: #000000;
		font-style: italic;
	}
</style>
