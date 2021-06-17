<script>
	import data from '../../data/data.json';
	import {
		color_occupation_rect,
		color_occupation_skill_names_bground,
		color_skills,
	} from '../shared/colours';

	const sankeyGenerator = sankey()
		.nodeId(d => d.name)
		.nodeSort(null)
		.nodeWidth(5)
		.nodePadding(15)
		.extent([[1, 5], [700 - 1, 800 - 5]]);

	let layout = sankeyGenerator({
    links: data.occupations.links,
    nodes: data.occupations.nodes,
  });
</script>

<div>
	<svg>
		<g>
			<!-- Black rectangles -->
			{#each layout.nodes as d}
				<rect
					class='occupation_skill_rect'
					fill={color_occupation_rect}
					rx='4px'
					ry='4px'
				/>
			{/each}

			<!-- paths -->
			{#each layout.links as d}
				<path
					class='occupation_skill_links'
					stroke={color_skills(d.target.name)}
				/>
			{/each}

			<!-- Background to occupation and skill labels -->
			{#each layout.nodes as d}
				<text
					class='occupation_skill_text_bground'
					dy='-0.2em'
					fill={color_occupation_skill_names_bground}
					stroke={color_occupation_skill_names_bground}
					text-anchor={d => d.targetLinks.length>0 ? 'end' : 'start'}
				>
					{d.name.toUpperCase()}
				</text>
				<text
					class='occupation_skill_text'
					dy='-0.2em'
					fill={color_occupation_skill_names_bground}
					text-anchor={d => d.targetLinks.length>0 ? 'end' : 'start'}
				>
					{d.name.toUpperCase()}
				</text>
			{/each}
		</g>
	</svg>
</div>

<style>
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
