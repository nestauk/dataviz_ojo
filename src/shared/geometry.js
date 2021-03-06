import {scaleLinear} from 'd3-scale';

export const chartsHeight = 700;
export const legendsHeight = 200;
export const titleHeight = 400;

// Universals for scales
export const xMin = 0;
export const xMax = 100;
export const yMin = 0;
export const yMax = 100;

// Y scale for charts
export const yScale =
	scaleLinear()
	.domain([yMin, yMax])
	.range([chartsHeight, 0]);

// Y scale for legends
export const yScaleLeg =
	scaleLinear()
	.domain([yMin, yMax])
	.range([legendsHeight, 0]);

// Y scale for title
export const yScale_t =
	scaleLinear()
	.domain([yMin, yMax])
	.range([titleHeight, 0]);
