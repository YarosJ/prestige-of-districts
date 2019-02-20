import appConfig from '../config/config';
import ActionDispatcher from './ActionDispatcher';

const config = appConfig.NLP;

function sortCategories(cats) {
  const allCats = Object.keys(cats);
  return allCats.sort((a, b) => cats[b] - cats[a]);
}

export default (data) => {
  // Adapting received data for dispatcher
  const result = {};
  const jsonData = JSON.parse(data);
  const sortedCats = sortCategories(jsonData.result_cats);
  Object.keys(config).forEach((t) => {
    result[t] = sortedCats.find(c => config[t].indexOf(c) !== -1);
  });

  // Dispatch action
  ActionDispatcher.dispatch({
    type: result.actions,
    payload: {
      service: result.services,
      text: jsonData.text,
      entities: jsonData.result_entities,
    },
  });
};
