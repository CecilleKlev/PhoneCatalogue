export type FormState = {
	Info: {
		Name: string;
		InvoiceAddress: {
			AddressLine1: string;
			AddressLine2: string;
			AddressLine3: string;
			City: string;
			Country: string;
			CountryCode: string;
			PostalCode: string;
		};
		DefaultPhone: {
			CountryCode: string;
			Description: string;
			Number: string;
		};
		DefaultEmail: {
			EmailAddress: string;
		};
		Comment: string;
	};
};
