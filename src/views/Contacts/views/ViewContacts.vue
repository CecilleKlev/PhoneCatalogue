<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHttp } from '@/composables/useHttp';
import { formatISODate } from '@/helpers/DateFormat';
import { useToast } from 'vue-toast-notification';

import { URLS } from './api/contactsApi';

const businessContacts = ref();
const isLoading = ref<boolean>(false);

const $toast = useToast();

onMounted(async () => {
	const { data, isLoading, isError, errorMessage } = await useHttp(URLS.fetchBusinessContacts);

	if (isError.value) {
		$toast.error(errorMessage.value, {
			position: 'top',
			duration: 0,
		});
	}

	businessContacts.value = data.value;
	isLoading.value = isLoading.value;
});
</script>

<template>
	<h1>View Contact Lists</h1>

	<router-view class="view"></router-view>

	{{ isLoading }}
	<p v-if="isLoading">{{ isLoading }}</p>

	<table v-else>
		<thead>
			<td>Name</td>
			<td>Role</td>
			<td>Phone Number</td>
			<td>Created At</td>
		</thead>

		<tbody v-for="businessContact of businessContacts">
			<tr>
				<td>{{ businessContact.Info.Name }}</td>
				<td>{{ businessContact.Role }}</td>
				<td>{{ businessContact.Info.DefaultPhone.Number }}</td>
				<td>{{ formatISODate(businessContact.CreatedAt) }}</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
table {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
}

td,
th {
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
}

tr:nth-child(even) {
	background-color: #dddddd;
}
</style>
