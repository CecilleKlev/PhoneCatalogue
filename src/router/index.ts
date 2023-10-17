import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import contactsRoutes from '../views/Contacts/contactsRoutes';
import AuthCallbackView from '../views/AuthCallbackView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Login',
			component: LoginView,
		},
		{
			path: '/auth-callback',
			name: 'AuthCallback',
			component: AuthCallbackView,
		},
		{
			path: '/home',
			name: 'Home',
			component: HomeView,
		},
		...contactsRoutes,
	],
});

export default router;
