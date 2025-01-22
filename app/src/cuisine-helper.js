const fetchCuisines = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data:", data);
  return data.meals;
};

export default fetchCuisines;
