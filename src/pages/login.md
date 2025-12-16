---
layout: base
title: Login
permalink: /login/
---

<div class="login-page">
    <div class="login-container">
        <h1>Programming Party Login</h1>
        <p class="login-subtitle">Access your party dashboard</p>
        
        <form class="login-form" id="loginForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" class="form-input" placeholder="Enter your username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" class="form-input" placeholder="Enter your password" required>
            </div>
            
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" id="remember" name="remember" class="form-checkbox">
                    <span class="checkmark"></span>
                    Remember me
                </label>
            </div>
            
            <button type="submit" class="btn btn-primary login-btn">Login to Party</button>
        </form>
        
        <div class="login-footer">
            <p><a href="#" class="forgot-link">Forgot your password?</a></p>
            <p>Don't have an account? <a href="#" class="signup-link">Join the party!</a></p>
        </div>
    </div>
</div>

<script>
// Gang of Four Design Patterns Implementation

// 1. Singleton Pattern - Authentication Manager
class AuthenticationManager {
    constructor() {
        if (AuthenticationManager.instance) {
            return AuthenticationManager.instance;
        }
        this.isAuthenticated = false;
        this.currentUser = null;
        this.observers = [];
        AuthenticationManager.instance = this;
    }
    
    static getInstance() {
        if (!AuthenticationManager.instance) {
            AuthenticationManager.instance = new AuthenticationManager();
        }
        return AuthenticationManager.instance;
    }
    
    // Observer Pattern - Add observer
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    // Observer Pattern - Notify observers
    notifyObservers(event, data) {
        this.observers.forEach(observer => observer.update(event, data));
    }
    
    authenticate(username, password) {
        // Simulate authentication
        this.isAuthenticated = true;
        this.currentUser = username;
        this.notifyObservers('login', { username });
        return true;
    }
}

// 2. Strategy Pattern - Validation Strategies
class ValidationStrategy {
    validate(value) {
        throw new Error('validate method must be implemented');
    }
}

class UsernameValidationStrategy extends ValidationStrategy {
    validate(value) {
        return value && value.length >= 3;
    }
}

class PasswordValidationStrategy extends ValidationStrategy {
    validate(value) {
        return value && value.length >= 6;
    }
}

// 3. Factory Pattern - Validator Factory
class ValidatorFactory {
    static createValidator(type) {
        switch(type) {
            case 'username':
                return new UsernameValidationStrategy();
            case 'password':
                return new PasswordValidationStrategy();
            default:
                throw new Error('Unknown validator type');
        }
    }
}

// 4. Observer Pattern - UI Observer
class UIObserver {
    update(event, data) {
        if (event === 'login') {
            window.alert('hello world');
        }
    }
}

// 5. Command Pattern - Login Command
class LoginCommand {
    constructor(authManager, username, password) {
        this.authManager = authManager;
        this.username = username;
        this.password = password;
    }
    
    execute() {
        return this.authManager.authenticate(this.username, this.password);
    }
}

// 6. Facade Pattern - Login Facade
class LoginFacade {
    constructor() {
        this.authManager = AuthenticationManager.getInstance();
        this.uiObserver = new UIObserver();
        this.authManager.addObserver(this.uiObserver);
    }
    
    login(username, password) {
        // Validate inputs using Strategy Pattern
        const usernameValidator = ValidatorFactory.createValidator('username');
        const passwordValidator = ValidatorFactory.createValidator('password');
        
        if (!usernameValidator.validate(username)) {
            throw new Error('Invalid username');
        }
        
        if (!passwordValidator.validate(password)) {
            throw new Error('Invalid password');
        }
        
        // Execute login using Command Pattern
        const loginCommand = new LoginCommand(this.authManager, username, password);
        return loginCommand.execute();
    }
}

// 7. Template Method Pattern - Form Handler
class FormHandler {
    handleSubmit(event) {
        event.preventDefault();
        
        // Template method steps
        const data = this.extractFormData();
        if (this.validateForm(data)) {
            this.processForm(data);
        }
    }
    
    extractFormData() {
        const formData = new FormData(event.target);
        return {
            username: formData.get('username'),
            password: formData.get('password'),
            remember: formData.get('remember')
        };
    }
    
    validateForm(data) {
        try {
            const loginFacade = new LoginFacade();
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    }
    
    processForm(data) {
        const loginFacade = new LoginFacade();
        try {
            loginFacade.login(data.username, data.password);
        } catch (error) {
            alert(error.message);
        }
    }
}

// 8. Builder Pattern - Form Builder (demonstration)
class FormBuilder {
    constructor() {
        this.form = {};
    }
    
    setUsername(username) {
        this.form.username = username;
        return this;
    }
    
    setPassword(password) {
        this.form.password = password;
        return this;
    }
    
    setRemember(remember) {
        this.form.remember = remember;
        return this;
    }
    
    build() {
        return this.form;
    }
}

// Initialize the form handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const formHandler = new FormHandler();
    
    form.addEventListener('submit', function(event) {
        formHandler.handleSubmit(event);
    });
});
</script>