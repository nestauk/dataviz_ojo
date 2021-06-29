import {scaleLinear} from 'd3-scale';
import {derived, writable} from 'svelte/store';
import {xMax, xMin} from './shared/geometry';

export const _innerWidth = writable();
export const _height_container_title = writable();
export const _width_container_title = writable();
export const _height_container_parent = writable();
export const _width_container_parent = writable();
export const _width_margin = writable();
export const _height_container_text = writable();

// Size of charts
export const _bodyWidth = derived(
	([_innerWidth, _width_container_parent]),
	([innerWidth, width_container_parent]) =>
		width_container_parent >= 1380
			? 1380 * 0.85
			: innerWidth >= 1250
				? innerWidth * 0.835 * 0.85
				: innerWidth * 0.95
);
export const _width = derived(_bodyWidth, bw => bw * 0.85);
export const _margin = derived(
	[_bodyWidth, _width],
	([bodyWidth, width]) => ({
		top: 20,
		right: (bodyWidth - width) / 2,
		bottom: 20,
		left: (bodyWidth - width) / 2
	})
);


// Size of left-hand margin
export const _bodyWidth_m = derived(
	([_innerWidth, _width_container_parent]),
	([innerWidth, width_container_parent]) =>
		width_container_parent >= 1380
			? 1380 * 0.15
			: innerWidth >= 1250
				? innerWidth * 0.835 * 0.15
				: 0
);
export const _bodyHeight_m = derived(_height_container_text, hct => hct)
export const _width_m = derived(_bodyWidth_m, bw => bw * 0.85)
export const _height_m = derived(_bodyHeight_m, bh => bh * 0.975);
export const _margin_m = derived(
	[_bodyHeight_m, _height_m, _bodyWidth_m, _width_m],
	([bodyHeight_m, height_m, bodyWidth_m, width_m]) => ({
		top: (bodyHeight_m-height_m)/2,
		right: (bodyWidth_m - width_m) / 2,
		bottom: (bodyHeight_m-height_m)/2,
		left: (bodyWidth_m - width_m) / 2
	})
);



// X scales for charts
export const _xScale = derived(
	_width,
	width => scaleLinear().domain([xMin, xMax]).range([0, width])
)

// X scale for salaries
export const _xScale_s = derived(
	_width,
	width => scaleLinear().domain([xMin, xMax]).range([0, width])
)

// X scale for title
export const _xScale_t = derived(
	_width_container_title,
	width => scaleLinear().domain([xMin, xMax]).range([0, width])
)