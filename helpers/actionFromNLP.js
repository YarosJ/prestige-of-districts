
const sortCategories = cats => Object.keys(cats).sort((a, b) => cats[b] - cats[a]);

export default (data) => {
  // Adapting received data for dispatcher
  const jsonData = JSON.parse(data);
  const sortedCats = sortCategories(jsonData.result_cats);

  // Return action with payload
  return ({
    type: sortedCats[0],
    payload: {
      service: jsonData.payload.service,
      text: jsonData.text,
      entities: jsonData.result_entities,
      city: jsonData.payload.city,
      country: jsonData.payload.country,
    },
  });
};
