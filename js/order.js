
// Retrieve the cart data from local storage
let cartData = JSON.parse(localStorage.getItem('cart')) || [];

const orderSummaryContainer = document.getElementById('order-summary');
const cartTotal = document.querySelector('.cart-total');
const orderButton = document.querySelector('#submit')
const cartItems = document.querySelector('.cart-items')

//create elements for the order page
function displayData() {
  cartItems.innerHTML = '';
  for (const item of cartData) {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
          <img class="cart-item-image" src="${item.image}" alt="${item.name}">
          <div>
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <div class="btn-qtd-remv">
              <div class="cart-item-quantity">
                  <input type="number" id="quantity-${item.id}" name="quantity-${item.id}" min="1" value="${item.quantity}" data-id="${item.id}">
              </div>
              <i data-id="${item.id}" class="remove-from-cart fa-solid fa-trash"></i>
            </div>
          </div>
        `;
    cartItems.appendChild(cartItem);
  }
  //get the total
  const total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  //test the total to dont show the order button if the cart is empty
  if (!total != 0) {
    orderButton.style.display = "none";
  }

}
displayData()

// change localstorage when we change the quantity
cartItems.addEventListener('input', e => {
  if (e.target.tagName.toLowerCase() === 'input' && e.target.getAttribute('type') === 'number') {
    const id = e.target.getAttribute('data-id');
    const quantity = parseInt(e.target.value);
    const existingItem = cartData.find(i => i.id === id);
    if (existingItem) {
      existingItem.quantity = quantity;
      saveCart();
    }
  }
});

//save and refresh order list when change something
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartData))
  displayData()

}

function removeFromCart(id) {
  // get only the items that is different from the one that I removed
  cartData = cartData.filter(i => i.id !== id);
  saveCart();
}

// remove items from the cart
cartItems.addEventListener('click', e => {
  if (e.target.classList.contains('remove-from-cart')) {
    const id = e.target.getAttribute('data-id');
    removeFromCart(id);
  }
});

// get datas from html to save and submit the order
const button = document.getElementById('submit')
const form = document.getElementById('form')
let inputs = form.querySelectorAll("input")
let order = JSON.parse(localStorage.getItem('order')) || [];

button.addEventListener('click', (event) => {
  event.preventDefault()
  let result = {}

  for (const input of inputs) {
    result[input.name] = input.value
  }

  order.push({
    result, cartData
  });
  localStorage.setItem('order', JSON.stringify(order))

  window.location.href = 'kitchen.html';
  
  localStorage.removeItem('cart')

});

