<script>
	import data from '../../data/data.json';
	import {
		color_skills,
		color_stroke_treemap,
		color_title_text,
		color_title_text_bground		
	} from '../shared/colours';
	import {
		titleHeight, 
		yScale_t 
	} from '../shared/geometry';
	import {
		_width_container_title,
		_xScale_t
	} from '../stores';
	import {
		treemap, 
		hierarchy,
		treemapSquarify
	} from 'd3-hierarchy'

	/* consts */
	const smallWidth = 980
	const month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	const splitDateStart = data.metadata.date_start.split('/');
	const monthStart = month[splitDateStart[1] - 1];
	const splitDateEnd = data.metadata.date_end.split('/');
	const monthEnd = month[splitDateEnd[1] - 1];
	const year= splitDateEnd[2]

	/* reactive vars */
	$: width = $_width_container_title;
	$: height = titleHeight;
	$: isSmall = width < smallWidth;
	$: thinStroke = $_xScale_t(0.2);
	$: title_text = isSmall ? ['The Open', 'Jobs', 'Observatory'] : ['The Open Jobs Observatory'];
	$: subtitle_text = isSmall ? ['Open and free', 'insights on UK', 'skill demands'] : ['Open and free insights on UK skill demands'];
	$: date_text = [monthStart+' to '+monthEnd+', '+year]
	$: root = treemap()
	    .tile(treemapSquarify)
	    .size([width, titleHeight])
	    .padding(1)
	    .round(true)
	  	(hierarchy(data.skills_taxonomy)
	      .sum(d => d.value)
	      .sort((a, b) => b.value - a.value))

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
						height={yScale_t(15)}
						x=10
						y={yScale_t(92.5)}
						fill={color_title_text_bground}
						rx='4px'
						ry='4px'
						opacity=0.95
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
						opacity=0.95
					/>				
					<!-- Sits behind subtitle -->
					<rect
						class='subtitle_bground_rect'
						width=690
						height={yScale_t(88)}
						x=10
						y={yScale_t(44)}
						fill={color_title_text_bground}
						rx='4px'
						ry='4px'
						opacity=0.95
					/>
					<!-- Sits behind date -->
					<rect
						class='date_bground_rect'
						width=205
						height={yScale_t(92)}
						x=10
						y={yScale_t(17)}
						fill={color_title_text_bground}
						rx='4px'
						ry='4px'
						opacity=0.95
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
						y={(isSmall) ? yScale_t(37-7*i) : yScale_t(35)}
					>
						{d}
					</text>
				{/each}

				<!-- Date -->
				{#each date_text as d,i}				
					<text
						class='date_text'
						fill={color_title_text}
						x=20
						y={yScale_t(11)}
					>
						{d}
					</text>
				{/each}

			</g>
		</svg>
	{/if}
</div>

<style>
.title_text, .title_text_bground {
	font-size: 46.2222px;
	text-anchor: start;
}
.subtitle_text, .subtitle_text_bground {
	font-size: 23.111px;
	text-anchor: start;
}
.date_text, .date_text_bground {
	font-size: 18px;
	text-anchor: start;
}
/* Larger than 980px */
@media only screen and (min-width: 980px) {
	.title_text, .title_text_bground {
		font-size: 72.889px;
	}
	.subtitle_text, .subtitle_text_bground {
		font-size: 33.7778px;
	}
}
</style>