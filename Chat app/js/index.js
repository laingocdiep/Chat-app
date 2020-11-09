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
        // console.log(res);
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
    // firestoreQueries();
}

// muốn đăng xuất (quay lại trang đăng nhập/ đăng kí): F12, vào console log, nhập firebase.auth().signOut(), enter

// khi trình duyệt load xong
window.onload = init;
// firestoreQueries = async () => {
    // get one doc
    // const response = await firebase.firestore().collection('users').doc('qDRPG7zjo9wtpD1ytqig').get();
    // const user = getDataFromDoc(response);
    // console.log(user);

    // get many docs
    // const response = await firebase.firestore().collection('users').where('address', '==', 'TQ').get();
    // const response = await firebase.firestore().collection('users').where('phones', 'array-contains', '01312').get();
    // const response = await firebase.firestore().collection('users').get();
    // response trả về 1 object gồm rất nhiều thứ, trong đó có docs là 1 mảng chứa các doc
    // const users = getDataFromDocs(response.docs);
    // console.log(users);

    // add new doc
    // const dataToAdd = {
    //     name: 'Joe Alwyn',
    //     age: 29
    // }
    // firebase.firestore().collection('users').add(dataToAdd);

    // update doc
    // const dataToUpdate = {
    //     name: 'Doris',
    //     address: 'TQ',
    //     phones: firebase.firestore.FieldValue.arrayUnion('0912')
    // }
    // const docID = 'O1xtG8uuCaduD9PO5v7v';
    // firebase.firestore().collection('users').doc(docID).update(dataToUpdate);

    // delete doc
    // const docID = 'g5367VPcxAvHQE0ucT3R';
    // firebase.firestore().collection('users').doc(docID).delete();
// }
// }
    getDataFromDoc = (res) => {
        const data = res.data();
        data.id = res.id;
        return data;
    }
    
    getDataFromDocs = (docs) => {
        const arr = [];
        for (const oneDoc of docs) {
            arr.push(getDataFromDoc(oneDoc));
        }
        return arr;
    
        // map lọc từng phần tử của docs và cho vào getDataFromDoc, bên trong map là function, k phải lời gọi function
    //     return docs.map(getDataFromDoc);
    }

