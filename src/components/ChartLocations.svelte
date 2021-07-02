<script>
	import data from '../../data/data.json';
	import {
		color_nuts2_names_bground,
		color_nuts2_names,
		color_skills,
		color_tooltip_bground
	} from '../shared/colours';
	import {
		chartsHeight, 
		yScale
	} from '../shared/geometry';
	import {
		_height,
		_margin,
		_width,
		_xScale,
	} from '../stores';
	import {
		select,
		pointer
	} from 'd3-selection';


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

	// Format text for mouseovers
	$: format_text = (broad_skill_group, percent) => {
		// If demand for skill is >1%
		if (percent>1) {
			// Round to 1 decimal place
			return broad_skill_group+": "+Math.round(percent*10)/10+'%'
		} else {
			return broad_skill_group+": <1%"
		}
	}

	// Mouseover
	$: on_mouseover = (d,event) => {

        select("#tooltip")
        .style("left", () => { return (isSmall) ? $_xScale(Math.min(d.x_pos_small,70))+'px' : $_xScale(Math.min(d.x_pos,80))+'px'})
        .style('top', event.pageY-400+'px')
        .style("background-color", color_tooltip_bground)

        select("#tooltip #line1_text")
         .text(d.nuts218nm)
        select("#tooltip #line2_text")
         .text('Mix of all skills mentioned:')

        select("#tooltip #line3_text")
         .text(format_text(d.skills[0].broad_skill_group,d.skills[0].percent))
        select("#tooltip #line3_bground")
	     .style("background-color", color_skills.range()[0])

        select("#tooltip #line4_text")
         .text(format_text(d.skills[1].broad_skill_group,d.skills[1].percent))
        select("#tooltip #line4_bground")
	     .style("background-color", color_skills.range()[1])

        select("#tooltip #line5_text")
         .text(format_text(d.skills[2].broad_skill_group,d.skills[2].percent))
        select("#tooltip #line5_bground")
	     .style("background-color", color_skills.range()[2])

        select("#tooltip #line6_text")
         .text(format_text(d.skills[3].broad_skill_group,d.skills[3].percent))
        select("#tooltip #line6_bground")
	     .style("background-color", color_skills.range()[3])

        select("#tooltip #line7_text")
         .text(format_text(d.skills[4].broad_skill_group,d.skills[4].percent))
        select("#tooltip #line7_bground")
	     .style("background-color", color_skills.range()[4])

        select("#tooltip").classed("hidden", false);
	}

	// Mouseout
	$: on_mouseout = (d,event) => {
	    select("#tooltip").classed("hidden", true)
	} 


</script>

<div id="tooltip" class="hidden">
    <p id='line1_bground'><span id="line1_text"></span></p>
    <p id='line2_bground'><span id="line2_text"></span></p>
    <p id='line3_bground'><span id="line3_text"></span></p>
    <p id='line4_bground'><span id="line4_text"></span></p>
    <p id='line5_bground'><span id="line5_text"></span></p>
    <p id='line6_bground'><span id="line6_text"></span></p>
    <p id='line7_bground'><span id="line7_text"></span></p>
</div>


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
						x={(isSmall) ? $_xScale(location.x_pos_small-prop_space_x*50/noXpos) : $_xScale(location.x_pos-prop_space_x*50/noXpos)}
						y={(isSmall) ? yScale(location.y_pos_small+(prop_space_y*50/noYpos)) : yScale(location.y_pos+(prop_space_y*50/noYpos))}
						width={$_xScale(prop_space_x * 100 / noXpos)}
						height={yScale(100 - prop_space_y * 100 / noYpos)}
						on:mouseover = {(isVerySmall) ? on_mouseout(location,event) : on_mouseover(location,event)}
						on:mouseout = {on_mouseout(location,event)}
						fill='transparent'
					/>

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

    #tooltip {
    	position: absolute;
	    padding: 5px;
	    pointer-events: none;
	    font-family: "AvertaRegular", Helvetica, sans-serif;
	    border-radius: 3px;
	    z-index: 6;
	    border: 3px solid #FFF
    }

    #tooltip.hidden {
        display: none;
    }

    #tooltip p {
        margin: 0px;
    	font-size: 12px;
    	color: #FFFFFF;
    	text-align: left;
  		line-height: 1.8;
  		padding-left: 5px;
  		padding-right: 5px;
  	}

  	#line1_text {
    	color: #000000;
  		font-size:  14px;
  		line-height: 2;
  		font-weight: bold;
  	}

  	#line2_text {
    	color: #000000;
  		font-style: italic;
  	}


</style>
