
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
              <i data-id="${cartData.indexOf(item)}" class="remove-from-cart fa-solid fa-trash"></i>
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

// remove the item from the cart
function removeFromCart(id) {
  cartData.splice(id, 1);
  saveCart();
}

// calls function to remove items from the cart
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

  // Validate inputs
  const isValid = validateForm();
  if (isValid) {
    let result = {}

    for (const input of inputs) {
      result[input.name] = input.value
    }

    order.push({
      result, cartData
    });
    localStorage.setItem('order', JSON.stringify(order))

    alert("Order sent, thank you!")

    location.reload()

    localStorage.removeItem('cart')
  }
});

  // Validate inputs
function validateForm() {
  const nameInput = document.getElementById('fname');
  const lnameInput = document.getElementById('lname');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('address');
  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addressRegex = /^[a-zA-Z0-9\s,'-]*$/; // Apenas letras, números, espaços, apóstrofos, vírgulas e hifens são permitidos

  // Validate first name
  if (nameInput.value.trim() === '') {
    alert('Please enter a valid first name.');
    return false;
  } else if (!nameRegex.test(nameInput.value)) {
    alert('Please enter a valid first name containing only letters and spaces.');
    return false;
  }

  // Validate lastname
  if (lnameInput.value.trim() === '') {
    alert('Please enter a valid last name.');
    return false;
  } else if (!nameRegex.test(lnameInput.value)) {
    alert('Please enter a valid last name containing only letters and spaces.');
    return false;
  }

  // Validate email
  if (emailInput.value.trim() === '') {
    alert('Please enter a valid email address.');
    return false;
  } else if (!emailRegex.test(emailInput.value)) {
    alert('Please enter a valid email address');
    return false;
  }

  // Validate address
  if (addressInput.value.trim() === '') {
    alert('Please enter a valid address.');
    return false;
  } else if (!addressRegex.test(addressInput.value)) {
    alert('Please enter a valid address containing only letters, numbers, spaces, apostrophes, commas and hyphens.');
    return false;
  }

  return true;
}