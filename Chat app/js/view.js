// hiển thị
const view = {};
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'welcomeScreen':
            document.getElementById('app').innerHTML = components.welcomPage;
            break;
        case 'registerPage':
            document.getElementById('app').innerHTML = components.registerPage;
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = components.loginPage;
    }
}