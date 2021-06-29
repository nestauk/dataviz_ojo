import {scaleLinear} from 'd3-scale';
import {derived, writable} from 'svelte/store';

import {xMax, xMin} from './shared/geometry';

export const _innerWidth = writable();
export const _height_container_title = writable();
export const _width_container_title = writable();
export const _height_container_parent = writable();
export const _width_container_parent = writable();
export const _width_margin = writable();

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

// X scales
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