import appConfig from '../config/config';

const config = appConfig.NLP;
const sortCategories = cats => Object.keys(cats).sort((a, b) => cats[b] - cats[a]);

export default (data) => {
  // Adapting received data for dispatcher
  const result = {};
  const jsonData = JSON.parse(data);
  const sortedCats = sortCategories(jsonData.result_cats);
  Object.keys(config).forEach((t) => {
    result[t] = sortedCats.find(c => config[t].indexOf(c) !== -1);
  });

  // Return action with payload
  return ({
    type: result.actions,
    payload: {
      service: result.services,
      text: jsonData.text,
      entities: jsonData.result_entities,
      city: jsonData.payload.city,
      country: jsonData.payload.country,
    },
  });
};
