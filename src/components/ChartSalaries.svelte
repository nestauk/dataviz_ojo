<script>
	import data from '../../data/data.json';
	import {
		color_skills,
		color_salary_rings,
		color_salary_axis_bground,
		color_salary_axis,
		color_salary_names_bground,
		color_salary_names		
	} from '../shared/colours';
	import {
		_margin,
		_width,
		_xScale_s,
	} from '../stores';
	import {scaleLinear} from 'd3-scale';


	// Number of salaries (add 5 to leave space for salary_rings_text
	let no_salaries = data.salaries.length+5

    // Rotate the chart to ensure the min and max salaries straddle the top of the chart
    let rotate_adj = 0.225*no_salaries

    // Salaries for rings
	let salary_rings = [10,20,30,40,50];

    // Calculate domain for salary scale (yScale_s)
    // -5 and +3 to give extra space
    let lowest_salary = Math.min.apply(Math, data.salaries.map(function(d,i) { return d.salaries.lower_bound.lower_q }))
    let lowest_salary_shown = Math.min(salary_rings[0],lowest_salary)-5
  	let highest_salary = Math.max.apply(Math, data.salaries.map(function(d,i) { return d.salaries.upper_bound.upper_q }))
  	let highest_salary_shown = Math.max(highest_salary,salary_rings[salary_rings.length-1])+3


	/* reactive vars */	
	$: width = $_width + $_margin.left + $_margin.right;
	$: height = $_width + $_margin.top + $_margin.bottom;
	$: thinStroke = $_xScale_s(0.2);
	$: thickStroke = $_xScale_s(0.7);
  	$: yScale_s = scaleLinear()
  	.domain([lowest_salary_shown,highest_salary_shown])
  	.range([0, 0.5*(width - $_margin.left - $_margin.right)])

</script>

