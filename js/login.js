// 'use strict';
//
// const URL_LOGIN = 'http://127.0.0.1:5000/api/v15/user/login';
// const URL_USERS = 'http://127.0.0.1:5000/api/v15/medicine';
// const GET = 'GET';
// const POST = 'POST';

// var jwt = localStorage.getItem("jwt");
// if (jwt != null) {
//     window.location.href = './index.html';
// }

// function sendRequest(method='POST', url=URL_USERS, body= null,token=null) {
//     const headers = {
//         'Content-Type':'application/json'
//     }
//
//     // return fetch(url+`${1}`,
//     return fetch(url,{
//             method: method,
//             body: JSON.stringify(body),
//             headers: headers
//         }
//     ).then((response) => {
//         if (response.ok) {  // if (response.status >= 400) {
//             // return response.text()
//             return response.json()
//         }
//         response.json().then(err => {
//             const e = new Error("Somethind went wrong");
//             e.data = err;
//             throw e;
//         })
//
//     })
// }

// function login(){
//     return new Promise((resolve, reject) => {
//         const inputUserData = document.querySelector(".login__form").elements;
//         const email = inputUserData['email'].value;
//         const password = inputUserData['password'].value;
//         const body = {
//             "email": email,
//             "password": password
//         }
//
//         const xhr = new XMLHttpRequest();
//         xhr.responseType = 'json';
//         xhr.open(POST, URL_LOGIN);
//
//         xhr.setRequestHeader('Content-Type','application/json');
//
//         xhr.onload = () => {
//             if (xhr.status >= 400) {
//                 reject(xhr.response);
//             } else {
//                 resolve(xhr.response);
//             }
//         }
//
//         xhr.onerror = () => {
//             reject(xhr.response);
//         }
//
//         xhr.send(JSON.stringify(body));
//     })
//
// }

// var token_;
//
// function getToken(body) {
//
//     const xhr = new XMLHttpRequest();
//
//     xhr.open("POST", URL_LOGIN, true);
//     xhr.responseType = 'json';
//
//     var key;
//     // var username_ = document.getElementById("username").val();
//     // var password_ = document.getElementById("password").val();
//
//
//     xhr.setRequestHeader("Content-type", "application/json");
//     xhr.send(JSON.stringify(body));
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             var response = xhr.responseText;
//             var obj = JSON.parse(response);
//             key = obj.access_token; // store the value of the accesstoken
//             token_ = key; // store token in global variable "token_"
//             alert(token_); //test if token is stored
//         }
//     }
// }

// const button = document.querySelector('.btn');
// const inputUserData = document.querySelector(".login__form"  ).elements;
// const email = inputUserData['email'].value;
// const password = inputUserData['password'].value;

// button.addEventListener('click', (event) => {
//     event.preventDefault()
//
//     console.log(email)
//     console.log(password)
//
//     const body = {
//         "email": email,
//         "password": password
//     };
//
//     getToken(body)
//         // .then((response) => {
//         //     console.log(response);
//         // })
//         // .catch((e) => console.log(e))
//
//
//     // !!!
//     // https://jonathanmh.com/example-json-web-tokens-vanilla-javascript/
//
// })

// var jwt = localStorage.getItem("jwt");
// if (jwt != null) {
//     window.location.href = './index.html';
// }


'use strict';

const POST = 'POST';

const URL_LOG = 'http://127.0.0.1:5000/api/v15/user/login';


// make the request to the login endpoint
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

        console.log('going to send', sendObject);

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
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        location.reload();
    } else {
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
