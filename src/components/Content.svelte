<script>
	import ChartOccupations from './ChartOccupations.svelte'
	import ChartSalaries from './ChartSalaries.svelte'
	import ChartLocations from './ChartLocations.svelte'
	import LegendLocations from './LegendLocations.svelte'
	import LegendSalaries from './LegendSalaries.svelte'
	import LegendOccupations from './LegendOccupations.svelte'
	import Intro from './Intro.svelte'
	import Margin from './Margin.svelte'
	import Section from './Section.svelte'
	import Notes from './Notes.svelte';

	import {
		_heightContainerParent,
		_heightContainerText,
		_widthContainerParent,
		_widthMargin,
	} from '../stores';

	const introParagraphs = [
		'The Open Jobs Observatory is a pilot project that shares free, monthly insights on UK skill demands.'
	];

</script>

<div
	bind:clientHeight={$_heightContainerParent}
	bind:clientWidth={$_widthContainerParent}
	class='container_parent'
>

	<div
		class='container_left_col'
		bind:clientWidth={$_widthMargin}
	>
		<Margin />
	</div>

	<div
		bind:clientHeight={$_heightContainerText}
		class='container_text'
	>
		<Intro paragraphs={introParagraphs} />

		<!-- what is the observatory -->
		<div class='text_content'>
			<h2>What is the Observatory?</h2>
			<p>The Observatory provides insights on the skills mentioned in UK job adverts. We began collecting online job postings in January 2021 and the Observatory now contains several million job adverts. Information on skill demands is not available from official vacancy statistics, and the need for timely and free intelligence about skills has only been heightened by the COVID-19 pandemic.</p>
			<p>This article provides an introduction to the Observatory, and the data visualisations show some of <a href='https://github.com/nestauk/ojo_daps_mirror'>the data series that are available to download</a>. These are based on <i>new job adverts</i> (excluding duplicates) that were collected in the 6 weeks leading up to the 15th day of the month. This approach approximates the <i>stock of all adverts</i> that were live on that date. The data series will be updated monthly.</p> 
			<p><i>The pilot stage of the Observatory was created by Nesta, in partnership with the <a href='https://www.gov.uk/government/organisations/department-for-education'>Department for Education</a> as part of the <a href='https://challenges.org/careertech-challenge-prize/'>Career Tech Challenge</a>.</i></p>
		</div>

		<!-- why did we create the observatory -->
		<div class='text_content'>
			<h2>Why did we create the Observatory?</h2>
			<p>We created the Observatory to provide free and timely access to information on skill demands. In recent years we have spoken to many groups, who are interested in understanding the skills requested by employers, but who don’t have easy access to this information. These groups include local authorities, who must decide where to focus their funding for further education, and career advice organisations, who must keep up to date with the latest in-demand skills required for many different occupations.</p> 
			<p>A broader aim of the project is to show how we can build new data infrastructure that enriches the supply of labour market information. Although the Observatory contains less than a year’s worth of job adverts, we can already begin to provide insights on a number of areas, including the most frequently-requested skills, the differences in skill demands across regions, the skills requested in the most advertised jobs and the salary ranges that are typically offered alongside the most in-demand skills.
		</div>

		<!-- locations -->
		<h2 class='dataviz_heading'>How do skill demands vary across the UK?</h2>
		<LegendLocations />
		<ChartLocations />
		<div class='text_content'>
			<p class='notes'>The chart above shows the make-up of skill demands across the UK. Each advert has been assigned to a <a href='https://en.wikipedia.org/wiki/NUTS_statistical_regions_of_the_United_Kingdom'>NUTS-2 area</a> (London areas have been merged) and each skill has been clustered into a skills taxonomy. The chart shows the broadest skill groups in the taxonomy.</p>
		</div>

		<!-- what do we mean by ‘skills’? -->
		<div class='text_content'>
			<h2>What do we mean by ‘skills’?</h2>
			<p>We are using the word ‘skill’ in its broadest sense, and we are aiming to capture not only skills, but also knowledge, attitudes and values. We began with the 13,485 skills and competences in the <a href='https://ec.europa.eu/esco/portal'>European Skills/Competences, qualifications and occupations framework (ESCO)</a>. To detect these ‘skill entities’ within an online job posting, we looked at the available textual information on the skill’s preferred and alternative labels, as well as its description. We used natural language processing techniques to generate a set of ‘surface forms’ from these texts - simpler words and phrases that represent the underlying skills entity - and searched for them in the job postings. We created over 100,000 surface forms to detect within adverts. <a href='https://www.nesta.org.uk/project-updates/skills-extraction-OJO/'>Further detail on the skills extraction algorithm is provided in this technical article</a>.</p>
			<p>In order to provide tractable insights on skills, we have clustered the surface forms into a taxonomy. At the top (or ‘broadest’) level of the taxonomy, there are eight groups of skills, including one group that consists entirely of transversal skills (which in turn are made up of general workplace skills and languages). <a href='https://github.com/nestauk/ojo_daps_mirror/tree/main/ojd_daps/flows/enrich/labs/skills'>The full skills taxonomy is available on GitHub</a>.</p>   
		</div>

		<!-- occupations -->
		<h2 class='dataviz_heading'>Which skills are required in frequently advertised occupations?</h2>
		<!--<LegendOccupations/>-->
		<ChartOccupations />
		<div class='text_content'>
			<p class='notes'>The chart above shows how adverts for frequently advertised occupations mention skills from each of the broad skill groups in the taxonomy.</p>
		</div>

		<!-- how can I access the data? -->
		<div class='text_content'>
			<h2>How can I access the data?</h2>
			<p><a href='https://github.com/nestauk/ojo_daps_mirror'>The aggregated data in the Observatory is free and can be downloaded from GitHub</a>. These data series will be updated on a monthly basis, as long as the project continues. The series in the Observatory are highly experimental and are subject to revision, as we continue to improve aspects of the pipeline such as removing duplicate adverts and extracting skills. Before using the data in the Observatory it is also important to remember that the skills mentioned within a job advert may not fully capture the skills required to perform that job. Moreover, not all vacant positions are advertised online and we are not collecting all online job adverts. Unfortunately, we cannot share our dataset of job adverts.</p>   
		</div>

		<!-- finding green jobs -->
		<div class='text_content_box'>
			<h2>Finding green jobs</h2>
			<p>Following the <a href='https://www.gov.uk/government/news/uk-government-launches-taskforce-to-support-drive-for-2-million-green-jobs-by-2030'>Government’s announcement to support the creation of two million green jobs by 2030</a>, we have used the Open Jobs Observatory to develop a preliminary methodology for detecting job adverts in green sectors. Developing the capacity to spot these jobs, and examining how they are spread across the UK, is critical for helping workers to transition into these roles. <a href='https://www.nesta.org.uk/project-updates/green-jobs-results-OJO/'>Our findings are contained in this article</a>, while <a href='https://www.nesta.org.uk/project-updates/green-jobs-methodology-OJO/'>the complete methodology for identifying jobs in green sectors is presented in this technical write-up</a>. <a href='https://github.com/nestauk/grjobs'>The code is available on GitHub</a>. Given Nesta’s commitment to creating <a href='https://www.nesta.org.uk/sustainable-future/'>a Sustainable Future</a>, we will continue to evolve our methodology for detecting these jobs.</p>
		</div>
  

		<!-- how was the observatory created? -->
		<div class='text_content'>
			<h2>How was the Observatory created?</h2>
			<p>To contribute towards an open standard, we have released (under an MIT license) <a href='https://github.com/nestauk/ojo_daps_mirror'>our algorithms for extracting locations and skills, as well as our preliminary algorithm for assigning occupation groups (SOC codes) to job adverts</a>. This <a href='https://www.nesta.org.uk/project-updates/methodology-overview-OJO/'>slide deck provides a technical overview of our methodology</a>. We have also written in-depth articles that walk-through <a href='https://www.nesta.org.uk/project-updates/skills-extraction-OJO/'>extracting skills</a>, <a href='https://www.nesta.org.uk/project-updates/SOC-assignment-OJO/'>assigning jobs to occupation groups</a> and <a href='https://www.nesta.org.uk/project-updates/location-extraction-OJO/'>identifying the locations of jobs</a>. By releasing our code and these other resources, we hope to contribute towards an open methodology for extracting key information from job adverts. Currently, there are very few such technical resources available.</p>   
		</div>

		<!-- salaries -->
		<h2 class='dataviz_heading'>What salaries are advertised with different skill groups?</h2>
		<LegendSalaries />
		<ChartSalaries />
		<div class='text_content'>
			<p class='notes'>The chart above shows the salary ranges in those adverts which also requested skills from the skill groups shown. These are estimates rather than precise figures as many adverts do not mention a salary. All salary ranges have been annualised.</p>
		</div>

		<!-- what are our future plans for the observatory? -->
		<div class='text_content'>
			<h2>What are our future plans for the Observatory?</h2>
			<p>With continued support, there are a number of directions in which to grow the Observatory. One option is to expand the collection to new job boards, with their permission. We would also like to begin extracting qualifications from adverts. This will allow us to examine degree requirements in jobs, which can act as a barrier to employment. We will also continue to evolve our methodology for tagging jobs in green sectors with the aim of highlighting pathways to these jobs. Finally, as more adverts are collected, we will be able to investigate the issues of seasonality and representation across industries.</p>
			<p>The Observatory is a pilot project and we welcome your feedback and suggestions for future improvements. We are also seeking funding to keep the Observatory running. If you have suggestions or are interested in supporting the work of the Observatory, please reach out to us by emailing <a href='mailto: dataanalytics@nesta.org.uk'>dataanalytics@nesta.org.uk</a>.</p>   
		</div>

	</div>

