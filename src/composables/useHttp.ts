import { reactive, toRefs } from 'vue';

import AuthService from '@/services/AuthService';

type State<T> = {
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
	isSuccess: boolean;
	data: T | null;
};

export const useHttp = async <T>(url: string, options?: Record<string, unknown>) => {
	const store: any = reactive({
		currentUser: null,
		apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
	});

	const fetchState = reactive<State<T>>({
		isLoading: true,
		isError: false,
		errorMessage: '',
		isSuccess: false,
		data: null,
	});

	const _waitForCurrentUser = async () => {
		const user = await AuthService.getUser();
		store.currentUser = user;
	};

	const sendRequest = async <T>() => {
		fetchState.isLoading = true;

		if (!store.currentUser) {
			await _waitForCurrentUser();
		}

		try {
			const BASE_URL = store.apiBaseUrl;

			const response = await fetch(`${BASE_URL}${url}`, {
				...options,
				headers: {
					Authorization: `Bearer ${store?.currentUser?.access_token}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				fetchState.isError = true;
				throw new Error(`Network response was not ok ${response.statusText}`);
			}

			console.log(store.currentUser);
			fetchState.isSuccess = true;
			fetchState.data = await response.json();
		} catch (error: unknown) {
			const typedError = error as Error;
			fetchState.isError = true;
			fetchState.errorMessage = typedError.message;
		} finally {
			fetchState.isLoading = false;
		}
	};

	await sendRequest();

	return {
		...toRefs(fetchState),
	};
};
