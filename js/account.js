'use strict';

const URL_USER = 'http://127.0.0.1:5000/api/v15/user/';

const GET = 'GET';
const DELETE = 'DELETE';
const PUT = 'PUT';

const fullnameElement =document.querySelector('.main__fullname .main__title');
const usernameElement =document.querySelector('.main__username .main__title');
const phoneElement =document.querySelector('.main__phone .main__title');
const emailElement =document.querySelector('.email__content .main__title');


function getUserData(Url) {
    return new Promise((resolve, reject) => {

        const url = Url + String(localStorage.getItem('email'));

        const xhr = new XMLHttpRequest();

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
    getUserData(URL_USER)
        .then((response) => {
            console.log("then ->" + response['data']);
            setUserData(response['data']);
        })
        .catch((e) => console.log("error ->" + e))
})


function setUserData(data){
    data = JSON.parse(data);

    fullnameElement.placeholder = `${data['firstname']} ${data['lastname']}`;
    usernameElement.placeholder =  `${data['username']} [${data['userstatus']}]` ;
    phoneElement.placeholder = data['phone'];
    emailElement.placeholder = data['email'];

}

function deleteUser(Url) {
    return new Promise((resolve, reject) => {

        const url = Url + String(localStorage.getItem('email'));

        const xhr = new XMLHttpRequest();

        const tokenFromLocalStorage = localStorage.getItem('token');

        xhr.open(DELETE, url, true);

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

const deleteButton = document.querySelector(".menu2__delete_account_link");
deleteButton.addEventListener('click',(event) => {
    event.preventDefault();
    deleteUser(URL_USER).then((response) => {
        console.log("then ->" + response['data']);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setTimeout(() => {
            window.location.replace("./index.html");
        }, 500)
    })
        .catch((e) => console.log("error ->" + e))

})

function editUser(Url, data){
    return new Promise((resolve, reject) => {

        const url = Url + String(localStorage.getItem('email'));

        const xhr = new XMLHttpRequest();

        const tokenFromLocalStorage = localStorage.getItem('token');

        xhr.open(PUT, url, true);

        xhr.setRequestHeader('Authorization', 'Bearer ' + tokenFromLocalStorage.trim());
        xhr.setRequestHeader('Content-Type', 'application/json');

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

        const sendObject = JSON.stringify(data);

        xhr.send(sendObject);
    })
}


const editButton = document.querySelector(".menu2__edit_account_link");
editButton.addEventListener('click',event => {
    event.preventDefault();

    if (editButton.textContent === "Edit Account") {
        fullnameElement.placeholder = 'Enter fullname';
        usernameElement.placeholder = 'Enter username';
        phoneElement.placeholder = 'Enter phone number';
        emailElement.placeholder = 'Enter email';
        fullnameElement.removeAttribute('readonly');
        usernameElement.removeAttribute('readonly');
        phoneElement.removeAttribute('readonly');
        emailElement.removeAttribute('readonly');
        editButton.textContent = "Submit";
    }
    else {

        let dataToPut = {};
        let correctInput = true;


        if(fullnameElement.value.trim().split(" ").length !== 2 && fullnameElement.value.trim() !== ""){
            fullnameElement.style.border = "thick solid #ff1717";
            correctInput = false;
        } else {
            fullnameElement.style.border = "none";
        }
        if (usernameElement.value.trim().split(" ").length !== 1 && usernameElement.value.trim().split(" ").length !== 0) {
            usernameElement.style.border = "thick solid #ff1717";
            correctInput = false;
        }  else {
            usernameElement.style.border = "none";
        }

        if (correctInput){

            const firstnameValue = fullnameElement.value.split(" ")[0];
            const lastnameValue = fullnameElement.value.split(" ")[1];
            const userDataObject = {
                firstname:firstnameValue,
                lastname:lastnameValue,
                username:usernameElement.value,
                phone:phoneElement.value,
                email:emailElement.value
            };

            console.log(userDataObject);

            const userKeys = Object.keys(userDataObject);
            console.log(userKeys);
            userKeys.forEach( key => {
                if (userDataObject[key] !== "" && userDataObject[key] !== undefined && userDataObject[key] !== null ){
                    dataToPut[key] = userDataObject[key];
                }
            })

            console.log(dataToPut);
            if (Object.keys(dataToPut).length !== 0) {
                phoneElement.style.border = "none";
                emailElement.style.border = "none";
                editUser(URL_USER, dataToPut).then(response => {
                    // якщо оновлявся імейл то треба оновити токен
                    if (dataToPut.hasOwnProperty('email')){
                        // log out
                        localStorage.removeItem('token');
                        localStorage.removeItem('email');
                        window.location.replace("./login.html");
                        console.log(" log out please -> " + response);
                    }
                    console.log(" RESPONSE -> " + response);


                }).catch((e) => {
                    console.log("error ->" + e)
                });
            } else {
                console.log("enter anything");
                fullnameElement.style.border = "thick solid #ff1717";
                usernameElement.style.border = "thick solid #ff1717";
                phoneElement.style.border = "thick solid #ff1717";
                emailElement.style.border = "thick solid #ff1717";
            }
        }

        setTimeout(() => {
            location.reload();
            fullnameElement.setAttribute('readonly');
            usernameElement.setAttribute('readonly');
            phoneElement.setAttribute('readonly');
            emailElement.setAttribute('readonly');
            editButton.textContent = "Edit Account";
        }, 500)


    }
})

