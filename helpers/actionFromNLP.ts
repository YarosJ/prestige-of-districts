const sortCategories = (cats): string[] => Object.keys(cats)
  .sort((a, b): number => cats[b] - cats[a]);

interface Action {
  type: string;
  payload: {
    service: string;
    text: string;
    entities: string[];
    city: string;
    country: string;
    date: string;
  };
}

export default (data): Action => {
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
      date: jsonData.payload.date,
    },
  });
};
