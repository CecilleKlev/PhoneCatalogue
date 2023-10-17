<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import FormField from '@/components/common/form/FormField.vue';

type FormFieldProps = {
	modelValue: string;
	label: string;
	type: string;
	placeholder?: string;
};

withDefaults(defineProps<FormFieldProps>(), {
	type: 'text',
});

defineEmits(['update:modelValue']);

const inputId = crypto.randomUUID();
</script>

<template>
	<div class="field-groups">
		<label
			:for="inputId"
			class="field-groups__label"
			>{{ label }}</label
		>
		<input
			:type="type"
			:id="inputId"
			class="field-groups__input"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			:placeholder="placeholder" />
	</div>
</template>

<style scoped>
.field-groups {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	margin-top: 0.5em;
}

.field-groups__label {
	display: inline-block;
	margin-bottom: 0.5rem;
}

.field-groups__input {
	display: block;
	width: 100%;
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	line-height: 1.5;
	color: #495057;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
