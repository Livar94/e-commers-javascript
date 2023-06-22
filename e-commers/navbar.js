function getCategories() {
    fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(data => {
      
      console.log(data);
    })
    .catch(error => {
      console.error('Det uppstod ett fel:', error);
    });
}

function loadList() {
    var categoriesContainer = document.querySelector('.categories-container');
    
}

getCategories()