import { parseISO, format } from 'date-fns';

export function formatISODate(date: string) {
	return format(parseISO(date), 'dd-MM-yyyy');
}
