const fetchCuisines = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data:", data);
  console.log(data.meals.length);
  data.meals.forEach((meal) => console.log(meal.strArea));
  return data.meals;
};

export default fetchCuisines;
