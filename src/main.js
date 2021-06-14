/* external dependencies */

import {select} from 'd3-selection';
import {scaleLinear, scaleOrdinal} from 'd3-scale';
import {sankey, sankeyLinkHorizontal} from 'd3-sankey';

/* data */

import data from '../data/data.json';

/* Hot Module Replacement (https://parceljs.org/hmr.html) */

if (module.hot) {
  module.hot.accept()
}

/* main */

//////////////////////
// MARGIN          //
//////////////////////

let chartSVG_m = select('#chart_m').append('svg')
let svg_m = chartSVG_m.append('g')

//////////////////////
// LOCATIONS        //
//////////////////////

let chartSVG = select('#chart').append('svg')
let svg = chartSVG.append('g')

//////////////////////
// OCCUPATIONS      //
//////////////////////

let chartSVG_2 = select('#chart_2').append('svg')
let svg_2 = chartSVG_2.append('g')

//////////////////////
// SALARIES         //
//////////////////////

let chartSVG_3 = select('#chart_3').append('svg')
let svg_3 = chartSVG_3.append('g')



//////////////////////////
// SCALES & PARAMETERS  //
//////////////////////////

// Universals for scales
const small_width = 750
const xMin = 0;
const xMax = 100;
const yMin = 0;
const yMax = 100;
const xScale = scaleLinear().domain([xMin,xMax])
const yScale = scaleLinear().domain([yMin,yMax])

// Scales for margins
const xScale_m = scaleLinear().domain([xMin,xMax])
const yScale_m = scaleLinear().domain([yMin,yMax])

// Scales for salaries
const xScale_s = scaleLinear()
const yScale_s = scaleLinear()


// Parameters for locations
let no_y_pos;
let no_y_pos_small;
let no_x_pos;
let no_x_pos_small;
// Proportion of each area (in each direction) that will be taken up by
// stacked bar chart
const prop_space_x = 0.95
const prop_space_y = 0.9
// Height adjustment for NUTS2 area names
const height_adj_nuts_text = ['0.5em', '0em', '-0.5em','-1em']

// Parameters for occupations
let sankeyGenerator;

// Parameters for salaries
let no_salaries;
let highest_salary_shown;
let lowest_salary_shown;
let rotate_adj;
let salary_rings = [10, 20,30,40,50]

// Parameters for margins
const radius_circles = 20
let no_skills;

// Colours
const color_skills_range = [
	'rgb(255,90,0)',
	'#EB0085',
	'rgb(255,184,25)',
	'#24C7C9',
	'#B4D905'
]
const color_skills_domain = [
	'broad_skill_group_1',
	'broad_skill_group_2',
	'broad_skill_group_3',
	'broad_skill_group_4',
	'broad_skill_group_5'
]
const color_skills = scaleOrdinal()
color_skills.domain(color_skills_domain)
color_skills.range(color_skills_range)

const color_nuts2_names = '#000000'
const color_nuts2_names_bground = '#FFFFFF'

const color_skills_names = '#575757'
const color_skills_names_bground = '#FFFFFF'

const color_occupation_rect = '#000000'
const color_occupation_skill_names = '#000000'
const color_occupation_skill_names_bground = '#FFFFFF'

const color_salary_rings = '#000000'
const color_salary_names = '#000000'
const color_salary_names_bground = '#FFFFFF'
const color_salary_axis = '#FFFFFF'
const color_salary_axis_bground = '#000000'


//////////////////////
// DEFINE SHAPES    //
//////////////////////

