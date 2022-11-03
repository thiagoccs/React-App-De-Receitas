const fetchAPI = async (url, queryType, query) => {
  const response = await fetch(`https://www.${url}.com/api/json/v1/1/${queryType}=${query}`);
  const item = await response.json();
  return item;
};
export default fetchAPI;
