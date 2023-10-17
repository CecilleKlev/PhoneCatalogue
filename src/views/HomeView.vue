<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import router from '@/router';
import AuthService from '@/services/AuthService';

const store: any = reactive({
	currentUser: null,
	sampleReqResponse: null,
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
});

const accessTokenString = computed(() =>
	JSON.stringify(store?.currentUser?.access_token)?.replaceAll('"', '')
);

const sampleReqResponseString = computed(() => JSON.stringify(store.sampleReqResponse));

onMounted(async () => {
	const user = await AuthService.getUser();
	store.currentUser = user;

	if (!user) router.push({ path: '/' });
});

const onLogoutClick = () => {
	AuthService.logout();
};

const sendSampleRequest = () => {
	const url = `${store.apiBaseUrl}/api/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultAddress`;

	fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${store?.currentUser?.access_token}`,
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			store.sampleReqResponse = data;
			console.log('Data: ', data);
		})
		.catch((error) => {
			console.error('Error: ', error);
		});
};

const getUserName = () => {
	const profile = store?.currentUser?.profile;
	const name = profile?.given_name || profile?.name || profile?.email || 'user';
	return name?.charAt(0)?.toUpperCase() + name?.slice(1);
};
</script>

<template>
	<div>
		<div className="section">
			<p className="sub-title-text">Hello {{ getUserName() }} 👋</p>
			<p>You are now logged in, here is your access token:</p>
			<div className="code-block full-width">
				<code>
					{{ accessTokenString }}
				</code>
			</div>
		</div>
		<div className="section">
			<p className="sub-title-text">Example usage of the API</p>
			<p>The example below shows how you can use the API:</p>
			<div className="sample-req">
				<code
					>GET :
					{{
						store.apiBaseUrl
					}}/api/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultAddress</code
				>
				<button
					className="inline-btn"
					@click="sendSampleRequest">
					Send
				</button>
			</div>
			<div v-if="!!store.sampleReqResponse">
				<p className="sample-res-title">Response:</p>
				<div className="code-block full-width">
					<code>
						{{ sampleReqResponseString }}
					</code>
				</div>
			</div>
			<div className="info-container">
				<p className="bold">Important note:</p>
				<ul>
					<li>
						In order to authenticate successfully with the API, you must pass the access token in the
						authorization header
					</li>
					<li>
						If you are using a multi-tenant client, you have to make sure that you pass the CompanyKey in the
						header
					</li>
					<li>The example above is for a single-tenant client, so you do not need to pass the CompanyKey</li>
				</ul>
			</div>
		</div>
		<div className="section">
			<p className="sub-title-text">Log out</p>
			<p>Click the button below to log out</p>
			<button
				className="destructive-btn"
				@click="onLogoutClick">
				Log out
			</button>
		</div>
	</div>
</template>

<style scoped>
.info-container {
	max-width: max-content;
	background: #f3f8ff;
	padding: 0.5rem 1.5rem;
	border-radius: 0.6rem;
	margin-top: 1rem;
	overflow: auto;
	font-size: 14px;
	border: 1px solid #96b4df;
}

ul {
	line-height: 2rem;
}

.sample-req {
	margin-bottom: 1rem;
}

.sample-res-title {
	font-size: 13px;
	font-weight: 500;
}

.full-width {
	max-width: 100%;
}

.destructive-btn {
	background: #c7231b;
}

.inline-btn {
	margin-left: 1rem;
}
</style>
