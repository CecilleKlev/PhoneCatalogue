<script setup lang="ts">
defineEmits(['update:submit']);
</script>

<template>
	<form @submit="$emit('update:submit', $event as HTMLFormElement)">
		<slot />
	</form>
</template>

<style scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	padding: 1.5em;
	border: solid #f7f7f9;
}
</style>
