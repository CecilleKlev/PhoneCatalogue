<script setup lang="ts">
import { reactive } from 'vue';
import { useToast } from 'vue-toast-notification';

import { useHttp } from '@/composables/useHttp';

import { URLS } from './api/contactsApi';

import { type FormState } from './types/contacts';
import Form from '@/components/common/form/Form.vue';
import FormField from '@/components/common/form/FormField.vue';
import { FORM_STATE_PAYLOAD } from './constants/formState';
import { isEmptyFields, resetFormState } from './helpers/formFields';

const $toast = useToast();

const formState = reactive<FormState>(FORM_STATE_PAYLOAD);

async function handleSubmit() {
	if (isEmptyFields(formState) === false) {
		return $toast.error('Alle feltene må fylles', {
			position: 'top',
		});
	}

	const { isError, errorMessage } = await useHttp(URLS.postBusinessContact, {
		method: 'POST',
		body: JSON.stringify(formState),
	});

	if (isError.value) {
		return $toast.error(errorMessage.value, {
			position: 'top',
			duration: 0,
		});
	}

	$toast.success('Kontakt personen er registrert!', {
		position: 'top',
	});

	resetFormState(formState);
}
</script>

<template>
	<Form
		@submit.prevent="handleSubmit"
		class="form">
		<FormField
			type="text"
			label="Navn"
			v-model="formState.Info.Name" />

		<FormField
			type="text"
			label="Address 1"
			v-model="formState.Info.InvoiceAddress.AddressLine1"
			required />

		<FormField
			type="text"
			label="Address 2"
			v-model="formState.Info.InvoiceAddress.AddressLine2" />

		<FormField
			type="text"
			label="Address 3"
			v-model="formState.Info.InvoiceAddress.AddressLine3" />

		<FormField
			type="text"
			label="By"
			v-model="formState.Info.InvoiceAddress.City" />

		<FormField
			type="text"
			label="Land"
			v-model="formState.Info.InvoiceAddress.Country" />

		<FormField
			type="text"
			label="Landskode"
			v-model="formState.Info.InvoiceAddress.CountryCode" />

		<FormField
			type="text"
			label="Post nummer"
			v-model="formState.Info.InvoiceAddress.PostalCode" />

		<FormField
			type="text"
			label="Telefonnummer landskode"
			v-model="formState.Info.DefaultPhone.CountryCode" />

		<FormField
			type="text"
			label="Beskrivelse"
			v-model="formState.Info.DefaultPhone.Description" />

		<FormField
			type="text"
			label="Telefonnummer"
			v-model="formState.Info.DefaultPhone.Number" />

		<FormField
			type="email"
			label="Epost"
			v-model="formState.Info.DefaultEmail.EmailAddress" />

		<FormField
			type="text"
			label="Kommentar"
			v-model="formState.Info.Comment" />

		<button
			class="form__submit"
			type="submit">
			Legg til
		</button>
	</Form>
</template>

<style scoped>
button {
	align-self: baseline;
}

button:hover {
	background: green;
}
</style>
