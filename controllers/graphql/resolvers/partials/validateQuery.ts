/**
 * Returns query depending
 * on the presence given query in params
 */

export default (input): object | RegExp => input || /./;
