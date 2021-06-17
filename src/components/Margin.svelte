<script>
	import {scaleLinear} from 'd3-scale';

	import data from '../../data/data.json';
	import {
		color_skills_names_bground,
		color_skills_names,
		color_skills,
	} from '../shared/colours';
	import {xMax, xMin, yMax, yMin} from '../shared/geometry';
	import {_innerWidth, _width_margin} from '../stores';

	/* consts */

	// Determine position of skill labels
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

	// Determine position of skill labels
  function describeArc(x, y, radius, startAngle, endAngle){
    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);
    let arcSweep = endAngle - startAngle <= 180 ? '0' : '1'; // FIXME unused
    let d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, 1, 1, end.x, end.y
    ].join(' ');
    return d;
  }

	const gap = 20;
	const no_skills = data.skills.length;
	const radius_circles = 20;
	const titleLines = ['Most frequently','demanded skills'];

	/* reactive vars */

	$: width = $_width_margin; // FIXME use $_width_margin directly
	// $: width = $_width_container_parent >= 1380
	// 	? 1380 * 0.15
	// 	: $_innerWidth >= 1250
	// 		? $_innerWidth * 0.835 * 0.15
	// 		: 0;
	$: margin = {
		top: 20,
		right: 0,
		bottom: 20,
		left: 0,
	}
	$: xScale = scaleLinear().domain([xMin,xMax]).range([0, width]);
	$: r = xScale(radius_circles);
	$: cx = xScale(50);
	$: strokeWidth = xScale(3);
	$: height = 2 * (r + gap) * no_skills;
	$: yScale = scaleLinear().domain([yMin, yMax]).range([height, 0]);
	$: makeArc = index => {
		let y = yScale(yMax - (100 / (no_skills+1)) * (index + 1))
    let radius = xScale(radius_circles * 1.1);
    let startAngle = 160
    let endAngle = -160
    return describeArc(cx, y, radius, startAngle, endAngle)
	}
</script>

<div>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({margin.left},{margin.top})'>
				<!-- Circles for skills -->
				{#each data.skills as d, i}
					<circle
						{cx}
						{r}
						class='skills_circles'
						cy={yScale(yMax - (100 / (no_skills + 1)) * (i + 1))}
						fill={color_skills(d.broad_skill_group)}
					/>
				{/each}

				<!-- Arcs for labels -->
				{#each data.skills as d, i}
					<path
						class='skills_arcs'
						id='s{i}'
						d={makeArc(i)}
					/>
				{/each}

				{#each data.skills as d, i}
					<g class='arc_paths'>
						<!-- Skills labels - background -->
						<text>
							<textPath
								class='skills_text_bground'
								fill={color_skills_names_bground}
								startOffset='50%'
								stroke-width={strokeWidth}
								stroke={color_skills_names_bground}
								xlink:href='#s{i}'
							>
								{d.skill_name.toUpperCase()}
							</textPath>
						</text>

						<!-- Skills labels - background -->
						<text>
							<textPath
								fill={color_skills_names_bground}
								startOffset='50%'
								xlink:href='#s{i}'
							>
								{d.skill_name.toUpperCase()}
							</textPath>
						</text>
					</g>
				{/each}

				<!-- Title of chart -->
				{#each titleLines as d, i}
					<text
						class='title'
						dy={i == 0 ? '0.5em' : '2em'}
						fill={color_skills_names}
						x={cx}
						y={yScale(yMax)}
					>
						{d.toUpperCase()}
					</text>
				{/each}
			</g>
		</svg>
	{/if}
</div>

<style>
	.skills_circles {
		mix-blend-mode: multiply;
	}

	.skills_arcs {
		fill: none;
	}

	.arc_paths {
		font-size: 10px;
		font-weight: bold;
		text-anchor: middle;
	}

	.title {
		text-anchor: middle;
		font-size: 12px;
		font-weight: bold;
	}
</style>
