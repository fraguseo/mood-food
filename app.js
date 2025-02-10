class MoodFoodApp {
    constructor() {
        this.currentMood = null;
        this.currentRecipeIndex = 0;
        this.initializeEventListeners();
        console.log('MoodFoodApp initialized');
    }

    initializeEventListeners() {
        // Mood selection buttons
        document.querySelectorAll('.mood-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.currentMood = button.dataset.mood;
                this.currentRecipeIndex = 0;
                console.log('Mood selected:', this.currentMood);
                this.showRecipe();
            });
        });

        // New recipe button
        document.getElementById('new-recipe-btn').addEventListener('click', () => {
            this.currentRecipeIndex++;
            this.showRecipe();
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            document.querySelector('.mood-selector').style.display = 'block';
            document.querySelector('.recipe-container').style.display = 'none';
        });
    }

    showRecipe() {
        const recipes = recipeDatabase[this.currentMood];
        console.log('Recipes for mood:', recipes);
        
        // Reset index if we've shown all recipes
        if (this.currentRecipeIndex >= recipes.length) {
            this.currentRecipeIndex = 0;
        }

        const recipe = recipes[this.currentRecipeIndex];
        console.log('Selected recipe:', recipe);

        // Update DOM elements
        document.getElementById('recipe-title').textContent = recipe.title;
        document.getElementById('recipe-image').src = recipe.image;
        
        const ingredientsList = document.getElementById('recipe-ingredients');
        ingredientsList.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });

        const instructionsList = document.getElementById('recipe-instructions');
        instructionsList.innerHTML = '';
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsList.appendChild(li);
        });

        // Show recipe container and hide mood selector
        document.querySelector('.mood-selector').style.display = 'none';
        document.querySelector('.recipe-container').style.display = 'block';
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    new MoodFoodApp();
}); 