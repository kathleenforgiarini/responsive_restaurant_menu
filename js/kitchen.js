// Retrieve the cart data from local storage
let ordersData = JSON.parse(localStorage.getItem('order')) || [];

const main = document.querySelector('#main')
const orders = document.querySelector('.orders')

let code = prompt("Please enter your employee code:");
if (code == 1234) {

//create elements for the order page
function displayData() {
    orders.innerHTML = '';
    for (const item of ordersData) {
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
            <button class="complete" data-index="${ordersData.indexOf(item)}">Complete order</button>
            `;
        section.appendChild(btnComplete);

        orders.appendChild(section)
    }

}
displayData()

// I added the click event on the parent element of the buttons and not directly for each button, 
//because if it was in each button, when a button is clicked and the code is executed, the list of buttons 
//is traversed again and new events are added, and this was causing interference when clicking on more than one button
orders.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('complete')) {
      if (confirm("Are you sure you want to complete this order?")) {
        const index = target.getAttribute('data-index');
        ordersData.splice(index, 1);
        localStorage.setItem('order', JSON.stringify(ordersData));
        displayData();
      }
    }
  });


      
} else {
    alert("Access denied!")
    window.history.back();
}
