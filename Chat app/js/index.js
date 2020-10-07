const init = () => {
    // copy từ Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyDTzddQB9gW4GZCpgnH_yk2SgEycgEXCVU",
        authDomain: "chat-app-41e84.firebaseapp.com",
        databaseURL: "https://chat-app-41e84.firebaseio.com",
        projectId: "chat-app-41e84",
        storageBucket: "chat-app-41e84.appspot.com",
        messagingSenderId: "23553074413",
        appId: "1:23553074413:web:4e5de1ad7df8732ab598e4"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    
    console.log(firebase.app().name);     // đã config Firebase thì sẽ hiện ra DEFAULT
    view.setActiveScreen('registerPage');
}
// khi trình duyệt load xong
window.onload = init;
