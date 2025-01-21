import "/src/style.css";
import fetchCuisines from "/src/cuisine-helper.js";
import renderCuisines from "./cuisine-renderer";
// import fetchRecipes from "./recipe-helper";
// import renderRecipes from "./recipe-renderer";

const canadaURL =
  "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian";
const cuisineURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

const main = () => {
  fetchCuisines(cuisineURL);
  renderCuisines();
  // testRoute(canadaURL);
};

main();
