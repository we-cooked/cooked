import fetchCuisines from "./cuisine-helper";
import cuisineData from "/src/cuisines.json";
import getRecipe from "./fetch-recipe";
import renderRecipeModal from "./render-recipe";

const cuisineURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

/**
 * Renders cuisines and their dishes
 */
const renderCuisines = async () => {
  // render cuisines in a dropdown, then generate title and blurb underneath
  const cuisineArray = await fetchCuisines(cuisineURL);
  console.log(cuisineArray);
  const dropdown = document.getElementById("cuisines");
  cuisineArray.forEach((el) => {
    const option = document.createElement("option");
    option.textContent = el.strArea;
    option.value = el.strArea;
    dropdown.append(option);
  });
  const cuisineContainer = document.getElementById("cuisine-data");
  dropdown.addEventListener("change", async (event) => {
    const selectedCuisine = event.target.value;
    console.log(selectedCuisine);

    if (selectedCuisine && cuisineData[selectedCuisine]) {
      const { images, blurb } = cuisineData[selectedCuisine];
      const h1 = document.querySelector("#cuisine-data h1");
      h1.textContent = selectedCuisine;
      const desc = document.querySelector("#cuisine-data h3");
      desc.textContent = blurb;
    }
    // render recipes underneath for each cuisine
    const recipeList = await fetchCuisines(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}`
    );

    const recipeContainer = document.getElementById("recipes");
    recipeContainer.innerHTML = "";
    recipeList.forEach((recipe) => {
      const div = document.createElement("div");
      div.className = "recipe";
      const p = document.createElement("p");
      const img = document.createElement("img");
      p.textContent = recipe.strMeal;
      img.src = recipe.strMealThumb;
      div.id = recipe.idMeal;
      div.classList.add("recipe");
      div.append(p, img);
      recipeContainer.append(div);

      // add event listeners
      div.addEventListener("click", async () => {
        console.log(`Clicked recipe ID: ${recipe.idMeal}`);
        const recipeData = await getRecipe(recipe.idMeal);
        renderRecipeModal(recipeData);
      });
    });
    event.preventDefault();
  });
};

export default renderCuisines;
