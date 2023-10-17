import ViewContactMenu from './ViewContactMenu.vue';

const contactsRoutes = [
	{
		path: '/contacts',
		name: 'Contacts',
		component: ViewContactMenu,
		children: [
			{
				path: 'add',
				component: () => import('./views/AddContacts.vue'),
			},
			{
				path: 'view',
				component: () => import('./views/ViewContacts.vue'),
			},
			{
				path: 'edit',
				component: () => import('./views/EditContacts.vue'),
			},
			{
				path: 'delete',
				component: () => import('./views/DeleteContacts.vue'),
			},
		],
	},
];

export default contactsRoutes;
