<script>
	import {
		scaleLinear
	} from 'd3-scale';
	import data from '../../data/data.json';
	import {
		color_skills_names,
		color_skills,
		color_legend_bground
	} from '../shared/colours';
	import {
		_margin_m,
		_width_m,
		_height_m,
	} from '../stores';


	/* consts */

	// Convert polar to cartesian co-ordainations (for positioning of skill labels)
	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
		let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
		return {
			x: centerX + (radius * Math.cos(angleInRadians)),
			y: centerY + (radius * Math.sin(angleInRadians))
		};
	}

	// Arc that describes skill labels
	function describeArc(x, y, radius, startAngle, endAngle){
		let start = polarToCartesian(x, y, radius, endAngle);
		let end = polarToCartesian(x, y, radius, startAngle);
		let d = [
			'M', start.x, start.y,
			'A', radius, radius, 0, 1, 1, end.x, end.y
		].join(' ');
		return d;
	}

	const yMax = 100
	const no_skills = data.skills.length;
	const radius_circles = 30;
	const titleLines = ['The most frequently','mentioned skills','in job adverts'];


	/* reactive vars */
	$: _xScale_m =
		scaleLinear()
		.domain([0, yMax])
		.range([0, $_width_m]);
	$: _yScale_m =
		scaleLinear()
		.domain([0, 100])
		.range([$_height_m, 0]);
	$: width = $_width_m + $_margin_m.left + $_margin_m.right;
	$: height = $_height_m + $_margin_m.top + $_margin_m.bottom;
	$: r = _xScale_m(radius_circles);
	$: cx = _xScale_m(50);
	$: makeArc = index => {
		let y = _yScale_m(yMax - 0.5 - (100 / (no_skills+1)) * (index + 1))
		let radius = _xScale_m(radius_circles * 1.1);
		let startAngle = 160
		let endAngle = -160
		return describeArc(cx, y, radius, startAngle, endAngle)
	}
</script>

<div class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_margin_m.left},{$_margin_m.top})'>

				<!-- Background colour -->
					<rect
						x={_xScale_m(0)}
						y={_yScale_m(100)}
						width={_xScale_m(100)}
						height={_yScale_m(0)}
						fill={color_legend_bground}
					/>

				<!-- Circles for skills -->
				{#each data.skills as d, i}
					<circle
						{cx}
						{r}
						class='skills_circles'
						cy={_yScale_m(yMax - 0.5 - (100 / (no_skills + 1)) * (i + 1))}
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

				<!-- Labels -->
				{#each data.skills as d,i}
					<g class='arc_paths'>

						<text>
							<textPath
								class='skills_text'
								fill={color_skills_names}
								startOffset='50%'
								xlink:href='#s{i}'
							>
								{d.skill_name}
							</textPath>
						</text>

					</g>

				{/each}

				<!-- Title of chart -->
				{#each titleLines as d, i}
					<text
						class='title'
						dy={1.5*i+'em'}
						fill={color_skills_names}
						x={cx}
						y={_yScale_m(yMax-0.7)}
					>
						{d}
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

	.skills_arcs {
		fill: none;
	}

	.skills_text_bground, .skills_text {
		font-size: 10px;
		font-weight: bold;
		text-anchor: middle;
		text-transform: uppercase;
	}

	.title {
		text-anchor: middle;
		font-size: 14px;
		font-weight: bold;
	}
</style>
