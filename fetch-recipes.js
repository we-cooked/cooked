export const getRecipe = async urlKey => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlKey}`);

        if (!response.ok) throw new Error("/Failed to get recipe/");
        
        const jsonData = await response.json();
        return {
            meal: jsonData.strMeal,
            category: jsonData.strCategory,
            area: jsonData.strArea,
            instructions: jsonData.strInstructions,
            thumb: jsonData.strMealThumb,
            ingredients: [
                jsonData.strIngredient1,
                jsonData.strIngredient2,
                jsonData.strIngredient3,
                jsonData.strIngredient4,
                jsonData.strIngredient5,
                jsonData.strIngredient6,
                jsonData.strIngredient7,
                jsonData.strIngredient8,
                jsonData.strIngredient9,
                jsonData.strIngredient10,
                jsonData.strIngredient11,
                jsonData.strIngredient12,
                jsonData.strIngredient13,
                jsonData.strIngredient14,
                jsonData.strIngredient15,
                jsonData.strIngredient16,
                jsonData.strIngredient17,
                jsonData.strIngredient18,
                jsonData.strIngredient19,
                jsonData.strIngredient20
            ],
            measurements: [
                jsonData.strMeasure1,
                jsonData.strMeasure2,
                jsonData.strMeasure3,
                jsonData.strMeasure4,
                jsonData.strMeasure5,
                jsonData.strMeasure6,
                jsonData.strMeasure7,
                jsonData.strMeasure8,
                jsonData.strMeasure9,
                jsonData.strMeasure10,
                jsonData.strMeasure11,
                jsonData.strMeasure12,
                jsonData.strMeasure13,
                jsonData.strMeasure14,
                jsonData.strMeasure15,
                jsonData.strMeasure16,
                jsonData.strMeasure17,
                jsonData.strMeasure18,
                jsonData.strMeasure19,
                jsonData.strMeasure20
            ],
            source: jsonData.strSource
        }
    }
    catch (e) {
        console.warn(e.message);
        return null;
    }
}
