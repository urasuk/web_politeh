
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


console.log(firstnameElement.value)


function signup() {
    return new Promise((resolve, reject) => {
        const url = URL_CREATE_USER;
        const xhr = new XMLHttpRequest();
        console.log(firstnameElement.value)


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

        console.log('going to send', sendObject);

        xhr.send(sendObject);
    })

}

const button = document.querySelector('.btn');

button.addEventListener('click', (event) => {
    event.preventDefault();
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