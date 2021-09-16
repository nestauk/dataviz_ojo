<script>
	import {scaleLinear} from 'd3-scale';
	import data from '../../data/data.json';
	import {
		color_margin_title,
		color_margin_skills,
		color_skills
	} from '../shared/colours';
	import {
		_marginM,
		_widthM,
		_heightM,
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
	const titleLines = ['Fine skill groups', 'ordered by mentions','(most often to least)'];

	/* reactive vars */
	$: _xScale_m =
		scaleLinear()
		.domain([0, 100])
		.range([0, $_widthM]);
	$: _yScale_m =
		scaleLinear()
		.domain([0, yMax])
		.range([$_heightM, 0]);
	$: width = $_widthM + $_marginM.left + $_marginM.right;
	$: height = $_heightM + $_marginM.top + $_marginM.bottom;
	$: cx = _xScale_m(50);
	$: makeArc = (index) => {
		let y = _yScale_m(yMax - 1.5 - (100 / (no_skills+1)) * (index + 1))
		let radius = 45
		let startAngle = 160
		let endAngle = -160
		return describeArc(cx, y, radius, startAngle, endAngle)
	}
</script>

<div class='div_background'>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate({$_marginM.left},{$_marginM.top})'>

				<!-- Rectangles for skills -->
				{#each data.skills as d, i}
					<rect
						class='skills_rects'
						x={_xScale_m(5)}
						y={_yScale_m(yMax - 1.7 - (100 / (no_skills + 1)) * (i + 0.5))}
						fill='transparent'
						stroke={color_skills(d.broad_skill_group)}
						stroke-width='4px'
						width={_xScale_m(90)}
						height={_yScale_m(100-(77 / (no_skills + 1)))}
						rx='6px'
						ry='6px'
					/>
				{/each} 

				<!-- Circles for skills -->
				{#each data.skills as d, i}
					<circle
						{cx}
						class='skills_circles'
						cy={_yScale_m(yMax - 1.5 - (100 / (no_skills + 1)) * (i + 1))}
						fill={color_skills(d.broad_skill_group)}
						r={Math.sqrt(d.percent*200/Math.PI)}
					/>
				{/each}

				<!-- Arcs for labels -->
				{#each data.skills as d, i}
					<path
						class='skills_arcs'
						id='margin_arc{i}'
						d={makeArc(i)}
					/>
				{/each}

				<!-- Labels -->
				{#each data.skills as d,i}
					<g class='arc_paths'>

						<text>
							<textPath
								class='skills_text'
								fill='#000000'
								startOffset='50%'
								xlink:href='#margin_arc{i}'
							>
								{d.fine_skill_group}
							</textPath>
						</text>
					</g>

				{/each}

				<!-- Title of chart -->
				{#each titleLines as d, i}
					<text
						class='title'
						dy={1.5*i+'em'}
						fill={color_margin_title}
						x={cx}
						y={_yScale_m(yMax-2)}
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

	.skills_text {
		font-size: 11px;
		font-weight: bold;
		text-anchor: middle;
	}

	.title {
		text-anchor: middle;
		font-size: 14px;
		font-style:  italic;
	}
</style>
