<script>
	import Header from "$lib/Header.svelte";
	import "../app.css";
</script>

<Header />

<main class="flex flex-grow">
	<slot />
</main>