// Define shapes
function setup(data){

  //////////////////////
  // LOCATIONS        //
  //////////////////////

  // Number of x and y positions in the map
  let all_x_pos = data['locations'].map(function(d,i) { return d.x_pos})
  no_x_pos = all_x_pos.filter((item, i, ar) => ar.indexOf(item) === i).length;
  let all_x_pos_small = data['locations'].map(function(d,i) { return d.x_pos_small})
  no_x_pos_small = all_x_pos_small.filter((item, i, ar) => ar.indexOf(item) === i).length;
  let all_y_pos = data['locations'].map(function(d,i) { return d.y_pos})
  no_y_pos = all_y_pos.filter((item, i, ar) => ar.indexOf(item) === i).length;
  let all_y_pos_small = data['locations'].map(function(d,i) { return d.y_pos_small})
  no_y_pos_small = all_y_pos_small.filter((item, i, ar) => ar.indexOf(item) === i).length;

  // Group for each NUTS2 area
  svg.selectAll('.nuts2_group')
    .data(data['locations'])
    .enter()
    .append('g')
    .attr('class', 'nuts2_group')

  // NUTS 2 areas rectangles
  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_skills')
  .data(function(d,i) { return d.skills })
  .enter().append('rect')
  .attr('class', 'nuts2_skills')
  .style('fill',function(d,i){ return color_skills(d.broad_skill_group) })
  .style('stroke',function(d,i){ return color_skills(d.broad_skill_group) })
  .style('mix-blend-mode', 'multiply')
  .attr('rx', '3px')
  .attr('ry', '3px')

  // NUTS 2 area names background - wide screen
  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_long_bground')
  .data(function(d,i) { return d.names_long })
  .enter().append('text')
  .attr('class', 'nuts2_names_long_bground')
  .text(function(d,i) { return d[0].toUpperCase()})
  .style('text-anchor', 'middle')
  .style('stroke', color_nuts2_names_bground)

  // NUTS 2 area names - wide screen
  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_long')
  .data(function(d,i) { return d.names_long })
  .enter().append('text')
  .attr('class', 'nuts2_names_long')
  .text(function(d,i) { return d[0].toUpperCase()})

  // NUTS 2 area names background - narrow screen
  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_short_bground')
  .data(function(d,i) { return d.names_short })
  .enter().append('text')
  .attr('class', 'nuts2_names_short_bground')
  .text(function(d,i) { return d[0].toUpperCase()})
  .style('stroke', color_nuts2_names_bground)

  // NUTS 2 area names - narrow screen
  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_short')
  .data(function(d,i) { return d.names_short })
  .enter().append('text')
  .attr('class', 'nuts2_names_short')
  .text(function(d,i) { return d[0].toUpperCase()})

  // Style of NUTS 2 area names
  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_long,.nuts2_names_long_bground,.nuts2_names_short, .nuts2_names_short_bground')
  .style('text-anchor', 'middle')
  .style('fill', color_nuts2_names)
  .style('font-size', '10px')
  .style('font-weight', 'bold')


  //////////////////////
  // OCCUPATIONS      //
  //////////////////////

  // To adjust sankey in resize()
  window.data_occupations = data['occupations'];

  sankeyGenerator = sankey()
  .nodeId(d => d.name)
  .nodeSort(null)
  .nodeWidth(5)
  .nodePadding(15)
  .extent([[1, 5], [700 - 1, 800 - 5]]);

  let data_reformatted_1 = sankeyGenerator({
    nodes: data['occupations']['nodes'],
    links: data['occupations']['links']
  });

  // Black rectangles
  svg_2.selectAll('.occupation_skill_rect')
  .data(data_reformatted_1['nodes'])
  .enter().append('rect')
  .attr('class', 'occupation_skill_rect')
  .attr('fill', color_occupation_rect)
  .attr('rx', '4px')
  .attr('ry', '4px')

  // Paths
  svg_2.selectAll('.occupation_skill_links')
  .data(data_reformatted_1['links'])
  .enter().append('path')
  .attr('class', 'occupation_skill_links')
  .style('stroke', function(d,i) { return color_skills(d.target.name)})
  .style('fill', 'none')
  .style('mix-blend-mode', 'multiply');

  // Background to occupation and skill labels
  svg_2.selectAll('.occupation_skill_text_bground')
  .data(data_reformatted_1['nodes'])
  .enter().append('text')
  .attr('class', 'occupation_skill_text_bground')
  .style('fill', color_occupation_skill_names_bground)
  .style('stroke', color_occupation_skill_names_bground)
  .text(function(d,i) { return d.name.toUpperCase()})

  // Occupation and skill labels
  svg_2.selectAll('.occupation_skill_text')
  .data(data_reformatted_1['nodes'])
  .enter().append('text')
  .attr('class', 'occupation_skill_text')
  .style('fill', color_occupation_skill_names)
  .text(function(d,i) { return d.name.toUpperCase()})

  // Occupation and skill labels - styles
  svg_2.selectAll('.occupation_skill_text, .occupation_skill_text_bground')
  .style('font-size', '10px')
  .style('font-weight', 'bold')
  .style('text-anchor', function(d,i) { return d.targetLinks.length>0 ? 'end' : 'start' })
  .attr('dy', '-0.2em')



  //////////////////////
  // SALARIES         //
  //////////////////////

  // Scales for salaries
  xScale_s.domain([xMin,xMax])

  // Set parameter values
  // Add 5 to no_salaries to leave space for the salary_rings_text
  no_salaries = data['salaries'].length+5
  // Rotate the chart to ensure the min and max salaries straddle the top of the chart
  rotate_adj = 0.225*no_salaries
  // Domain for salary scale (yScale_s)
  // -5 and +3 to give extra space
  let lowest_salary = Math.min.apply(Math, data['salaries'].map(function(d,i) { return d.salaries.lower_bound.lower_q }))
  lowest_salary_shown = Math.min(salary_rings[0],lowest_salary)-5
  let highest_salary = Math.max.apply(Math, data['salaries'].map(function(d,i) { return d.salaries.upper_bound.upper_q }))
  highest_salary_shown = Math.max(highest_salary,salary_rings[salary_rings.length-1])+3
  yScale_s.domain([lowest_salary_shown,highest_salary_shown])

  // Rings to indicate salaries
  svg_3.selectAll('.salary_rings')
  .data(salary_rings).enter().append('circle')
  .attr('class', 'salary_rings')
  .style('fill', 'transparent')
  .style('stroke', color_salary_rings)
  .style('stroke-dasharray', '5,5')

  // Lower quartile of lower bound to median of lower bound
  svg_3.selectAll('.lower_bounds')
  .data(data['salaries']).enter().append('rect')
  .attr('class', 'lower_bounds')
  .style('opacity', 0.25)

  // Median of lower bound to median of upper bound
  svg_3.selectAll('.medians')
  .data(data['salaries']).enter().append('rect')
  .attr('class', 'medians')

  // Median of upper bound to upper quartile of upper bound
  svg_3.selectAll('.upper_bounds')
  .data(data['salaries']).enter().append('rect')
  .attr('class', 'upper_bounds')
  .style('opacity', 0.25)

  // Lines for salaries - styles
  svg_3.selectAll('.lower_bounds, .medians, .upper_bounds')
  .style('fill',function(d,i){ return color_skills(d.broad_skill_group) })
  .attr('rx', '2px')
  .attr('ry', '2px')
  .style('mix-blend-mode', 'multiply');

  // Text to indicate salary associated with each ring - background
  svg_3.selectAll('.salary_rings_text_bground')
  .data(salary_rings).enter().append('text')
  .attr('class', 'salary_rings_text_bground')
  .text(function(d,i) { return (i==salary_rings.length-1 || i==0) ? '£'+d+'k per annum'.toUpperCase() : '£'+d+'k'.toUpperCase()})
  .style('fill', color_salary_axis_bground)
  .style('stroke', color_salary_axis_bground)

  // Text to indicate salary associated with each ring
  svg_3.selectAll('.salary_rings_text')
  .data(salary_rings).enter().append('text')
  .attr('class', 'salary_rings_text')
  .text(function(d,i) { return (i==salary_rings.length-1 || i==0) ? '£'+d+'k per annum'.toUpperCase() : '£'+d+'k'.toUpperCase()})
  .style('fill', color_salary_axis)

  // Text to indicate salary associated with each ring - style
  svg_3.selectAll('.salary_rings_text, .salary_rings_text_bground')
  .style('font-size', '11px')
  .style('font-weight', 'bold')
  .style('text-anchor', 'end')

  // Names of skills - background
  svg_3.selectAll('.salary_skills_name_bground')
  .data(data['salaries']).enter()
  .append('text')
  .attr('class', 'salary_skills_name_bground')
  .text(function(d) { return d.skill_name.toUpperCase() })
  .style('fill', color_salary_names_bground)
  .style('stroke', color_salary_names_bground)

  // Names of skills
  svg_3.selectAll('.salary_skills_name')
  .data(data['salaries']).enter()
  .append('text')
  .attr('class', 'salary_skills_name')
  .text(function(d) { return d.skill_name.toUpperCase() })
  .style('fill', color_salary_names)

  // Names of skills - styles
  svg_3.selectAll('.salary_skills_name, .salary_skills_name_bground')
  .style('font-size', '10px')
  .style('font-weight', 'bold')



  //////////////////////
  // MARGIN           //
  //////////////////////

  // Parameters for margins
  no_skills = data['skills'].length

  // Circles for skills
  svg_m.selectAll('.skills_circles')
  .data(data['skills'])
  .enter().append('circle')
  .attr('class', 'skills_circles')
  .style('fill', function(d,i) { return color_skills(d.broad_skill_group)})
  .style('mix-blend-mode', 'multiply');

  // Arcs for labels
  svg_m.selectAll('.skills_arcs')
  .data(data['skills'])
  .enter().append('path')
  .attr('class', 'skills_arcs')
  .attr('fill','none')
  .attr('id', function(d,i){return 's'+i;})

  // Paths for labels
  let arcPaths = svg_m.selectAll('.arc_paths')
  .data(data['skills'])
  .enter().append('g')
  .attr('class', 'arc_paths')
  .style('font-size', '10px')
  .style('font-weight', 'bold')
  .style('text-anchor', 'middle')

  // Skills labels - background
  arcPaths.append('text')
  .append('textPath')
  .attr('class', 'skills_text_bground')
  .attr('xlink:href',function(d,i){return '#s'+i;})
  .attr('startOffset',function(d,i){return '50%';})
  .text(function(d,i) { return d.skill_name.toUpperCase();})
  .style('fill', color_skills_names_bground)
  .style('stroke', color_skills_names_bground)

  // Skills labels
  arcPaths.append('text')
  .append('textPath')
  .attr('xlink:href',function(d,i){return '#s'+i;})
  .attr('startOffset',function(d,i){return '50%';})
  .text(function(d,i) { return d.skill_name.toUpperCase();})
  .style('fill', color_skills_names)

  // Title of chart
  svg_m.selectAll('.title')
  .data(['Most frequently','demanded skills'])
  .enter().append('text')
  .attr('class', 'title')
  .style('fill', color_skills_names)
  .style('text-anchor', 'middle')
  .text(function(d,i) { return d.toUpperCase() })
  .style('font-size', '12px')
  .style('font-weight', 'bold')


  // Resize function
  resize()


}


