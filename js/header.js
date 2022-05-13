'use strict';

window.addEventListener("load", function(event) {
    const headerOptionsElement = document.querySelector('.menu__options');
    headerOptionsElement.innerHTML = "";
    if(localStorage.getItem('token') === null){
        headerOptionsElement.insertAdjacentHTML("beforeend",
            '<div class="menu__options">' +
            ' <a class="option" href="index.html"> Home </a>' +
            ' <a class="option" href="products.html"> Products </a>' +
            ' <a class="option" href="login.html"> Log in </a>' +
            ' <a class="option" href="signup.html"> Sign up </a>' +
            '</div>');
    } else {
        headerOptionsElement.insertAdjacentHTML("beforeend",
            '<div class="menu__options">' +
            ' <a class="option" href="index.html"> Home </a>' +
            ' <a class="option" href="products.html"> Products </a>' +
            ' <a class="option" href="login.html"> Log out </a>' +
            ' <a class="option" href="account.html"> Account </a>' +
            ' <a class="menu__cart" href="shopping_cart.html"></a>' +
            '</div>');
    }

});