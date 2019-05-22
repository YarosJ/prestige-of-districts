/**
 * Returns query depending
 * on the presence given query in params
 */

const query = (input): object | RegExp => input || /./;

export default query;
