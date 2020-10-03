//lưu trữ code html cho lúc cần dùng
const components = {};
// components.welcomPage = `<h3>Hello World</h3>`;
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
                        Already have an account? <span id="redirect-login" class="cursor-pointer" onclick="view.setActiveScreen('loginPage')">Login</span>
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
                    <input type="email" name="email-input" placeholder="Email">
                    <div id="email-login-error" class="err"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="password-input" placeholder="Password">
                    <div id="password-login-error" class="err"></div>
                </div>
                <div class="login-form-action">
                    <div>
                        Don't have an account? <span id="redirect-register" class="cursor-pointer" onclick="view.setActiveScreen('registerPage')">Register</span>
                    </div>
                    <button type="submit" class="btn">Login</button>
                </div>
            </form>
        </div>
    </div>`;