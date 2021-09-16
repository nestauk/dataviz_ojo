<script>
	import data from '../../data/data.json';
	import {
		color_occup_rect,
		color_occup_skill_names,
		color_occup_skill_names_bground,
		color_skills,
		color_tooltip_bground
	} from '../shared/colours';
	import {chartsHeight} from '../shared/geometry';
	import {
		_margin,
		_width,
		_xScale,
	} from '../stores';
	import {sankey, sankeyLinkHorizontal} from 'd3-sankey';
	import {writable} from 'svelte/store';
	import {pointer} from 'd3-selection';


	/* consts */
	const thickStroke = '5px'
	// For smaller screens
	// (change layout of blocks)
	const small_width = 850
	// For really small screens
	// (stop showing mouseovers)
	const very_small_width = 450

	/* reactive vars */
	$: width = $_width + $_margin.left + $_margin.right;
	$: height = chartsHeight + $_margin.top + $_margin.bottom;
	$: isVerySmall = width < very_small_width;
	$: isSmall = width < small_width;

	$: sankeyGenerator = sankey()
		.nodeId(d => d.name)
		.nodeWidth(3)
		.nodePadding(11)
		.extent([[1, 50], [$_width - 1, chartsHeight]]);
	$: layout = sankeyGenerator({
		links: data.occupations.links,
		nodes: data.occupations.nodes,
	});


	/* mouseovers */

	// Format text for mouseovers
	$: format_text = (skill, value) => {
		// If demand for skill is >=1%
		if (value>=1) {
			// Round to nearest integer
			return skill+': '+Math.round(value)+'%'
		} else {
			return skill+': <1%'
		}
	}

	const _tooltip = writable({isVisible: false});
	const onMouseout = () => {
	 	_tooltip.set({isVisible: false})
	}
	const showTooltip = (d, event) => {

		const left = (isSmall)
		 	? Math.min($_xScale(85),pointer(event)[0])
		 	: Math.min($_xScale(95),pointer(event)[0]);
		const top = event.pageY-380

		var sourceLinks = d.source.sourceLinks
		var no_links = sourceLinks.length

		var skills_included = []
		for (let i = 0; i < no_links; i++) {
			skills_included.push(d.source.sourceLinks[i].target.name)
		}

		var all_skills_names = []
		var all_skills_values = []
		for (let i = 0; i < color_skills.domain().length; i++) {
			var one_skill = color_skills.domain()[i]
			var index_skill = skills_included.indexOf(one_skill)
			var one_value = index_skill>-1 ? d.source.sourceLinks[index_skill].value : 0
			all_skills_names.push(one_skill)
			all_skills_values.push(one_value)
		}

		_tooltip.set({
			isVisible: true,

			left_margin: left+'px',
			top_margin: top+'px',
			background_color: color_skills(d.target.name),
			data: format_text(d),

			name_1: d.source.name,

			skill_value_1: format_text(all_skills_names[0], all_skills_values[0]),
			background_color_1: color_skills(all_skills_names[0]),

			skill_value_2: format_text(all_skills_names[1], all_skills_values[1]),
			background_color_2: color_skills(all_skills_names[1]),

			skill_value_3: format_text(all_skills_names[2], all_skills_values[2]),
			background_color_3: color_skills(all_skills_names[2]),

			skill_value_4: format_text(all_skills_names[3], all_skills_values[3]),
			background_color_4: color_skills(all_skills_names[3]),

			skill_value_5: format_text(all_skills_names[4], all_skills_values[4]),
			background_color_5: color_skills(all_skills_names[4]),

			skill_value_6: format_text(all_skills_names[5], all_skills_values[5]),
			background_color_6: color_skills(all_skills_names[5]),

			skill_value_7: format_text(all_skills_names[6], all_skills_values[6]),
			background_color_7: color_skills(all_skills_names[6]),

			skill_value_8: format_text(all_skills_names[7], all_skills_values[7]),
			background_color_8: color_skills(all_skills_names[7])

		})
	}


</script>

<div
	class='tooltip'
	class:hidden={!$_tooltip.isVisible}
	style='
		left:{$_tooltip.left_margin};
		top: {$_tooltip.top_margin};'
