<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import router from '@/router';
import { filterRouterName } from '@/router/routerUtils';

import { addSpacesToCamelCase } from '@/helpers/wordUtils';

const BLACK_LISTED_ROUTES = ['AuthCallback', 'Login'];

const originalRoutes = router.options.routes;

const filteredRouter = filterRouterName(originalRoutes, BLACK_LISTED_ROUTES);

const route = useRouter();
const routes = ref(filteredRouter);

const handleSelectedRoute = (index) => {
	const routePath = routes.value[index].path;
	route.push(routePath);
};
</script>

<template>
	<nav>
		<menu class="navbar-menu">
			<li>
				<button
					@click="() => router.push('/home')"
					title="home">
					Unimicro
				</button>
			</li>
			<li
				v-for="(route, index) in routes"
				:key="index"
				class="cursor-pointer">
				<button
					@click="handleSelectedRoute(index)"
					:title="addSpacesToCamelCase(route.name)">
					{{ addSpacesToCamelCase(route.name) }}
				</button>
			</li>
		</menu>
	</nav>
</template>

<style scoped lang="scss">
.navbar-menu {
	display: flex;
	gap: 1em;
	padding: 1.5em;
	color: #fff;
	background: #275df6;
	list-style: none;

	li:first-child {
		margin-right: auto;
	}
}

button {
	all: inherit;
	cursor: pointer;
}

.cursor-pointer {
	cursor: pointer;
}
</style>
