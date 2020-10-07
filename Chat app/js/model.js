// chứa trạng thái và tùy trạng thái sẽ hiển thị view và có hành động khác nhau
const model = {};
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
    }
    catch(err) {
        console.log(err);
        alert(err.message);
    }
    
};

model.login = async ({email, password}) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        alert('Login succesfully');
    }
    catch(err) {
        alert(err.message);
    }
}