<div class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin.left},{$_margin.top})'>

				{#each salary_rings as d}
					<!-- Rings to indicate salaries -->
					<circle
						class='salary_rings'
						fill='transparent'
						stroke={color_salary_rings}
						stroke-dasharray='5,5'
						cx={$_xScale_s(50)}
						cy={$_xScale_s(50)}
						r={yScale_s(d)}
						stroke-width={thinStroke}
					/>
				{/each}

				<!-- Need a separate loop from above to prevent rings overlapping text -->	
				{#each salary_rings as d,i}
					<!-- Salary associated with each ring - background -->
					<text
						class='salary_rings_text_bground'
						fill={color_salary_axis_bground}
						stroke-width={thickStroke}
						stroke={color_salary_axis_bground}
						x={($_xScale_s(50)+yScale_s(d)*Math.cos((1.5*Math.PI)))}
						y={($_xScale_s(50)+yScale_s(d)*Math.sin((1.5*Math.PI)))}
					>
						{(i==salary_rings.length-1 || i==0) ? '£'+d+'k per annum'.toUpperCase() : '£'+d+'k'.toUpperCase()}
					</text>

					<!-- Salary associated with each ring -->
					<text
						class='salary_rings_text'
						fill={color_salary_axis}
						x={($_xScale_s(50)+yScale_s(d)*Math.cos((1.5*Math.PI)))}
						y={($_xScale_s(50)+yScale_s(d)*Math.sin((1.5*Math.PI)))}
					>
						{(i==salary_rings.length-1 || i==0) ? '£'+d+'k per annum'.toUpperCase() : '£'+d+'k'.toUpperCase()}
					</text>

				{/each}


				<!-- Main rectangles -->
				{#each data.salaries as d,i}
					<rect
						class='lower_bounds'
						fill={color_skills(d.broad_skill_group)}
						rx='2px'
						ry='2px'
						width={yScale_s(lowest_salary_shown+d.salaries.lower_bound.median-d.salaries.lower_bound.lower_q)}
						height={$_xScale_s(1.5)}
						transform = translate({$_xScale_s(50)+yScale_s(d.salaries.lower_bound.lower_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScale_s(50)+yScale_s(d.salaries.lower_bound.lower_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))}) 
					/>

					<rect
						class='medians'
						fill={color_skills(d.broad_skill_group)}
						rx='2px'
						ry='2px'
						width={yScale_s(lowest_salary_shown+d.salaries.upper_bound.median-d.salaries.lower_bound.median)}
						height={$_xScale_s(1.5)}
						transform = translate({$_xScale_s(50)+yScale_s(d.salaries.lower_bound.median)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScale_s(50)+yScale_s(d.salaries.lower_bound.median)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))}) 
					/>

 					<rect
						class='upper_bounds'
						fill={color_skills(d.broad_skill_group)}
						rx='2px'
						ry='2px'
						width={yScale_s(lowest_salary_shown+d.salaries.upper_bound.upper_q-d.salaries.upper_bound.median)}
						height={$_xScale_s(1.5)}
						transform = translate({$_xScale_s(50)+yScale_s(d.salaries.upper_bound.median)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScale_s(50)+yScale_s(d.salaries.upper_bound.median)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))}) 
					/>

				{/each}


				<!-- Names of skills -->
				{#each data.salaries as d,i}

					<!-- One half of the circle -->
					{#if (360*((d.index-rotate_adj)/no_salaries)>90)}

						<!-- Names of skills - background -->
						<text
							class='salary_skills_name_bground'
							fill={color_salary_names_bground}
							stroke={color_salary_names_bground}
							stroke-width={thickStroke}
							transform = translate({$_xScale_s(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScale_s(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries)-180)}) 
							dy='0.2em'
							text-anchor='start'
							opacity={(width<550) ? 0 : (i%5==0) ? 1 : 0}
	 					>
							{d.skill_name.toUpperCase()}
						</text>

						<!-- Names of skills -->
						<text
							class='salary_skills_name'
							fill={color_salary_names}
							transform = translate({$_xScale_s(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScale_s(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries)-180)}) 
							dy='0.2em'
							text-anchor='start'
							opacity={(width<550) ? 0 : (i%5==0) ? 1 : 0}
	 					>
							{d.skill_name.toUpperCase()}
						</text>

					<!-- Other half of the circle -->
					{:else}

						<!-- Names of skills - background -->
						<text
							class='salary_skills_name_bground'
							fill={color_salary_names_bground}
							stroke={color_salary_names_bground}
							stroke-width={thickStroke}
							transform = translate({$_xScale_s(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScale_s(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))}) 
							dy='1.5em'
							text-anchor='end'
							opacity={(width<550) ? 0 : (i%5==0) ? 1 : 0}
	 					>
							{d.skill_name.toUpperCase()}
						</text>

						<!-- Names of skills -->
						<text
							class='salary_skills_name'
							fill={color_salary_names}
							transform = translate({$_xScale_s(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.cos((2*Math.PI)*((d.index-rotate_adj)/no_salaries))},{$_xScale_s(50)+yScale_s(d.salaries.upper_bound.upper_q)*Math.sin((2*Math.PI)*(((d.index-rotate_adj)/no_salaries)))})rotate({(360*((d.index-rotate_adj)/no_salaries))}) 
							dy='1.5em'
							text-anchor='end'
							opacity={(width<550) ? 0 : (i%5==0) ? 1 : 0}
	 					>
							{d.skill_name.toUpperCase()}
						</text>

					{/if}

				{/each}	

			</g>
		</svg>
	{/if}
</div>

<style>
	.div_background {
		line-height:  0px;
	}

	.salary_rings_text,
	.salary_rings_text_bground {
		text-anchor: end;
		font-size: 11px;
		font-weight: bold;
	}

	.salary_skills_name,
	.salary_skills_name_bground {
		font-size: 10px;
		font-weight: bold;
	}

	.lower_bounds, .medians, .upper_bounds {
		mix-blend-mode: multiply;
	}

	.lower_bounds, .upper_bounds {
		opacity: 0.25;
	}
</style>
