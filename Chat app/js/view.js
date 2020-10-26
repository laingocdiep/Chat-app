// hiển thị, tương tác vs user
const view = {};
view.setActiveScreen = (screenName, fromCreate = false) => {
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
                console.log(message);
                const messageSend = {
                    owner: model.currentUser.email,
                    content: message,
                    createdAt: new Date().toISOString()
                };
                
                if (message.trim() !== '') {
                    model.addMessage(messageSend);
                    // view.addMessage(messageReceive);
                    sendMessageForm.message.value = '';
                }
            });
            if (!fromCreate) {
                // pull conversations
                model.getConversations();
                // listen to conversation's change
                model.listenConversationChange();
            }
            else {
                view.showCurrentConversation();
                view.showListConversation();
            }
            document.querySelector('.create-conversation button').addEventListener('click', () => {
                view.setActiveScreen('createConversationScreen');
            })
            break;
        case 'createConversationScreen':
            document.getElementById('app').innerHTML = components.createConversationScreen;
            document.querySelector('#return-chat').addEventListener('click', () => {
                view.setActiveScreen('chatPage', true);
            })
            const createConversationForm = document.querySelector('#create-conversation-form');
            createConversationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = {
                    title: createConversationForm.title.value,
                    email: createConversationForm.email.value
                }
                controller.createConversation(data);
            })
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

view.showCurrentConversation = () => {
    document.querySelector('.list-messages').innerHTML = '';
    document.querySelector('.conversation-title').innerHTML = model.currentConversation.title;
    // return docs.messages.map(view.addMessage)
    for (const oneMessage of model.currentConversation.messages) {
        view.addMessage(oneMessage);
    }
    view.scrollToEndElm();
}

view.showListConversation = () => {
    for (const conversation of model.conversations) {
        view.addConversation(conversation)
    }
}

view.addConversation = (conversation) => {
    // create div
    const conversationWrapper = document.createElement('div');
    // add div
    conversationWrapper.classList.add('conversation');
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current');
    }
    // update innerHTML
    conversationWrapper.innerHTML = 
    `<div class="left-conversation-title">${conversation.title}</div>
    <div class="num-of-user">${conversation.users.length} users</div>`;
    // add to interface
    document.querySelector('.list-conversations').appendChild(conversationWrapper);
    console.log(conversationWrapper);
    conversationWrapper.addEventListener('click', () => {
        // delete old current class
        const current = document.querySelector('.current');
        current.classList.remove('current');
        // add new current class which is clicked
        conversationWrapper.classList.add('current');
        // show clicked conversation on the screen
        console.log(conversation.id);
        for (const elm of model.conversations) {
            if (elm.id === conversation.id) {
                model.currentConversation = elm;
                view.showCurrentConversation();
            }
        }
    });
}
view.scrollToEndElm = () => {
    const elm = document.querySelector('.list-messages');
    elm.scrollTop = elm.scrollHeight;
}