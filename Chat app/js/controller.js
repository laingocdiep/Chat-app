// xử lí logic
const controller = {};
controller.register = ({firstName, lastName, email, password, confirmPassword}) => {
    if (firstName === '') {    // or (firstName.length === 0)
        view.setErrorMessage('first-name-error', 'Please input first name');
    }
    else {
        view.setErrorMessage('first-name-error', '');
    }

    if (lastName === '') {    
        view.setErrorMessage('last-name-error', 'Please input last name');
    }
    else {
        view.setErrorMessage('last-name-error', '');
    }

    if (email === '') {    
        view.setErrorMessage('email-error', 'Please input email');
    }
    else {
        view.setErrorMessage('email-error', '');
    }

    if (password === '') {    
        view.setErrorMessage('password-error', 'Please input password');
    }
    else {
        view.setErrorMessage('password-error', '');
    }

    if (confirmPassword === '') {    
        view.setErrorMessage('confirm-password-error', 'Please confirm password');
    }
    else if (password !== confirmPassword) {
        view.setErrorMessage('confirm-password-error', "Password didn't match");
    }
    else {
        view.setErrorMessage('confirm-password-error', '');
    }

    if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
        const dataRegister = {firstName, lastName, email, password};
        model.register(dataRegister);
    }
};

controller.login = ({email, password}) => {
    if (email === '') {    
        view.setErrorMessage('email-login-error', 'Please input email');
    }
    else {
        view.setErrorMessage('email-login-error', '');
    }

    if (password === '') {    
        view.setErrorMessage('password-login-error', 'Please input password');
    }
    else {
        view.setErrorMessage('password-login-error', '');
    }

    if (email !== '' && password !== '') {
        const dataLogin = {email, password};
        model.login(dataLogin);
    }
}

controller.createConversation = ({title, email}) => {
    if (email === '') {
        view.setErrorMessage('conversation-email-error', 'Please input your friend email');
    }
    else if (!validateEmail(email)) {
        view.setErrorMessage('conversation-email-error', 'Invalid email');
    }
    else {
        view.setErrorMessage('conversation-email-error', '');
    }

    const messageTitle = title === ''? 'Please input title' : '';
    view.setErrorMessage('conversation-title-error', messageTitle);

    if (title !== '' && email !== '') {
        // model.addConversation({title: title, email: email}); 
        model.addConversation({title, email});
    }
}

controller.addEmail = ({email}) => {
    if (email === '') {
        view.setErrorMessage('add-email-error', 'Please input email');
    }
    else {
        if (!validateEmail(email)) {
            view.setErrorMessage('add-email-error', 'Invalid email');    
        }
        else {
            if (model.currentConversation.users.includes(email)) {
                view.setErrorMessage('add-email-error', 'This email is currently in chat');
            }
            else {
                view.setErrorMessage('add-email-error', '');
                model.addEmail(email);
            }   
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}