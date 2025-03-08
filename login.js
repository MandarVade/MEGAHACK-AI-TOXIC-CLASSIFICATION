document.addEventListener('DOMContentLoaded', function() {
    const loginNav = document.getElementById('login-nav');
    const signupNav = document.getElementById('signup-nav');
    const formContainer = document.querySelector('.form-container');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');

    function showSignup() {
        loginNav.classList.remove('active');
        signupNav.classList.add('active');
        formContainer.classList.add('show-signup');
    }

    function showLogin() {
        signupNav.classList.remove('active');
        loginNav.classList.add('active');
        formContainer.classList.remove('show-signup');
    }

    // Event listeners
    signupNav.addEventListener('click', showSignup);
    loginNav.addEventListener('click', showLogin);
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSignup();
    });
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLogin();
    });
});