<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';

const router = useRouter();

const currentRouter = () => router.currentRoute.value.path;

console.log(currentRouter());
</script>

<template>
	<menu class="contact-menu">
		<li :class="currentRouter() === '/contacts' ? 'flex-column' : 'flex-row'">
			<router-link :to="{ path: '/contacts/add' }">Add Contact</router-link>
			<router-link :to="{ path: '/contacts/view' }">View Contacts</router-link>
			<router-link :to="{ path: '/contacts/edit' }">Edit Contact</router-link>
			<router-link :to="{ path: '/contacts/delete' }">Delete Contact</router-link>
		</li>
	</menu>

	<RouterView />
</template>

<style scoped>
.contact-menu {
	display: flex;
	margin-top: 1em;
	margin-bottom: 3em;
	list-style: none;
}

.contact-menu li {
	display: flex;
	gap: 1em;
}

.contact-menu li a {
	color: #fff;
	background: #2253dd;
	border: none;
	border-radius: 1.5rem;
	padding: 0.5rem 1.2rem;
	text-decoration: none;
	cursor: pointer;
}

.contact-menu li a:hover {
	color: #fff;
	background: green;
	border: none;
	border-radius: 1.5rem;
	padding: 0.5rem 1.2rem;
	cursor: pointer;
}

.flex-column {
	flex-direction: column;
}

.flex-row {
	flex-row: row;
}
</style>
