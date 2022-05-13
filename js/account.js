'use strict';

const USER_ID = 'http://127.0.0.1:5000/api/v15/user/' + String(localStorage.getItem('email'));

const GET = 'GET';

// make the request to the secret API endpoint
function getSecret(Url) {
    return new Promise((resolve, reject) => {
        const url = Url;
        const xhr = new XMLHttpRequest();

        const resultNode = document.querySelector('#result');

        const tokenFromLocalStorage = localStorage.getItem('token');

        xhr.open(GET, url, true);

        xhr.setRequestHeader('Authorization', 'Bearer ' + tokenFromLocalStorage.trim());

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                const responseObject = JSON.parse(xhr.response);
                resolve({"data": xhr.response});
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        xhr.send(null);
    })
}

window.addEventListener('load', (event) => {
    event.preventDefault();
    getSecret(USER_ID)
        .then((response) => {
            console.log("then ->" + response['data']);
            setUserData(response['data']);
        })
        .catch((e) => console.log("error ->" + e))
})

function setUserData(data){
    data = JSON.parse(data);

    const fullnameElement =document.querySelector('.main__fullname .main__title');
    const usernameElement =document.querySelector('.main__username .main__title');
    const phoneElement =document.querySelector('.main__phone .main__title');
    const emailElement =document.querySelector('.email__content .main__title');

    const fullnameElementValue = fullnameElement.textContent;
    const usernameElementValue = usernameElement.textContent;
    const phoneElementValue = phoneElement.textContent;
    const emailElementValue = emailElement.textContent;

    // console.log(fullnameElementValue);
    // console.log(usernameElementValue);
    // console.log(phoneElementValue);
    // console.log(emailElementValue);

    fullnameElement.textContent = `${data['firstname']} ${data['lastname']}`;
    usernameElement.textContent =  `${data['username']} [${data['userstatus']}]` ;
    phoneElement.textContent = data['phone'];
    emailElement.textContent = data['email'];


}