</div>


<style>
	.container_parent {
		margin: 0px auto;
		max-width: 1380px;
		overflow: hidden;
		width: 95%;
	}

	.container_left_col {
		float:left;
		flex-basis: 0;
		margin: 0px auto;
		min-width: 0;
		max-width: 0;
		height: 100%;
	}

	.container_text {
		float:right;
		flex-basis: 100%;
		margin: 0px auto;
		max-width: 100%;
		min-width: 100%;
	}

	.text_content {
		font-size: 18px;
		line-height: 32.4px;
		margin: 0px auto;
		padding: 20px 28px;
		position: relative;
	}

	.text_content p {
		margin-bottom: 28px
	}

	.text_content_box {
		background-color: #3A2051;
		font-size: 18px;
		line-height: 32.4px;
		margin: 0px auto;
		padding: 20px 28px;
		position: relative;
	}

	.text_content_box p {
		margin-bottom: 28px;
		color:  #FFFFFF;
	}

    .text_content_box a {
        color: #FFFFFF;
      }

    .text_content_box a:hover {
        color: #FFFFFF;
    }

	.text_content_box h2 {
		color:  #FFFFFF;
	}

	h2 {
		font-family: 'AvertaBold', sans-serif;
		font-size: 23.111px;
		font-weight: 700;
		line-height: 32.3555px;
		margin-bottom: 28px;
	}

	.dataviz_heading {
		text-align: center;
		margin-bottom: 0px;
	}

    .text_content a {
        color: #e61f47;
      }

    .text_content a:hover {
        color: #231f20;
    }

	.notes {
		color: #706467;
		line-height: 1.5;
		font-size: 14px;
	}

	/* Larger than 1250px */
	@media only screen and (min-width: 1250px) {
		.container_parent {
			max-width: 1380px;
			width: 83.5%;
		}
		.container_text {
			flex-basis: 85%;
			min-width: 85%;
			max-width: 85%;
		}
		.container_left_col {
			flex-basis: 15%;
			min-width: 15%;
			max-width: 15%;
		}
	}


</style>
