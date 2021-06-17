import {scaleOrdinal} from 'd3-scale';

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
export const color_skills =
	scaleOrdinal()
	.domain(color_skills_domain)
	.range(color_skills_range);

const color_nuts2_names = '#000000'
export const color_nuts2_names_bground = '#FFFFFF'

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