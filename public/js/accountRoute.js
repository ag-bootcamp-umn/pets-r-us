console.log('load script loaded');

const loadAcc = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        const data = await response.json();

        if (response.ok) {
            if (data.user && data.user.id) {
                sessionStorage.setItem('userId', data.user.id);
                console.log('User ID stored in session storage:', data.user.id);
                document.location.replace('/user');
            } else {
                console.error('Ruh roh!  Wrong email or password, Raggy.');
            }
            
        } else {
            alert('Failed to route account. ' + (data.message || ''));
        }
    }
};

$('.sign-in-form').submit(loadAcc);