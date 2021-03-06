//lưu trữ code html cho lúc cần dùng
const components = {};
components.welcomPage = `<h3>Hey guys! It's Taylor. Thank you so much for joining this show with me.</h3>`;
components.registerPage = 
    `<div class="register-container">
        <div class="background-image"></div>
        <div class="form-wrapper">
            <div class="register-header">MindX Chat</div>
            <form id="register-form">
                <div class="name-wrapper">
                    <div class="input-wrapper">
                        <input type="text" placeholder="First name" name="firstName">
                        <!-- nếu user chưa nhập hoặc nhập sai thì sẽ hiển thị thông báo ở thẻ div err -->
                        <div id="first-name-error" class="err"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Last name" name="lastName">
                        <div id="last-name-error" class="err"></div>
                    </div>
                </div>
                <div class="input-wrapper">
                    <input type="email" placeholder="Email" name="email">
                    <div id="email-error" class="err"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" placeholder="Password" name="password">
                    <div id="password-error" class="err"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" placeholder="Confirm password" name="confirmPassword">
                    <div id="confirm-password-error" class="err"></div>
                </div>
                <div class="register-form-action">
                    <div>
                        Already have an account? <span id="redirect-login" class="cursor-pointer">Login</span>
                    </div>
                    <button type="submit" class="btn">Register</button>
                </div>
            </form>
        </div>
    </div>`;
components.loginPage = 
    `<div class="login-container">
        <div class="login-background-image"></div>
        <div class="login-form-wrapper">
            <div class="login-header">MindX Chat</div>
            <form id="login-form">
                <div class="input-wrapper">
                    <input type="email" name="email" placeholder="Email">
                    <div id="email-login-error" class="err"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="password" placeholder="Password">
                    <div id="password-login-error" class="err"></div>
                </div>
                <div class="login-form-action">
                    <div>
                        Don't have an account? <span id="redirect-register" class="cursor-pointer">Register</span>
                    </div>
                    <button type="submit" class="btn">Login</button>
                </div>
            </form>
        </div>
    </div>`;
components.chatPage = 
`<div class="chat-container">
<div class="header">MindX Chat</div>
<div class="main" id="main">
    <div class="aside-left">
        <div class="create-conversation">
            <button class="btn cursor-pointer" id="new-conversation">+ New conversation</button>
        </div>
        <div class="list-conversations">
           
        </div>
    </div>
    <div class="conversation-detail">
        <div class="conversation-title">Sis</div>
        <div class="list-messages">
            
        </div>
        <form id="send-message-form">
            <input type="text" placeholder="Type a message" name="message">
            <button class="btn">Send</button>
        </form>
    </div>
    <div class="aside-right">
        <div class="list-users mb-1">
        
        </div>
        <form id="add-user-form">
            <div class="input-wrapper">
                <input type="email" name="email" id="add-user" placeholder="Input friend email">
                <div class="err" id="add-email-error"></div>
            </div>
            <button type="submit" class="btn cursor-pointer" id="add">Add</button>
        </form>
    </div>
</div>
</div>`;
components.createConversationScreen = 
`<div class="create-conversation-container">
    <div class="header">MindX Chat</div>
    <form id="create-conversation-form" style="padding: 40px 20%">
        <h3 class="mb-1">Create a new conversation</h3>
                <div class="input-wrapper">
                    <input type="text" name="title" placeholder="Conversation name">
                    <div id="conversation-title-error" class="err"></div>
                </div>
                <div class="input-wrapper">
                    <input type="email" name="email" placeholder="Friend email">
                    <div id="conversation-email-error" class="err"></div>
                </div>
                <div class="action">
                    <button type="submit" class="btn">Save</button>
                    <button type="button" class="btn btn-light" id="return-chat">Cancel</button>
                </div>
            </form>
</form>
</div>`