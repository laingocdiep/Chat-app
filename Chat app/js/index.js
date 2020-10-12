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
    // nhớ trạng thái đăng nhập: khi đã login thì dù có F5 thì web vẫn giữ nguyên trang muốn hiển thị thay vì quay lại
    // trang đăng nhập/ đăng kí
    firebase.auth().onAuthStateChanged((res) => {
        console.log(res);
        if (res) {
            if (res.emailVerified) {
                model.currentUser = {
                    displayName: res.displayName,
                    email: res.email
                }
                view.setActiveScreen('chatPage');
            }
            else {
                view.setActiveScreen('loginPage');
                alert('Please verify your email');
            }

        } else {
            view.setActiveScreen('registerPage');
        }
    });
}
// muốn đăng xuất (quay lại trang đăng nhập/ đăng kí): F12, vào console log, nhập firebase.auth().signOut(), enter

// khi trình duyệt load xong
window.onload = init;
