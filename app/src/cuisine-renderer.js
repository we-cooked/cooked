import fetchCuisines from "./cuisine-helper";
import cuisineData from "/src/cuisines.json";
import getRecipe from "./fetch-recipe";
import renderRecipeModal from "./render-recipe";

const cuisineURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

const renderCuisines = async () => {
  //render cuisines in a dropdown, then generate title and blurb underneath
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
      
      // Create bookmark icon
      const bookmarkIcon = document.createElement("span");
      bookmarkIcon.className = "bookmark-icon";
      bookmarkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chef-hat"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589a5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>`;
      bookmarkIcon.setAttribute("aria-label", "bookmark recipe");
      
      // Check if recipe is already bookmarked
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favorites.includes(recipe.idMeal)) {
        bookmarkIcon.classList.add('active');
      }

      // Add bookmark functionality
      bookmarkIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent recipe modal from opening
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (favorites.includes(recipe.idMeal)) {
          // Remove from favorites
          const index = favorites.indexOf(recipe.idMeal);
          favorites.splice(index, 1);
          bookmarkIcon.classList.remove('active');
        } else {
          // Add to favorites
          favorites.push(recipe.idMeal);
          bookmarkIcon.classList.add('active');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
      });

      const p = document.createElement("p");
      const img = document.createElement("img");
      p.textContent = recipe.strMeal;
      img.src = recipe.strMealThumb;
      div.id = recipe.idMeal;
      div.classList.add("recipe");
      div.append(bookmarkIcon, p, img);
      recipeContainer.append(div);

      //add event listeners
      div.addEventListener("click", async () => {
        console.log(`Clicked recipe ID: ${recipe.idMeal}`);
        const recipeData = await getRecipe(recipe.idMeal);
        renderRecipeModal(recipeData);
      });
    });
    event.preventDefault();
  });
};

const renderBookmarksView = async () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const bookmarkedRecipes = document.getElementById('bookmarked-recipes');
  
  // Clear existing bookmarks
  bookmarkedRecipes.innerHTML = '';
  
  if (favorites.length === 0) {
    const message = document.createElement('h3');
    message.textContent = 'No bookmarked recipes yet!';
    bookmarkedRecipes.appendChild(message);
    return;
  }
  
  // Fetch and render each bookmarked recipe
  for (const recipeId of favorites) {
    const recipe = await getRecipe(recipeId);
    
    const div = document.createElement("div");
    div.className = "recipe";
    
    const bookmarkIcon = document.createElement("span");
    bookmarkIcon.className = "bookmark-icon active";
    bookmarkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chef-hat"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589a5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>`;
    bookmarkIcon.setAttribute("aria-label", "remove bookmark");
    
    bookmarkIcon.addEventListener('click', async (e) => {
      e.stopPropagation();
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const index = favorites.indexOf(recipeId);
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      await renderBookmarksView();
    });

    const p = document.createElement("p");
    const img = document.createElement("img");
    p.textContent = recipe.meal;
    img.src = recipe.thumb;
    div.append(bookmarkIcon, p, img);
    bookmarkedRecipes.append(div);

    div.addEventListener("click", () => {
      renderRecipeModal(recipe);
    });
  }
};

// Add this to your initialization code
const initializeNavigation = () => {
  const homeBtn = document.getElementById('home-btn');
  const bookmarksBtn = document.getElementById('bookmarks-btn');
  const mainView = document.getElementById('cuisine-data');
  const dropdown = document.getElementById('dropdown');
  const description = document.getElementById('description');
  
  // Create bookmarks view if it doesn't exist
  let bookmarksView = document.querySelector('.bookmarks-view');
  if (!bookmarksView) {
    bookmarksView = document.createElement('div');
    bookmarksView.className = 'bookmarks-view';
    bookmarksView.innerHTML = `
      <h1>Your Bookmarked Recipes</h1>
      <div id="bookmarked-recipes"></div>
    `;
    mainView.parentNode.insertBefore(bookmarksView, mainView.nextSibling);
  }

  homeBtn.addEventListener('click', () => {
    homeBtn.classList.add('active');
    bookmarksBtn.classList.remove('active');
    mainView.classList.remove('hidden');
    dropdown.classList.remove('hidden');
    description.classList.remove('hidden');
    bookmarksView.classList.remove('active');
  });

  bookmarksBtn.addEventListener('click', async () => {
    bookmarksBtn.classList.add('active');
    homeBtn.classList.remove('active');
    mainView.classList.add('hidden');
    dropdown.classList.add('hidden');
    description.classList.add('hidden');
    bookmarksView.classList.add('active');
    await renderBookmarksView();
  });

  // Ensure we start in home view
  homeBtn.click();
};

// Add this line to your existing initialization code
initializeNavigation();

export default renderCuisines;
