
'use strict';

const POST = 'POST';

const URL_CREATE_USER = 'http://127.0.0.1:5000/api/v15/user';

const firstnameElement = document.querySelector('[name="firstname"]');
const lastnameElement = document.querySelector('[name="lastname"]');
const usernameElement = document.querySelector('[name="username"]');
const emailElement = document.querySelector('[name="email"]');
const phoneElement = document.querySelector('[name="phone"]');
const passwordElement = document.querySelector('[name="password"]');
const userStatusElement = document.querySelector('[name="userStatus"]');

const allInput = document.querySelectorAll(".input_data");

// console.log(firstnameElement.value)


function signup() {
    return new Promise((resolve, reject) => {
        const url = URL_CREATE_USER;
        const xhr = new XMLHttpRequest();


        xhr.open(POST, url, true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                console.log("Success sign up!!! " + xhr.responseText);
                localStorage.setItem('token', xhr.response);
                localStorage.setItem('email', emailElement.value);
                resolve({"token":xhr.response});
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        const sendObject = JSON.stringify({
            email: emailElement.value,
            firstname: firstnameElement.value,
            lastname: lastnameElement.value,
            password: passwordElement.value,
            phone: phoneElement.value,
            username: usernameElement.value,
            userstatus:userStatusElement.value
        });
        xhr.send(sendObject);
    })

}

const submitButton = document.querySelector('.btn');
const form = document.querySelector('.form');



// with type 'submit' validation works [BUT request doesn't send ...]
// with type 'click' NO !!!!
// ... the reason is that you have to create event listener NOT ON SUBMIT BUTTON
// BUT ON FORM!!!! CUZ Forms are submitted, not buttons
//
// The submit event is fired when a form is submitted.
// Note that submit is fired only on the form element, not the button or submit input.
// https://stackoverflow.com/questions/32637920/addeventlistener-using-submit-is-not-working
form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log("input_item.getAttribute('required')")
    signup().then((response) => {
        console.log("then ->" + response['token']);
        setTimeout(() => {
            window.location.replace("./index.html");
        }, 500)
    })
        .catch((e) => {
            console.log("error ->" + e)

        })
})