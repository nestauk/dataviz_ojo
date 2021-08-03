import {scaleLinear} from 'd3-scale';
import {derived, writable} from 'svelte/store';
import {xMax, xMin} from './shared/geometry';

export const _heightContainerParent = writable();
export const _heightContainerText = writable();
export const _heightContainerTitle = writable();
export const _innerWidth = writable();
export const _widthContainerParent = writable();
export const _widthContainerTitle = writable();
export const _widthMargin = writable();

// Size of charts
export const _bodyWidth = derived(
	([_innerWidth, _widthContainerParent]),
	([innerWidth, widthContainerParent]) =>
		widthContainerParent >= 1380
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
export const _bodyWidthM = derived(
	([_innerWidth, _widthContainerParent]),
	([innerWidth, widthContainerParent]) =>
		widthContainerParent >= 1380
			? 1380 * 0.15
			: innerWidth >= 1250
				? innerWidth * 0.835 * 0.15
				: 0
);
export const _bodyHeightM = derived(_heightContainerText, hct => hct)
export const _widthM = derived(_bodyWidthM, bw => bw * 0.85)
export const _heightM = derived(_bodyHeightM, bh => bh * 0.975);
export const _marginM = derived(
	[_bodyHeightM, _heightM, _bodyWidthM, _widthM],
	([bodyHeightM, heightM, bodyWidthM, widthM]) => ({
		top: (bodyHeightM-heightM)/2,
		right: (bodyWidthM - widthM) / 2,
		bottom: (bodyHeightM-heightM)/2,
		left: (bodyWidthM - widthM) / 2
	})
);


// X scales for charts
export const _xScale = derived(
	_width,
	width => scaleLinear().domain([xMin, xMax]).range([0, width])
)

// X scale for salaries
export const _xScaleS = derived(
	_width,
	width => scaleLinear().domain([xMin, xMax]).range([0, width])
)

// X scale for title
export const _xScaleT = derived(
	_widthContainerTitle,
	width => scaleLinear().domain([xMin, xMax]).range([0, width])
)
