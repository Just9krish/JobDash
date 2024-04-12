/**
 * An array of routes that are acessible to the public
 * This routes does not required authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are protected
 * This routes does required authentication
 * @type {string[]}
 */
export const authRoutes = ["/login", "/signup"];

/**
 * The prefix for API authentication routes
 * Route that are start with this prefix are used for API
 * authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The prefix for API authentication routes
 * Route that are start with this prefix are used for API
 * authentication purposes
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
