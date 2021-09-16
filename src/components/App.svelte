<script>
	import {GoogleAnalytics} from '@beyonk/svelte-google-analytics';
	import {onMount} from 'svelte';

	import Content from './Content.svelte';
	import Footer from './Nesta/Footer.svelte';
	import Header from './Nesta/Header.svelte';
	import Title from './Title.svelte';

	import {isRelease} from '../shared/env';
	import {_innerWidth} from '../stores';

	let isReady = false;

	onMount(async () => {
		// Populate the DOM after mounting to
		// bind resize event handlers correctly.
		isReady = true;
	});
</script>

<svelte:window bind:innerWidth={$_innerWidth}/>

{#if isReady}
	<Title />
	<Content />
	<Footer />
{/if}

<GoogleAnalytics
	enabled={isRelease}
	properties={['UA-1360665-16']}
/>
