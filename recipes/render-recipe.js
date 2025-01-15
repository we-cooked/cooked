export const renderRecipeModal = (recipeEl, recipe) => {
    const dialog = document.createElement('dialog');

    // heading with name of food
    const h2 = document.createElement('h2');
    h2.textContent = recipe.meal;

    // image of the food with alt text
    const img = document.createElement('img');
    img.src = recipe.thumb;
    img.alt = `A picture of ${recipe.meal}`;

    // type of food
    const category = document.createElement("h4");
    category.textContent = recipe.category;

    // ethnic origin of food
    const area = document.createElement("h4");
    area.textContent = recipe.area;

    // ingredients
    const ingredientsHeading = document.createElement("h3");
    ingredientsHeading.textContent = "Ingredients";
    ingredientsHeading.style.textDecoration = "underline";
    const ingredients = document.createElement("ul");
    for (let i = 0; i < recipe.ingredients.length; i++) {
        // break when `recipe.ingredients[i]` or `recipe.measurements` is falsey
        if (!recipe.ingredients[i] || !recipe.measurements[i]) break;
        const li = document.createElement('li');

        // ingredient measurement and name
        const ingredient = document.createElement('p');
        ingredient.textContent = `${recipe.measurements[i]} ${recipe.ingredients[i]}`
        
        li.appendChild(ingredient);

        ingredients.appendChild(li);
    }

    // instructions
    const instructionsHeading = document.createElement("h3");
    instructionsHeading.textContent = "Steps";
    instructionsHeading.style.textDecoration = "underline";
    const instructions = document.createElement('p');
    instructions.textContent = recipe.instructions;

    // close dialog
    const close = document.createElement('button');
    close.textContent = 'Close';
    close.focus();

    dialog.append(h2, img, category, area, ingredients, instructions, close);

    recipeEl.appendChild(dialog);
}
