<script>

	import { Router, Route } from 'svero';

	import Article from './pages/Article.svelte';
	import Header from './pages/components/Header.svelte';
	import Feed from './pages/Feed.svelte';
	import About from './pages/About.svelte';

	export let name;

</script>

<style lang="stye/sass">

</style>

<svelte:head>
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
</svelte:head>


<div class="container">

	<Header/>
	
	<Router>
		<Route path="*" component={ Feed } />
		<Route path="/article" component={ Article } />
		<Route path="/about" component={ About } />
	</Router>

</div>



