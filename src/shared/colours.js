import {scaleOrdinal} from 'd3-scale';

const color_skills_range = [
	'#00857c', 			// green
	'#fbb721', 			// yellow
	'#58BDD1', 			// light blue
	'rgb(255,90,0)', 	// orange
	'rgb(165,148,130)', // grey
	'#c82892',  		// pink
	'#C4B000', 			// light green
	'#5B6FDE'] 			// purple/blue

const color_skills_domain = [
	'Business Administration, Finance & Law',
	'Sales & Communication',
	'Education',
	'Engineering, Construction & Maintenance',
	'Food, Cleaning & Hospitality',
	'Healthcare, Social Work & Research',
	'Information & Communication Technologies',
	'Transversal skills'
]
export const color_skills =
	scaleOrdinal()
	.domain(color_skills_domain)
	.range(color_skills_range);

export const color_nuts2_names = '#000000'
export const color_nuts2_names_bground = '#FFFFFF'

export const color_margin_skills = '#FFFFFF'
export const color_margin_title = '#000000'

export const color_occup_rect = '#000000'
export const color_occup_skill_names = '#000000'
export const color_occup_skill_names_bground = '#FFFFFF'

export const color_salary_rings = '#7f7f7f'
export const color_salary_names = '#000000'
export const color_salary_names_bground = '#FFFFFF'

export const color_stroke_treemap = '#FFFFFF'
export const color_title_text = '#000000'
export const color_title_text_bground = '#FFFFFF'

export const color_legend_bground = '#FFFFFF'
export const color_tooltip_bground = '#FFFFFF' 
