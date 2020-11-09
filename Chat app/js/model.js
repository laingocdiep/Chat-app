// chứa trạng thái và tùy trạng thái sẽ hiển thị view và có hành động khác nhau
const model = {};
model.currentUser = {};
model.conversations = {};
model.currentConversation = {};
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
        // console.log(err);
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

model.addMessage = (message) => {
    const docID = model.currentConversation.id;
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('conversations').doc(docID).update(dataToUpdate);
}

model.getConversations = async () => {
    const response = await firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).get();
    // console.log(response);
    // console.log(getDataFromDocs(response.docs));
    model.conversations = getDataFromDocs(response.docs);
    if (model.conversations.length > 0) {
        model.currentConversation = model.conversations[0];
        view.showCurrentConversation();
        view.showListConversation();
    }
    // console.log(model.conversations);
}

model.listenConversationChange = () => {
    let isFirstRun = true;
    // like addEventListener
    firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).onSnapshot((snapshot) => {
        // skip the first run
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        const docChanges = snapshot.docChanges();
        for (const oneChange of docChanges) {
            if (oneChange.type === 'modified') {
                const dataChange = getDataFromDoc(oneChange.doc);
                for (let i = 0; i < model.conversations.length; i++) {
                    if (model.conversations[i].id === dataChange.id) {
                        model.conversations[i] = dataChange;
                    }
                }
                if (dataChange.id === model.currentConversation.id) {
                    model.currentConversation = dataChange;
                    if (model.currentConversation.users.length !== dataChange.users.length) {
                        view.addUser(dataChange.users[dataChange.users.length - 1]);
                    }
                    else {
                        const lastMessage = dataChange.messages[dataChange.messages.length - 1];
                        if (lastMessage.owner !== model.currentUser.email) {
                            view.showNotification(dataChange.id);
                        }
                        view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length - 1]);
                        view.scrollToEndElm();
                    }
                    // view.showCurrentConversation();
                }
                else {
                    view.showNotification(dataChange.id);
                }
            }
            else if (oneChange.type === 'added') {
                const dataChange = getDataFromDoc(oneChange.doc);
                model.conversations.push(dataChange);
                view.addConversation(dataChange);
            }
            // const change = getDataFromDoc(oneChange.doc);
            // view.showNotification(change.id);
        }
    });
}

model.addConversation = ({title, email}) => {
    const dataToAdd = {
        createdAt: new Date().toISOString(),
        title,
        messages: [],
        users: [model.currentUser.email, email]
    }
    firebase.firestore().collection('conversations').add(dataToAdd);
    view.setActiveScreen('chatPage', true);
}

model.addUser = (email) => {
    const dataToUpdate = {
        users: firebase.firestore.FieldValue.arrayUnion(email)
    }
    firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate);
}