<script>
	import {onMount, tick} from 'svelte';

	import Content from './Content.svelte';
	import Footer from './Nesta/Footer.svelte';
	import Header from './Nesta/Header.svelte';
	import MetaTwitter from './MetaTwitter.svelte';
	import Title from './Title.svelte';
	// import Analytics from './Nesta/Analytics.svelte';

	import {_innerWidth} from '../stores';

	let isReady = true;

	onMount(async () => {
		// Force repopulating the DOM to bind event handlers 
		// and resync state of element sizes
		isReady = false;
		await tick();
		isReady = true;
	});
</script>

<svelte:window bind:innerWidth={$_innerWidth}/>

<svelte:head>
	<MetaTwitter />
</svelte:head>

{#if isReady}
	<Header />
	<Title />
	<Content />
	<Footer />
	<!-- <Analytics /> -->
{/if}
