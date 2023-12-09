const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});



function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}



function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}


function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// //handles dropdown
// document.addEventListener("DOMContentLoaded", function () {
//     var dropdowns = document.getElementsByClassName("dropdown");
//     for (var i = 0; i < dropdowns.length; i++) {
//         dropdowns[i].addEventListener("mouseover", function () {
//             this.getElementsByClassName("dropdown-content")[0].style.display = "block";
//         });
//         dropdowns[i].addEventListener("mouseout", function () {
//             this.getElementsByClassName("dropdown-content")[0].style.display = "none";
//         });
//     }
// });
function openNav() {
    document.getElementById("myNavbar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("myNavbar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

const unsplashAccessKey = 'ekQtBapwBvm4O9IQH77Cs8yeUPaTvvYgirjySLiPhgI';

async function fetchRandomFoodImage() {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=food&client_id=${unsplashAccessKey}`);
    const data = await response.json();
    return data.urls.regular;
}

async function addRandomFoodImage(containerId) {
    const imageContainer = document.getElementById(containerId);
    const imageUrl = await fetchRandomFoodImage();

    const img = document.createElement('img');
    img.src = imageUrl;

    imageContainer.appendChild(img);
}

addRandomFoodImage('image-container-1');
addRandomFoodImage('image-container-2');
addRandomFoodImage('image-container-3');