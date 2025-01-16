const getRecipe = async urlKey => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlKey}`);

        if (!response.ok) throw new Error("/Failed to get recipe/");
        
        const jsonData = await response.json();

        return {
            meal: jsonData.meals[0].strMeal,
            category: jsonData.meals[0].strCategory,
            area: jsonData.meals[0].strArea,
            instructions: jsonData.meals[0].strInstructions,
            thumb: jsonData.meals[0].strMealThumb,
            ingredients: [
                jsonData.meals[0].strIngredient1,
                jsonData.meals[0].strIngredient2,
                jsonData.meals[0].strIngredient3,
                jsonData.meals[0].strIngredient4,
                jsonData.meals[0].strIngredient5,
                jsonData.meals[0].strIngredient6,
                jsonData.meals[0].strIngredient7,
                jsonData.meals[0].strIngredient8,
                jsonData.meals[0].strIngredient9,
                jsonData.meals[0].strIngredient10,
                jsonData.meals[0].strIngredient11,
                jsonData.meals[0].strIngredient12,
                jsonData.meals[0].strIngredient13,
                jsonData.meals[0].strIngredient14,
                jsonData.meals[0].strIngredient15,
                jsonData.meals[0].strIngredient16,
                jsonData.meals[0].strIngredient17,
                jsonData.meals[0].strIngredient18,
                jsonData.meals[0].strIngredient19,
                jsonData.meals[0].strIngredient20
            ],
            measurements: [
                jsonData.meals[0].strMeasure1,
                jsonData.meals[0].strMeasure2,
                jsonData.meals[0].strMeasure3,
                jsonData.meals[0].strMeasure4,
                jsonData.meals[0].strMeasure5,
                jsonData.meals[0].strMeasure6,
                jsonData.meals[0].strMeasure7,
                jsonData.meals[0].strMeasure8,
                jsonData.meals[0].strMeasure9,
                jsonData.meals[0].strMeasure10,
                jsonData.meals[0].strMeasure11,
                jsonData.meals[0].strMeasure12,
                jsonData.meals[0].strMeasure13,
                jsonData.meals[0].strMeasure14,
                jsonData.meals[0].strMeasure15,
                jsonData.meals[0].strMeasure16,
                jsonData.meals[0].strMeasure17,
                jsonData.meals[0].strMeasure18,
                jsonData.meals[0].strMeasure19,
                jsonData.meals[0].strMeasure20
            ]
        }
    }
    catch (e) {
        console.warn(e.message);
        return null;
    }
}
