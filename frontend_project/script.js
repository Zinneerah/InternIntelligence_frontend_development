// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCqUwDuUoBpsJigFmaTur2WdRsOsuMkNFc",
  authDomain: "login-project-bc694.firebaseapp.com",
  projectId: "login-project-bc694",
  storageBucket: "login-project-bc694.firebasestorage.app",
  messagingSenderId: "323110630115",
  appId: "1:323110630115:web:c385bc8f2852dec64f0bd6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    // Buttons/links to switch forms
    const showSignupLink = document.querySelector('.show-signup');
    const showLoginLinks = document.querySelectorAll('.show-login');
    const showForgotPasswordLink = document.querySelector('.show-forgot-password');
    
    // Toggle password visibility function
    function setupPasswordToggle(passwordInputId, toggleButtonId) {
        const passwordInput = document.getElementById(passwordInputId);
        const toggleButton = document.getElementById(toggleButtonId);
        
        if (passwordInput && toggleButton) {
            toggleButton.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🔒';
            });
        }
    }
    
    // Initialize password toggles
    setupPasswordToggle('loginPassword', 'toggleLoginPassword');
    setupPasswordToggle('signupPassword', 'toggleSignupPassword');
    setupPasswordToggle('signupConfirmPassword', 'toggleSignupConfirmPassword');
    
    // Switch between forms
    function showForm(formToShow) {
        // Hide all forms
        loginForm.classList.remove('active');
        signupForm.classList.remove('active');
        forgotPasswordForm.classList.remove('active');
        
        // Show the requested form
        formToShow.classList.add('active');
    }
    
    // Event listeners for form switching
    showSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showForm(signupForm);
    });
    
    showForgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showForm(forgotPasswordForm);
    });
    
    showLoginLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showForm(loginForm);
        });
    });
    
    // Form validation functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 8;
    }
    
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('input-error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function hideError(inputElement, errorElement) {
        inputElement.classList.remove('input-error');
        errorElement.style.display = 'none';
    }
    
    function showSuccessMessage(message) {
        alert(message); // In a real app, you might show this in the UI
    }
    
    function showErrorMessage(message) {
        alert(message); // In a real app, you might show this in the UI
    }
    
    // Login Form with Firebase
    const loginFormElement = document.getElementById('loginFormElement');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Email validation
            const loginEmail = document.getElementById('loginEmail');
            const loginEmailError = document.getElementById('loginEmail-error');
            if (!loginEmail.value || !validateEmail(loginEmail.value)) {
                showError(loginEmail, loginEmailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError(loginEmail, loginEmailError);
            }
            
            // Password validation
            const loginPassword = document.getElementById('loginPassword');
            const loginPasswordError = document.getElementById('loginPassword-error');
            if (!loginPassword.value || !validatePassword(loginPassword.value)) {
                showError(loginPassword, loginPasswordError, 'Password must be at least 8 characters');
                isValid = false;
            } else {
                hideError(loginPassword, loginPasswordError);
            }
            
            if (isValid) {
                const email = loginEmail.value;
                const password = loginPassword.value;
                
                auth.signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        showSuccessMessage('Login successful!');
                        // Redirect to dashboard or home page
                        // window.location.href = 'dashboard.html';
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        
                        if (errorCode === 'auth/user-not-found') {
                            showError(loginEmail, loginEmailError, 'User not found');
                        } else if (errorCode === 'auth/wrong-password') {
                            showError(loginPassword, loginPasswordError, 'Incorrect password');
                        } else {
                            showErrorMessage(errorMessage);
                        }
                    });
            }
        });
    }
    
    // Signup Form with Firebase
    const signupFormElement = document.getElementById('signupFormElement');
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Name validation
            const signupName = document.getElementById('signupName');
            const signupNameError = document.getElementById('signupName-error');
            if (!signupName.value.trim()) {
                showError(signupName, signupNameError, 'Please enter your full name');
                isValid = false;
            } else {
                hideError(signupName, signupNameError);
            }
            
            // Email validation
            const signupEmail = document.getElementById('signupEmail');
            const signupEmailError = document.getElementById('signupEmail-error');
            if (!signupEmail.value || !validateEmail(signupEmail.value)) {
                showError(signupEmail, signupEmailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError(signupEmail, signupEmailError);
            }
            
            // Password validation
            const signupPassword = document.getElementById('signupPassword');
            const signupPasswordError = document.getElementById('signupPassword-error');
            if (!signupPassword.value || !validatePassword(signupPassword.value)) {
                showError(signupPassword, signupPasswordError, 'Password must be at least 8 characters');
                isValid = false;
            } else {
                hideError(signupPassword, signupPasswordError);
            }
            
            // Confirm Password validation
            const signupConfirmPassword = document.getElementById('signupConfirmPassword');
            const signupConfirmPasswordError = document.getElementById('signupConfirmPassword-error');
            if (signupPassword.value !== signupConfirmPassword.value) {
                showError(signupConfirmPassword, signupConfirmPasswordError, 'Passwords do not match');
                isValid = false;
            } else if (!signupConfirmPassword.value) {
                showError(signupConfirmPassword, signupConfirmPasswordError, 'Please confirm your password');
                isValid = false;
            } else {
                hideError(signupConfirmPassword, signupConfirmPasswordError);
            }
            
            if (isValid) {
                const email = signupEmail.value;
                const password = signupPassword.value;
                
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Signed up
                        const user = userCredential.user;
                        
                        // Update user profile with name
                        return user.updateProfile({
                            displayName: signupName.value.trim()
                        });
                    })
                    .then(() => {
                        showSuccessMessage('Account created successfully!');
                        // Redirect to dashboard or home page
                        // window.location.href = 'dashboard.html';
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        
                        if (errorCode === 'auth/email-already-in-use') {
                            showError(signupEmail, signupEmailError, 'Email already in use');
                        } else if (errorCode === 'auth/weak-password') {
                            showError(signupPassword, signupPasswordError, 'Password should be at least 6 characters');
                        } else {
                            showErrorMessage(errorMessage);
                        }
                    });
            }
        });
    }
    
    // Forgot Password Form with Firebase
    const forgotPasswordFormElement = document.getElementById('forgotPasswordFormElement');
    if (forgotPasswordFormElement) {
        forgotPasswordFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Email validation
            const forgotPasswordEmail = document.getElementById('forgotPasswordEmail');
            const forgotPasswordEmailError = document.getElementById('forgotPasswordEmail-error');
            if (!forgotPasswordEmail.value || !validateEmail(forgotPasswordEmail.value)) {
                showError(forgotPasswordEmail, forgotPasswordEmailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError(forgotPasswordEmail, forgotPasswordEmailError);
            }
            
            if (isValid) {
                const email = forgotPasswordEmail.value;
                
                auth.sendPasswordResetEmail(email)
                    .then(() => {
                        showSuccessMessage('Password reset link sent to your email!');
                        showForm(loginForm);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        
                        if (errorCode === 'auth/user-not-found') {
                            showError(forgotPasswordEmail, forgotPasswordEmailError, 'User not found');
                        } else {
                            showErrorMessage(errorMessage);
                        }
                    });
            }
        });
    }
    
    // Check auth state (for auto-redirect if already logged in)
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            console.log('User is logged in:', user);
            // You can redirect to another page here if needed
            // window.location.href = 'dashboard.html';
        } else {
            // User is signed out
            console.log('User is logged out');
        }
    });
});