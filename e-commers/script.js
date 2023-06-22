let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let logo = document.querySelector(".logo")
let productNumberInput = document.querySelector(".product-number")
var productNumber = 0;



var categoryInView = "all";

logo.addEventListener('click', () => {
  categoryInView = "all"
  productNumber = 0;
  fetchProducts()
  
})

productNumberInput.addEventListener("input", (e) => {
  let value = e.target.value;
  if (value > 0 && value < 21) {
    productNumber = value;
    fetchProducts()
  }
})

cartIcon.onclick = () => {
    cart.classList.add('active');
}

closeCart.onclick = () => {
    cart.classList.remove('active');
}

if(document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)

    }
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);

    }
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClick);
    }
document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);
}

function buyButtonClicked(){
    alert('Din order är plaserad')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;

    }
    updatetotal();
}

function addCartClick(event){
    var button = event.target
    console.log(event)
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}


function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText == title) {
        alert("Du har redan lagt till kort");
        return;
      }
    }
  
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);
  }





function updatetotal() {
    var cartBoxes = document.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName("cart-price")[0];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  }

  function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      
      console.log(data);
      displayProducts(data);
    })
    .catch(error => {
      console.error('Det uppstod ett fel:', error);
    });
  }
  fetchProducts()



  function displayProducts(data) {
    var productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML = "";
  
    for (var i = 0; i < data.length; i++) {
      var product = data[i];
     
      var productElement = document.createElement("div");
      productElement.classList.add("product-item");
  
     

      var productBox = document.createElement("div")
      productBox.classList.add("product-box");

      var productImg = document.createElement("img");
      productImg.classList.add("product-img");
      productImg.src = product.image
      var productTitle = document.createElement("h2")
      productTitle.classList.add("product-title");
      productTitle.innerText = product.title;

      var price = document.createElement("span")
      price.classList.add("price");
      price.innerText = product.price

      var addProduct = document.createElement("i")
      addProduct.classList.add("bx", "bxs-shopping-bag", "add-cart");

     
      addProduct.addEventListener("click", (e) => addCartClick(e))
      
      

      productBox.appendChild(productImg)
      productBox.appendChild(productTitle)
      productBox.appendChild(price)
      productBox.appendChild(addProduct)
  
      productElement.appendChild(productBox);

      if (productNumber == 0) {
        if (categoryInView == product.category || categoryInView == "all") {
          console.log(categoryInView)
          productsContainer.appendChild(productElement);
        }
      } else {
        if (productNumber == product.id) {
          productsContainer.appendChild(productElement);
        }
      }
      
      
      
 
    }
  }

function getCategories() {
  

    fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(data => { 
      displayCategories(data);
    })
    .catch(error => {
      console.error('Det uppstod ett fel:', error);
    });
}

function displayCategories(data) {
  var categoriesContainer = document.querySelector('.categories-container');

  data?.forEach(category => {
    var categoryBtn = document.createElement("button")
    categoryBtn.classList.add("category-btn");
    categoryBtn.innerText = category;
    categoriesContainer.appendChild(categoryBtn)

    categoryBtn.addEventListener("click", (e) => {
      categoryInView = e.target.innerText
      productNumber = 0;
      fetchProducts()
    })
    
    
  });
  
}

getCategories()

