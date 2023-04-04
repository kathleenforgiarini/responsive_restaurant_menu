
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

// show the gif of the pizza
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 3000);
}
window.onload = fadeOut();


