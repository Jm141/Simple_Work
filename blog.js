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

function openNav() {
    document.getElementById("myNavbar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("myNavbar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}