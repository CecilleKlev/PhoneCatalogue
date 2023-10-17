type Route = {
	name: string;
};

/**
 * The function filters out routes from an array based on a blacklist of names.
 * @param {Route[]} routes - An array of objects representing different routes from Vue Router. Each route object has a
 * property called "name" which represents the name of the route.
 * @param {string[]} blacklist - An array of strings representing the names of routes that should be
 * excluded from the filtered result.
 * @returns an array of routes that do not have a name that is included in the blacklist array.
 */
export function filterRouterName(routes: Route[], blacklist: string[]) {
	return routes.filter((route) => !blacklist.includes(route.name));
}
