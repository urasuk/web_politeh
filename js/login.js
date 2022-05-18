'use strict';

const POST = 'POST';

const URL_LOG = 'http://127.0.0.1:5000/api/v15/user/login';



function login() {
    return new Promise((resolve, reject) => {
        const url = URL_LOG;
        const xhr = new XMLHttpRequest();

        const emailNode = document.querySelector('#email');
        const passwordNode = document.querySelector('#password');

        const emailValue = emailNode.value;
        const passwordValue = passwordNode.value;

        xhr.open(POST, url, true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                // console.log("Success!!! " + xhr.responseText);
                localStorage.setItem('token', xhr.response);
                localStorage.setItem('email', emailValue);
                resolve({"token":xhr.response});
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        const sendObject = JSON.stringify({email: emailValue, password: passwordValue});

        // console.log('going to send', sendObject);

        xhr.send(sendObject);
    })

}


const button = document.querySelector('.login__form .btn');

const loginNotificationBlock = document.querySelector('.main__notification');
const loginNotificationMessage = document.querySelector('.notification__message');

let loggedIn = false;

button.addEventListener('click', (event) => {
    event.preventDefault();


    if(localStorage.getItem('token') !== null){
        // log out
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        location.reload();
    } else {
        // log in
        login()
            .then((response) => {
                console.log("then ->" + response['token']);
                loginNotificationMessage.textContent = "Successfully logged in!";
                loginNotificationBlock.style.display = 'block';
                loggedIn = true;
            })
            .catch((e) => {
                console.log("error ->" + e)
                loginNotificationMessage.textContent = "Please, try again!";
                loginNotificationBlock.style.display = 'block';
            })
    }
})

const buttonLoginOk = document.querySelector('.btn__login_ok');
buttonLoginOk.addEventListener('click', (event) => {
    event.preventDefault();
    loginNotificationBlock.style.display = 'none';
    if (loggedIn) {
        setTimeout(() => {
            window.location.replace("./index.html");
        }, 500)
    }
})

const emailNode = document.querySelector('#email');
const passwordNode = document.querySelector('#password');
const header = document.querySelector('h1');
const logInOutButton = document.querySelector('.login__form .btn');

window.addEventListener("load", function(event) {
    if(localStorage.getItem('token') !== null){
        emailNode.style.display ='none';
        passwordNode.style.display ='none';
        logInOutButton.textContent = header.textContent = 'Log out';

    } else{
        emailNode.style.display ='block';
        passwordNode.style.display ='block';
        logInOutButton.textContent = header.textContent = 'Log in';

    }
})
