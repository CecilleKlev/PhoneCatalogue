export function addSpacesToCamelCase(inputString: string) {
	// Split the string by uppercase letters
	const words = inputString.split(/(?=[A-Z])/);

	// Join the words with spaces
	const spacedString = words.join(' ');

	return spacedString;
}
