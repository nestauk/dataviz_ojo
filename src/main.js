import '@babel/polyfill';
import App from './components/App.svelte';

new App({
	target: document.getElementById('app'),
});

/* Hot Module Replacement (https://parceljs.org/hmr.html) */

if (module.hot) {
	module.hot.accept()
}
