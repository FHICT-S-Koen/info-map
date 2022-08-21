<script>
	import "../app.css";

	import ThemeSelector from "$lib/ThemeSelector.svelte";
	import CoordsButton from "$lib/CoordsButton.svelte";
	import ZoomButton from "$lib/ZoomButton.svelte";
	import DatasourcePicker from "$lib/DatasourcePicker.svelte";
</script>

<ThemeSelector />
<CoordsButton />
<ZoomButton />
<DatasourcePicker />

<main class="flex flex-grow">
	<slot />
</main>
