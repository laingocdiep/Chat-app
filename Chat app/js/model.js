// chứa trạng thái và tùy trạng thái sẽ hiển thị view và có hành động khác nhau
const model = {};
model.currentUser = {};
model.register = async ({firstName, lastName, email, password}) => {
    try {
        // copy từ firebase rồi thêm async và await (async và await là 1 cặp)
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // update profile
        firebase.auth().currentUser.updateProfile ({
            displayName: firstName + ' ' + lastName
        });
        // send email verify
        firebase.auth().currentUser.sendEmailVerification();
        alert('Register successfully! Please confirm your email');
        view.setActiveScreen('loginPage');
    }
    catch(err) {
        console.log(err);
        alert(err.message);
    }
    
};

model.login = async ({email, password}) => {
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password);
        // console.log(response);
        // if (response.user.emailVerified) {
        //     alert('Login succesfully');
        // } else {
        //     alert('Please verify email');
        // }
    }
    catch(err) {
        alert(err.message);
    }
}