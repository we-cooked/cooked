import fetchCuisines from "./cuisine-helper";
import cuisineData from "/src/cuisines.json";

const cuisineURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

const renderCuisines = async () => {
  const cuisineArray = await fetchCuisines(cuisineURL);
  console.log(cuisineArray);
  const dropdown = document.getElementById("cuisines");
  cuisineArray.forEach((el) => {
    const option = document.createElement("option");
    option.textContent = el.strArea;
    dropdown.append(option);
  });
  const cuisineContainer = document.getElementById("cuisine-data");
  dropdown.addEventListener("change", (event) => {
    const selectedCuisine = event.target.value;

    if (selectedCuisine && cuisineData[selectedCuisine]) {
      const { images, blurb } = cuisineData[selectedCuisine];
      const h1 = document.querySelector("#cuisine-data h1");
      h1.textContent = selectedCuisine;
      const desc = document.querySelector("#cuisine-data h3");
      desc.textContent = blurb;
    }
  });
};

export default renderCuisines;
