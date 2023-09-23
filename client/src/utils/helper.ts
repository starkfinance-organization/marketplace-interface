export const filterEmptyQueryParams = (queryParams = {}) => {
  const filteredQueryParams: any = {};
  Object.entries(queryParams)
    .filter(([_, value]) => !!value || value !== null)
    .forEach(([key, value]) => (filteredQueryParams[key] = value));

  return filteredQueryParams;
};
