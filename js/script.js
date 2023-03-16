let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }
}

function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 3000);
}

window.onload = fadeOut();




const cartBtn = document.getElementById('cart-btn');
const cartContainer = document.querySelector('.cart-container');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>(${cart.length})`;

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
          <div class="cart-item-quantity">
            <input type="number" id="quantity-${item.id}" name="quantity-${item.id}" min="1" value="${item.quantity}" data-id="${item.id}">
          </div>
          <button class="remove-from-cart" title="Remove item" data-id="${item.id}">Remove</button>
        </div>
      `;
        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

cartItems.addEventListener('input', e => {
    if (e.target.tagName.toLowerCase() === 'input' && e.target.getAttribute('type') === 'number') {
        const id = e.target.getAttribute('data-id');
        const quantity = parseInt(e.target.value);
        const existingItem = cart.find(i => i.id === id);
        if (existingItem) {
            existingItem.quantity = quantity;
            saveCart();
            displayCart();
        }
    }
});

function toggleCart() {
    cartContainer.classList.toggle('show');
}

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
    toggleCart();
});


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


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
    saveCart();
}

function removeFromCart(id) {
    const existingItem = cart.find(i => i.id === id);
    if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }

    cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>(${cart.length})`;
    saveCart();
    displayCart();
}

cartBtn.addEventListener('click', () => {
    displayCart();
    toggleCart();
});

const addToCartBtns = document.querySelectorAll('.add-to-cart');
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const image = btn.parentElement.parentElement.querySelector('.menu-item-image').getAttribute('src');
        addToCart({ id, name, price, image });
    });
});

cartItems.addEventListener('click', e => {
    if (e.target.classList.contains('remove-from-cart')) {
        const id = e.target.getAttribute('data-id');
        removeFromCart(id);
    }
});

checkoutBtn.addEventListener('click', () => {
    // Add your checkout logic here
});
