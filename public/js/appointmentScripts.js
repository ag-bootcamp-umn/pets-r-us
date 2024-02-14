const appointmentForm = document.querySelector('.appointment-form');
console.log("Current date:", now);
console.log("Pet data:", pet);

const bookAppointment = async () => {
  const date = document.querySelector('#appointment-date').value;
  if (now >= date) return alert('Please choose a date in the future.');
//   const appointmentPost = {
//     date,
//     pet_id: pet.id,
//     // user_id: sessionStorage.userId
//   };
//   console.log('apptPost:', appointmentPost);
  
// const response = await fetch('/api/meet', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(appointmentPost)
//   })
//   if (response.ok) {
//     console.log('OK!!!')
//     document.location.replace('/success');
//   } else {
//     console.log('No Dice.')
//   }
}

appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  bookAppointment();
});

console.log(sessionStorage.userId);