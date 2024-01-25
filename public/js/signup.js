const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },

        });

        if (response.ok) {
            console.log('blah');
            document.location.replace('/dashboard');
        } else {
            alert('Could not complete signup! Please try again.');
        }
    }
};

const signupListner = document.querySelector('#signup-form');
if (signupListner) {
    signupListner.addEventListener('submit', signupHandler);
}