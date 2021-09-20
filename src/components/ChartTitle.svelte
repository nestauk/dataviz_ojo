<script>
	import data from '../../data/data.json';
	import {
		color_skills,
		color_stroke_treemap,
		color_title_text,
		color_title_text_bground
	} from '../shared/colours';
	import {titleHeight, yScale_t} from '../shared/geometry';
	import {_widthContainerTitle, _xScaleT} from '../stores';
	import {
		treemap,
		hierarchy,
		treemapSquarify
	} from 'd3-hierarchy'

	/* consts */

	// Stroke width for text
	const strokeWidth = '5px'

	const smallWidth = 980

	const month = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
];
	const lastUpdated = data.metadata.last_updated.split('/');
	const monthLastUpdated = month[lastUpdated[1] - 1];
	const yearLastUpdated = lastUpdated[2]

	/* reactive vars */

	$: width = $_widthContainerTitle;
	$: height = titleHeight;
	$: isSmall = width < smallWidth;
	$: thinStroke = $_xScaleT(0.2);
	$: title_text = isSmall
		? ['The Open', 'Jobs', 'Observatory']
		: ['The Open Jobs Observatory'];
	$: subtitle_text = isSmall
		? ['Providing new', 'insights on UK', 'skill demands']
		: ['Providing new insights on UK skill demands'];
	$: date_text = 'Data: '+monthLastUpdated+' '+yearLastUpdated
	$: root = treemap()
		.tile(treemapSquarify)
		.size([width, titleHeight])
		.padding(1)
		.round(true)(
			hierarchy(data.skills_taxonomy)
			.sum(d => d.value)
			.sort((a, b) => b.value - a.value)
		)

</script>

<div>
	{#if width && height}
		<svg {width} {height}>
			<g transform='translate(0,0)'>

				<!-- Treemap -->
				{#each root.leaves() as d,i}
					<g
						class='treemap_group'
						transform=translate({d.x0},{d.y0})
					>
						<rect
							class='treemap_rect'
							width={d.x1-d.x0}
							height={d.y1-d.y0}
							fill={color_skills(d.parent.data.name)}
							stroke={color_stroke_treemap}
							stroke-width={thinStroke}
							rx='4px'
							ry='4px'
						/>
					</g>
				{/each}

				<!-- Backgrounds to text -->
				{#if isSmall}
					<!-- Sits behind title, sub-title and date -->
					<rect
						class='title_bground_rect'
						width=285
						height={yScale_t(12)}
						x=10
						y={yScale_t(92.5)}
						fill={color_title_text_bground}
						rx='4px'
						ry='4px'
					/>
				{:else}
					<!-- Sits behind title -->
					<rect
						class='title_bground_rect'
						width=960
						height={yScale_t(78)}
						x=10
						y={yScale_t(87)}
						fill={color_title_text_bground}
						rx='4px'
						ry='4px'
					/>
					<!-- Sits behind subtitle -->
					<rect
						class='subtitle_bground_rect'
						width=680
						height={yScale_t(88)}
						x=10
						y={yScale_t(44)}
						fill={color_title_text_bground}
						rx='4px'
						ry='4px'
					/>
					<!-- Sits behind date -->
					<rect
						class='date_bground_rect'
						width=135
						height={yScale_t(92)}
						x=10
						y={yScale_t(22)}
						fill={color_title_text_bground}
						rx='4px'
						ry='4px'
					/>
					<!-- Sits behind author -->
					<rect
						class='author_bground_rect'
						width=120
						height={yScale_t(94)}
						x=10
						y={yScale_t(11)}
						fill={color_title_text_bground}
						rx='4px'
						ry='4px'
					/>
				{/if}

				<!-- Title -->
				{#each title_text as d,i}
					<text
						class='title_text'
						fill={color_title_text}
						x=20
						y={(isSmall) ? yScale_t(80-14*i) : yScale_t(70)}
					>
						{d}
					</text>
				{/each}

				<!-- Sub-title -->
				{#each subtitle_text as d,i}
					<text
						class='subtitle_text'
						fill={color_title_text}
						x=20
						y={(isSmall) ? yScale_t(39-7*i) : yScale_t(35)}
					>
						{d}
					</text>
				{/each}

				<!-- Date -->
				<text
					class='date_text'
					fill={color_title_text}
					x=20
					y={yScale_t(16)}
				>
					{date_text}
				</text>

				<!-- Author -->
				<text
					class='author_text'
					fill={color_title_text}
					x=20
					y={yScale_t(6.5)}
				>
					Cath Sleeman
				</text>

			<!-- Caption for tree diagram -->

				<!-- Sits behind caption for tree diagram -->
				<rect
					class='explainer_bground_rect'
					width=320
					height={yScale_t(94)}
					x={$_xScaleT(100)-320}
					y={yScale_t(6)}
					fill={color_title_text_bground}
					rx='4px'
					ry='4px'
					opacity={(isSmall) ? 0 : 0.9}
				/>

				<!-- Text -->
				<text
					class='explainer_text'
					fill={color_title_text}
					x={$_xScaleT(99.5)}
					y={yScale_t(1.5)}
					opacity={(isSmall) ? 0 : 1}
				>
					A treemap showing the demand for skill groups
				</text>

			</g>
		</svg>
	{/if}
</div>

<style>
	.title_text {
		font-size: 46.2222px;
		text-anchor: start;
	}
	.subtitle_text {
		font-size: 23.111px;
		text-anchor: start;
	}
	.date_text {
		font-size: 18px;
		text-anchor: start;
	}
	.author_text {
		font-size: 15px;
		text-anchor: start;
	}

	.explainer_text {
		font-size: 14px;
		text-anchor: end;
		font-weight:  bold;
	}

	.title_bground_rect, .subtitle_bground_rect, .date_bground_rect, .author_bground_rect {
		opacity: 0.9;
	} 

	/* Larger than 980px */
	@media only screen and (min-width: 980px) {
		.title_text {
			font-size: 72.889px;
		}
		.subtitle_text {
			font-size: 33.7778px;
		}
	}
</style>
