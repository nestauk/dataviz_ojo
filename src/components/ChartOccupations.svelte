<script>
	import data from '../../data/data.json';
	import {
		color_occup_rect,
		color_occup_skill_names,
		color_occup_skill_names_bground,
		color_skills,
	} from '../shared/colours';
	import {
		chartsHeight, 
	} from '../shared/geometry';
	import {
		_margin,
		_width,
		_xScale,
	} from '../stores';
	import {
		sankey,
		sankeyLinkHorizontal,
	} from 'd3-sankey';

	/* reactive vars */
	$: width = $_width + $_margin.left + $_margin.right;
	$: height = chartsHeight + $_margin.top + $_margin.bottom;
	$: sankeyGenerator = sankey()
		.nodeId(d => d.name)
		.nodeSort(null)
		.nodeWidth(5)
		.nodePadding(15)
		.size([$_width, chartsHeight])
		.extent([[1, 10], [$_width - 1, chartsHeight - 10]]);
	$: layout = sankeyGenerator({
    links: data.occupations.links,
    nodes: data.occupations.nodes,
  	});
	$: thickStroke = $_xScale(0.7);

	$: console.log($_margin.top)

</script>

<div class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin.left},{$_margin.top})'>

				<!-- paths -->
				{#each layout.links as d}
					<path
						class='occupation_skill_links'
						stroke={color_skills(d.target.name)}
						d={sankeyLinkHorizontal()(d)}
						stroke-width={d.width}
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
						{d.name.toUpperCase()}
					</text>
					<text
						class='occupation_skill_text'
						dy='-0.2em'
						fill={color_occup_skill_names}
						x={d.x0}
						y={d.y0}
						text-anchor={d.targetLinks.length>0 ? 'end' : 'start'}
					>
						{d.name.toUpperCase()}
					</text>
				{/each}
			</g>
		</svg>
	{/if}
</div>


<style>
.div_background {
	line-height:  0px;
}

.occupation_skill_links {
	fill: none;
	mix-blend-mode: multiply;
}

.occupation_skill_text,
.occupation_skill_text_bground {
	font-size: 10px;
  	font-weight: bold;
}
</style>