>
	<p class='line1_bground'>
		<span class='line1_text'>{$_tooltip.name_1}</span>
	</p>

	<p>
		<span style='background-color:{$_tooltip.background_color_1}; border-radius: 4px; border: 2px solid {$_tooltip.background_color_1}'
			  >&nbsp;&nbsp;&nbsp;&nbsp;
		</span>
		<span>{$_tooltip.skill_value_1}</span>
	</p>

	<p>
		<span style='background-color:{$_tooltip.background_color_2}; border-radius: 4px; border: 2px solid {$_tooltip.background_color_2}'
			  >&nbsp;&nbsp;&nbsp;&nbsp;
		</span>
		<span>{$_tooltip.skill_value_2}</span>
	</p>

	<p>
		<span style='background-color:{$_tooltip.background_color_3}; border-radius: 4px; border: 2px solid {$_tooltip.background_color_3}'
			  >&nbsp;&nbsp;&nbsp;&nbsp;
		</span>
		<span>{$_tooltip.skill_value_3}</span>
	</p>

	<p>
		<span style='background-color:{$_tooltip.background_color_4}; border-radius: 4px; border: 2px solid {$_tooltip.background_color_4}'
			  >&nbsp;&nbsp;&nbsp;&nbsp;
		</span>
		<span>{$_tooltip.skill_value_4}</span>
	</p>

	<p>
		<span style='background-color:{$_tooltip.background_color_5}; border-radius: 4px; border: 2px solid {$_tooltip.background_color_5}'
			  >&nbsp;&nbsp;&nbsp;&nbsp;
		</span>
		<span>{$_tooltip.skill_value_5}</span>
	</p>

	<p>
		<span style='background-color:{$_tooltip.background_color_6}; border-radius: 4px; border: 2px solid {$_tooltip.background_color_6}'
			  >&nbsp;&nbsp;&nbsp;&nbsp;
		</span>
		<span>{$_tooltip.skill_value_6}</span>
	</p>

	<p>
		<span style='background-color:{$_tooltip.background_color_7}; border-radius: 4px; border: 2px solid {$_tooltip.background_color_7}'
			  >&nbsp;&nbsp;&nbsp;&nbsp;
		</span>
		<span>{$_tooltip.skill_value_7}</span>
	</p>

	<p>
		<span style='background-color:{$_tooltip.background_color_8}; border-radius: 4px; border: 2px solid {$_tooltip.background_color_8}'
			  >&nbsp;&nbsp;&nbsp;&nbsp;
		</span>
		<span>{$_tooltip.skill_value_8}</span>
	</p>


</div>

<div class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin.left},{$_margin.top})'>

				<!-- Left title -->
				<text
					class='left_title'
					text-anchor='start'
					fill={color_occup_skill_names}
					x={1}
					y={20}
					font-size={isVerySmall ? '13px': '16px'}
				>
					Occupations
				</text>

				<!-- Right title -->
				<text
					class='right_title'
					text-anchor='end'
					fill={color_occup_skill_names}
					x={$_width-1}
					y={20}
					font-size={isVerySmall ? '13px': '16px'}
				>
					Skill groups
				</text>

				<!-- Paths -->
				{#each layout.links as d}
					<path
						class='occupation_skill_links'
						stroke={color_skills(d.target.name)}
						d={sankeyLinkHorizontal()(d)}
						stroke-width={d.width}
						on:mouseover ={(!isVerySmall) ? isevent => showTooltip(d, event) : null}
						on:mousemove={!isVerySmall
							? isevent => showTooltip(d, event)
							: null}													
						on:mouseout = {onMouseout}
					/>
				{/each}

				{#each layout.nodes as d}
					<!-- Black rectangles -->
					<rect
						class='occupation_skill_rect'
						fill={color_occup_rect}
						rx='4px'
						ry='4px'
						x={d.x0}
						y={d.y0}
						width={d.x1-d.x0}
						height={d.y1-d.y0}
					/>

					<!-- Occupation and skill labels -->
					<text
						class='occupation_skill_text_bground'
						dy='-0.2em'
						fill={color_occup_skill_names_bground}
						stroke={color_occup_skill_names_bground}
						stroke-width={thickStroke}
						x={d.x0}
						y={d.y0}
						text-anchor={d.targetLinks.length>0 ? 'end' : 'start'}
					>
						{d.name.replace(' AND ', ' & ')}
					</text>
					<text
						class='occupation_skill_text'
						dy='-0.2em'
						fill={color_occup_skill_names}
						x={d.x0}
						y={d.y0}
						text-anchor={d.targetLinks.length>0 ? 'end' : 'start'}
					>
						{d.name.replace(' AND ', ' & ')}
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

	.left_title, .right_title {
		font-weight: bold;
	}

	.occupation_skill_links {
		fill: none;
		mix-blend-mode: normal;
	}

	.occupation_skill_text,
	.occupation_skill_text_bground {
		font-size: 11px;
		font-weight: bold;
		pointer-events: none;
	}

	.tooltip {
		position: absolute;
		padding: 5px;
		pointer-events: none;
		font-family: 'AvertaRegular', Helvetica, sans-serif;
		border-radius: 3px;
		z-index: 6;
		border: 3px solid #FFF;
		background-color: #FFFFFF;
		color: #000000;
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

</style>
