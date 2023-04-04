// Retrieve the cart data from local storage
let ordersData = JSON.parse(localStorage.getItem('order')) || [];

const main = document.querySelector('#main')
const orders = document.querySelector('.orders')

//create elements for the order page
function displayData() {
    orders.innerHTML = '';
    for (const item of ordersData) {
        console.log(item)
        const section = document.createElement('section');
        section.classList.add('cartOrder');

        const div = document.createElement('div');
        item.cartData.forEach(element => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <img class="cart-item-image" src="${element.image}" alt="${element.name}">
            <div>
              <h4 class="cart-item-name">${element.name}</h4>              
                <p class="cart-item-quantity">(${element.quantity})</p>
            </div>
            `;

            div.appendChild(cartItem)
            section.appendChild(div)

        });

        const clientItem = document.createElement('li');
        clientItem.classList.add('clientItem');
        clientItem.innerHTML = `
            <h4>Client informations</h4>
            <p><span>Name: </span>${item.result.fname} ${item.result.lname}</p>
            <p><span>E-mail: </span>${item.result.email}</p>
            <p><span>Address: </span>${item.result.address}</p>
            `;
        section.appendChild(clientItem);

        const btnComplete = document.createElement('div');
        btnComplete.innerHTML = `
            <button class="complete">Complete order</button>
            `;
        section.appendChild(btnComplete);

        orders.appendChild(section)
    }
}
displayData()