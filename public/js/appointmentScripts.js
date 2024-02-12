const appointmentForm = document.querySelector('.appointment-form');

const bookAppointment = async () => {
  const date = document.querySelector('#appointment-date').value;
  console.log('apptDate:', date);
  const appointmentPost = {date};
  console.log('apptPost:', appointmentPost);
  
const response = await fetch('/api/meet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointmentPost)
  })
  if (response.ok) {
    console.log('OK!!!')
  } else {
    console.log('No Dice.')
  }
}

appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  bookAppointment();
});