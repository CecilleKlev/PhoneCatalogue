import { type FormState } from '../types/contacts';

export function isEmptyFields(formState: FormState) {
	return Object.values(formState.Info).every(Boolean);
}

export function resetFormState(formState: FormState) {
	const emptyFormState: FormState = {
		Info: {
			Name: '',
			InvoiceAddress: {
				AddressLine1: '',
				AddressLine2: '',
				AddressLine3: '',
				City: '',
				Country: '',
				CountryCode: '',
				PostalCode: '',
			},
			DefaultPhone: {
				CountryCode: '',
				Description: '',
				Number: '',
			},
			DefaultEmail: {
				EmailAddress: '',
			},
			Comment: '',
		},
	};
	Object.assign(formState, emptyFormState);
}
