
const loadFood = (a,b) => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
        .then(src => src.json())
        .then(data => displayFood(data.meals,a,b))
}
const displayFood = (foods,x,y) => {
    // console.log(foods)
    const cardTextBody = document.getElementById('card-body');
        cardTextBody.innerHTML = '';
    foods.slice(x, y).forEach(food => {
        // console.log(food)
         const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card p-1">
                         <div class="card-body row">
                         <div class="col">
                            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                         </div>
                          <div class="col">
                         <h5  class="card-title">${food.strMeal}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                           <!-- Button trigger modal -->
                          <button onclick="loadModal(${food.idMeal})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#loadModalData">
                              view details
                            </button>
                           </div>
                        </div>
                      </div>
                    </div>
        `
        cardTextBody.appendChild(cardDiv)
       
    })
}
const loadModal =async(id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayMoreDetails(data.meals);
    }
    catch(error){
        console.log(error)
    }
}
const displayMoreDetails = foods =>{
    foods.forEach(food =>{
        console.log(food)
        document.getElementById('modalTitle').innerText = food.strMeal;
        const modalBody = document.getElementById('modalBody');
        const modalBodyDiv = document.createElement('div');
        modalBodyDiv.classList.add('p-2')
        modalBodyDiv.innerHTML = `
         <img style="height:300px"; class=" rounded w-100" src="${food.strMealThumb}">
         <p class="mt-3"><span class="fw-bold">Category:</span> ${food.strCategory}</p>
         <p class="mt-3"><span class="fw-bold">Area:</span> ${food.strArea}</p>
         <p class="mt-3"><span class="fw-bold">Instructions:</span> ${food.strInstructions}</p>
         <p><span class="fw-bold">YouTube:</span> ${food.strYoutube}</p>
         
        `
        modalBody.appendChild(modalBodyDiv);
    })
}

const changeFoodItem = () =>{
    a = a + 7;
    b = b + 7;
    loadFood(a,b);
}
let a = 0;
let b = 6;
loadFood(a,b);
