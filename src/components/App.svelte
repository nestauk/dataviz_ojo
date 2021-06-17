<script>
	import Content from './Content.svelte';
	import Footer from './Nesta/Footer.svelte';
	import MetaTwitter from './MetaTwitter.svelte';
	import Title from './Title.svelte';
	// import Analytics from './Nesta/Analytics.svelte';

	import {_innerWidth} from '../stores';
</script>

<svelte:window bind:innerWidth={$_innerWidth}/>

<svelte:head>
	<MetaTwitter />
</svelte:head>

<Title />
<Content />
<Footer />
<!-- <Analytics /> -->
