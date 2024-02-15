const appointmentForm = document.querySelector('.appointment-form');

const bookAppointment = async () => {
  const date = document.querySelector('#appointment-date').value;
  if (now >= date) return alert('Please choose a date in the future.');
  console.log('date:', date);
  const appointmentPost = {
    date,
    pet_id: pet.id,
  };
  
const response = await fetch('/api/meet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointmentPost)
  })
  if (response.ok) {
    console.log('OK!!!')
    document.location.replace('/success');
  } else {
    console.log('Something went wrong.')
  }
}

appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  bookAppointment();
});

console.log(sessionStorage.userId);