function resize() {


  //////////////////////
  // UNIVERSAL        //
  //////////////////////

  let width_container_parent = document.getElementsByClassName('container_parent')[0].clientWidth;
  let bodyWidth = null
  if (width_container_parent>=1380) {
    bodyWidth = 1380*0.85
  } else if (document.body.clientWidth>1250) {
    bodyWidth = document.body.clientWidth*0.835*0.85
  } else {
    bodyWidth = document.body.clientWidth*0.95
  }
  let width = bodyWidth*0.85
    , margin = {top: 0,
                right: (bodyWidth-width)/2,
                bottom: bodyWidth*0,
                left: (bodyWidth-width)/2}
    , height = 700

  xScale.range([0, width]);
  yScale.range([height, 0]);


  //////////////////////
  // LOCATIONS        //
  //////////////////////

  // SVG
  chartSVG.attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  svg.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Positions of NUTS 2 group
  svg.selectAll('.nuts2_group')
  .attr('transform', function(d,i) {
    let translate = 'translate('+xScale(d.x_pos)+','+yScale(d.y_pos)+')'
    if (width<small_width) {
      translate = 'translate('+xScale(d.x_pos_small)+','+yScale(d.y_pos_small)+')'
    }
    return translate
  })

  // Demand by skill group
  if (width<small_width) {
    svg.selectAll('.nuts2_group').selectAll('.nuts2_skills')
    .attr('x', function(d,i) {
      return xScale((prop_space_x*d.percent_cumulative/no_x_pos_small)-(prop_space_x*50/no_x_pos_small))})
    .attr('y', function(d,i) { return yScale(100+(prop_space_y*50/no_y_pos_small))})
    .attr('width', function(d,i) { return xScale(prop_space_x*d.percent/no_x_pos_small)})
    .attr('height', function(d,i) { return yScale(100-(prop_space_y*100/no_y_pos_small))})
    .style('stroke-width', function(d,i) { return xScale(0.2)})
  } else {
    svg.selectAll('.nuts2_group').selectAll('.nuts2_skills')
    .attr('x', function(d,i) {
      return xScale((prop_space_x*d.percent_cumulative/no_x_pos)-prop_space_x*50/no_x_pos) })
    .attr('y', function(d,i) { return yScale(100+(prop_space_y*50/no_y_pos))})
    .attr('width', function(d,i) { return xScale(prop_space_x*d.percent/no_x_pos) })
    .attr('height', function(d,i) { return yScale(100-(prop_space_y*100/no_y_pos))})
    .style('stroke-width', function(d,i) { return xScale(0.2)})
  }


  // NUTS 2 area names - wide screen
  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_long_bground')
  .attr('dy', function(d,i) { return i+'em' })
  .style('stroke-width', function(d,i) { return xScale(0.7)})

  svg.selectAll('.nuts2_group').selectAll('.nuts2_names_long')
  .attr('dy', function(d,i) { return i+'em' })

  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_long_bground, .nuts2_names_long')
  .attr('y', function(d,i) {
    let no_lines = d[1]
    return height_adj_nuts_text[no_lines-1]})
  .style('opacity', function(d,i) { return (width<small_width) ? 0 : 1})


  // NUTS 2 area names - narrow screen
  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_short_bground')
  .attr('dy', function(d,i) { return i+'em' })
  .style('stroke-width', function(d,i) { return xScale(0.7)})

  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_short')
  .attr('dy', function(d,i) { return i+'em' })

  svg.selectAll('.nuts2_group')
  .selectAll('.nuts2_names_short_bground, .nuts2_names_short')
  .attr('y', function(d,i) {
    let no_lines = d[1]
    return height_adj_nuts_text[no_lines-1]})
  .style('opacity', function(d,i) { return (width<small_width) ? 1 : 0})



  //////////////////////
  // OCCUPATIONS      //
  //////////////////////

  // SVG
  chartSVG_2.attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  svg_2.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Adjust sankey for width and height
  sankeyGenerator.size([width, height])
  .extent([[1, 10], [width - 1, height - 10]]);

  // Adjust positions
  let data_reformatted_2 = sankeyGenerator({
      nodes: data_occupations['nodes'],
      links: data_occupations['links']
    });

  // Black rectangles
  svg_2.selectAll('.occupation_skill_rect')
  .data(data_reformatted_2['nodes'])
  .attr('x', function(d,i) { return d.x0})
  .attr('y', function(d,i) { return d.y0})
  .attr('width', function(d,i) { return (d.x1 - d.x0)})
  .attr('height', function(d,i) { return (d.y1 - d.y0) })

  // Background to occupation and skill labels
  svg_2.selectAll('.occupation_skill_text_bground')
  .data(data_reformatted_2['nodes'])
  .attr('x', function(d,i) { return d.x0})
  .attr('y', function(d,i) { return d.y0})
  .style('stroke-width', function(d,i) { return xScale(0.7)})

  // Occupation and skill labels
  svg_2.selectAll('.occupation_skill_text')
  .data(data_reformatted_2['nodes'])
  .attr('x', function(d,i) { return d.x0})
  .attr('y', function(d,i) { return d.y0})

  // Paths
  svg_2.selectAll('.occupation_skill_links')
  .data(data_reformatted_2['links'])
  .attr('d', sankeyLinkHorizontal())
  .attr('stroke-width', function(d,i) { return Math.max(1, d.width) });



  //////////////////////
  // SALARIES         //
  //////////////////////

  // Vary the height as the chart is circular
  let height_s = width

  // Scales
  xScale_s.range([0, width]);
  yScale_s.range([0, height_s*0.5]);

  // SVG
  chartSVG_3.attr('width', width + margin.left + margin.right)
  .attr('height', height_s + margin.top + margin.bottom)
  svg_3.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Rings to indicate salaries
  svg_3.selectAll('.salary_rings')
  .attr('cx', function(d,i) { return xScale_s(50) })
  .attr('cy', function(d,i) { return xScale_s(50)})
  .attr('r', function(d,i) { return yScale_s(d)})
  .style('stroke-width', function(d,i) { return xScale(0.15)})

  // Text to indicate salary associated with each ring - background
  svg_3.selectAll('.salary_rings_text_bground')
  .style('stroke-width', function(d,i) { return xScale(0.7)})

  // Text to indicate salary associated with each ring
  svg_3.selectAll('.salary_rings_text, .salary_rings_text_bground')
  .attr('transform', function(d,i) {
    let x_pos = xScale_s(50)+yScale_s(d)*Math.cos(1.5*Math.PI)
    let y_pos = xScale_s(50)+yScale_s(d)*Math.sin(1.5*Math.PI)
    return 'translate('+x_pos+ ',' + y_pos + ')'
  })

  // Skill labels - background
  svg_3.selectAll('.salary_skills_name_bground')
  .style('stroke-width', function(d,i) { return xScale(0.7)})

  // Skill labels
  svg_3.selectAll('.salary_skills_name,.salary_skills_name_bground')
  .attr('transform', function(d,i) {
    let radius = yScale_s(d.salaries.upper_bound.upper_q)
    let x_pos = xScale_s(50)+radius*Math.cos(2*Math.PI*(d.index-rotate_adj)/no_salaries)
    let y_pos = xScale_s(50)+radius*Math.sin(2*Math.PI*(d.index-rotate_adj)/no_salaries)
    let rotate =  null
    if (360*((d.index-rotate_adj)/no_salaries)>90) {
      rotate = (360*(d.index-rotate_adj)/no_salaries)-180
    } else {
      rotate = (360*(d.index-rotate_adj)/no_salaries)
    }
    let translate_rotate = 'translate('+x_pos+','+y_pos+')rotate('+rotate+')'
    return translate_rotate
  })
  .attr('dy', function(d,i) {
    let dy_adj = '-0.2em'
    if (360*((d.index-rotate_adj)/no_salaries)>90) {
      dy_adj = '0.8em'
    }
    return dy_adj })
  .style('text-anchor', function(d,i) {
    let text_anchor = 'end'
    if (360*((d.index-rotate_adj)/no_salaries)>90) {
      text_anchor = 'start'
    }
    return text_anchor })
  .style('opacity', function(d,i) { return (width<550) ? 0 : (i%5==0) ? 1 : 0})


  // Lower quartile of lower lower bound to median of lower bound
  svg_3.selectAll('.lower_bounds')
  .attr('width', function(d,i) {
    return yScale_s(lowest_salary_shown+d.salaries.lower_bound.median-d.salaries.lower_bound.lower_q)})
  .attr('transform', function(d,i) {
    let radius = yScale_s(d.salaries.lower_bound.lower_q)
    let x_pos = xScale_s(50)+radius*Math.cos(2*Math.PI*(d.index-rotate_adj)/no_salaries)
    let y_pos = xScale_s(50)+radius*Math.sin(2*Math.PI*(d.index-rotate_adj)/no_salaries)
    let rotate = 360*(i-rotate_adj)/no_salaries
    return 'translate('+x_pos+','+y_pos+')rotate('+rotate+')' })

  // Median of lower bound to median of upper bound
  svg_3.selectAll('.medians')
  .attr('width', function(d,i) {
    return yScale_s(lowest_salary_shown+d.salaries.upper_bound.median-d.salaries.lower_bound.median)})
  .attr('transform', function(d,i) {
    let radius = yScale_s(d.salaries.lower_bound.median)
    let x_pos = xScale_s(50)+radius*Math.cos(2*Math.PI*(d.index-rotate_adj)/no_salaries)
    let y_pos = xScale_s(50)+radius*Math.sin(2*Math.PI*(d.index-rotate_adj)/no_salaries)
    let rotate = 360*(i-rotate_adj)/no_salaries
    return 'translate('+x_pos+','+y_pos+')rotate('+rotate+')' })

  // Median of upper bound to upper quartile of upper bound
  svg_3.selectAll('.upper_bounds')
  .attr('width', function(d,i) {
    return yScale_s(lowest_salary_shown+d.salaries.upper_bound.upper_q-d.salaries.upper_bound.median)})
  .attr('transform', function(d,i) {
    let radius = yScale_s(d.salaries.upper_bound.median)
    let x_pos = xScale_s(50)+radius*Math.cos(2*Math.PI*(d.index-rotate_adj)/no_salaries)
    let y_pos = xScale_s(50)+radius*Math.sin(2*Math.PI*(d.index-rotate_adj)/no_salaries)
    let rotate = 360*(i-rotate_adj)/no_salaries
    return 'translate('+x_pos+','+y_pos+')rotate('+rotate+')' })

  // Height (effectively width) of three sets of rectangles
  svg_3.selectAll('.lower_bounds, .medians, .upper_bounds')
  .attr('height', function(d,i) { return xScale_s(1.5)})



  //////////////////////
  // MARGIN          //
  //////////////////////

  let bodyWidth_m = null
  if (width_container_parent>=1380) {
    bodyWidth_m = 1380*0.15
  } else if (document.body.clientWidth>1250) {
    bodyWidth_m = document.body.clientWidth*0.835*0.15
  } else {
    bodyWidth_m = document.body.clientWidth*0.95*0
  }

  let bodyHeight_m = document.getElementsByClassName('container_text')[0].clientHeight;

  let height_m = bodyHeight_m*0.975
    , margin_m = {top: (bodyHeight_m-height_m), right: 0, bottom: 0, left: 0}
    , width_m = bodyWidth_m

  xScale_m.range([0, width_m]);
  yScale_m.range([height_m, 0]);

  // SVG
  chartSVG_m.attr('width', width_m)
  .attr('height', height_m + margin_m.top + margin_m.bottom)
  svg_m.attr('transform', 'translate(' + margin_m.left + ',' + margin_m.top + ')');

  // Circles for skills
  svg_m.selectAll('.skills_circles')
  .attr('cx', function(d,i) { return xScale_m(50) })
  .attr('cy', function(d,i) { return yScale_m(yMax-(100/(no_skills+1))*(i+1)) })
  .attr('r', function(d,i) { return xScale_m(radius_circles)})

  // Title of chart
  svg_m.selectAll('.title')
  .attr('x', function(d,i) { return xScale_m(50) })
  .attr('y', function(d,i) { return yScale_m(yMax) })
  .attr('dy',function(d,i) { return (i==0) ? '0.5em' : '2em'})

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
    let arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    let d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, 1, 1, end.x, end.y
    ].join(' ');
    return d;
  }

  // Skill labels
  svg_m.selectAll('.skills_arcs')
  .attr('d', function(d,i) {
    let x = xScale_m(50)
    let y = yScale_m(yMax-(100/(no_skills+1))*(i+1))
    let radius = xScale_m(radius_circles*1.1)
    let startAngle = 160
    let endAngle = -160
    return describeArc(x, y, radius, startAngle, endAngle)
  });

  // Skill labels - background
  svg_m.selectAll('.skills_text_bground')
  .style('stroke-width', function(d,i) { return xScale_m(3)})


};

// Resize
window.addEventListener('resize', resize);

setup(data);
