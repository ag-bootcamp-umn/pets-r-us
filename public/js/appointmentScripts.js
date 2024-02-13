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
    document.location.replace('/success');
  } else {
    console.log('No Dice.')
  }
}

appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  bookAppointment();
});

const currentUrl = window.location.href;
const getResData = async () => {
  const resData = await fetch(currentUrl);
  console.log(resData);
}

// getResData();

// fetch(currentUrl)
// .then(response => response.json())
//     .then(data => console.log(data))
// .catch(err => console.log(err));
console.log("Current date:", now);
console.log("Pet data:", pet);