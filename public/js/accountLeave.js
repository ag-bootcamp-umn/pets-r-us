let timer = 5;

const intervalId = setInterval(() => {
    $('#timer').text(timer);
    timer -= 1;
    
    if (timer < 0) {
        clearInterval(intervalId);
        $('#timer').text(0);
        document.location.replace('/');
    }
}, 1000);

const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        console.log("You've been signed out successfully.")
    } else {
      alert('You are not signed in.');
    }
  };

logout();