/**
 * Retrieves meals of a cuisine
 * @param {String} url link to the database of a specific cuisine
 * @returns {Object} meals of a cuisine
 */
const fetchCuisines = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data:", data);
  return data.meals;
};

export default fetchCuisines;
