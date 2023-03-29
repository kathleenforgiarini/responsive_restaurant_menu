
// get the menu
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

// show or close the menu when the screen is small
menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}


// script to show the back to top button
window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }
}

// show the git of the pizza
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 3000);
}
window.onload = fadeOut();



// cart
const cartBtn = document.getElementById('cart-btn');
const cartContainer = document.querySelector('.cart-container');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');

// take item saved in the local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// update the quantity of items in the cart to show in the menu
cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>(${cart.length})`;

// show the cart with the items
function displayCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
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
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// get the new value of quantity
cartItems.addEventListener('input', e => {
    if (e.target.tagName.toLowerCase() === 'input' && e.target.getAttribute('type') === 'number') {
        const id = e.target.getAttribute('data-id');
        const quantity = parseInt(e.target.value);
        const existingItem = cart.find(i => i.id === id);
        if (existingItem) {
            existingItem.quantity = quantity;
            saveCart();
        }
    }
});


//close or open the cart
function toggleCart(action) {
    cartContainer.style.display = action;
}

// close the cart by clicking on the X button
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
    toggleCart("none");
});


// function to get the items of the buttons "Add to cart" and save it to "cart" which is the local storage
function addToCart(item) {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }

    cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>(${cart.length})`;
    toggleCart("none");
    saveCart();
}

//save the new modifications of the cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
    displayCart()
    toggleCart("block")
}

// remove items from the cart
function removeFromCart(id) {
    // get only the items that is different from the one that I removed
    cart = cart.filter(i => i.id !== id);

    // update the quantity of items in the cart that shows in the menu
    cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>(${cart.length})`;
    saveCart();
}

// open or close the cart when click on cart icon
cartBtn.addEventListener('click', () => {
    displayCart();
    toggleCart("block");
});

// get the add to cart buttons
const addToCartBtns = document.querySelectorAll('.add-to-cart');
// get the data of each item and add to cart
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const image = btn.parentElement.parentElement.querySelector('.menu-item-image').getAttribute('src');
        addToCart({ id, name, price, image });
    });
});

// get the click on the remove button inside the cart and remove the item
cartItems.addEventListener('click', e => {
    if (e.target.classList.contains('remove-from-cart')) {
        const id = e.target.getAttribute('data-id');
        removeFromCart(id);
    }
});

checkoutBtn.addEventListener('click', () => {
    // Add your checkout logic here
});
