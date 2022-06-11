<script lang="ts">
	import ThemeSelector from "./ThemeSelector.svelte";
	import DatasourcePicker from "./DatasourcePicker.svelte";
	import CoordsButton from "./CoordsButton.svelte";
	import ZoomButton from "./ZoomButton.svelte";
</script>

<header>
	<nav
		class="relative flex flex-row justify-between mx-4 py-4 dark:bg-slate-700 border-b-2 border-gray-100 dark:border-slate-600 h-[78px]"
	>
		<ThemeSelector />
		<div class="flex gap-1">
			<CoordsButton />
			<ZoomButton />
			<DatasourcePicker />
		</div>
	</nav>
</header>
