let timer = 5;

const intervalId = setInterval(() => {
    $('#timer').text(timer);
    console.log(timer);
    timer -= 1;
    
    if (timer < 0) {
        clearInterval(intervalId);
        $('#timer').text(0);
    }
}, 1000);

intervalId();

const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        setTimeout(() => {
            document.location.replace('/');
            }, 5000);
    } else {
      alert('You are not signed in.');
    }
  };

logout();