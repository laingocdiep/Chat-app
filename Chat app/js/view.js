// hiển thị, tương tác vs user
const view = {};
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'welcomeScreen':
            document.getElementById('app').innerHTML = components.welcomPage;
            break;
        case 'registerPage':
            document.getElementById('app').innerHTML = components.registerPage;
            document.getElementById('redirect-login').addEventListener('click', () => {view.setActiveScreen('loginPage')});
            const registerForm = document.getElementById('register-form');
            registerForm.addEventListener('submit', (event) => {
                console.log(event);
            event.preventDefault();
            const dataRegister = {
                firstName: registerForm.firstName.value,
                lastName: registerForm.lastName.value,
                email: registerForm.email.value,
                password: registerForm.password.value,
                confirmPassword: registerForm.confirmPassword.value,
            }
            controller.register(dataRegister);
            console.log(dataRegister);
        });
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = components.loginPage;
            document.getElementById('redirect-register').addEventListener('click', () => {view.setActiveScreen('registerPage')});
            const loginForm = document.getElementById('login-form');
            loginForm.addEventListener('submit', (event) => {
                console.log(event);
            event.preventDefault();
            const dataLogin = {
                email: loginForm.email.value,
                password: loginForm.password.value,
            }
            controller.login(dataLogin);
            console.log(dataLogin);
        });
            break;
        case 'chatPage':
            document.getElementById('app').innerHTML = components.chatPage;
            const sendMessageForm = document.getElementById('send-message-form');
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = sendMessageForm.message.value;
                sendMessageForm.message.value = '';
                console.log(message);
                const messageSend = {
                    owner: model.currentUser.email,
                    content: message,
                };
                view.addMessage(messageSend);
                
                const messageReceive = {
                    owner: 'Taylor Swift',
                    content: "I can't wait to see you"
                };

                view.addMessage(messageReceive);
            });
            break;
    }
}

view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message;
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div');    // messageWrapper = <div></div>
    messageWrapper.classList.add('message');      // messageWrapper = <div class="message"></div>
    if (model.currentUser.email === message.owner) {
        messageWrapper.classList.add('message-mine');
        messageWrapper.innerHTML = `<div class="message-content">${message.content}</div>`
    }
    else {
        messageWrapper.classList.add('message-other');
        messageWrapper.innerHTML =
        `<div class="owner">${message.owner}</div>
        <div class="message-content">${message.content}</div>`;  
    }
    document.querySelector('.list-messages').appendChild(messageWrapper);
}