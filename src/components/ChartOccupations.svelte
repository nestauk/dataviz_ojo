<script>
	import data from '../../data/data.json';
	import {
		color_occup_rect,
		color_occup_skill_names,
		color_occup_skill_names_bground,
		color_skills,
		color_tooltip_bground		
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
	import {
		writable
	} from 'svelte/store';


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
		.nodeSort(null)
		.nodeWidth(5)
		.nodePadding(15)
		.size([$_width, chartsHeight])
		.extent([[1, 10], [$_width - 1, chartsHeight - 10]]);
	$: layout = sankeyGenerator({
    links: data.occupations.links,
    nodes: data.occupations.nodes,
  	});


	/* mouseovers */

	// Format text for mouseovers
	$: format_text = (d) => {
		// If demand for skill is >1%
		if (d.value>1) {
			// Round to nearest integer
			return d.target.name+": "+Math.round(d.value)+'%'
		} else {
			return d.target.name+": <1%"
		}
	}

	const _tooltip = writable({isVisible: false});
	const onMouseout = () => {
	 	_tooltip.set({isVisible: false})
	}
	const showTooltip = (d, event) => {

		const data_1_input = d.source.sourceLinks[0]
		const data_2_input = d.source.sourceLinks[1]
		const data_3_input = d.source.sourceLinks[2]
		const data_4_input = d.source.sourceLinks[3]
		const data_5_input = d.source.sourceLinks[4]
		
		const left = $_xScale(50)
		const top = event.pageY-400

		_tooltip.set({
			isVisible: true,
			
			left_margin: left+'px',
			top_margin: top+'px',
			background_color: color_tooltip_bground,

			data_1: format_text(data_1_input),
			background_1: color_skills(data_1_input.target.name),

			data_2: format_text(data_2_input),
			background_2: color_skills(data_2_input.target.name),

			data_3: format_text(data_3_input),
			background_3: color_skills(data_3_input.target.name),

			data_4: format_text(data_4_input),
			background_4: color_skills(data_4_input.target.name),

			data_5: format_text(data_5_input),
			background_5: color_skills(data_5_input.target.name),

			name: d.source.name
		})
	}


</script>

<div class="tooltip" 
	class:hidden={!$_tooltip.isVisible}
	style="left:{$_tooltip.left_margin}; 
		   top: {$_tooltip.top_margin};
		   background-color: {$_tooltip.background_color};"
>
    <p class='line1_bground'><span class="line1_text">{$_tooltip.name}</span></p>
    <p class='line2_bground'><span class="line2_text">Mix of all skills mentioned:</span></p>
    <p class='line3_bground'
    	style="background-color:{$_tooltip.background_1}">
    	<span class="line3_text">{$_tooltip.data_1}</span>
    </p>
    <p class='line4_bground'
    	style="background-color:{$_tooltip.background_2}">
    	<span class="line4_text">{$_tooltip.data_2}</span>
    </p>
    <p class='line5_bground'
    	style="background-color:{$_tooltip.background_3}">
    	<span class="line5_text">{$_tooltip.data_3}</span>
    </p>
    <p class='line6_bground'
    	style="background-color:{$_tooltip.background_4}">
    	<span class="line6_text">{$_tooltip.data_4}</span>
    </p>
    <p class='line7_bground'
    	style="background-color:{$_tooltip.background_5}">
    	<span class="line7_text">{$_tooltip.data_5}</span>
    </p>
</div>

<div class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin.left},{$_margin.top})'>

				<!-- Paths -->
				{#each layout.links as d}
					<path
						class='occupation_skill_links'
						stroke={color_skills(d.target.name)}
						d={sankeyLinkHorizontal()(d)}
						stroke-width={d.width}
						on:mouseover ={(!isVerySmall) ? isevent => showTooltip(d, event) : ''}
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
	  	pointer-events: none;
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
    	color: #FFFFFF;
    	text-align: left;
  		line-height: 1.8;
  		padding-left: 5px;
  		padding-right: 5px;
  	}

  	.line1_text {
    	color: #000000;
  		font-size:  14px;
  		line-height: 2;
  		font-weight: bold;
  	}

  	.line2_text {
    	color: #000000;
  		font-style: italic;
  	}


</style>
