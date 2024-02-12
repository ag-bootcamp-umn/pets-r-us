console.log('init script initiated');

const initAcc = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type' : 'application/json' },
        });

        const data = await response.json();

        if (response.ok) {
            if (data.userId) {
                sessionStorage.setItem('userId', data.userId);
                console.log('User ID stored in session storage:', data.userId);
                document.location.replace('/new-login');
            } else {
                console.error('Ruh roh!  No user ID, Raggy.');
                document.location.replace('/new-login');
            }
        } else {
            alert('Failed to initialize account. ' + (data.message || ''));
        }
    }
};

$('.sign-up-form').submit(initAcc);
